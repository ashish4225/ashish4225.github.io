import type {
  Project,
  ExperienceItem,
  CompetitionItem,
  EducationItem,
  SkillGroup,
} from '@/types';

export const profile = {
  name: 'Ashish Nerlekar',
  firstName: 'Ashish',
  tagline: 'Robotics • Embedded Systems • Product Engineering',
  intro:
    'I build robots, embedded systems, and physical products at the intersection of mechanical engineering, electronics, and software.',
  email: 'ashish422005@gmail.com',
  phone: '8623804225',
  github: 'https://github.com/ashish4225',
  linkedin: 'https://www.linkedin.com/in/ashish-nerlekar-906911317',
  twitter: '',
  resume: '/assets/resume.pdf',
  headshot: '/assets/projects/Headshot.jpg',
};

export const aboutBio = [
  "I'm an engineer and I love robotics, embedded systems, and product design. I love owning the complete lifecycle of a hardware project — from the first sketch in CAD to a working, manufacturable device in my hands.",
  'My work spans mechanical design and rapid prototyping, custom PCB layout in KiCad, and bare-metal firmware in C/C++ on platforms like the STM32 and ESP32. I thrive at the boundary where mechanical, electrical, and software decisions all have to come together.',
  'Beyond building, I enjoy teaching. As Mechanical Head at the Society of Robotics and Automation, VJTI, I run workshops helping others take their first steps into the same world that excited me.',
];

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    skills: ['C/C++'],
  },
  {
    label: 'CAD & CAM',
    skills: ['Fusion 360', 'SolidWorks'],
  },
  {
    label: 'Mechanical',
    skills: [
      'Product Engineering',
      'Rapid Prototyping',
      'Mechanical Design',
      'Kinematics',
    ],
  },
  {
    label: 'Electronics',
    skills: ['KiCad', 'Schematic Design', 'PCB Layout'],
  },
  {
    label: 'Embedded & Robotics',
    skills: [
      'STM32',
      'ESP32',
      'nRF5340',
      'Sensor Integration',
      'FreeRTOS',
      'ROS2',
    ],
  },
  {
    label: 'Computer Vision',
    skills: ['OpenCV'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'Linux', 'VS Code'],
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
    role: 'Product Design Intern',
    company: 'superr.ai',
    startDate: 'Sept 2025',
    endDate: 'Present',
    description:
      'Owning the complete system design of a Bluetooth-enabled MIDI piano — from 3D CAD and mechanical design to custom PCB and firmware.',
    bullets: [
      'Designed and built an end-to-end Bluetooth-enabled MIDI piano, owning the complete system from 3D CAD, mechanical design, and kinematics to final product-ready assembly.',
      'Developed custom PCB and touch-switch circuitry and programmed the nRF5340 in C/C++ for Bluetooth MIDI communication, firmware flashing, and hardware integration.',
      'Executed rapid 3D-printed prototyping iterations, functional testing, and aesthetic refinement, delivering a validated, manufacturable, and production-ready device.',
    ],
    technologies: [
      'Autodesk Fusion',
      'KiCad',
      'SolidWorks',
      'C/C++',
      'nRF5340',
    ],
  },
  {
    id: 'exp-2',
    role: 'Mechanical Head',
    company: 'Society of Robotics and Automation, VJTI',
    startDate: 'Sept 2025',
    endDate: 'Present',
    description:
      'Leading the mechanical division and conducting workshops on embedded systems, computer vision, and robotics.',
    bullets: [
      'Conducted workshops (Wall-E, Pixels, Mario) on embedded systems, computer vision, and robotics.',
      'Covered PID control, sensor interfacing, and FreeRTOS on ESP32-based platforms.',
      'Taught image processing algorithms in C++ and OpenCV-based implementations.',
      'Introduced robot kinematics (DH, FK/IK) and ROS2 (pub-sub, micro-ROS) for manipulator systems.',
    ],
    technologies: ['ESP32', 'FreeRTOS', 'OpenCV', 'C++', 'ROS2'],
  },
];

export const competitions: CompetitionItem[] = [
  {
    id: 'comp-1',
    title: 'HackFusion 2026',
    event: 'IEEE SPIT & UMIT',
    date: 'Jan 2026',
    bullets: [
      'Built a distributed two-node embedded system — Node A monitored vitals, posture, and fall detection; Node B handled RFID authentication and IR intrusion detection.',
      'Implemented AES-128 encrypted ESP-NOW, HTTPS Telegram alerts, and a custom web dashboard with live graphs and cloud logging under FreeRTOS and MISRA-C constraints.',
    ],
    technologies: ['ESP32', 'FreeRTOS', 'ESP-NOW', 'C/C++'],
  },
  {
    id: 'comp-2',
    title: 'SRA Maze Solving Competition',
    event: 'SAC – VJTI',
    date: 'Oct 2025',
    bullets: [
      'Navigated a multi-challenge autonomous maze with colorblind paths, object detection zones, and complex junctions requiring algorithmic path-planning and real-time decision-making.',
      'Fused IR, color, and proximity sensors to handle diverse obstacles; tuned bot kinematics and control logic for reliable traversal across all maze segments.',
    ],
    technologies: ['ESP32', 'Embedded C/C++', 'Sensor Fusion'],
  },
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Bluetooth MIDI Piano',
    category: 'Product Design',
    date: 'Sept 2025 – Present',
    description:
      'An end-to-end Bluetooth-enabled MIDI piano — from 3D CAD and mechanical design to custom PCB and nRF5340 firmware.',
    longDescription:
      'A complete product design project: I owned the full system from 3D CAD modeling and mechanical design to kinematics, custom PCB layout, firmware, and final assembly. The device communicates via Bluetooth MIDI, uses custom touch-switch circuitry, and was validated through rapid 3D-printed prototyping for a production-ready, manufacturable result.',
    image: '/assets/projects/midid-piano.jpg',
    technologies: ['Autodesk Fusion', 'KiCad', 'SolidWorks', 'C/C++', 'nRF5340'],
    highlights: [
      'Owned complete system design from 3D CAD to final assembly',
      'Custom PCB with touch-switch circuitry',
      'nRF5340 firmware for Bluetooth MIDI communication',
      'Rapid 3D-printed prototyping and production-ready validation',
    ],
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Handheld Gaming Console',
    category: 'Embedded',
    date: 'June 2025 – Aug 2025',
    description:
      'A custom handheld gaming console PCB centered on the STM32F407VGT6, with bare-metal firmware running interactive games.',
    longDescription:
      'Designed a custom handheld gaming console PCB centered on the STM32F407VGT6, integrating buttons, joystick, IMU, display, and supporting peripherals. Implemented bare-metal firmware in C using the STM32 HAL, configuring clocks, GPIO, timers, SPI/I2C, and sensor inputs to run interactive games. Delivered a complete embedded development workflow with published firmware, PCB files, and step-by-step documentation.',
    image: '/assets/projects/hgc1.jpg',
    technologies: ['STM32', 'Embedded C/C++', 'KiCad'],
    highlights: [
      'Custom PCB design centered on STM32F407VGT6',
      'Bare-metal firmware using STM32 HAL',
      'Clocks, GPIO, timers, SPI/I2C configuration',
      'Published firmware, PCB files, and documentation',
    ],
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Smart Vaccine Carrier Lid',
    category: 'Product Design',
    date: 'Feb 2026',
    description:
      'A retrofit smart lid for vaccine carriers with Peltier-based active cooling, GPS tracking, and live temperature monitoring.',
    longDescription:
      'Designed a retrofit smart lid for existing vaccine carriers, replacing traditional ice packs with a Peltier-based active cooling system controlled via closed-loop PWM from an ESP32 temperature feedback loop. Integrated GPS tracking for ASHA worker location monitoring and a vaccine count sensor with live display of temperature and inventory during transit. Designed the custom PCB and iterated 3D-printed lid prototypes to achieve a precise mechanical fit over the actual carrier.',
    image: '/assets/projects/vaccine1.jpg',
    technologies: ['ESP32', 'PWM', 'KiCad', '3D Printing'],
    highlights: [
      'Peltier-based active cooling with closed-loop PWM',
      'GPS tracking for ASHA worker location monitoring',
      'Vaccine count sensor with live temperature display',
      'Custom PCB and 3D-printed lid prototypes',
    ],
    featured: true,
  },
  {
    id: 'proj-5',
    title: 'Autonomous Maze-Solving Bot',
    category: 'Robotics',
    date: 'Oct 2025',
    description:
      'An autonomous robot navigating colorblind paths, object detection zones, and complex junctions with sensor fusion.',
    longDescription:
      'Built for the SAC – SRA Maze Solving Competition at VJTI, this autonomous robot navigated a multi-challenge maze with colorblind paths, object detection zones, and complex junctions. Fused IR, color, and proximity sensors to handle diverse obstacles, and tuned bot kinematics and control logic for reliable traversal across all maze segments.',
    image: '/assets/projects/SAC.jpg',
    technologies: ['ESP32', 'Embedded C/C++', 'Sensor Fusion'],
    highlights: [
      'Multi-challenge autonomous maze navigation',
      'IR, color, and proximity sensor fusion',
      'Algorithmic path-planning and real-time decisions',
      'Tuned bot kinematics and control logic',
    ],
  },
];

export const projectCategories: ('All' | Project['category'])[] = [
  'All',
  'Embedded',
  'Robotics',
  'Product Design',
];

export const backgroundImages = [
  '/assets/backgrounds/background.jpg',
];
