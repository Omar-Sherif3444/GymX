export const machinesData = [
  {
    id: 1,
    name: "Chest Press",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",

    muscle: ["chest", "triceps", "shoulders"],
    bodyType: "upper body",
    state: "working",
    categories: ["fit"],
    description:
      "A strength machine designed to target the chest muscles while also engaging the triceps and front shoulders.",
    howToUse: [
      "Adjust the seat so the handles are aligned with your mid-chest.",
      "Sit with your back firmly against the pad.",
      "Grip the handles with both hands.",
      "Push forward until your arms are almost fully extended.",
      "Slowly return to the starting position.",
    ],
    safetyTips: [
      "Avoid locking your elbows.",
      "Keep your back against the pad.",
      "Start with a manageable weight.",
    ],
    difficulty: "beginner",
    image: "/images/machines/chest-press.jpg",
    qrCode: "GYMX-M001",
  },

  {
    id: 2,
    name: "Pec Deck Fly",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600",
    muscle: ["chest"],
    bodyType: "upper body",
    state: "working",
    categories: ["fit"],
    description:
      "An isolation machine that targets the chest muscles through a controlled fly movement.",
    howToUse: [
      "Adjust the seat so the handles are at chest level.",
      "Sit with your back against the pad.",
      "Place your forearms or hands on the pads.",
      "Bring your arms together in front of your chest.",
      "Slowly return to the starting position.",
    ],
    safetyTips: [
      "Avoid stretching your arms too far backward.",
      "Use controlled movements.",
      "Do not use excessive weight.",
    ],
    difficulty: "beginner",
    image: "/images/machines/pec-deck.jpg",
    qrCode: "GYMX-M002",
  },

  {
    id: 3,
    name: "Lat Pulldown",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600",
    muscle: ["back", "biceps"],
    bodyType: "upper body",
    state: "working",
    categories: ["fit"],
    description:
      "A pulling machine that primarily targets the latissimus dorsi while engaging the biceps and upper back.",
    howToUse: [
      "Adjust the thigh pad to secure your legs.",
      "Sit facing the machine.",
      "Grip the bar slightly wider than shoulder-width.",
      "Pull the bar down toward your upper chest.",
      "Slowly extend your arms to return the bar.",
    ],
    safetyTips: [
      "Pull the bar toward your chest, not behind your neck.",
      "Avoid swinging your body.",
      "Keep your movements controlled.",
    ],
    difficulty: "beginner",
    image: "/images/machines/lat-pulldown.jpg",
    qrCode: "GYMX-M003",
  },

  {
    id: 4,
    name: "Biceps Curl Machine",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600",
    muscle: ["biceps"],
    bodyType: "upper body",
    state: "working",
    categories: ["fit"],
    description:
      "An isolation machine designed to strengthen the biceps through controlled elbow flexion.",
    howToUse: [
      "Adjust the seat so your elbows align with the machine's pivot point.",
      "Rest your upper arms on the pad.",
      "Grip the handles firmly.",
      "Curl the handles upward.",
      "Slowly lower the handles to the starting position.",
    ],
    safetyTips: [
      "Keep your upper arms against the pad.",
      "Avoid using momentum.",
      "Do not fully lock your elbows.",
    ],
    difficulty: "beginner",
    image: "/images/machines/biceps-curl.jpg",
    qrCode: "GYMX-M004",
  },

  {
    id: 5,
    name: "Triceps Pushdown",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600",
    muscle: ["triceps"],
    bodyType: "upper body",
    state: "working",
    categories: ["fit"],
    description:
      "A cable-based exercise station that targets the triceps by extending the elbows against resistance.",
    howToUse: [
      "Attach a straight bar or rope to the cable.",
      "Stand facing the machine.",
      "Grip the attachment with both hands.",
      "Keep your elbows close to your sides.",
      "Push the attachment downward.",
      "Slowly return to the starting position.",
    ],
    safetyTips: [
      "Keep your elbows stationary.",
      "Avoid leaning your body weight onto the cable.",
      "Use a controlled range of motion.",
    ],
    difficulty: "beginner",
    image: "/images/machines/triceps-pushdown.jpg",
    qrCode: "GYMX-M005",
  },

  {
    id: 6,
    name: "Leg Press",
    image: "https://images.unsplash.com/photo-1534368270820-9de3d8053204?w=600",
    muscle: ["quadriceps", "glutes", "hamstrings"],
    bodyType: "lower body",
    state: "working",
    categories: ["fit"],
    description:
      "A compound lower-body machine that develops the quadriceps, glutes, and hamstrings.",
    howToUse: [
      "Sit with your back and hips against the seat.",
      "Place your feet shoulder-width apart on the platform.",
      "Release the safety handles.",
      "Lower the platform by bending your knees.",
      "Push through your feet to return to the starting position.",
    ],
    safetyTips: [
      "Never lock your knees at the top.",
      "Keep your lower back against the seat.",
      "Do not lower the platform beyond your comfortable range.",
    ],
    difficulty: "intermediate",
    image: "/images/machines/leg-press.jpg",
    qrCode: "GYMX-M006",
  },

  {
    id: 7,
    name: "Leg Extension",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=600",
    muscle: ["quadriceps"],
    bodyType: "lower body",
    state: "under maintenance",
    categories: ["fit"],
    description:
      "An isolation machine that targets the quadriceps through knee extension.",
    howToUse: [
      "Adjust the seat and backrest.",
      "Position the padded roller above your ankles.",
      "Grip the handles beside the seat.",
      "Extend your legs until they are nearly straight.",
      "Slowly lower the weight to the starting position.",
    ],
    safetyTips: [
      "Avoid locking your knees.",
      "Do not use excessive weight.",
      "Perform the movement slowly.",
    ],
    difficulty: "beginner",
    image: "/images/machines/leg-extension.jpg",
    qrCode: "GYMX-M007",
  },

  {
    id: 8,
    name: "Treadmill",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600",
    muscle: ["quadriceps", "hamstrings", "glutes", "calves"],
    bodyType: "lower body",
    state: "working",
    categories: ["cardio"],
    description:
      "A cardiovascular machine used for walking, jogging, and running to improve endurance and cardiovascular fitness.",
    howToUse: [
      "Stand on the side rails before starting.",
      "Attach the safety clip to your clothing.",
      "Select a comfortable walking speed.",
      "Step onto the moving belt carefully.",
      "Gradually increase speed or incline if needed.",
      "Slow down before stopping the machine.",
    ],
    safetyTips: [
      "Always use the safety clip.",
      "Avoid stepping onto a moving belt from behind.",
      "Do not exceed your fitness level.",
    ],
    difficulty: "beginner",
    image: "/images/machines/treadmill.jpg",
    qrCode: "GYMX-M008",
  },
];

export const machineFilters = [
  { label: "All machines", value: "all", type: "all" },
  { label: "Upper body", value: "upper body", type: "bodyType" },
  { label: "Lower body", value: "lower body", type: "bodyType" },
  { label: "Functional", value: "functional", type: "categories" },
  { label: "Cardio", value: "cardio", type: "categories" },
];
