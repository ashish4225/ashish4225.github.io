# Building a 3D Printing Slicer in C++

24 August 2026 


---

# Why Build a Slicer?

3D printing is one of those things where a complicated physical process can look deceptively simple from the outside. You put a model into a slicer, press a button, and somehow a machine ends up moving a nozzle around thousands of times until the object exists.

I had been interested in how that actually worked for a while, so I decided to build a slicer myself.

The basic idea is surprisingly simple. A slicer takes a 3D model and converts it into a sequence of 2D layers. Those layers are then converted into paths for the printer head to follow, and finally into G-code.

The interesting part is everything that happens in between.

I wanted to understand that process from the geometry upwards, so I built a command-line slicer in C++ that takes an `.obj` model and produces `.gcode`.


---

# The Pipeline

Before writing any geometry code, I found it useful to think about what the slicer actually has to do.

The input is a 3D mesh. The output is a list of movements.

That means there are really several different problems hiding inside one program.

First, the model has to be read and represented in memory.

Then the model has to be divided into layers. For every layer, the slicer needs to find where the horizontal plane intersects the model.

Those intersections form line segments. The segments then need to be connected into contours.

Once we have contours, we can generate perimeters and infill.

Finally, those paths have to be translated into movements and extrusion commands that a printer understands.

I ended up separating the problem into roughly these parts:

```text
OBJ parser
    ↓
Geometry utilities
    ↓
Layer generation
    ↓
Contour reconstruction
    ↓
Infill generation
    ↓
G-code writer
```

This separation turned out to be useful because the geometry doesn't really care that the final result is going to be G-code.

---

# Reading a 3D Model

I decided to use the OBJ format for the input.

An OBJ file is particularly convenient for a project like this because the basic geometry can be represented as a list of vertices followed by faces.

For example:

```text
v 0 0 0
v 20 0 0
v 20 20 0
v 0 20 0

f 1 2 3 4
```

The `v` lines describe points in 3D space and the `f` line describes which points make up a face.

The first thing the slicer needs to do is turn these lines into something useful in C++.

I represented a vertex simply as:

```cpp
struct Vertex {
    float x, y, z;
};
```

and a face stores the indices of the vertices that make it up.

The OBJ format uses one-based indexing, while C++ vectors use zero-based indexing, so when parsing a face I convert the indices:

```cpp
indices.push_back(idx - 1);
```

After parsing, the model is essentially two collections:

```text
Vertices
──────────────
0 → (x, y, z)
1 → (x, y, z)
2 → (x, y, z)
...

Faces
──────────────
0 → [0, 1, 2]
1 → [0, 2, 3]
...
```

The faces don't actually contain copies of the vertices. They just refer back to the global vertex list.

---

# Putting the Model in the Right Place

There is a small problem with arbitrary CAD models.

They don't necessarily arrive in the coordinate system that we want to print them in.

The bottom of the model might be below `Z = 0`, and the model might not be centered around the X and Y axes.

Before slicing, I calculate the bounding box of the model.

From that I can determine:

```text
Xmin → Xmax
Ymin → Ymax
Zmin → Zmax
```

If the model doesn't start at zero on the Z axis, I shift it upward.

I also center it in X and Y.

This means the slicer can start working with a predictable coordinate system.

The program also reports the resulting dimensions:

```text
INFO: Dimensions:
X:(...)
Y:(...)
Z:(...)
```

This isn't really part of the slicing algorithm itself, but it saves a lot of confusion later when trying to figure out why a model is appearing somewhere unexpected.

---

# What Does a Slice Look Like?

![A single sliced layer](/assets/blog/slicer-3d-printing/single-sliced.png)

Imagine taking an infinitely large horizontal plane and moving it upward through the model.

The intersection between the plane and the model gives us the shape of that particular layer.

If the current layer is at:

\[
z=z_i
\]

we go through every face in the model and look at the Z coordinates of its vertices.

For each face, I divide its vertices into two groups:

```text
lower vertices
    z ≤ zi

upper vertices
    z > zi
```

If both groups contain something, the slicing plane passes through that face.

That means we need to calculate the exact intersection points.

---

# Finding the Intersection

Suppose we have an edge between two vertices:

\[
P_1=(x_1,y_1,z_1)
\]

and

\[
P_2=(x_2,y_2,z_2)
\]

We want to find where this edge intersects the layer plane:

\[
z=z_i
\]

A convenient way to describe every point along the edge is:

\[
P(\lambda)=P_1+\lambda(P_2-P_1)
\]

where:

\[
0\leq\lambda\leq1
\]

When `λ = 0`, we're at `P1`.

When `λ = 1`, we're at `P2`.

Everything between them is obtained by changing `λ`.

We know the Z coordinate that we want, so:

\[
z_i=z_1+\lambda(z_2-z_1)
\]

Rearranging gives:

\[
\lambda=
\frac{z_i-z_1}{z_2-z_1}
\]

Once we have `λ`, we can calculate X and Y in exactly the same way:

\[
x=x_1+\lambda(x_2-x_1)
\]

\[
y=y_1+\lambda(y_2-y_1)
\]

So the point where the edge crosses the layer is:

\[
P=(x,y,z_i)
\]

In code, the Z version becomes:

```cpp
inline Vertex get_intersection_z(
    const Vertex& c1,
    const Vertex& c2,
    float zval) {

    float x =
        (zval - c1.z) *
        (c2.x - c1.x) /
        (c2.z - c1.z) + c1.x;

    float y =
        (zval - c1.z) *
        (c2.y - c1.y) /
        (c2.z - c1.z) + c1.y;

    return Vertex(x, y, zval);
}
```

I also implemented the same idea for X and Y planes, so the geometry utility isn't restricted to slicing along Z.

For the slicer, though, Z is the important one.

---

# Connecting the Pieces

At this point we can find the intersection of a triangle with a plane.

But there is a problem.

We don't get a contour.

We get a collection of independent line segments.

Imagine slicing a cube made out of triangles. Several different triangles will intersect the same layer:

```text
Triangle 1 → segment
Triangle 2 → segment
Triangle 3 → segment
Triangle 4 → segment
...
```

The printer doesn't want a random collection of segments. We need to know which segment comes after which one.

This is why I used  `FaceQueue` 

Each intersecting face stores its two contour points.

Then I compare the vertex indices of faces.

If two faces share an edge, they have two vertex indices in common.

So we can use that as a way of figuring out which faces belong next to each other.


The `FaceQueue` keeps two collections:

```cpp
vector<Face> q;
vector<Face> store;
```

`q` is the current contour being assembled.

`store` contains faces that were found but cannot yet be connected to the current contour.

When a new face has two matching vertex indices, it can be appended to the queue.

If it doesn't match, it waits in `store` until another face makes the connection possible.

This lets the slicer reconstruct a complete contour from the individual triangle intersections.


---

# Building the Layers

Now the previous pieces can be put into a loop.

Starting at the base of the model, I move the slicing plane upward by the layer height.

For every layer:

```text
zi = base_offset + i × layer_height
```

Then:

```text
for every face:
    find vertices below plane
    find vertices above plane

    if both exist:
        calculate intersections
        add face to contour queue
```

This continues until the top of the model is reached.

The result is essentially:

```text
Layer 0 → contours
Layer 1 → contours
Layer 2 → contours
Layer 3 → contours
...
Layer N → contours
```

The number of layers is calculated from the model's Z dimension and the selected layer height.

So a model that is 20 mm tall with a 0.2 mm layer height will result in roughly 100 slicing planes.

![A model divided into many horizontal layers](/assets/blog/slicer-3d-printing/multiple-slices.png)

---

# Turning Contours into Toolpaths

Now we have the shape of every layer.

But we still haven't told the printer to do anything.

The first thing we can do is print the outline.

For each contour, I walk through the ordered intersection points.

The first point is reached using a rapid movement:

```text
G0 X... Y... Z...
```

Then the printer moves between the contour points using printing movements:

```text
G1 X... Y... Z... E...
```

Finally, the path returns to its starting point.

![Toolpath without infill](/assets/blog/slicer-3d-printing/withoutinfill.webm)
The nozzle follows the perimeter rather than simply teleporting from one point to another.

The distinction between `G0` and `G1` is useful here.

`G0` is used for rapid travel where we're not trying to deposit material.

`G1` is used for printing movements.

---

# Filling the Inside

Printing only the outline obviously isn't enough.

A real printed object needs material inside the perimeter as well.

Instead of asking, where does the model intersect this Z plane?

we can now ask, where does the layer's contour intersect a line at this X or Y coordinate?

For example, imagine sweeping a vertical line across the layer:

Every time that line enters or leaves the polygon, we get an intersection.

If the intersection points are sorted correctly, we can pair them:

```text
P0 ───────── P1

P2 ───────── P3

P4 ───────── P5
```

and print between each pair.

This is essentially what the infill code does.

It finds faces intersecting a particular coordinate, calculates the intersection points, removes duplicates, sorts them, and then takes them in pairs.

That gives us printable line segments inside the contour.

![Toolpath with infill](/assets/blog/slicer-3d-printing/withinfill.webm)

---

# Cross Infill

For normal layers, I use a criss-cross pattern.

First the slicer fills in one direction:

```text
////////////////////
```

Then it fills in the perpendicular direction:

```text
\\\\\\\\\\\\\\\\\\\\
```


And the spacing between the lines can be configured using:

```text
--gap_between_crosses
```

This means the same geometric intersection code can be reused for both directions.

The difference is simply which axis is being swept.



---

# Solid Layers

The top and bottom of a print usually need something different from the normal internal infill.

For these layers, the slicer switches to solid filling.

The code checks the current layer number:

```cpp
if (layer_num < num_solid_fill ||
    layer_num >= face_qs.size() - num_solid_fill ||
    misc_infill == "solid")
```

So the first few and last few layers can be filled densely.

---

# How Much Filament Should We Extrude?

There is another problem in those `G1` commands.

Moving the nozzle is not enough.

We also need to tell the printer how much filament to push.

Suppose the desired extrusion width is:

\[
w
\]

and the layer height is:

\[
h
\]

The approximate cross-sectional area of deposited material is:

\[
A=w\times h
\]

For a filament with diameter:

\[
d
\]

its cross-sectional area is:

\[
A_f=\frac{\pi d^2}{4}
\]

The ratio between these areas tells us approximately how much filament length is required for a given extrusion path.

In the implementation, this becomes an extrusion rate based on:

```cpp
float flow_area =
    extrusion_multiplier *
    extrusion_width *
    layer_height;

float extrusion_rate =
    flow_area /
    (filament_diameter *
     filament_diameter / 4.0f *
     M_PI);
```

Then, for every printing movement, I calculate the movement distance and use that to increase the cumulative extrusion value.

So a movement isn't simply:

```text
G1 X20 Y10
```

It can become:

```text
G1 X20.0000 Y10.0000 Z0.2000 E1.2345
```

The E value represents the accumulated filament extrusion.

This is where the slicer starts turning pure geometry into something that actually describes a physical manufacturing process.

---

# Writing G-code

The final stage is handled by `GCodeWriter`.

The writer keeps track of the current position:

```cpp
float X, Y, Z;
```

and provides an `abs_move()` function that converts a movement into G-code.

For example:

```cpp
g.abs_move(
    next_pt.x,
    next_pt.y,
    next_pt.z,
    false,
    feedrate_writing,
    total_extruded
);
```

becomes a `G1` command with the appropriate coordinates, feedrate and extrusion.

For rapid movements it instead writes `G0`.

I also use separate header and footer templates.

This allows things such as:

- units
- nozzle temperature
- bed temperature
- feedrate
- printer startup commands

to live outside the core geometry code.

The slicer can therefore prepare a header using values such as:

```text
PLA → 215 °C nozzle
PLA → 60 °C bed
```

or accept explicit temperature values instead.

![Generated G-code output](/assets/blog/slicer-3d-printing/gcode.png)

---

# Putting Everything Together

At this point the entire slicer can be viewed as one pipeline.

![Slicer pipeline flowchart](/assets/blog/slicer-3d-printing/finalflowchart.jpeg)

The interesting thing is that none of these steps individually looks particularly complicated.

The difficulty comes from getting them all to agree.

A geometrically correct contour is useless if it isn't ordered.

A correctly ordered contour is useless if the printer doesn't know how much filament to extrude.

And correctly calculated extrusion is useless if the resulting G-code moves the nozzle somewhere it shouldn't.

---

# Making It Usable

Once the core algorithm worked, I wanted the slicer to be something I could actually run from the terminal rather than a collection of functions.

The command line interface exposes the important printing parameters:

```bash
./slicer4225 model.obj \
    --layer_height 0.2 \
    --feedrate 3600 \
    --filament_diameter 1.75 \
    --extrusion_width 0.4 \
    --misc_infill cross
```

There are options for layer height, scaling, feedrate, filament diameter, extrusion width, extrusion multiplier, infill type, infill spacing, solid layer count, temperature, bed temperature, units and the base offset.

For normal use, the Makefile makes this a little shorter:

```bash
make
make slice FILE=tests/block.obj
```

and the resulting G-code is written to the output file.


---

# Testing the Slicer

For testing, I have a small collection of OBJ models with different geometries.

There is a simple block:

```text
block.obj
```

which is useful for checking the basic slicing process.

Then there are shapes such as:

```text
pyramid.obj
ring.obj
icecream.obj
torus.obj
```



A ring introduces an inner contour.

A torus is much more interesting because the number and shape of intersections change as the slicing plane moves through the object.





---

# Where to Go From Here

This is still a fairly small slicer compared with the software normally used to prepare a 3D print.

There are a lot of things that could be added.

The first obvious one is better path planning. At the moment, generating the geometry and generating the path are still fairly closely connected. A more advanced slicer could optimize travel moves, choose better starting points, and reduce unnecessary movements.

There are also many other features that could be built on top of the same geometry:

- Multiple perimeter walls
- More infill patterns
- Support generation
- Overhang detection
- Retraction
- Bridging
- Better travel optimization
- Printer-specific G-code
- More robust handling of difficult meshes

But the basic pipeline is already there.

A 3D mesh goes in.

The model is converted into horizontal cross-sections.

Those cross-sections become contours.

The contours become toolpaths.

and the toolpaths become G-code.

![Final printing animation](/assets/blog/slicer-3d-printing/finalprinting.webm)

That was the part I wanted to understand when I started.

A slicer isn't really converting a model into “layers”.

It's taking geometry and gradually reducing it into something much more concrete:

**a sequence of movements that a machine can execute.**


