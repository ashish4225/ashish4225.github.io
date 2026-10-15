import type {
  Project,
  ExperienceItem,
  CompetitionItem,
  EducationItem,
  SkillGroup,
} from '@/types';

/**
 * Portfolio content for Ashish Nerlekar.
 * Voice: direct, technical, builder-first. Keep claims grounded in actual work.
 */

export const profile = {
  name: 'Ashish Nerlekar',
  firstName: 'Ashish',
  tagline: 'I make machines do things.',
  intro:
    'Robots that move. Boards that work. Products that go from CAD to the real world.',
  email: 'ashish422005@gmail.com',
  phone: '8623804225',
  github: 'https://github.com/ashish4225',
  linkedin: 'https://www.linkedin.com/in/ashish-nerlekar-906911317',
  twitter: '',
  resume: '/assets/resume.pdf',
  headshot: '/assets/projects/Headshot.png',
};

export const hero = {
  eyebrow: 'MECHANICAL × ELECTRONICS × SOFTWARE',
  headline: ['I MAKE MACHINES', 'DO THINGS.'],
  subheadline:
    'Robots that move. Boards that work. Products that go from CAD to the real world.',
  availabilityLabel: 'BUILDING THINGS',
  location: 'VJTI · MUMBAI · INDIA',
  accent: 'acid-green',
  primaryCta: 'EXPLORE THE BUILDS',
};

export const aboutBio = [
  "I'm a Production Engineering student at VJTI, Mumbai. I spend a lot of my time making things that involve screws, silicon, solder and way too much debugging.",
  "I've designed PCBs, written embedded firmware, modelled mechanical parts, built robots and taken products from CAD to physical prototypes. I like understanding the whole machine — not just the bit I'm responsible for.",
  "I also lead the mechanical division at VJTI's Society of Robotics and Automation, where I help other students go from “I've never built this before” to making something that actually works.",
  "My favourite part of engineering is when the thing you've been designing on a screen finally works in real life.",
];

export const skillGroups: SkillGroup[] = [
  {
    label: 'Embedded Systems',
    skills: ['C/C++', 'STM32', 'ESP32', 'nRF5340', 'FreeRTOS', 'Bare-Metal Firmware'],
  },
  {
    label: 'Robotics',
    skills: ['ROS2', 'PID Control', 'Kinematics', 'Sensor Integration', 'Sensor Fusion'],
  },
  {
    label: 'Electronics',
    skills: ['KiCad', 'Schematic Design', 'PCB Layout', 'Communication Protocols'],
  },
  {
    label: 'Mechanical & Product',
    skills: ['Fusion 360', 'SolidWorks', 'Product Engineering', 'Mechanical Design', 'Rapid Prototyping'],
  },
  {
    label: 'Software & Tools',
    skills: ['C++', 'Python', 'OpenCV', 'Git', 'Linux', 'VS Code', 'G-code'],
  },
];

export const education: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'B.Tech in Production Engineering',
    institution: 'Veermata Jijabai Technological Institute',
    location: 'Mumbai, India',
    startDate: 'June 2024',
    endDate: 'June 2028',
  },
];

export const experience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Product Design Engineer',
    company: 'Basilisk Industries',
    startDate: 'May 2026',
    endDate: 'Present',
    description:
      'Designing defence AR glasses and egocentric data-collection wearables from mechanical architecture to MJF production.',
    bullets: [
      'Designed and manufactured AR glasses from scratch for defence applications, owning the complete mechanical design, component integration, and product architecture.',
      'Developed and iterated MJF-manufactured prototypes, refining fit, assembly, component packaging, and manufacturability through physical testing and design iterations.',
      'Developing wearable headbands for egocentric data collection through Basilisk’s collaboration with Pronto, covering mechanical design, component integration, and manufacturing.',
    ],
    technologies: ['Mechanical Design', 'Wearables', 'MJF 3D Printing', 'Product Architecture', 'Component Packaging', 'Rapid Prototyping'],
  },
  {
    id: 'exp-2',
    role: 'Product Development Engineer',
    company: 'superr.ai',
    startDate: 'Sept 2025',
    endDate: 'June 2026',
    description:
      'Engineered an end-to-end Bluetooth-enabled MIDI piano across 3D CAD, custom PCBs, and nRF5340 firmware for production-ready manufacturing.',
    bullets: [
      'Designed and built an end-to-end Bluetooth-enabled MIDI piano, owning the complete system from 3D CAD, mechanical design, and kinematics to final product-ready assembly.',
      'Developed custom PCB and touch-switch circuitry and programmed the nRF5340 in C/C++ for Bluetooth MIDI communication, firmware flashing, and hardware integration.',
      'Executed rapid 3D-printed prototyping iterations, functional testing, and aesthetic refinement, delivering a validated, manufacturable, and production-ready device.',
    ],
    technologies: ['Fusion 360', 'KiCad', 'SolidWorks', 'C/C++', 'nRF5340', 'Bluetooth MIDI'],
  },
  {
    id: 'exp-3',
    role: 'Mechanical Head',
    company: 'Society of Robotics and Automation, VJTI',
    startDate: 'Sept 2025',
    endDate: 'Present',
    description:
      'Leading hands-on mechanical work and helping students turn robotics concepts into working builds.',
    bullets: [
      'Conducted Wall-E, Pixels and Mario workshops covering robotics, embedded systems and computer vision.',
      'Taught PID control, sensor interfacing and FreeRTOS fundamentals on ESP32 platforms.',
      'Introduced image-processing concepts through C++ and OpenCV implementations.',
      'Covered robot kinematics and ROS 2 fundamentals for manipulator systems.',
    ],
    technologies: ['ESP32', 'FreeRTOS', 'OpenCV', 'C++', 'ROS2', 'Robotics'],
  },
];

export const competitions: CompetitionItem[] = [
  {
    id: 'comp-1',
    title: 'HackFusion 2026',
    event: 'IEEE SPIT & UMIT',
    date: 'Jan 2026',
    bullets: [
      'Built a two-node embedded system: one node monitored vitals, posture and falls; the other handled RFID authentication and IR intrusion detection.',
      'Implemented AES-128 encrypted ESP-NOW communication, HTTPS Telegram alerts and a web dashboard with live graphs and cloud logging.',
      'Worked within FreeRTOS and MISRA-C constraints.',
    ],
    technologies: ['ESP32', 'FreeRTOS', 'ESP-NOW', 'AES-128', 'C/C++'],
  },
  {
    id: 'comp-2',
    title: 'SRA Maze Solving Competition',
    event: 'SAC – VJTI',
    date: 'Oct 2025',
    bullets: [
      'Built and tuned an autonomous bot for a maze with difficult junctions, obstacle zones and paths requiring different navigation decisions.',
      'Combined IR, colour and proximity sensing with path-planning and real-time control logic.',
    ],
    technologies: ['ESP32', 'Embedded C/C++', 'Sensor Fusion', 'Control Logic'],
  },
];

export const projects: Project[] = [
  {
    id: 'proj-7',
    title: 'AR Glasses & Egocentric Wearables',
    category: 'Product Design',
    company: 'Basilisk Industries',
    date: 'May 2026 – Present',
    description:
      'Defence-grade AR glasses and egocentric data-collection headbands engineered from scratch to MJF manufacturing.',
    longDescription:
      'Designed and manufactured AR glasses from scratch for defence applications, owning the complete mechanical design, component integration, and product architecture. Developed and iterated MJF-manufactured prototypes, refining fit, assembly, component packaging, and manufacturability through physical testing and design iterations. Additionally developing wearable headbands for egocentric data collection through Basilisk’s collaboration with Pronto, covering mechanical design, component integration, and manufacturing.',
    image: '/assets/projects/basilisk.jpg',
    technologies: ['Mechanical Design', 'Wearables', 'MJF 3D Printing', 'Product Architecture', 'Component Packaging', 'Rapid Prototyping'],
    highlights: [
      'Designed and manufactured AR glasses from scratch for defence applications',
      'Owned complete mechanical design, component packaging, and product architecture',
      'Developed and iterated MJF-manufactured prototypes through physical testing',
      'Engineered wearable headbands for egocentric data collection with Pronto',
    ],
    featured: true,
  },
  {
    id: 'proj-1',
    title: 'Turning a Piano Into a Product',
    category: 'Product Design',
    company: 'superr.ai',
    date: 'Sept 2025 – June 2026',
    description:
      'A Bluetooth MIDI keyboard engineered from CAD, custom PCBs, and touch sensors to nRF5340 firmware.',
    longDescription:
      'Designed and built an end-to-end Bluetooth-enabled MIDI piano, owning the complete system from 3D CAD, mechanical design, and kinematics to final product-ready assembly. Developed custom PCB and touch-switch circuitry and programmed the nRF5340 in C/C++ for Bluetooth MIDI communication, firmware flashing, and hardware integration. Executed rapid 3D-printed prototyping iterations, functional testing, and aesthetic refinement, delivering a validated, manufacturable, and production-ready device.',
    image: '/assets/projects/midid-piano.jpg',
    technologies: ['Fusion 360', 'KiCad', 'SolidWorks', 'C/C++', 'nRF5340', 'Bluetooth MIDI'],
    highlights: [
      'Engineered end-to-end Bluetooth-enabled MIDI piano from CAD to final assembly',
      'Developed custom PCB and touch-switch circuitry',
      'Programmed nRF5340 in C/C++ for Bluetooth MIDI communication and flashing',
      'Executed rapid 3D-printed iterations and functional testing for production readiness',
    ],
    featured: true,
  },
  {
    id: 'proj-6',
    title: 'I Built My Own Slicer',
    category: 'Software',
    date: 'Aug 2026',
    description:
      'A C++ 3D-printing slicer that turns OBJ geometry into layers, toolpaths and G-code.',
    longDescription:
      'Started with a 3D model and built the pipeline that turns it into printer instructions. The slicer parses OBJ geometry, intersects horizontal planes to form contours, generates perimeters and infill, then writes G-code. The implementation was ported from an initial Python prototype to C++ and exposes slicing parameters through a command-line interface.',
    image: '/assets/blog/slicer-3d-printing/coverimage.png',
    technologies: ['C++', 'Makefile', '3D Geometry', 'Algorithms', 'G-code'],
    highlights: [
      'Built a 3D model slicer in C++ from scratch',
      'Slices OBJ geometry into layers and contours',
      'Generates perimeters, infill and printer-ready G-code',
      'Supports configurable slicing parameters through a CLI',
    ],
    github: 'https://github.com/ashish4225/slicer4225',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'A Game Console. Board Up.',
    category: 'Embedded',
    date: 'June 2025 – Aug 2025',
    description:
      'A custom STM32F407 handheld console with a purpose-built PCB and bare-metal firmware.',
    longDescription:
      'Designed a custom handheld gaming console around the STM32F407VGT6, integrating buttons, joystick, IMU, display and supporting peripherals. Wrote bare-metal C firmware using STM32 HAL, configuring clocks, GPIO, timers, SPI/I2C and sensor inputs to run interactive games. Published the firmware, PCB files and build documentation.',
    image: '/assets/projects/hgc1.jpg',
    technologies: ['STM32F407VGT6', 'Embedded C', 'KiCad', 'SPI', 'I2C'],
    highlights: [
      'Designed a custom PCB around the STM32F407VGT6',
      'Wrote bare-metal firmware for controls and peripherals',
      'Configured clocks, GPIO, timers, SPI and I2C',
      'Published firmware, PCB files and documentation',
    ],
    featured: true,
  },
  {
    id: 'proj-8',
    title: 'FlexWalk — Teaching a Humanoid to Walk',
    category: 'Robotics',
    date: 'Ongoing',
    description:
      'Mentored development of a 50 cm, 8-DOF bipedal humanoid covering mechanical architecture, geared servo actuation, and MuJoCo walking control.',
    longDescription:
      'Mentored the development of a 50 cm, 8-DOF bipedal humanoid, covering mechanical architecture, geared servo actuation and simulated walking control. Guided joint transmission design and inverse-kinematics trajectory generation, with ZMP/preview control in MuJoCo to develop walking patterns.',
    image: '/assets/projects/flexwalk.png',
    technologies: ['MuJoCo', 'Python', 'Inverse Kinematics', 'ZMP Control', 'MJCF', '3D Printing', 'STS3215'],
    highlights: [
      'Mentored development of a 50 cm, 8-DOF bipedal humanoid robot',
      'Guided mechanical architecture and joint transmission design',
      'Implemented inverse-kinematics trajectory generation and geared servo actuation',
      'Developed dynamic walking patterns using ZMP and preview control in MuJoCo',
    ],
    featured: true,
  },
  {
    id: 'proj-5',
    title: 'Sense. Decide. Move.',
    category: 'Robotics',
    date: 'Oct 2025',
    description:
      'An autonomous maze-solving bot built for tricky paths, obstacles and real-time decisions.',
    longDescription:
      'Built for the SAC – SRA Maze Solving Competition at VJTI. The robot navigated a multi-challenge maze with difficult junctions, object-detection zones and different path conditions. IR and colour sensors fed into the control logic, while kinematics and navigation behaviour were tuned for reliable traversal.',
    image: '/assets/projects/SAC.jpg',
    technologies: ['ESP32', 'Embedded C/C++', 'Sensor Fusion', 'Path Planning'],
    highlights: [
      'Handled complex junctions and obstacle zones',
      'Combined IR and colour-sensor inputs',
      'Implemented path-planning and real-time decisions',
      'Tuned kinematics and control logic for reliable traversal',
    ],
    featured: false,
  },
  {
    id: 'proj-3',
    title: 'A Smarter Way to Carry Vaccines',
    category: 'Product Design',
    date: 'Feb 2026',
    description:
      'A retrofit smart lid combining active cooling, temperature feedback, GPS and vaccine inventory sensing.',
    longDescription:
      'Designed a retrofit lid for existing vaccine carriers, replacing traditional ice packs with a Peltier-based active cooling system controlled through closed-loop PWM using ESP32 temperature feedback. Integrated GPS tracking and a vaccine-count sensor, with live temperature and inventory information displayed during transit. Designed a custom PCB and iterated 3D-printed prototypes to fit the existing carrier.',
    image: '/assets/projects/vaccine1.jpg',
    technologies: ['ESP32', 'Closed-Loop PWM', 'KiCad', 'GPS', '3D Printing'],
    highlights: [
      'Peltier-based active cooling with closed-loop PWM',
      'GPS tracking integration',
      'Vaccine-count sensing and live temperature display',
      'Custom PCB and 3D-printed retrofit lid',
    ],
    featured: true,
  },
];

export const projectCategories: ('All' | Project['category'])[] = [
  'All',
  'Embedded',
  'Robotics',
  'Product Design',
  'Software',
];

export const backgroundImages = ['/assets/backgrounds/background.jpg'];