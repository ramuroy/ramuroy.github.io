/* =====================================================================
   SITE CONTENT — single source of truth.
   Edit anything here and the page updates. No HTML knowledge needed.
   ===================================================================== */

export const profile = {
  name: "Ramu Roy",
  role: "Embedded Systems Engineer",
  tagline:
    "I build the whole stack — hardware → firmware → custom Linux → on-device ML & voice.",
  location: "Hyderabad, India",
  email: "royramu694429@gmail.com",
  phone: "+91 94936 52315",
  github: "https://github.com/ramuroy",
  githubHandle: "github.com/ramuroy",
  githubRepoCount: 19,
  linkedin: "https://www.linkedin.com/in/ramu-roy-b780382b7/",
  linkedinLabel: "Ramu Roy",
  resumeUrl: "/Ramu_Roy_Resume.pdf",
  available: true,
  availableText: "available for embedded roles",
};

export const seo = {
  // Title <= 60 chars and description <= 155 so search results show them
  // untruncated (audit T1.7).
  title: "Ramu Roy — Embedded Systems Engineer · Yocto, ESP32, Rust",
  description:
    "Ramu Roy builds the whole embedded stack — PCB design, ESP32/STM32 firmware, custom Yocto Linux, on-device ML in Rust — deployed at Tata Steel BlueScope.",
  ogDescription:
    "Embedded systems engineer building the whole stack — PCB & hardware design, bare-metal firmware, custom Yocto Linux for Raspberry Pi 5, ESP32/STM32, and on-device ML & voice in Rust.",
  keywords: [
    "Ramu Roy", "embedded systems engineer", "embedded Linux", "Yocto Project",
    "BitBake", "firmware engineer", "ESP-IDF", "ESP32", "ESP32-S3", "STM32",
    "Raspberry Pi 5", "RAUC OTA", "Rust embedded", "on-device ML",
    "wake-word detection", "Whisper STT", "Piper TTS", "ONNX tract", "MQTT",
    "D-Bus", "systemd", "UWB ranging", "MODBUS RTU", "RS485", "ESP-NOW",
    "device tree", "BSP", "Qt6 QML", "KiCad PCB design", "sensor fusion",
    "FreeRTOS", "PCB layout", "PCB autorouter", "schematic capture",
    "impedance-controlled stackup", "differential pair routing", "eFuse",
    "hardware design engineer", "LAN9354", "PCA9685", "48V lighting control",
    "Hyderabad", "Telangana", "Andhra Pradesh",
  ],
};

export const nav = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

/* Shared terminal prompt (footer colophon, boot log line 0, T3.5 terminal). */
export const termPrompt = "rr@embedded:~$";

/* Boot / POST intro lines (first visit only). dmesg-style bring-up (T2.6):
   every line is grounded in the published stack (ESP32-S3 = dual-core Xtensa
   LX7; RAUC A/B slots; KWS on tract; anti-collision live at Tata Steel
   BlueScope). Lines land in `group` beats within the 1.3s dismiss budget. */
export type BootLine = { ts: string; text: string; ok?: boolean; group: number };
export const bootLines: BootLine[] = [
  { ts: "", text: `${termPrompt} boot --portfolio`, group: 0 },
  { ts: "0.012", text: "cpu: dual-core xtensa lx7 online", ok: true, group: 0 },
  { ts: "0.184", text: "mounting profile rev.2026", ok: true, group: 1 },
  { ts: "0.310", text: "rauc: booted slot A, marked good", ok: true, group: 1 },
  { ts: "0.492", text: "eos-voice: kws model loaded (tract)", ok: true, group: 1 },
  { ts: "0.771", text: "uwb: anti-collision live @ tata steel bluescope", ok: true, group: 2 },
  { ts: "1.020", text: "signal acquired", group: 2 },
];

export const hero = {
  eyebrow: "embedded systems engineer · hyderabad, india",
  name: profile.name,
  // segments let us style arrows + emphasised domain words individually
  lead: [
    { t: "I build the whole stack — " },
    { t: "hardware", em: true },
    { t: " ", arrow: true, label: "→" },
    { t: "firmware", em: true },
    { t: " ", arrow: true, label: "→" },
    { t: "custom Linux", em: true },
    { t: " ", arrow: true, label: "→" },
    { t: "on-device ML", em: true },
    { t: "." },
  ],
  ctaPrimary: { label: "VIEW PROJECTS", href: "#projects", glyph: "▸" },
  ctaGhost: { label: "DOWNLOAD CV", href: profile.resumeUrl, glyph: "↓" },
  // IC-topmark lines under the name (T2.9) — chip silkscreen language.
  // Decorative (aria-hidden): every fact here also lives in the spec card.
  topmark: ["RAMU-ROY · REV.2026", "LOT: HYD-01 · DC: 2026"],
  keySpecs: [
    { k: "Location", v: "Hyderabad, IN" },
    { k: "Degree", v: "B.Tech ECE (CGPA 8.3)" },
    { k: "Core", v: "Yocto · ESP-IDF · STM32 · Rust", active: true },
    { k: "Shipped", v: "Anti-Collision @ Tata Steel BlueScope", active: true },
    { k: "Status", v: profile.available ? "AVAILABLE" : "NOT CURRENTLY AVAILABLE", status: true, available: profile.available },
  ],
};

export const about = {
  subhead: "A full-stack embedded engineer — silicon to UI.",
  // One paragraph, deliberately: the projects above and the experience below
  // carry the specifics; About carries only what no other section can (T1.2).
  paragraphs: [
    "I'm an Electronics & Communication Engineering graduate (RGUKT Srikakulam, 2026) who works across the entire embedded stack: control boards drawn in KiCad and sent to fabrication, bare-metal and RTOS firmware on ESP32 and STM32, a custom Yocto Linux distribution built from the recipe up, and ML and voice models running directly on-device. The interesting problems usually live at the seams between those layers — that's where I spend my time, and it's why I like owning a system end to end, from the device tree to the deploy flow. Right now that means contributing to eOS at Elipse; before that, an anti-collision safety system I built firmware for as an intern went into production at Tata Steel BlueScope — the projects above tell both stories in full.",
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
  /** Derived from array order — see `flagship` below. Never authored by hand. */
  fig: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  pills: Pill[];
  highlights: string[];
  tech: string[];
  params: { k: string; v: string; active?: boolean }[];
  /** Measured outcomes (T1.1). Rendered as a bordered datasheet table, separate
      from `params`: params describe *what a thing is*, metrics record *what was
      measured*. Every row must be a number with evidence behind it — invoices,
      instruments, or a tool's own output. `note` carries the qualifier that
      keeps the number honest (see docs/design-specs/h1-hardware-and-pcb.md §4). */
  metrics?: { k: string; v: string; note?: string }[];
  /** Board render or photograph (T2.2). `caption` states what the image *is*,
      so a CAD render is never mistaken for a photograph of a built board.
      Dimensions are required — the intrinsic size reserves layout space and
      keeps the card from reflowing as the image decodes. */
  image?: { src: string; alt: string; caption: string; w: number; h: number };
  /** Partition/slot exhibit (T2.5). Weights are visual proportions only —
      captions say "scheme"/"layout" deliberately; no sizes are claimed (D-016). */
  partitions?: {
    caption: string;
    segments: { name: string; weight: number; note?: string; active?: boolean }[];
  };
  repo?: string;
  stars?: number;
  noRepoNote?: string;
  full?: boolean;
};

/* FIG numbers are positional labels, so they are derived from the order of this
   array rather than typed into it: inserting or reordering a card must never
   mean hand-renumbering the ones below it (the same single-source rule as
   D-009). Everything else about a card is authored here. */
const flagshipOrder: Omit<Flagship, "fig">[] = [
  {
    slug: "eos",
    title: "eOS",
    tagline: "A custom Yocto Linux distribution for the Raspberry Pi 5",
    description:
      "eOS is a from-scratch embedded Linux platform built on Yocto/OpenEmbedded for the Raspberry Pi 5 (16GB). It pairs A/B RAUC OTA updates with an MQTT service bus, SQLite persistence, a Qt6/QML local UI, a Rust sensor-fusion framework, and a fully on-device voice subsystem.",
    pills: [{ label: "Active dev", variant: "production" }],
    highlights: [
      "Authored and extended Yocto recipes (.bb/.bbappend) across the meta-eos layer, with BitBake PR bumps, AUTOREV pinning, and IPK packaging for incremental on-device deployment",
      "Work across the Linux subsystem stack: systemd unit design, D-Bus interfaces (org.eos.Config1, org.eos.RoomCommands1, org.eos.RoomAggregates1), a Mosquitto MQTT broker hardened with TLS and ACLs, and SQLite schema migrations with multi-writer concurrency tuning",
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
    partitions: {
      caption: "rauc a/b slot layout (wic image)",
      segments: [
        { name: "boot", weight: 1.2 },
        { name: "rootfs A", weight: 3, note: "booted · good", active: true },
        { name: "rootfs B", weight: 3 },
        { name: "appfs", weight: 2 },
        { name: "data", weight: 2 },
      ],
    },
    noRepoNote: "Elipse · no public repo",
    full: true,
  },
  {
    slug: "eos-room-controller",
    title: "eOS Room Controller",
    tagline: "The 24 V board eOS runs a room from — designed, fabbed, then re-spun",
    description:
      "The per-room node of the eOS fleet: dimmable 24 V DC channels for lights and a fan, addressable RGB, wired Ethernet back to the Pi hub over MQTT-TLS, and an I²S microphone bridge. Designed and laid out in KiCad 9. v1 was fabbed and served three rooms; v2 has replaced it in the field, with load and soak qualification still open.",
    pills: [
      { label: "v2 in the field", variant: "deployed" },
      { label: "qualification open", variant: "wip" },
    ],
    image: {
      src: "/eos-room-controller-v2.webp",
      alt: "KiCad 3D render of the eOS Room Controller v2 board: screw terminals along the top edge, four dual MOSFET packages, a PCA9685 in the centre, electrolytic bulk capacitors, and two long header rows for the socketed ESP32-S3-ETH module.",
      caption: "kicad 3d render — room controller v2, 125 × 100 mm",
      w: 1200,
      h: 836,
    },
    highlights: [
      "Drew the schematic and laid the board out in KiCad 9; v1 was fabbed and put into service (PCB1–PCB3), and v2 re-spun the whole design at 125 × 100 mm — 57% less board area.",
      "Rebuilt the power path around what actually failed: v1's MP1584 burned twice and its AMS1117 drifted to ~4.4 V and killed a W5500 rated 3.63 V absolute maximum. v2 answers with five protection stages — 6.3 A SMD fuse → TPS26631 60 V eFuse (reverse polarity, 6 A OCP, 33 V OVP, 18 V UVLO, inrush control) → SMCJ24A TVS → tap fuse → TPS25947 eFuse guarding the whole 5 V rail.",
      "Ran the PCA9685 at 5 V so it drives the FET gates directly, which deleted all four UCC27524 gate drivers; eight TO-220s and their axial diodes became four dual SMD packages. 81 hand-soldered through-hole parts became roughly 34 placement classes on a stencil-and-reflow board.",
      "Merged the MCU and Ethernet into one socketed Waveshare ESP32-S3-ETH module — four plug-in modules down to one, five SPI GPIOs freed, and a dead PHY becomes a 30-second swap in a ceiling instead of board surgery.",
      "Recorded 40 dated design decisions (D1–D40) with rationale and closed every one, including two standing rules the fleet still works to: cut only true redundancy, never performance (D36), and read a part's datasheet before designing it in (D40) — written after a missed common-ground destroyed a radar and two ESP32s.",
      "Narrowed a total 24 V rail collapse on the bench to a single suspect: the input eFuse's dV/dT pin reads 0.5 V while its soft-start capacitor pad reads 0 V — two points on one net disagreeing, which would leave inrush retrying forever and the rail never establishing. The continuity check and the repair are still outstanding.",
    ],
    tech: ["KiCad 9", "ESP32-S3", "PCA9685", "TPS26631 eFuse", "W5500", "24 V DC", "MOSFET PWM", "I²S", "SMD / PCBA"],
    params: [
      { k: "Bus", v: "24 V DC — no mains" },
      { k: "Outputs", v: "8-ch 24 V PWM · 2× RGB", active: true },
      { k: "Uplink", v: "Ethernet → MQTT-TLS" },
      { k: "Audio", v: "XVF3800 mic bridge (I²S)" },
      { k: "Build", v: "KiCad 9 → full SMD PCBA" },
      { k: "State", v: "v2 live in 3 rooms · v1 retired", active: true },
    ],
    metrics: [
      { k: "Board area", v: "−57%", note: "173×168 → 125×100 mm" },
      { k: "Bare PCB cost", v: "₹1,260 / board", note: "down from ₹2,120 — invoiced, ex-GST" },
      { k: "Plug-in modules", v: "4 → 1", note: "one socketed ESP32-S3-ETH" },
      { k: "Protection stages", v: "0 → 5", note: "fuse · eFuse · TVS · fuse · eFuse" },
      { k: "Dimmer channels", v: "8, on zero MCU pins", note: "PCA9685 — 16-ch part, 8 wired" },
      { k: "Decisions closed", v: "40 of 40", note: "D1–D40, no open verdicts" },
    ],
    noRepoNote: "Elipse · no public repo",
    full: true,
  },
  {
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
    partitions: {
      caption: "esp-idf ota partition scheme (two app slots)",
      segments: [
        { name: "nvs", weight: 1 },
        { name: "otadata", weight: 1 },
        { name: "phy", weight: 0.8 },
        { name: "ota_0", weight: 3.4, note: "running", active: true },
        { name: "ota_1", weight: 3.4 },
      ],
    },
    repo: "https://github.com/ramuroy/Industrial-Anti-Collision-System",
    stars: 1,
  },
  {
    slug: "eos-zone-controller",
    title: "eOS Zone Controller",
    tagline: "48 V, 16 dimmed channels at 24 A — four layers, native Ethernet",
    description:
      "A 48 V lighting and fan controller for the eOS fleet: sixteen independently dimmed channels driven from one I²C PWM generator through quad drivers into eight dual MOSFETs, with native Ethernet through an on-board three-port switch and two addressable-RGBW paths. Four copper layers on a published impedance-controlled stackup. Currently in routing — fabrication is held until the DRC, the DC review and the fabrication package are complete.",
    pills: [{ label: "In design — fab on hold", variant: "wip" }],
    highlights: [
      "Rated the board as a hierarchy rather than a single number: 1.5 A per channel, 6 A per four-channel group and 24 A across all sixteen — 1,152 W — with the channel derating chosen so that four fully loaded channels come to exactly the group fuse rating. The 24 A figure stays a design target until the assembled board passes its thermal test, and the record says so.",
      "Made the ESP32 the RMII clock master instead of fitting an oscillator: GPIO17's EMAC_CLK_OUT_180 through 33 Ω into the Ethernet switch's reference-clock input, strapped to accept it. That removed the oscillator and four support parts, freed GPIO0 as a clean BOOT strap, and closed a buffered-clock timing question by deleting the buffer that had raised it.",
      "Moved the board to four copper layers on a published impedance stackup — 1.55 mm, 35 µm on every layer, inner planes split into separate logic and power grounds — with 100 Ω differential pairs at 0.12 / 0.14 mm on the outer layers over layer 2.",
      "Drove all sixteen outputs from one I²C PWM generator through four quad drivers into eight dual MOSFETs at 2,929.6875 Hz, and held the generator's output-enable disabled by a hardware pull-up so no firmware path can bring the board up with channels already live.",
      "Closed the first board's routing at zero unconnected and zero shorts after roughly twelve strategies, the decisive one being that connections reported as closed were not touching: endpoints were being reached on the wrong copper layer, so a front pad was 'met' from the back.",
      "Regenerated the schematic to 180 nets and 912 nodes with ERC clean and zero waivers, and kept fabrication on hold — the DC figures so far are conditional load-case screens, not a qualified current rating, thermal result or Ethernet compliance claim.",
    ],
    tech: ["KiCad", "48 V DC", "ESP32", "LAN9354", "RMII", "PCA9685", "4-layer stackup", "100 Ω differential", "12-bit PWM dimming", "Addressable RGBW"],
    params: [
      { k: "Bus", v: "48 V DC" },
      { k: "Channels", v: "16 × 12-bit PWM dimming", active: true },
      { k: "Rating", v: "1.5 A/ch · 6 A/group · 24 A" },
      { k: "Uplink", v: "LAN9354 · native RMII" },
      { k: "Stackup", v: "4-layer, impedance-controlled", active: true },
      { k: "Qualified", v: "not yet — DC screens only" },
    ],
    metrics: [
      { k: "Board rating", v: "24 A / 1,152 W", note: "design target until the thermal test passes" },
      { k: "Channel budget", v: "1.5 A × 16", note: "6 A per four-channel group" },
      { k: "Schematic", v: "180 nets · 912 nodes", note: "ERC clean, zero waivers" },
      { k: "Placement", v: "286 placed · 0 staged", note: "1,606 segments, 433 vias" },
      { k: "DC drop screen", v: "46.544 mV", note: "against a 50 mV budget" },
      { k: "v1 routing closed", v: "0 unconnected · 0 shorts", note: "after ~12 strategies" },
    ],
    noRepoNote: "Elipse · no public repo",
  },
  {
    slug: "eos-switchboard",
    title: "eOS Switchboard",
    tagline: "A SELV wall keypad that switches nothing — capacitive slider, tactile keys, CAN",
    description:
      "The wall-mounted control surface for eOS. It switches nothing itself: every load it appears to control is driven by the room controller back at the distribution board, so this panel only senses intent and renders state. SELV throughout, with no mains copper on any layer, on a 145 × 70 mm board that fits a standard 8M concealed box shared with an AC socket.",
    pills: [
      { label: "Fabricated", variant: "deployed" },
      { label: "Bring-up", variant: "wip" },
    ],
    highlights: [
      "Reversed my own earlier decision with measurements rather than taste: v0.2 gave every key its own 26 mm capacitive strip, which meant one millimetre of thumb moved the level 3.8%. v0.3 replaced them with a single full-height 69 mm slider — 2.7× the travel at 1.4% per millimetre, and 24 indicators instead of 7. The slider becoming modal is the price, and it was accepted in writing rather than discovered later.",
      "Disqualified the ESP32-S3's own touch peripheral on the vendor's own words rather than on channel count: Espressif state it is not recommended for mass-production products and has not passed the Conducted Susceptibility test — which, on a wall switch sharing a steel box with mains, ends the argument. The slider runs on an external CY8CMBR3116 used deliberately as a 16-channel front end, with centroids computed on the S3.",
      "Settled the segment count by arithmetic, not intuition: position comes from a three-point centroid, so a finger spanning three or more segments falls outside that window. 24 segments measured 1.62 mm of error against 0.19 mm for 14 — and 14 is exactly one chip, being 16 channels less the two the part fixes as guard and shield.",
      "Put two tactile switches under every key at ±9 mm instead of one in the middle, because a rigid printed key has to feel the same at its corners as at its centre. At 160 gf per switch that is 160 gf off-centre and 320 gf pressed dead-on, which lands inside the force band derived for the metal snap domes it replaced.",
      "Gave the logic and the LEDs independent bucks rather than one buck and an LDO: slider sensitivity tracks logic-rail noise, so 30 addressable pixels stepping current must not land on that rail. The 3.3 V buck's input is Schottky-ORed between the 24 V tap and USB VBUS, so the board comes up and flashes on USB alone with the 5 V LED rail dead.",
      "Wrote down what could not be known. The tactile switch's snap ratio is uncomputable because Alps publishes operating force, travel and life for the part but not release force; an earlier revision of the spec quoted 85.7%, that figure belonged to a different, retired switch, and the spec now records the withdrawal and forbids citing a number at all.",
    ],
    tech: ["KiCad 9", "ESP32-S3", "CY8CMBR3116", "WS2812B", "CAN 2.0A", "SELV", "Alps SKQG", "SHT30", "BH1750"],
    params: [
      { k: "Class", v: "SELV — no mains copper", active: true },
      { k: "Board", v: "145 × 70 mm, 2-layer" },
      { k: "MCU", v: "ESP32-S3-WROOM-1-N8" },
      { k: "Touch", v: "CY8CMBR3116 — 14 segments" },
      { k: "Indicators", v: "30 × WS2812B-2020" },
      { k: "State", v: "fabbed · board #1 brought up", active: true },
    ],
    metrics: [
      { k: "Slider precision", v: "1.4% per mm", note: "69 mm travel — 2.7× the v0.2 strips" },
      { k: "Segment error", v: "0.19 mm", note: "14 segments; 24 measured 1.62 mm" },
      { k: "Key switches", v: "12 under 6 keys", note: "two per key at ±9 mm, 160 gf each" },
      { k: "LED budget", v: "1.02 A full white", note: "against a ~1.2 A thermal ceiling" },
      { k: "Bare PCB order", v: "₹1,901 for 5", note: "Lion Circuits, placed 2026-08-01" },
      { k: "Board #1 faults", v: "3 — all solder joints", note: "no component or design fault found" },
    ],
    noRepoNote: "Elipse · no public repo",
  },
  {
    slug: "pcbrouter",
    title: "pcbrouter",
    tagline: "A KiCad autorouter in Rust — exact integer geometry, judged by KiCad's own DRC",
    description:
      "A KiCad-native autorouter and routing verifier written in Rust, grown out of the toolkit that finished the Zone Controller. It reads and writes real KiCad boards, proves its model against pcbnew before it routes anything, checks its own output with KiCad's DRC, and is benchmarked on a corpus of published hardware.",
    pills: [
      { label: "Active dev", variant: "production" },
      { label: "Apache-2.0", variant: "oss" },
    ],
    highlights: [
      "Built the whole geometry stack on exact integers: board coordinates parse from decimal millimetres straight to integer nanometres, and clearance predicates run on i128 and 256-bit rationals — so no routing decision anywhere rests on a floating-point comparison.",
      "Made KiCad the arbiter rather than the router's own opinion. The loader's dump matches pcbnew field for field across 1,212 footprints, 4,514 pads, 15,107 segments, 2,350 vias and 108 zones; pad outlines land within 3.1 µm of KiCad's own polygons; and the obstacle index is cross-checked against an independent shapely model on every segment of every board.",
      "Ported the Python reference router to Rust: the two-layer Olimex ESP32-PoE routes in 71 seconds against 14 minutes 15 seconds, in 58 MB against 605 MB — and where the reference leaves 45 dangling tracks and 6 dangling vias behind, the Rust output draws no new DRC violation at all. Completion caught up once negotiated congestion landed.",
      "Added PathFinder-style negotiated congestion over a tile graph with exact capacities, with the resulting corridors steering the exact detailed router. It took the same board from 111–118 unconnected down to 96, and produced byte-identical boards across two runs.",
      "Found two classes of copper the model had been blind to — graphic shapes on copper layers such as net-tie bars, and text on copper layers — then re-measured every earlier result against the corrected model instead of keeping the more flattering numbers.",
      "Benchmarks on a commit-pinned corpus of published designs — HackRF One, Bus Pirate 5, and Olimex ESP32-PoE in both two- and four-layer form — each board loaded, stripped of every track and via, re-routed from nothing and scored the same way, with its upstream licence recorded.",
    ],
    tech: ["Rust", "KiCad 9/10", "exact integer geometry", "Dijkstra", "PathFinder negotiation", "rip-up & retry", "Python", "shapely"],
    params: [
      { k: "Language", v: "Rust — no floating point", active: true },
      { k: "Geometry", v: "exact integers (i128)" },
      { k: "Search", v: "Dijkstra · rip-up · PathFinder" },
      { k: "Arbiter", v: "KiCad 10 DRC", active: true },
      { k: "Corpus", v: "HackRF · Bus Pirate · Olimex ×2" },
      { k: "Licence", v: "Apache-2.0" },
    ],
    metrics: [
      { k: "Loader fidelity", v: "field-identical to pcbnew", note: "1,212 footprints · 4,514 pads" },
      { k: "Pad geometry", v: "within 3.1 µm", note: "vs KiCad's own polygons, 4,337 pads" },
      { k: "Olimex, 2-layer", v: "71 s vs 14 min 15 s", note: "against the Python reference" },
      { k: "Peak memory", v: "58 MB vs 605 MB", note: "same board, same task" },
      { k: "New DRC violations", v: "0", note: "on every routed board KiCad judged" },
      { k: "Reruns", v: "byte-identical", note: "deterministic at 0.25 mm tiles" },
    ],
    noRepoNote: "personal project · repo not yet public",
  },
  {
    slug: "ember",
    title: "Ember",
    tagline: "A personal OS whose init and shell I wrote from scratch in Rust",
    description:
      "An existing Linux kernel and a reproducible Yocto userland, with systemd removed entirely and replaced by two programs written from scratch: spark, a Rust init and service manager running as PID 1, and hearth, a shell that ships as root's login shell. It boots a real laptop from UEFI, updates over signed A/B images, and rolls itself back unaided.",
    pills: [
      { label: "Boots on real hardware", variant: "deployed" },
      { label: "Active dev", variant: "production" },
    ],
    highlights: [
      "Wrote spark, a single-threaded Rust PID 1 that is a complete service manager in one epoll loop: a declared TOML service fleet with a dependency graph, readiness-driven parallel startup, window-bounded doubling restart backoff with permanent parking, boot targets with a bootloader rescue lever, and every service contained in its own cgroup v2.",
      "Designed it so PID 1 cannot die — a PID 1 that exits panics the kernel — with no unwrap on the live path, `panic = \"abort\"`, and a panic hook that logs to `/dev/kmsg` and hangs alive rather than terminating. It also refuses to act as init unless it really is PID 1.",
      "Put every syscall behind a single trait, so the reap, mount and supervision logic lives in a library that stays `#![forbid(unsafe_code)]` and is unit-tested against a fake kernel: spark never has to be PID 1 to be tested. The FFI is a thin binary holding two justified, SAFETY-argued unsafe blocks.",
      "Drains SIGCHLD correctly rather than naively — one signal can mean several dead children because the signal coalesces, so it calls `waitpid(-1, WNOHANG)` until the kernel says stop, with a pid-to-service map that makes every death attributable.",
      "Wrote hearth, the shell: lexer, parser, expansion, evaluator, operators, job control and a line-editor layer, shipped as root's login shell on the running system and held by 122 unit tests, 34 CLI tests and 40 pty assertions.",
      "Built the distro as a Yocto layer with spark registered as a first-class init manager. The x86-64 image carries signed A/B RAUC slots, read-only roots, autonomous rollback and persistent home and SSH identity, and boots an HP Victus from a USB stick through UEFI and GRUB-EFI.",
    ],
    tech: ["Rust", "Yocto / OpenEmbedded", "PID 1 / init", "cgroup v2", "epoll", "RAUC A/B", "GRUB-EFI", "musl", "Smithay / Wayland", "QEMU"],
    params: [
      { k: "Init", v: "spark v0.8 — Rust PID 1", active: true },
      { k: "Shell", v: "hearth v0.2.0 — login shell", active: true },
      { k: "systemd", v: "removed entirely" },
      { k: "Base", v: "Linux kernel + Yocto userland" },
      { k: "Targets", v: "x86-64 and aarch64" },
      { k: "Metal", v: "HP Victus — UEFI → GRUB → wic" },
    ],
    metrics: [
      { k: "Workspace tests", v: "341", note: "spark 166 · hearth 156 · probe 19" },
      { k: "Authored unsafe", v: "5 blocks", note: "each SAFETY-argued; the libraries forbid it" },
      { k: "Kernel → login shell", v: "8.32 s", note: "0.06 s of it inside spark, on the Victus" },
      { k: "Hardware smoke", v: "59 checks pass", note: "on the Victus, signed bundle v0.15" },
      { k: "spark binary", v: "1,065 KB", note: "static musl, unstripped" },
      { k: "Update bundle", v: "147.0 MiB", note: "verity-signed RAUC, A/B slots" },
    ],
    noRepoNote: "personal project · repo not yet public",
  },
  {
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

export const flagship: Flagship[] = flagshipOrder.map((project, i) => ({
  ...project,
  fig: `FIG. ${String(i + 1).padStart(2, "0")}`,
}));

/** Resolve a card's derived FIG label by slug, so cross-references elsewhere on
    the page (the experience entries, the terminal's i2c note) survive a reorder. Throws rather than
    returning a placeholder: a broken cross-reference should fail the build,
    not ship as "Full detail: above". */
export const figOf = (slug: string): string => {
  const card = flagship.find((project) => project.slug === slug);
  if (!card) throw new Error(`figOf: no flagship card has the slug "${slug}"`);
  return card.fig;
};

export type GridProject = {
  title: string;
  description: string;
  tech: string[];
  date: string;
  repo?: string;
  stars?: number;
  category: string;
};

/* Ordered strongest → weakest by engineering depth; the grid renders in this
   exact order (top = most impressive to a recruiter). To re-rank, move lines. */
export const gridProjects: GridProject[] = [
  { title: "RTOS Weather Logger", description: "An ESP32 weather logger using DHT11, FreeRTOS, and Blynk.", tech: ["ESP32", "FreeRTOS", "DHT11"], date: "Jan 2025", repo: "https://github.com/ramuroy/RTOS-Weather-Logger", category: "Firmware/RTOS" },
  { title: "Solar Track", description: "Dual-axis sun tracker — four shaded LDRs steer two servos (azimuth + tilt) to keep a panel facing the sun.", tech: ["Arduino", "Servo", "LDR"], date: "Mar 2025", repo: "https://github.com/ramuroy/Solar-Track", category: "IoT" },
  { title: "Object Detection over SPI", description: "Real-time object detection over SPI between ESP32 and Arduino with an IR sensor.", tech: ["ESP32", "Arduino", "SPI"], date: "", repo: "https://github.com/ramuroy/Real-Time-Object-Detection-using-SPI-Protocol-between-ESP32-and-Arduino", category: "IoT" },
  { title: "Transformerless Power Supply", description: "A 220V AC → 5V DC transformerless power supply designed in KiCad.", tech: ["KiCad", "PCB"], date: "Aug 2024", repo: "https://github.com/ramuroy/Transformerless-Power-Supply", stars: 3, category: "Hardware/PCB" },
  { title: "LM2596 5V Buck Converter PCB", description: "An efficient switching regulator board built around the LM2596.", tech: ["KiCad", "LM2596", "PCB"], date: "Dec 2024", repo: "https://github.com/ramuroy/LM2596-5V-Buck-Converter-PCB-Design", category: "Hardware/PCB" },
  { title: "FreeRTOS Multitasking LEDs", description: "A C/FreeRTOS demo running concurrent LED tasks.", tech: ["C", "FreeRTOS"], date: "", repo: "https://github.com/ramuroy/FreeRTOS-Multitasking-LEDs", category: "Firmware/RTOS" },
  { title: "5V → 3.3V Voltage Regulator PCB", description: "A 5V → 3.3V regulator board based on the AMS1117-3.3.", tech: ["KiCad", "AMS1117", "PCB"], date: "Oct 2024", repo: "https://github.com/ramuroy/5V-to-3.3V-Voltage-Regulator-PCB-Design", category: "Hardware/PCB" },
  { title: "Servo Tester (NE555)", description: "An astable NE555-based PWM servo tester.", tech: ["NE555", "PWM", "PCB"], date: "Sep 2024", repo: "https://github.com/ramuroy/Servo-Tester-NE555", category: "Hardware/PCB" },
  { title: "AC-to-DC Converter PCB", description: "An AC-to-DC converter with KiCad schematics and gerbers.", tech: ["KiCad", "PCB"], date: "", repo: "https://github.com/ramuroy/AC-to-DC-Converter-PCB", category: "Hardware/PCB" },
  { title: "Fire Detection System", description: "A smoke-based fire alert system using an MQ-2 sensor.", tech: ["MQ-2", "Arduino"], date: "Jun 2024", repo: "https://github.com/ramuroy/Fire-Detection-System", category: "IoT" },
  { title: "Water Level Detector", description: "A water level detector with overflow alerting.", tech: ["Arduino", "Sensors"], date: "May 2024", repo: "https://github.com/ramuroy/Water-Level-Detector", category: "IoT" },
  { title: "Rain Detector", description: "An Arduino-based rain detector.", tech: ["Arduino", "Sensors"], date: "", repo: "https://github.com/ramuroy/Rain-Detector", category: "IoT" },
  { title: "Morse Caster", description: "A text-to-Morse converter with LCD output.", tech: ["Arduino", "LCD"], date: "Jan 2024", repo: "https://github.com/ramuroy/Morse-Caster", category: "IoT" },
  { title: "Digital Dice", description: "An Arduino digital dice with a 7-segment display.", tech: ["Arduino", "7-seg"], date: "", repo: "https://github.com/ramuroy/Digital-Dice", category: "IoT" },
  { title: "Click Counter Up/Down", description: "An Arduino up/down click counter.", tech: ["Arduino"], date: "", repo: "https://github.com/ramuroy/Click-Counter-Up-Down", category: "IoT" },
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
  /** Optional pointer to the flagship card carrying the full detail. */
  ref?: { label: string; href: string };
  tags: string[];
};

export const experience: Role[] = [
  {
    company: "Elipse",
    role: "Embedded Systems Engineer",
    period: "May 2026 – Present",
    location: "Hyderabad, India",
    active: true,
    summary:
      "Contributing to eOS at Elipse — a custom Yocto-based Linux distribution for the Raspberry Pi 5 — owning the build-and-deploy pipeline, the Rust sensor-fusion framework, the on-device voice subsystem, and the control boards the fleet runs on.",
    highlights: [
      "Design the fleet's control hardware in KiCad — a 24 V per-room controller (v1 fabbed and in the field, v2 re-spun at 57% less board area) and a 48 V, 16-channel floor controller on a four-layer impedance-controlled stackup — through fabrication release and bench bring-up.",
      "Own the build-and-deploy flow end to end: Yocto recipes across the meta-eos layer with BitBake PR bumps, AUTOREV pinning, and IPK packaging, through the in-house eos-build CLI, WIC images, bmaptool flashing, and RAUC A/B verification.",
      "Built the on-device voice subsystem in Rust: transfer-learned wake word (PyTorch → ONNX → tract), multi-mic best-source fusion across ESP32 satellites, Whisper STT, Piper TTS, and async barge-in.",
      "Authored ESP32 satellite firmware (ESP-IDF v5.2): BLE provisioning with on-chip EC P-256 keygen and X.509 CSR exchange with the hub CA, full NVS lifecycle across OTA, and SNTP-synced audio streaming.",
    ],
    ref: { label: `Full detail: eOS — ${figOf("eos")} above`, href: "#projects" },
    tags: ["KiCad", "PCB design", "Yocto", "BitBake", "RAUC OTA", "Rust", "D-Bus", "MQTT", "SQLite", "Qt6/QML", "ESP-IDF", "ONNX/tract", "Whisper", "Piper"],
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
      "Shipped the Anti-Collision System to production at Tata Steel BlueScope: real-time UWB proximity sensing with zone-based safety logic driving industrial relays that halt unsafe crane motion.",
      "Wrote ESP32-S3 dual-core firmware — one core for time-critical UWB ranging, the other for zone logic and the embedded web UI — linked over ESP-NOW and driving 8-channel Masibus relays via MODBUS RTU over RS485.",
      "Interfaced STM32 with AHT10 and ADS1115 — timers, internal ADC/DAC, 2/4-wire RS485, LoRa long-range links, and Masibus DI/DO/AI/AO cards (STM32CubeIDE).",
    ],
    ref: { label: `Full detail: ${figOf("industrial-anti-collision-system")} above`, href: "#projects" },
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
  { name: "Embedded Linux & OS", blurb: "Building custom Linux distributions from the ground up with Yocto.", items: ["Yocto Project", "BitBake", "OpenEmbedded", "kas", "meta-layers", ".bb/.bbappend recipes", "IPK packaging", "RAUC A/B OTA", "Custom distro build", "WIC images", "GRUB-EFI / UEFI boot", "Cross-compilation", "BSP", "Device tree"], core: ["Yocto Project", "BitBake", "RAUC A/B OTA"] },
  { name: "Linux Internals", blurb: "The userspace plumbing that ties a running system together — and, in Ember, replacing it.", items: ["systemd", "D-Bus", "journald", "SQLite", "Mosquitto MQTT (TLS, ACL)", "PID 1 / init authoring", "Service supervision", "cgroup v2", "epoll event loops", "Signal handling & reaping"], core: ["systemd", "D-Bus", "PID 1 / init authoring"] },
  { name: "Firmware & RTOS", blurb: "Bare-metal and RTOS firmware on ESP32 and STM32 silicon.", items: ["ESP-IDF v5.x", "FreeRTOS dual-core", "STM32 HAL/LL", "Bare-metal", "Interrupt/polling", "BLE (NimBLE)", "NVS lifecycle", "OTA"], core: ["ESP-IDF v5.x", "STM32 HAL/LL", "FreeRTOS dual-core"] },
  { name: "On-Device ML & Voice", blurb: "Wake-word, speech, and sensor inference running entirely on the edge.", items: ["PyTorch", "ONNX", "tract (Rust)", "Transfer learning", "KWS", "VAD", "Mel-spectrogram", "Whisper STT", "Piper TTS", "Multi-mic fusion", "Barge-in"], core: ["PyTorch", "ONNX", "tract (Rust)"] },
  { name: "Languages", blurb: "Systems and application languages I write production code in.", items: ["C", "Embedded C/C++", "Rust (async/Tokio)", "Python", "MATLAB"], core: ["Embedded C/C++", "Rust (async/Tokio)"] },
  { name: "Sensors & Peripherals", blurb: "Radar, air-quality, and industrial I/O I interface and calibrate.", items: ["HLK-C4001 mmWave radar", "HLK-LD6001A radar", "PIR motion", "PM/VOC/CO₂ air-quality", "SHT40", "SHT30", "TSL2591", "BH1750", "AHT10", "ADS1115 ADC", "INA226 / INA238", "PCA9685 PWM", "CY8CMBR3116 capacitive touch", "WS2812B addressable LEDs", "UWB modules", "Masibus DI/DO/AI/AO", "Industrial relays"], core: [] },
  { name: "PCB & Hardware", blurb: "Schematic to fabricated board — capture, layout, release, bring-up.", items: ["KiCad 9/10", "Schematic capture", "PCB layout & routing", "ERC / DRC", "Impedance-controlled stackups", "100 Ω differential pairs", "eFuse protection chains", "Power-supply design", "SELV design", "Capacitive-touch electrode layout", "Gerber / CAM release", "BOM & sourcing", "Bring-up, rework & fault-finding", "Raspberry Pi 5", "ESP32 / ESP32-S3", "STM32"], core: ["KiCad 9/10", "Schematic capture", "PCB layout & routing"] },
  { name: "UI & Tooling", blurb: "The build flow, IDEs, and front-end that ship the work.", items: ["Qt6/QML", "Git / GitHub", "STM32CubeIDE", "ESP-IDF", "kas", "BitBake", "pcbnew scripting"], core: [] },
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
  projects: { num: "01", eyebrow: "// 01 — selected work", title: "Shipped firmware, distros & deployed systems" },
  about: { num: "02", eyebrow: "// 02 — overview", title: "From hardware to custom Linux to on-device ML" },
  experience: { num: "03", eyebrow: "// 03 — revision history", title: "Where I've done the work" },
  skills: { num: "04", eyebrow: "// 04 — specifications", title: "The full embedded stack" },
  certifications: { num: "05", eyebrow: "// 05 — compliance & test", title: "Certifications" },
  contact: { num: "06", eyebrow: "// 06 — contact & ordering info", title: "Let's build something close to the metal" },
};
