import { Exercise } from "./db";

const baseDefaultExercises = [
  {
    name: "Push-up",
    group: "Chest",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/mm6_WcoCVTA",
  },
  {
    name: "Push-up (deficit)",
    group: "Chest",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/gmNlqsE3Onc",
  },
  {
    name: "Dumbell Press (flat)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/YQ2s_Y7g5Qk",
  },
  {
    name: "Hammer Machine Chest Press (flat)",
    group: "Chest",
    type: "Machine",
    youtubeLink: "https://youtu.be/aV1U_mK3XOs",
  },
  {
    name: "Hammer Machine Chest Press (incline)",
    group: "Chest",
    type: "Machine",
    youtubeLink: "https://youtu.be/0Wa9CfRXUkA",
  },
  {
    name: "Machine Chest Press",
    group: "Chest",
    type: "Machine",
    youtubeLink: "https://youtu.be/NwzUje3z0qY",
  },
  {
    name: "Bench Press (medium grip)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "https://youtu.be/gMgvBspQ9lk",
  },
  {
    name: "Bench Press (narrow grip)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "https://youtu.be/FiQUzPtS90E",
  },
  {
    name: "Pushup (narrow grip)",
    group: "Chest",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/Lz1aFtuNvEQ",
  },
  {
    name: "Smith Machine Bench Press (wide grip)",
    group: "Chest",
    type: "Smith machine",
    youtubeLink: "https://youtu.be/AK0ycfB_kYo",
  },
  {
    name: "Smith Machine Bench Press (medium grip)",
    group: "Chest",
    type: "Smith machine",
    youtubeLink: "https://youtu.be/O5viuEPDXKY",
  },
  {
    name: "Smith Machine Bench Press (narrow grip)",
    group: "Chest",
    type: "Smith machine",
    youtubeLink: "https://youtu.be/qf_FTh3QyYs",
  },
  {
    name: "Bench Press (wide grip)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "https://youtu.be/EeE3f4VWFDo",
  },
  {
    name: "Cable Flye (bent over)",
    group: "Chest",
    type: "Cable",
    youtubeLink: "https://youtu.be/Cj6P91eFXkM",
  },
  {
    name: "Cable Flye",
    group: "Chest",
    type: "Cable",
    youtubeLink: "https://youtu.be/4mfLHnFL0Uw",
  },
  {
    name: "Cable Flye (underhand)",
    group: "Chest",
    type: "Cable",
    youtubeLink: "https://youtu.be/e_8HLu59-to",
  },
  {
    name: "Bench Press (cambered bar)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "https://youtu.be/_9VlfuYYC7w",
  },
  {
    name: "Dumbbell Flye (flat)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/JFm8KbhjibM",
  },
  {
    name: "Dumbbell Press Flye (flat)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/BhlL-esnitU",
  },
  {
    name: "Cable Flye (high)",
    group: "Chest",
    type: "Cable",
    youtubeLink: "https://youtu.be/ipoTKasbDyQ",
  },
  {
    name: "Dumbbell Flye (incline)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/8oR5hBwbIBc",
  },
  {
    name: "Dumbbell Press Flye (incline)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/lTfiohnjbyM",
  },
  {
    name: "Machine Flye",
    group: "Chest",
    type: "Machine",
    youtubeLink: "https://youtu.be/FDay9wFe5uE",
  },
  {
    name: "Pec Dec Flye",
    group: "Chest",
    type: "Machine",
    youtubeLink: "https://youtu.be/O-OBCfyh9Fw",
  },
  {
    name: "Dumbbell Press (incline)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/5CECBjd7HLQ",
  },
  {
    name: "Machine Chest Press (incline)",
    group: "Chest",
    type: "Machine",
    youtubeLink: "https://youtu.be/TrTSvn5-MTk",
  },
  {
    name: "Bench Press (incline, medium grip)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "https://youtu.be/lJ2o89kcnxY",
  },
  {
    name: "Bench Press (incline, narrow grip)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "https://youtu.be/Zfi0KcIJi6c",
  },
  {
    name: "Bench Press (incline, wide grip)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "https://youtu.be/FxQ0XEoFYQk",
  },
  {
    name: "Dumbbell Press (low incline)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/B09ZkYsnKko",
  },
  {
    name: "Smith Machine Press (incline, wide grip)",
    group: "Chest",
    type: "Smith machine",
    youtubeLink: "https://youtu.be/SHL81neluiI",
  },
  {
    name: "Smith Machine Press (incline, medium grip)",
    group: "Chest",
    type: "Smith machine",
    youtubeLink: "https://youtu.be/8urE8Z8AMQ4",
  },
  {
    name: "Pushup (weighted, narrow grip)",
    group: "Chest",
    type: "Bodyweight loadable",
    youtubeLink: "",
  },
  {
    name: "Pushup (weighted, normal grip)",
    group: "Chest",
    type: "Bodyweight loadable",
    youtubeLink: "",
  },
  {
    name: "Barbell Flexion Row",
    group: "Back",
    type: "Barbell",
    youtubeLink: "https://youtu.be/Lt3d1UKq7RQ",
  },
  {
    name: "Dumbbell Row (2-Arm)",
    group: "Back",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/5PoEksoJNaw",
  },
  {
    name: "Barbell Bent Over Row",
    group: "Back",
    type: "Barbell",
    youtubeLink: "https://youtu.be/6FZHJGzMFEc",
  },
  {
    name: "Barbell Row to Chest",
    group: "Back",
    type: "Barbell",
    youtubeLink: "https://youtu.be/UPGuwx7GQ9s",
  },
  {
    name: "Chest Supported Row",
    group: "Back",
    type: "Machine",
    youtubeLink: "https://youtu.be/0UBRfiO4zDs",
  },
  {
    name: "Seated Cable Row",
    group: "Back",
    type: "Cable",
    youtubeLink: "https://youtu.be/UCXxvVItLoM",
  },
  {
    name: "Dumbbell Row (single-arm, supported)",
    group: "Back",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/DMo3HJoawrU",
  },
  {
    name: "EZ Bar Row (underhand)",
    group: "Back",
    type: "Barbell",
    youtubeLink: "https://youtu.be/H260SUUyJBM",
  },
  {
    name: "Cambered Bar Row",
    group: "Back",
    type: "Barbell",
    youtubeLink: "https://youtu.be/jiowkUMomlw",
  },
  {
    name: "Hammer Machine Row (high)",
    group: "Back",
    type: "Machine",
    youtubeLink: "https://youtu.be/gg5hwJuv6KI",
  },
  {
    name: "Hammer Machine Row (low)",
    group: "Back",
    type: "Machine",
    youtubeLink: "https://youtu.be/opjbouBmUWg",
  },
  {
    name: "Dumbbell Row (2-Arm, incline)",
    group: "Back",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/tZUYS7X50so",
  },
  {
    name: "Inverted Row",
    group: "Back",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/KOaCM1HMwU0",
  },
  {
    name: "Machine Chest Supported Row",
    group: "Back",
    type: "Machine",
    youtubeLink: "https://youtu.be/_FrrYQxA6kc",
  },
  {
    name: "Seal Row",
    group: "Back",
    type: "Barbell",
    youtubeLink: "https://youtu.be/4H2ItXwUTp8",
  },
  {
    name: "Smith Machine Row",
    group: "Back",
    type: "Smith machine",
    youtubeLink: "https://youtu.be/3QcJggd_L24",
  },
  {
    name: "T-Bar Row",
    group: "Back",
    type: "Machine",
    youtubeLink: "https://youtu.be/yPis7nlbqdY",
  },
  {
    name: "Cable Flexion Row",
    group: "Back",
    type: "Cable",
    youtubeLink: "https://youtu.be/dkJ-K8KNtYY",
  },
  {
    name: "Dumbbell Row to Hips",
    group: "Back",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/RC4fFDYS2Xk",
  },
  {
    name: "Assisted Pullup (normal grip)",
    group: "Back",
    type: "Machine assistance",
    youtubeLink: "https://youtu.be/8ygapPMYK1I",
  },
  {
    name: "Assisted Pullup (parallel grip)",
    group: "Back",
    type: "Machine assistance",
    youtubeLink: "https://youtu.be/GdsRZAeeDUc",
  },
  {
    name: "Assisted Pullup (underhand grip)",
    group: "Back",
    type: "Machine assistance",
    youtubeLink: "https://youtu.be/L4ChTwrXTjc",
  },
  {
    name: "Assisted Pullup (wide grip)",
    group: "Back",
    type: "Machine assistance",
    youtubeLink: "https://youtu.be/0tiC6RUZL8Y",
  },
  {
    name: "Dumbbell Pullover",
    group: "Back",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/jQjWlIwG4sI",
  },
  {
    name: "Machine Pullover",
    group: "Back",
    type: "Machine",
    youtubeLink: "https://youtu.be/oxpAl14EYyc",
  },
  {
    name: "Pulldown (narrow grip)",
    group: "Back",
    type: "Cable",
    youtubeLink: "https://youtu.be/QzjjwxZOVdE",
  },
  {
    name: "Pulldown (normal grip)",
    group: "Back",
    type: "Cable",
    youtubeLink: "https://youtu.be/EUIri47Epcg",
  },
  {
    name: "Pullup (normal grip)",
    group: "Back",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/iWpoegdfgtc",
  },
  {
    name: "Pullup (parallel grip)",
    group: "Back",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/XWt6FQAK5wM",
  },
  {
    name: "Pulldown (parallel grip)",
    group: "Back",
    type: "Cable",
    youtubeLink: "https://youtu.be/--utaPT7XYQ",
  },
  {
    name: "Pulldown (straight arm)",
    group: "Back",
    type: "Cable",
    youtubeLink: "https://youtu.be/G9uNaXGTJ4w",
  },
  {
    name: "Pulldown (underhand grip)",
    group: "Back",
    type: "Cable",
    youtubeLink: "https://youtu.be/VprlTxpB1rk",
  },
  {
    name: "Pullup (underhand grip)",
    group: "Back",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/9JC1EwqezGY",
  },
  {
    name: "Pulldown (wide grip)",
    group: "Back",
    type: "Cable",
    youtubeLink: "https://youtu.be/YCKPD4BSD2E",
  },
  {
    name: "Pullup (wide grip)",
    group: "Back",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/GRgWPT9XSQQ",
  },
  {
    name: "Pulldown (upright torso to abs)",
    group: "Back",
    type: "Cable",
    youtubeLink: "https://youtu.be/yPjPpCJ6NSQ",
  },
  {
    name: "Pullup (weighted, parallel grip)",
    group: "Back",
    type: "Bodyweight loadable",
    youtubeLink: "",
  },
  {
    name: "Pullup (weighted, underhand grip)",
    group: "Back",
    type: "Bodyweight loadable",
    youtubeLink: "",
  },
  {
    name: "Pullup (weighted, wide grip)",
    group: "Back",
    type: "Bodyweight loadable",
    youtubeLink: "",
  },
  {
    name: "Pullup (weighted, normal grip)",
    group: "Back",
    type: "Bodyweight loadable",
    youtubeLink: "",
  },
  {
    name: "Assisted Dip",
    group: "Triceps",
    type: "Machine assistance",
    youtubeLink: "https://youtu.be/yZ83t4mrPrI",
  },
  {
    name: "Barbell Skullcrusher",
    group: "Triceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/l3rHYPtMUo8",
  },
  {
    name: "Cable Triceps Pushdown (bar)",
    group: "Triceps",
    type: "Cable",
    youtubeLink: "https://youtu.be/6Fzep104f0s",
  },
  {
    name: "Dip",
    group: "Triceps",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/4LA1kF7yCGo",
  },
  {
    name: "Dumbbell Skullcrusher",
    group: "Triceps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/jPjhQ2hsAds",
  },
  {
    name: "Inverted Skullcrusher",
    group: "Triceps",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/1lrjpLuXH4w",
  },
  {
    name: "Cable Triceps Pushdown (rope)",
    group: "Triceps",
    type: "Cable",
    youtubeLink: "https://youtu.be/-xa-6cQaZKY",
  },
  {
    name: "Cable Triceps Pushdown (single-arm)",
    group: "Triceps",
    type: "Cable",
    youtubeLink: "https://youtu.be/Cp_bShvMY4c",
  },
  {
    name: "JM Press",
    group: "Triceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/Tih5iHyELsE",
  },
  {
    name: "Machine Triceps Pushdown",
    group: "Triceps",
    type: "Machine",
    youtubeLink: "https://youtu.be/OChuGyCSC7U",
  },
  {
    name: "Barbell Overhead Triceps Extension",
    group: "Triceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/q5X9thiKofE",
  },
  {
    name: "Cable Overhead Triceps Extension",
    group: "Triceps",
    type: "Cable",
    youtubeLink: "https://youtu.be/1u18yJELsh0",
  },
  {
    name: "Cable Overhead Triceps Extension (rope)",
    group: "Triceps",
    type: "Cable",
    youtubeLink: "https://youtu.be/kqidUIf1eJE",
  },
  {
    name: "EZ Bar Overhead Triceps Extension",
    group: "Triceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/IdZ7HXnatko",
  },
  {
    name: "Machine Triceps Extension",
    group: "Triceps",
    type: "Machine",
    youtubeLink: "https://youtu.be/Bx8ga1BLHLE",
  },
  {
    name: "Barbell Overhead Triceps Extension (seated)",
    group: "Triceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/ktU2H0DDmwk",
  },
  {
    name: "EZ Bar Overhead Triceps Extension (seated)",
    group: "Triceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/gcRZqG8t44c",
  },
  {
    name: "Dumbbell Overhead Extension (single-arm)",
    group: "Triceps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/eHb83dGklow",
  },
  {
    name: "Dip (weighted)",
    group: "Triceps",
    type: "Bodyweight loadable",
    youtubeLink: "",
  },
  {
    name: "Cable Rope Twist Curl",
    group: "Biceps",
    type: "Cable",
    youtubeLink: "https://youtu.be/2CDKTFFp5fA",
  },
  {
    name: "Dumbbell Curl (2-Arm)",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/yYB76DOBPsM",
  },
  {
    name: "Dumbbell Curl (alternating)",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/iixND1P2lik",
  },
  {
    name: "Barbell Curl (narrow grip)",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/pUS6HBQjRmc",
  },
  {
    name: "Barbell Curl (normal grip)",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/JnLFSFurrqQ",
  },
  {
    name: "Cable Curl",
    group: "Biceps",
    type: "Cable",
    youtubeLink: "https://youtu.be/nW7w5vG6IIc",
  },
  {
    name: "Cable Curl (EZ bar)",
    group: "Biceps",
    type: "Cable",
    youtubeLink: "https://youtu.be/opFVuRi_3b8",
  },
  {
    name: "Cable Curl (EZ bar, wide grip)",
    group: "Biceps",
    type: "Cable",
    youtubeLink: "https://youtu.be/yuozln3CC94",
  },
  {
    name: "Dumbbell Preacher Curl (single-arm)",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/fuK3nFvwgXk",
  },
  {
    name: "Dumbbell Spider Curl",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/ke2shAeQ0O8",
  },
  {
    name: "Dumbbell Twist Curl",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/tRXw8HQ7-oA",
  },
  {
    name: "EZ Bar Curl (narrow grip)",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/cdmnvo3augg",
  },
  {
    name: "EZ Bar Curl (wide grip)",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/EK747VC37yE",
  },
  {
    name: "EZ Bar Preacher Curl",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/sxA__DoLsgo",
  },
  {
    name: "EZ Bar Spider Curl",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/WG3vdcq__I0",
  },
  {
    name: "EZ Bar Curl (normal grip)",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/MCjBeB844rU",
  },
  {
    name: "Hammer Curl",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/XOEL4MgekYE",
  },
  {
    name: "Dumbbell Curl (incline)",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/aTYlqC_JacQ",
  },
  {
    name: "Machine Preacher Curl",
    group: "Biceps",
    type: "Machine",
    youtubeLink: "https://youtu.be/Ja6ZlIDONac",
  },
  {
    name: "Freemotion Curl (facing machine)",
    group: "Biceps",
    type: "Freemotion",
    youtubeLink: "https://youtu.be/JG12IGUKRFs",
  },
  {
    name: "Freemotion Curl (facing away)",
    group: "Biceps",
    type: "Freemotion",
    youtubeLink: "https://youtu.be/8nAUfZ2kgoo",
  },
  {
    name: "Freemotion Curl (single-arm)",
    group: "Biceps",
    type: "Freemotion",
    youtubeLink: "https://youtu.be/zf03koNX5hA",
  },
  {
    name: "Machine Shoulder Press",
    group: "Shoulders",
    type: "Machine",
    youtubeLink: "https://youtu.be/WvLMauqrnK8",
  },
  {
    name: "Barbell Upright Row",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "https://youtu.be/um3VVzqunPU",
  },
  {
    name: "Cable Cross Body Lateral Raise",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "https://youtu.be/2OMbdPF7mz4",
  },
  {
    name: "Cable Leaning Lateral Raise",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "https://youtu.be/lq7eLC30b9w",
  },
  {
    name: "Cable Upright Row",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "https://youtu.be/qr3ziolhjvQ",
  },
  {
    name: "Dumbbell Lateral Raise",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/OuG1smZTsQQ",
  },
  {
    name: "Dumbbell Upright Row",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/Ub6QruNKfbY",
  },
  {
    name: "Machine Lateral Raise",
    group: "Shoulders",
    type: "Machine",
    youtubeLink: "https://youtu.be/0o07iGKUarI",
  },
  {
    name: "Smith Machine Upright Row",
    group: "Shoulders",
    type: "Smith machine",
    youtubeLink: "https://youtu.be/QIpa-9dtkgA",
  },
  {
    name: "Dumbbell Lateral Raise (thumbs down)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/D1f7d1OcobY",
  },
  {
    name: "Dumbbell Lateral Raise (top hold)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/SKf8wHlIFX0",
  },
  {
    name: "Dumbbell Lateral Raise (super ROM)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/yltiwx8jBCI",
  },
  {
    name: "Freemotion Y-Raises",
    group: "Shoulders",
    type: "Freemotion",
    youtubeLink: "https://youtu.be/F-S6v6PeBdw",
  },
  {
    name: "Freemotion Y-Raises (paused)",
    group: "Shoulders",
    type: "Freemotion",
    youtubeLink: "https://youtu.be/o46gg_cYbcQ",
  },
  {
    name: "Barbell Facepull",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "https://youtu.be/hPWYuhJMUhU",
  },
  {
    name: "Cable Cross Body Bent Lateral Raise",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "https://youtu.be/f0g5NkYiWUY",
  },
  {
    name: "Cable Rope Facepull",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "https://youtu.be/-MODnZdnmAQ",
  },
  {
    name: "Cable Single Arm Rear Delt Raise",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "https://youtu.be/qz1OLup4W_M",
  },
  {
    name: "Dumbbell Bent Lateral Raise",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/34gVHrkaiz0",
  },
  {
    name: "Dumbbell Facepull",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/nzTY7j9ocR8",
  },
  {
    name: "Dumbbell Facepull (incline)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/90cE3rCLtmo",
  },
  {
    name: "Dumbbell Lateral Raise (incline)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/z3PRz2aVA10",
  },
  {
    name: "Cable Rope Facepull (kneeling)",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "https://youtu.be/8CGMuud1ANw",
  },
  {
    name: "Machine Reverse Flye",
    group: "Shoulders",
    type: "Machine",
    youtubeLink: "https://youtu.be/5YK4bgzXDp0",
  },
  {
    name: "Freemotion Rear Delt Flyes",
    group: "Shoulders",
    type: "Freemotion",
    youtubeLink: "https://youtu.be/fx3RTomxxHU",
  },
  {
    name: "Freemotion Rear Delt Flyes (paused)",
    group: "Shoulders",
    type: "Freemotion",
    youtubeLink: "https://youtu.be/hZ5z5NFBkVY",
  },
  {
    name: "Barbell Front Raise",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "https://youtu.be/_ikCPws1mbE",
  },
  {
    name: "Cable Front Raise (underhand)",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "https://youtu.be/yIoAcMD3jcE",
  },
  {
    name: "Dumbbell Front Raise",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/hRJ6tR5-if0",
  },
  {
    name: "Barbell Front Raise (EZ bar, underhand)",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "https://youtu.be/87pZAbYjXc4",
  },
  {
    name: "Dumbbell Press (high incline)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/GFYrRBoov3w",
  },
  {
    name: "Barbell Shoulder Press (seated)",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "https://youtu.be/IuzRCN6eG6Y",
  },
  {
    name: "Dumbbell Shoulder Press (seated)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/HzIiNhHhhtA",
  },
  {
    name: "Smith Machine Shoulder Press (seated)",
    group: "Shoulders",
    type: "Smith machine",
    youtubeLink: "https://youtu.be/OLqZDUUD2b0",
  },
  {
    name: "Barbell Shoulder Press (standing)",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "https://youtu.be/G2qpTG1Eh40",
  },
  {
    name: "Dumbbell Shoulder Press (standing)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/Raemd3qWgJc",
  },
  {
    name: "Barbell Bent Over Shrug",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "https://youtu.be/d9daNDIXtK8",
  },
  {
    name: "Barbell Shrug",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "https://youtu.be/M_MjF5Nm_h4",
  },
  {
    name: "Cable Bent Over Shrug",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "https://youtu.be/nOn_Bz0zrwQ",
  },
  {
    name: "Cable Shrug",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "https://youtu.be/YykmcX2b-LY",
  },
  {
    name: "Cable Side Shrug",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "https://youtu.be/2zaT3WAgZi0",
  },
  {
    name: "Cable Single Arm Side Shrug",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "https://youtu.be/BeIcUXQ3RDc",
  },
  {
    name: "Dumbbell Bent Over Shrug",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/5z7ZtboxbBY",
  },
  {
    name: "Dumbbell Leaning Shrug",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/GH_l85Ky3vA",
  },
  {
    name: "Dumbbell Shrug",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/_t3lrPI6Ns4",
  },
  {
    name: "Dumbbell Shrug (seated)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/zgToz5FiI-E",
  },
  {
    name: "Cable Lateral Raise (single-arm)",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Smith Machine Squat (feet forward)",
    group: "Quads",
    type: "Smith machine",
    youtubeLink: "https://youtu.be/-eO_VydErV0",
  },
  {
    name: "Walking Lunges (quad-focused, bodyweight)",
    group: "Quads",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/SSSuNnOr28I",
  },
  {
    name: "Barbell Split Squat",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "https://youtu.be/VfsPxffCAd0",
  },
  {
    name: "Belt Squat",
    group: "Quads",
    type: "Machine",
    youtubeLink: "https://youtu.be/L__-j2v_LPM",
  },
  {
    name: "Barbell Squat (close stance, feet forward)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "https://youtu.be/ppluAD4MHK8",
  },
  {
    name: "Front Squat",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "https://youtu.be/HHxNbhP16UE",
  },
  {
    name: "Front Squat (cross grip)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "https://youtu.be/0DQvn2qsOG4",
  },
  {
    name: "Hack Squat",
    group: "Quads",
    type: "Machine",
    youtubeLink: "https://youtu.be/rYgNArpwE7E",
  },
  {
    name: "Barbell Squat (high bar)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "https://youtu.be/i7J5h7BJ07g",
  },
  {
    name: "Leg Extension",
    group: "Quads",
    type: "Machine",
    youtubeLink: "https://youtu.be/m0FOpMEgero",
  },
  {
    name: "Leg Press",
    group: "Quads",
    type: "Machine",
    youtubeLink: "https://youtu.be/yZmx_Ac3880",
  },
  {
    name: "Barbell Squat (narrow stance)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "https://youtu.be/1IIPcUCKxcE",
  },
  {
    name: "Sissy Squat (machine)",
    group: "Quads",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/M4nPIq8hFl0",
  },
  {
    name: "Sissy Squat (no machine)",
    group: "Quads",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/7N8ig76_lHw",
  },
  {
    name: "Pendulum Squat",
    group: "Quads",
    type: "Machine",
    youtubeLink: "https://youtu.be/Qjc14MmVtYQ",
  },
  {
    name: "Barbell Squat (safety bar)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "https://youtu.be/RniFcGxt76E",
  },
  {
    name: "Barbell Squat (cambered bar)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "https://youtu.be/PL76s1lG4rc",
  },
  {
    name: "Walking Lunges (quad-focused, dumbbell)",
    group: "Quads",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Walking Lunges (quad-focused, barbell)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Walking Lunges (glute-focused, barbell)",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "https://youtu.be/_meXEWq5MOQ",
  },
  {
    name: "Barbell Hip Thrust",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "https://youtu.be/EF7jXP17DPE",
  },
  {
    name: "Machine Glute Kickback",
    group: "Glutes",
    type: "Machine",
    youtubeLink: "https://youtu.be/NLDBFtSNhqg",
  },
  {
    name: "Dumbbell Hip Thrust (single leg)",
    group: "Glutes",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/CSXVj047Ss4",
  },
  {
    name: "Reverse Lunge (dumbbell)",
    group: "Glutes",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/D-c2CWwEweo",
  },
  {
    name: "Walking Lunges (glute-focused, dumbbell)",
    group: "Glutes",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/eFWCn5iEbTU",
  },
  {
    name: "Cable Pull Through",
    group: "Glutes",
    type: "Cable",
    youtubeLink: "https://youtu.be/pv8e6OSyETE",
  },
  {
    name: "Deadlift",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "https://youtu.be/AweC3UaM14o",
  },
  {
    name: "Deadlift (deficit 25's)",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "https://youtu.be/kvWcDHH62j0",
  },
  {
    name: "Deadlift (deficit)",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "https://youtu.be/X-uKkAukJVA",
  },
  {
    name: "Dumbbell Split Squat",
    group: "Glutes",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/pjAewD4LxXs",
  },
  {
    name: "Deadlift (sumo stance)",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "https://youtu.be/xp1IeyTOB4U",
  },
  {
    name: "Barbell Squat (sumo stance)",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "https://youtu.be/wjw-4R5VR20",
  },
  {
    name: "Belt Squat (wide stance)",
    group: "Glutes",
    type: "Machine",
    youtubeLink: "https://youtu.be/LU2GYsqkgAQ",
  },
  {
    name: "Reverse Lunge (barbell)",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Walking Lunges (glute-focused, bodyweight)",
    group: "Glutes",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Back Raise (45 degree)",
    group: "Hamstrings",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/5_ejbGfdAQE",
  },
  {
    name: "Dumbbell Stiff Legged Deadlift",
    group: "Hamstrings",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/cYKYGwcg0U8",
  },
  {
    name: "Back Raise (glute ham deck)",
    group: "Hamstrings",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/SBGYSfoqyfU",
  },
  {
    name: "Barbell Good Morning (high bar)",
    group: "Hamstrings",
    type: "Barbell",
    youtubeLink: "https://youtu.be/dEJ0FTm-CEk",
  },
  {
    name: "Barbell Good Morning (low bar)",
    group: "Hamstrings",
    type: "Barbell",
    youtubeLink: "https://youtu.be/mnxn-7SO9Ks",
  },
  {
    name: "Stiff-Legged Deadlift",
    group: "Hamstrings",
    type: "Barbell",
    youtubeLink: "https://youtu.be/CN_7cz3P-1U",
  },
  {
    name: "Barbell Good Morning (safety bar)",
    group: "Hamstrings",
    type: "Barbell",
    youtubeLink: "https://youtu.be/j8OPuafoM2Y",
  },
  {
    name: "Smith Machine Good Morning",
    group: "Hamstrings",
    type: "Smith machine",
    youtubeLink: "https://youtu.be/MCEc1rlnh34",
  },
  {
    name: "Barbell Good Morning (cambered bar)",
    group: "Hamstrings",
    type: "Barbell",
    youtubeLink: "https://youtu.be/oyfG0WPAIWI",
  },
  {
    name: "Lying Leg Curl",
    group: "Hamstrings",
    type: "Machine",
    youtubeLink: "https://youtu.be/n5WDXD_mpVY",
  },
  {
    name: "Seated Leg Curl",
    group: "Hamstrings",
    type: "Machine",
    youtubeLink: "https://youtu.be/Orxowest56U",
  },
  {
    name: "Single-Leg Leg Curl",
    group: "Hamstrings",
    type: "Machine",
    youtubeLink: "https://youtu.be/N6FVnaasdq0",
  },
  {
    name: "Calf Machine",
    group: "Calves",
    type: "Machine",
    youtubeLink: "https://youtu.be/N3awlEyTY98",
  },
  {
    name: "Leg Press Calves",
    group: "Calves",
    type: "Machine",
    youtubeLink: "https://youtu.be/KxEYX_cuesM",
  },
  {
    name: "Stair Calves (single leg)",
    group: "Calves",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/_gEx2ijsmNM",
  },
  {
    name: "Smith Machine Calves",
    group: "Calves",
    type: "Smith machine",
    youtubeLink: "https://youtu.be/hh5516HCu4k",
  },
  {
    name: "Stair Calves",
    group: "Calves",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/__qfDhdByMY",
  },
  {
    name: "Belt Squat Calves",
    group: "Calves",
    type: "Machine",
    youtubeLink: "https://youtu.be/Wp6ocS5Feyg",
  },
  {
    name: "Barbell Bent Over Shrug",
    group: "Traps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/d9daNDIXtK8",
  },
  {
    name: "Barbell Shrug",
    group: "Traps",
    type: "Barbell",
    youtubeLink: "https://youtu.be/M_MjF5Nm_h4",
  },
  {
    name: "Cable Bent Over Shrug",
    group: "Traps",
    type: "Cable",
    youtubeLink: "https://youtu.be/nOn_Bz0zrwQ",
  },
  {
    name: "Cable Shrug",
    group: "Traps",
    type: "Cable",
    youtubeLink: "https://youtu.be/YykmcX2b-LY",
  },
  {
    name: "Cable Side Shrug",
    group: "Traps",
    type: "Cable",
    youtubeLink: "https://youtu.be/2zaT3WAgZi0",
  },
  {
    name: "Cable Single Arm Side Shrug",
    group: "Traps",
    type: "Cable",
    youtubeLink: "https://youtu.be/BeIcUXQ3RDc",
  },
  {
    name: "Dumbbell Bent Over Shrug",
    group: "Traps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/5z7ZtboxbBY",
  },
  {
    name: "Dumbbell Leaning Shrug",
    group: "Traps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/GH_l85Ky3vA",
  },
  {
    name: "Dumbbell Shrug",
    group: "Traps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/_t3lrPI6Ns4",
  },
  {
    name: "Dumbbell Shrug (seated)",
    group: "Traps",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/zgToz5FiI-E",
  },
  {
    name: "Barbell Standing Wrist Curl",
    group: "Forearms",
    type: "Barbell",
    youtubeLink: "https://youtu.be/lfQR7oVS8eo",
  },
  {
    name: "Cable Wrist Curl",
    group: "Forearms",
    type: "Cable",
    youtubeLink: "https://youtu.be/WVAaKJvToe0",
  },
  {
    name: "Dumbbell Bench Wrist Curl",
    group: "Forearms",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/2wPpcJBe03o",
  },
  {
    name: "Dumbbell Standing Wrist Curl",
    group: "Forearms",
    type: "Dumbbell",
    youtubeLink: "https://youtu.be/iQ4JjOK73PE",
  },
  {
    name: "Grip Roller",
    group: "Forearms",
    type: "Machine",
    youtubeLink: "https://youtu.be/JVDkkasvFko",
  },
  {
    name: "Cable Rope Crunch",
    group: "Abs",
    type: "Cable",
    youtubeLink: "https://youtu.be/6GMKPQVERzw",
  },
  {
    name: "Hanging Knee Raise",
    group: "Abs",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/RD_A-Z15ER4",
  },
  {
    name: "Hanging Straight Leg Raise",
    group: "Abs",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/7FwGZ8qY5OU",
  },
  {
    name: "Machine Crunch",
    group: "Abs",
    type: "Machine",
    youtubeLink: "https://youtu.be/-OUSBPnHvsQ",
  },
  {
    name: "Modified Candlestick",
    group: "Abs",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/T_X5rb3G5lk",
  },
  {
    name: "Reaching Sit-Up",
    group: "Abs",
    type: "Bodyweight",
    youtubeLink: "https://youtu.be/pXg8qppif7I",
  },
  {
    name: "Slant Board Sit-Up (weighted)",
    group: "Abs",
    type: "Bodyweight loadable",
    youtubeLink: "https://youtu.be/DAnTf16NcT0",
  },
  {
    name: "V-Up (weighted)",
    group: "Abs",
    type: "Bodyweight loadable",
    youtubeLink: "https://youtu.be/BIOM5eSsJ_8",
  },
];

export const defaultExercises: Exercise[] = baseDefaultExercises.map(
  (exercise, index) => ({
    id: index + 1,
    ...exercise,
    isDefault: true,
  })
);
