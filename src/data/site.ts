/* =====================================================================
   SITE CONTENT — single source of truth.
   Edit anything here and the page updates. No HTML knowledge needed.
   ===================================================================== */

export const profile = {
  name: "Ramu Roy",
  role: "Embedded Systems Engineer",
  tagline:
    "I build the whole stack — bare-metal firmware → custom Linux → on-device ML & voice.",
  location: "Hyderabad, India",
  email: "royramu694429@gmail.com",
  phone: "+91 94936 52315",
  github: "https://github.com/ramuroy",
  githubHandle: "github.com/ramuroy",
  linkedin: "https://www.linkedin.com/in/ramu-roy-b780382b7/",
  linkedinLabel: "Ramu Roy",
  resumeUrl: "/Ramu_Roy_Resume.pdf",
  available: true,
  availableText: "available for embedded roles",
};

export const seo = {
  title:
    "Ramu Roy — Embedded Systems Engineer | Firmware, Yocto Linux & On-Device ML",
  description:
    "Ramu Roy, embedded systems engineer building the whole stack: bare-metal firmware, custom Yocto Linux (eOS), ESP32/STM32, and on-device ML & voice in Rust.",
  ogDescription:
    "Embedded systems engineer building the whole stack — bare-metal firmware, custom Yocto Linux for Raspberry Pi 5, ESP32/STM32, and on-device ML & voice in Rust.",
  keywords: [
    "Ramu Roy", "embedded systems engineer", "embedded Linux", "Yocto Project",
    "BitBake", "firmware engineer", "ESP-IDF", "ESP32", "ESP32-S3", "STM32",
    "Raspberry Pi 5", "RAUC OTA", "Rust embedded", "on-device ML",
    "wake-word detection", "Whisper STT", "Piper TTS", "ONNX tract", "MQTT",
    "D-Bus", "systemd", "UWB ranging", "MODBUS RTU", "RS485", "ESP-NOW",
    "device tree", "BSP", "Qt6 QML", "KiCad PCB design", "sensor fusion",
    "FreeRTOS", "Hyderabad", "Telangana", "Andhra Pradesh",
  ],
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

/* Boot / POST intro lines (first visit only) */
export const bootLines = [
  "rr@embedded:~$ boot --portfolio",
  "[ ok ] mounting profile rev.2026 ...",
  "[ ok ] signal acquired",
];

export const hero = {
  eyebrow: "embedded systems engineer · hyderabad, india",
  name: profile.name,
  // segments let us style arrows + emphasised domain words individually
  lead: [
    { t: "I build the whole stack — " },
    { t: "bare-metal firmware", em: true },
    { t: " ", arrow: true, label: "→" },
    { t: "custom Linux", em: true },
    { t: " ", arrow: true, label: "→" },
    { t: "on-device ML & voice", em: true },
    { t: "." },
  ],
  ctaPrimary: { label: "VIEW PROJECTS", href: "#projects", glyph: "▸" },
  ctaGhost: { label: "DOWNLOAD CV", href: profile.resumeUrl, glyph: "↓" },
  ticker: ["cgpa 8.3", "esp-idf v5.2", "yocto", "rust", "15+ repos"],
  keySpecs: [
    { k: "Location", v: "Hyderabad, IN" },
    { k: "Degree", v: "B.Tech ECE (CGPA 8.3)" },
    { k: "Core", v: "Yocto · ESP-IDF · STM32 · Rust", active: true },
    { k: "Shipped", v: "Anti-Collision @ Tata Steel", active: true },
    { k: "Status", v: "AVAILABLE", status: true },
  ],
};

export const about = {
  subhead: "A full-stack embedded engineer — silicon to UI.",
  paragraphs: [
    "I'm an Electronics & Communication Engineering graduate (RGUKT Srikakulam, 2026) who works across the entire embedded stack. I write bare-metal and RTOS firmware for ESP32, ESP32-S3, and STM32; I build a custom Yocto Linux distribution from the recipe up; and I train and run ML and voice models directly on-device. The interesting problems usually live at the seams between those layers, and that's where I spend my time.",
    "The proof is in the field. As an intern at Radiogeet, I built an Industrial Anti-Collision System for crane operations that's deployed at Tata Steel BlueScope — ESP32-S3 dual-core firmware doing time-critical UWB ranging on one core and zone-safety logic on the other, talking ESP-NOW peer-to-peer and MODBUS RTU over RS485 to drive industrial relays that physically stop hazardous crane movement. Safety-critical, real-time, and running in production.",
    "Right now I'm building eOS at Elipse — a Yocto/OpenEmbedded Linux distro for the Raspberry Pi 5 with A/B RAUC OTA, an MQTT service bus, D-Bus interfaces, SQLite persistence, and a Qt6/QML UI. It includes a Rust sensor-fusion framework and a fully on-device voice subsystem — a transfer-learned wake-word detector exported to ONNX and run on the pure-Rust tract runtime, multi-mic best-source fusion across ESP32 satellites, Whisper STT, Piper TTS, and async-Rust barge-in. I like owning a system end to end, from the device tree to the deploy flow.",
  ],
  glance: [
    { k: "Role", v: "Embedded Systems Engineer" },
    { k: "Focus", v: "Embedded Linux + on-device ML", active: true },
    { k: "Edu", v: "B.Tech ECE, RGUKT (CGPA 8.3)" },
    { k: "Languages", v: "English · Telugu · Hindi" },
  ],
};

export type Pill = { label: string; variant: "deployed" | "production" | "oss" | "wip" };

export type Flagship = {
  fig: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  pills: Pill[];
  highlights: string[];
  tech: string[];
  params: { k: string; v: string; active?: boolean }[];
  repo?: string;
  stars?: number;
  noRepoNote?: string;
  full?: boolean;
};

export const flagship: Flagship[] = [
  {
    fig: "FIG. 01",
    slug: "eos",
    title: "eOS",
    tagline: "A custom Yocto Linux distribution for the Raspberry Pi 5",
    description:
      "eOS is a from-scratch embedded Linux platform built on Yocto/OpenEmbedded for the Raspberry Pi 5 (16GB). It pairs A/B RAUC OTA updates with an MQTT service bus, SQLite persistence, a Qt6/QML local UI, a Rust sensor-fusion framework, and a fully on-device voice subsystem.",
    pills: [{ label: "Active dev", variant: "production" }],
    highlights: [
      "Authored and extended Yocto recipes (.bb/.bbappend) across the meta-eos layer, with BitBake PR bumps, AUTOREV pinning, and IPK packaging for incremental on-device deployment",
      "Built the Linux subsystem stack: systemd unit design, D-Bus interfaces (org.eos.Config1, RoomCommands1, RoomAggregates1), a Mosquitto MQTT broker hardened with TLS and ACLs, and SQLite schema migrations with multi-writer concurrency tuning",
      "Wrote a generic Rust RoomAggregator framework for per-room sensor fusion across thermal, mmWave radar, air-quality, ambient-light, and PIR motion inputs, with D-Bus calibration and SQLite-backed persistence",
      "Owned the build and deploy flow end to end: extended kas orchestration plus an in-house eos-build CLI, cross-compilation, WIC image builds, bmaptool SD flashing, and RAUC A/B verification",
    ],
    tech: ["Yocto", "BitBake", "OpenEmbedded", "kas", "RAUC A/B OTA", "systemd", "D-Bus", "Mosquitto MQTT", "SQLite", "Qt6/QML", "Rust", "Raspberry Pi 5"],
    params: [
      { k: "Platform", v: "Raspberry Pi 5 (16GB)" },
      { k: "OS", v: "Yocto / OpenEmbedded", active: true },
      { k: "Update", v: "A/B RAUC OTA", active: true },
      { k: "Bus", v: "MQTT · D-Bus" },
      { k: "Stack", v: "Rust · Qt6/QML · SQLite" },
    ],
    noRepoNote: "Elipse · no public repo",
    full: true,
  },
  {
    fig: "FIG. 02",
    slug: "industrial-anti-collision-system",
    title: "Industrial Anti-Collision System",
    tagline: "UWB crane anti-collision safety system, deployed at Tata Steel BlueScope",
    description:
      "A real-time industrial Anti-Collision System for crane operations, built during an embedded internship at Radiogeet and deployed at Tata Steel BlueScope. It uses UWB proximity detection and zone-based safety logic to trigger industrial outputs that prevent hazardous crane movements.",
    pills: [{ label: "Deployed", variant: "deployed" }],
    highlights: [
      "Architected ESP32-S3 dual-core firmware: core 1 runs time-critical UWB distance measurement while core 2 handles zone calculation, system logic, and an embedded web UI",
      "Linked nodes over ESP-NOW for low-latency peer-to-peer communication",
      "Drove an 8-channel industrial relay system via MODBUS RTU over RS485 to Masibus DO cards",
      "Extended the platform with STM32 work: AHT10 and ADS1115 interfacing, timers and ADC/DAC, 2/4-wire RS485, LoRa links, and Masibus DI/DO/AI/AO cards",
    ],
    tech: ["ESP32-S3", "FreeRTOS dual-core", "ESP-IDF", "UWB", "ESP-NOW", "MODBUS RTU", "RS485", "STM32", "LoRa"],
    params: [
      { k: "MCU", v: "ESP32-S3 (dual-core)" },
      { k: "Sensing", v: "UWB ranging", active: true },
      { k: "Links", v: "ESP-NOW · RS485" },
      { k: "I/O", v: "Masibus 8-ch relays" },
      { k: "Result", v: "Live @ Tata Steel BlueScope", active: true },
    ],
    repo: "https://github.com/ramuroy/Industrial-Anti-Collision-System",
    stars: 1,
  },
  {
    fig: "FIG. 03",
    slug: "on-device-voice-subsystem",
    title: "On-Device Voice Subsystem",
    tagline: "A fully on-device, Rust voice pipeline: wake word → STT → TTS",
    description:
      "The voice layer of eOS, built end to end in Rust to run entirely on-device. It chains a transfer-learning wake-word detector, multi-mic best-source fusion, Whisper speech-to-text, and Piper text-to-speech, with async-Rust barge-in for natural interruption.",
    pills: [{ label: "Part of eOS", variant: "production" }],
    highlights: [
      "Trained a transfer-learning wake-word detector using Google's speech_embedding backbone with a PyTorch head, exported to ONNX and run on the pure-Rust tract runtime",
      "Implemented multi-mic best-source fusion across ESP32 satellite microphones to pick the cleanest audio",
      "Integrated Whisper for speech-to-text and Piper for text-to-speech, all running locally on the device",
      "Built async-Rust barge-in so the system can be interrupted mid-response",
    ],
    tech: ["Rust", "PyTorch", "ONNX", "tract", "Whisper STT", "Piper TTS", "KWS", "transfer learning", "multi-mic fusion"],
    params: [
      { k: "Runtime", v: "tract (pure Rust)", active: true },
      { k: "Wake word", v: "transfer-learned KWS" },
      { k: "STT", v: "Whisper" },
      { k: "TTS", v: "Piper" },
      { k: "Result", v: "100% on-device", active: true },
    ],
    noRepoNote: "part of eOS",
  },
];

export type GridProject = {
  title: string;
  description: string;
  tech: string[];
  date: string;
  repo?: string;
  stars?: number;
  category: string;
};

export const gridProjects: GridProject[] = [
  { title: "Transformerless Power Supply", description: "A 220V AC → 5V DC transformerless power supply designed in KiCad.", tech: ["KiCad", "PCB"], date: "Aug 2024", repo: "https://github.com/ramuroy/Transformerless-Power-Supply", stars: 3, category: "Hardware/PCB" },
  { title: "LM2596 5V Buck Converter PCB", description: "An efficient switching regulator board built around the LM2596.", tech: ["KiCad", "LM2596", "PCB"], date: "Dec 2024", repo: "https://github.com/ramuroy/LM2596-5V-Buck-Converter-PCB-Design", category: "Hardware/PCB" },
  { title: "5V → 3.3V Voltage Regulator PCB", description: "A 5V → 3.3V regulator board based on the AMS1117-3.3.", tech: ["KiCad", "AMS1117", "PCB"], date: "Oct 2024", repo: "https://github.com/ramuroy/5V-to-3.3V-Voltage-Regulator-PCB-Design", category: "Hardware/PCB" },
  { title: "Servo Tester (NE555)", description: "An astable NE555-based PWM servo tester.", tech: ["NE555", "PWM", "PCB"], date: "Sep 2024", repo: "https://github.com/ramuroy/Servo-Tester-NE555", category: "Hardware/PCB" },
  { title: "AC-to-DC Converter PCB", description: "An AC-to-DC converter with KiCad schematics and gerbers.", tech: ["KiCad", "PCB"], date: "", repo: "https://github.com/ramuroy/AC-to-DC-Converter-PCB", category: "Hardware/PCB" },
  { title: "RTOS Weather Logger", description: "An ESP32 weather logger using DHT11, FreeRTOS, and Blynk.", tech: ["ESP32", "FreeRTOS", "DHT11"], date: "Jan 2025", repo: "https://github.com/ramuroy/RTOS-Weather-Logger", category: "Firmware/RTOS" },
  { title: "FreeRTOS Multitasking LEDs", description: "A C/FreeRTOS demo running concurrent LED tasks.", tech: ["C", "FreeRTOS"], date: "", repo: "https://github.com/ramuroy/FreeRTOS-Multitasking-LEDs", category: "Firmware/RTOS" },
  { title: "Object Detection over SPI", description: "Real-time object detection over SPI between ESP32 and Arduino with an IR sensor.", tech: ["ESP32", "Arduino", "SPI"], date: "", repo: "https://github.com/ramuroy/Real-Time-Object-Detection-using-SPI-Protocol-between-ESP32-and-Arduino", category: "IoT" },
  { title: "Fire Detection System", description: "A smoke-based fire alert system using an MQ-2 sensor.", tech: ["MQ-2", "Arduino"], date: "Jun 2024", repo: "https://github.com/ramuroy/Fire-Detection-System", category: "IoT" },
  { title: "Water Level Detector", description: "A water level detector with overflow alerting.", tech: ["Arduino", "Sensors"], date: "May 2024", repo: "https://github.com/ramuroy/Water-Level-Detector", category: "IoT" },
  { title: "Morse Caster", description: "A text-to-Morse converter with LCD output.", tech: ["Arduino", "LCD"], date: "Jan 2024", repo: "https://github.com/ramuroy/Morse-Caster", category: "IoT" },
  { title: "Digital Dice", description: "An Arduino digital dice with a 7-segment display.", tech: ["Arduino", "7-seg"], date: "", repo: "https://github.com/ramuroy/Digital-Dice", category: "IoT" },
  { title: "Click Counter Up/Down", description: "An Arduino up/down click counter.", tech: ["Arduino"], date: "", repo: "https://github.com/ramuroy/Click-Counter-Up-Down", category: "IoT" },
  { title: "Rain Detector", description: "An Arduino-based rain detector.", tech: ["Arduino", "Sensors"], date: "", repo: "https://github.com/ramuroy/Rain-Detector", category: "IoT" },
  { title: "Solar Track", description: "A sun-tracking system that follows the sun across the sky.", tech: ["Arduino", "Sensors"], date: "Mar 2025", category: "IoT" },
];

export type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  active?: boolean;
  deployed?: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    company: "Elipse",
    role: "Embedded Linux OS Developer",
    period: "May 2026 – Present",
    location: "Hyderabad, India",
    active: true,
    summary:
      "Building eOS at Elipse — a custom Yocto-based Linux distribution for the Raspberry Pi 5, spanning the OTA system, service bus, sensor-fusion framework, and an on-device voice assistant.",
    highlights: [
      "Architected a Yocto/OpenEmbedded distro with A/B RAUC OTA, an MQTT service bus, SQLite persistence, and a Qt6/QML UI — authoring recipes across the meta-eos layer with BitBake PR bumps, AUTOREV pinning, and IPK packaging.",
      "Built the Linux subsystem stack: systemd units, custom D-Bus interfaces, TLS/ACL-hardened Mosquitto MQTT, and SQLite migrations tuned for multi-writer concurrency.",
      "Wrote a generic Rust RoomAggregator framework fusing thermal, mmWave radar, air-quality, ambient-light, and PIR sensors per room, with D-Bus calibration and SQLite persistence.",
      "Built an on-device voice subsystem in Rust: transfer-learned wake-word (PyTorch → ONNX → tract), multi-mic best-source fusion across ESP32 satellites, Whisper STT, Piper TTS, and async barge-in.",
      "Authored ESP32 firmware (ESP-IDF v5.2): BLE provisioning, on-chip EC P-256 keygen, X.509 CSR exchange with the hub CA, full NVS lifecycle across OTA, and SNTP-synced audio streaming.",
      "Owned the full deploy flow via an in-house eos-build CLI: cross-compilation, WIC image builds, bmaptool SD flashing, and RAUC A/B verification.",
    ],
    tags: ["Yocto", "BitBake", "RAUC OTA", "Rust", "D-Bus", "MQTT", "SQLite", "Qt6/QML", "ESP-IDF", "ONNX/tract", "Whisper", "Piper"],
  },
  {
    company: "Radiogeet",
    role: "Embedded Systems Engineer Intern",
    period: "Sep 2025 – Mar 2026",
    location: "India",
    deployed: true,
    summary:
      "Developed an industrial Anti-Collision System for crane operations — deployed at Tata Steel BlueScope — using real-time UWB proximity detection and zone-based safety logic to prevent hazardous crane movements.",
    highlights: [
      "Shipped the Anti-Collision System to production at Tata Steel BlueScope: real-time UWB proximity sensing with zone-based safety logic driving industrial outputs to halt unsafe crane motion.",
      "Wrote ESP32-S3 dual-core firmware — core 1 for time-critical UWB distance measurement, core 2 for zone calculation, system logic, and an embedded web UI.",
      "Linked nodes over ESP-NOW for low-latency peer-to-peer comms and drove an 8-channel industrial relay system via MODBUS RTU over RS485 to Masibus DO cards.",
      "Interfaced STM32 with AHT10 and ADS1115 — timers, internal ADC/DAC, 2/4-wire RS485, LoRa long-range links, and Masibus DI/DO/AI/AO cards (STM32CubeIDE).",
    ],
    tags: ["ESP32-S3", "FreeRTOS dual-core", "UWB", "ESP-NOW", "MODBUS RTU / RS485", "STM32", "LoRa", "Industrial relays"],
  },
  {
    company: "Ampnics",
    role: "R&D Engineer",
    period: "Mar 2025 – Sep 2025",
    location: "Remote",
    summary:
      "Worked on open-source hardware — designing and reviewing PCB schematics and layouts, and supporting rapid prototyping.",
    highlights: [
      "Designed and reviewed PCB schematics and layouts for open-source hardware.",
      "Supported rapid prototyping through circuit testing, debugging, and iterative design.",
    ],
    tags: ["KiCad", "PCB Design", "Schematic Capture", "Prototyping", "Open-Source Hardware"],
  },
];

export const skillGroups = [
  { name: "Embedded Linux & OS", blurb: "Building custom Linux distributions from the ground up with Yocto.", items: ["Yocto Project", "BitBake", "OpenEmbedded", "kas", "meta-layers", ".bb/.bbappend recipes", "IPK packaging", "RAUC A/B OTA", "Custom distro build", "Cross-compilation", "BSP", "Device tree"], core: ["Yocto Project", "BitBake", "RAUC A/B OTA"] },
  { name: "Linux Internals", blurb: "The userspace plumbing that ties a running system together.", items: ["systemd", "D-Bus", "journald", "SQLite", "Mosquitto MQTT (TLS, ACL)"], core: ["systemd", "D-Bus"] },
  { name: "Firmware & RTOS", blurb: "Bare-metal and RTOS firmware on ESP32 and STM32 silicon.", items: ["ESP-IDF v5.x", "FreeRTOS dual-core", "STM32 HAL/LL", "Bare-metal", "Interrupt/polling", "BLE (NimBLE)", "NVS lifecycle", "OTA"], core: ["ESP-IDF v5.x", "STM32 HAL/LL", "FreeRTOS dual-core"] },
  { name: "On-Device ML & Voice", blurb: "Wake-word, speech, and sensor inference running entirely on the edge.", items: ["PyTorch", "ONNX", "tract (Rust)", "Transfer learning", "KWS", "VAD", "Mel-spectrogram", "Whisper STT", "Piper TTS", "openWakeWord", "Multi-mic fusion", "Barge-in"], core: ["PyTorch", "ONNX", "tract (Rust)"] },
  { name: "Languages", blurb: "Systems and application languages I write production code in.", items: ["C", "Embedded C/C++", "Rust (async/Tokio)", "Python", "MATLAB"], core: ["Embedded C/C++", "Rust (async/Tokio)"] },
  { name: "Sensors & Peripherals", blurb: "Radar, air-quality, and industrial I/O I interface and calibrate.", items: ["HLK-C4001 mmWave radar", "PIR motion", "PM/VOC/CO₂ air-quality", "AHT10", "ADS1115 ADC", "UWB modules", "Masibus DI/DO/AI/AO", "Industrial relays"], core: [] },
  { name: "PCB & Hardware", blurb: "From schematic capture to flashed boards and bring-up.", items: ["KiCad", "Schematic capture", "Layout", "Power-supply design", "Raspberry Pi 5", "ESP32 / ESP32-S3", "STM32"], core: ["KiCad"] },
  { name: "UI & Tooling", blurb: "The build flow, IDEs, and front-end that ship the work.", items: ["Qt6/QML", "Git / GitHub", "STM32CubeIDE", "ESP-IDF", "kas", "BitBake"], core: [] },
];

export const protocols = ["UART", "SPI", "I²C", "CAN", "RS485 (MODBUS RTU)", "MQTT", "D-Bus", "BLE", "Wi-Fi", "ESP-NOW", "LoRa", "UWB"];

export const certifications = [
  { title: "Embedded Sensing, Actuation and Interfacing Systems", issuer: "NPTEL", year: "2025", score: 85, url: "https://drive.google.com/file/d/1-ZCbzNM-YpNXrk_fFjxa3jm20RphqDW4/view?usp=sharing" },
  { title: "Electronic Systems Design — Circuits & PCB Design with CAD", issuer: "NPTEL", year: "2025", score: 88, url: "https://drive.google.com/file/d/1B1nftxjbRXdE542vRb415PTpZRpFnmW_/view?usp=drive_link" },
];

export const education = [
  { degree: "B.Tech, Electronics & Communication Engineering", school: "RGUKT Srikakulam, Andhra Pradesh", period: "2022 – 2026", grade: "CGPA 8.3 / 10" },
  { degree: "Pre-University Course", school: "RGUKT Srikakulam, Andhra Pradesh", period: "2020 – 2022", grade: "GPA 9.63 / 10" },
];

export const spokenLanguages = [
  { name: "English", level: "Proficient" },
  { name: "Telugu", level: "Native" },
  { name: "Hindi", level: "Native" },
];

/* Section signatures (eyebrow / numeral / heading) */
export const sections = {
  about: { num: "01", eyebrow: "// 01 — overview", title: "Bare-metal to custom Linux to on-device ML" },
  projects: { num: "02", eyebrow: "// 02 — selected work", title: "Shipped firmware, distros & deployed systems" },
  experience: { num: "03", eyebrow: "// 03 — revision history", title: "Where I've done the work" },
  skills: { num: "04", eyebrow: "// 04 — specifications", title: "The full embedded stack" },
  certifications: { num: "05", eyebrow: "// 05 — compliance & test", title: "Certifications" },
  contact: { num: "06", eyebrow: "// 06 — contact & ordering info", title: "Let's build something close to the metal" },
};
