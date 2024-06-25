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
    youtubeLink: "",
  },
  {
    name: "Bench Press (narrow grip)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Pushup (narrow grip)",
    group: "Chest",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Smith Machine Bench Press (wide grip)",
    group: "Chest",
    type: "Smith machine",
    youtubeLink: "",
  },
  {
    name: "Smith Machine Bench Press (medium grip)",
    group: "Chest",
    type: "Smith machine",
    youtubeLink: "",
  },
  {
    name: "Smith Machine Bench Press (narrow grip)",
    group: "Chest",
    type: "Smith machine",
    youtubeLink: "",
  },
  {
    name: "Bench Press (wide grip)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Cable Flye (bent over)",
    group: "Chest",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Flye",
    group: "Chest",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Flye (underhand)",
    group: "Chest",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Bench Press (cambered bar)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Flye (flat)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Press Flye (flat)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Cable Flye (high)",
    group: "Chest",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Flye (incline)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Press Flye (incline)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Machine Flye",
    group: "Chest",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Pec Dec Flye",
    group: "Chest",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Press (incline)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Machine Chest Press (incline)",
    group: "Chest",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Bench Press (incline, medium grip)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Bench Press (incline, narrow grip)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Bench Press (incline, wide grip)",
    group: "Chest",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Press (low incline)",
    group: "Chest",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Smith Machine Press (incline, wide grip)",
    group: "Chest",
    type: "Smith machine",
    youtubeLink: "",
  },
  {
    name: "Smith Machine Press (incline, medium grip)",
    group: "Chest",
    type: "Smith machine",
    youtubeLink: "",
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
    youtubeLink: "",
  },
  {
    name: "Dumbbell Row (2-Arm)",
    group: "Back",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Bent Over Row",
    group: "Back",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Row to Chest",
    group: "Back",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Chest Supported Row",
    group: "Back",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Seated Cable Row",
    group: "Back",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Row (single-arm, supported)",
    group: "Back",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "EZ Bar Row (underhand)",
    group: "Back",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Cambered Bar Row",
    group: "Back",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Hammer Machine Row (high)",
    group: "Back",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Hammer Machine Row (low)",
    group: "Back",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Row (2-Arm, incline)",
    group: "Back",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Inverted Row",
    group: "Back",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Machine Chest Supported Row",
    group: "Back",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Seal Row",
    group: "Back",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Smith Machine Row",
    group: "Back",
    type: "Smith machine",
    youtubeLink: "",
  },
  {
    name: "T-Bar Row",
    group: "Back",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Cable Flexion Row",
    group: "Back",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Row to Hips",
    group: "Back",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Assisted Pullup (normal grip)",
    group: "Back",
    type: "Machine assistance",
    youtubeLink: "",
  },
  {
    name: "Assisted Pullup (parallel grip)",
    group: "Back",
    type: "Machine assistance",
    youtubeLink: "",
  },
  {
    name: "Assisted Pullup (underhand grip)",
    group: "Back",
    type: "Machine assistance",
    youtubeLink: "",
  },
  {
    name: "Assisted Pullup (wide grip)",
    group: "Back",
    type: "Machine assistance",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Pullover",
    group: "Back",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Machine Pullover",
    group: "Back",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Pulldown (narrow grip)",
    group: "Back",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Pulldown (normal grip)",
    group: "Back",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Pullup (normal grip)",
    group: "Back",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Pullup (parallel grip)",
    group: "Back",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Pulldown (parallel grip)",
    group: "Back",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Pulldown (straight arm)",
    group: "Back",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Pulldown (underhand grip)",
    group: "Back",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Pullup (underhand grip)",
    group: "Back",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Pulldown (wide grip)",
    group: "Back",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Pullup (wide grip)",
    group: "Back",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Pulldown (upright torso to abs)",
    group: "Back",
    type: "Cable",
    youtubeLink: "",
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
    youtubeLink: "",
  },
  {
    name: "Barbell Skullcrusher",
    group: "Triceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Cable Triceps Pushdown (bar)",
    group: "Triceps",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Dip",
    group: "Triceps",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Skullcrusher",
    group: "Triceps",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Inverted Skullcrusher",
    group: "Triceps",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Cable Triceps Pushdown (rope)",
    group: "Triceps",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Triceps Pushdown (single-arm)",
    group: "Triceps",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "JM Press",
    group: "Triceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Machine Triceps Pushdown",
    group: "Triceps",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Barbell Overhead Triceps Extension",
    group: "Triceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Cable Overhead Triceps Extension",
    group: "Triceps",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Overhead Triceps Extension (rope)",
    group: "Triceps",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "EZ Bar Overhead Triceps Extension",
    group: "Triceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Machine Triceps Extension",
    group: "Triceps",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Barbell Overhead Triceps Extension (seated)",
    group: "Triceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "EZ Bar Overhead Triceps Extension (seated)",
    group: "Triceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Overhead Extension (single-arm)",
    group: "Triceps",
    type: "Dumbbell",
    youtubeLink: "",
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
    youtubeLink: "",
  },
  {
    name: "Dumbbell Curl (2-Arm)",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Curl (alternating)",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Curl (narrow grip)",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Curl (normal grip)",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Cable Curl",
    group: "Biceps",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Curl (EZ bar)",
    group: "Biceps",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Curl (EZ bar, wide grip)",
    group: "Biceps",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Preacher Curl (single-arm)",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Spider Curl",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Twist Curl",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "EZ Bar Curl (narrow grip)",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "EZ Bar Curl (wide grip)",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "EZ Bar Preacher Curl",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "EZ Bar Spider Curl",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "EZ Bar Curl (normal grip)",
    group: "Biceps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Hammer Curl",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Curl (incline)",
    group: "Biceps",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Machine Preacher Curl",
    group: "Biceps",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Freemotion Curl (facing machine)",
    group: "Biceps",
    type: "Freemotion",
    youtubeLink: "",
  },
  {
    name: "Freemotion Curl (facing away)",
    group: "Biceps",
    type: "Freemotion",
    youtubeLink: "",
  },
  {
    name: "Freemotion Curl (single-arm)",
    group: "Biceps",
    type: "Freemotion",
    youtubeLink: "",
  },
  {
    name: "Machine Shoulder Press",
    group: "Shoulders",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Barbell Upright Row",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Cable Cross Body Lateral Raise",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Leaning Lateral Raise",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Upright Row",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Lateral Raise",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Upright Row",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Machine Lateral Raise",
    group: "Shoulders",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Smith Machine Upright Row",
    group: "Shoulders",
    type: "Smith machine",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Lateral Raise (thumbs down)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Lateral Raise (top hold)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Lateral Raise (super ROM)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Freemotion Y-Raises",
    group: "Shoulders",
    type: "Freemotion",
    youtubeLink: "",
  },
  {
    name: "Freemotion Y-Raises (paused)",
    group: "Shoulders",
    type: "Freemotion",
    youtubeLink: "",
  },
  {
    name: "Barbell Facepull",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Cable Cross Body Bent Lateral Raise",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Rope Facepull",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Single Arm Rear Delt Raise",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Bent Lateral Raise",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Facepull",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Facepull (incline)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Lateral Raise (incline)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Cable Rope Facepull (kneeling)",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Machine Reverse Flye",
    group: "Shoulders",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Freemotion Rear Delt Flyes",
    group: "Shoulders",
    type: "Freemotion",
    youtubeLink: "",
  },
  {
    name: "Freemotion Rear Delt Flyes (paused)",
    group: "Shoulders",
    type: "Freemotion",
    youtubeLink: "",
  },
  {
    name: "Barbell Front Raise",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Cable Front Raise (underhand)",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Front Raise",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Front Raise (EZ bar, underhand)",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Press (high incline)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Shoulder Press (seated)",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Shoulder Press (seated)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Smith Machine Shoulder Press (seated)",
    group: "Shoulders",
    type: "Smith machine",
    youtubeLink: "",
  },
  {
    name: "Barbell Shoulder Press (standing)",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Shoulder Press (standing)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Bent Over Shrug",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Shrug",
    group: "Shoulders",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Cable Bent Over Shrug",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Shrug",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Side Shrug",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Single Arm Side Shrug",
    group: "Shoulders",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Bent Over Shrug",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Leaning Shrug",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Shrug",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Shrug (seated)",
    group: "Shoulders",
    type: "Dumbbell",
    youtubeLink: "",
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
    youtubeLink: "",
  },
  {
    name: "Walking Lunges (quad-focused, bodyweight)",
    group: "Quads",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Barbell Split Squat",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Belt Squat",
    group: "Quads",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Barbell Squat (close stance, feet forward)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Front Squat",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Front Squat (cross grip)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Hack Squat",
    group: "Quads",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Barbell Squat (high bar)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Leg Extension",
    group: "Quads",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Leg Press",
    group: "Quads",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Barbell Squat (narrow stance)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Sissy Squat (machine)",
    group: "Quads",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Sissy Squat (no machine)",
    group: "Quads",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Pendulum Squat",
    group: "Quads",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Barbell Squat (safety bar)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Squat (cambered bar)",
    group: "Quads",
    type: "Barbell",
    youtubeLink: "",
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
    youtubeLink: "",
  },
  {
    name: "Barbell Hip Thrust",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Machine Glute Kickback",
    group: "Glutes",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Hip Thrust (single leg)",
    group: "Glutes",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Reverse Lunge (dumbbell)",
    group: "Glutes",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Walking Lunges (glute-focused, dumbbell)",
    group: "Glutes",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Cable Pull Through",
    group: "Glutes",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Deadlift",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Deadlift (deficit 25's)",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Deadlift (deficit)",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Split Squat",
    group: "Glutes",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Deadlift (sumo stance)",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Squat (sumo stance)",
    group: "Glutes",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Belt Squat (wide stance)",
    group: "Glutes",
    type: "Machine",
    youtubeLink: "",
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
    youtubeLink: "",
  },
  {
    name: "Dumbbell Stiff Legged Deadlift",
    group: "Hamstrings",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Back Raise (glute ham deck)",
    group: "Hamstrings",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Barbell Good Morning (high bar)",
    group: "Hamstrings",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Good Morning (low bar)",
    group: "Hamstrings",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Stiff-Legged Deadlift",
    group: "Hamstrings",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Good Morning (safety bar)",
    group: "Hamstrings",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Smith Machine Good Morning",
    group: "Hamstrings",
    type: "Smith machine",
    youtubeLink: "",
  },
  {
    name: "Barbell Good Morning (cambered bar)",
    group: "Hamstrings",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Lying Leg Curl",
    group: "Hamstrings",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Seated Leg Curl",
    group: "Hamstrings",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Single-Leg Leg Curl",
    group: "Hamstrings",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Calf Machine",
    group: "Calves",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Leg Press Calves",
    group: "Calves",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Stair Calves (single leg)",
    group: "Calves",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Smith Machine Calves",
    group: "Calves",
    type: "Smith machine",
    youtubeLink: "",
  },
  {
    name: "Stair Calves",
    group: "Calves",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Belt Squat Calves",
    group: "Calves",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Barbell Bent Over Shrug",
    group: "Traps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Shrug",
    group: "Traps",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Cable Bent Over Shrug",
    group: "Traps",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Shrug",
    group: "Traps",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Side Shrug",
    group: "Traps",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Cable Single Arm Side Shrug",
    group: "Traps",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Bent Over Shrug",
    group: "Traps",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Leaning Shrug",
    group: "Traps",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Shrug",
    group: "Traps",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Shrug (seated)",
    group: "Traps",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Barbell Standing Wrist Curl",
    group: "Forearms",
    type: "Barbell",
    youtubeLink: "",
  },
  {
    name: "Cable Wrist Curl",
    group: "Forearms",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Bench Wrist Curl",
    group: "Forearms",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Dumbbell Standing Wrist Curl",
    group: "Forearms",
    type: "Dumbbell",
    youtubeLink: "",
  },
  {
    name: "Grip Roller",
    group: "Forearms",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Cable Rope Crunch",
    group: "Abs",
    type: "Cable",
    youtubeLink: "",
  },
  {
    name: "Hanging Knee Raise",
    group: "Abs",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Hanging Straight Leg Raise",
    group: "Abs",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Machine Crunch",
    group: "Abs",
    type: "Machine",
    youtubeLink: "",
  },
  {
    name: "Modified Candlestick",
    group: "Abs",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Reaching Sit-Up",
    group: "Abs",
    type: "Bodyweight",
    youtubeLink: "",
  },
  {
    name: "Slant Board Sit-Up (weighted)",
    group: "Abs",
    type: "Bodyweight loadable",
    youtubeLink: "",
  },
  {
    name: "V-Up (weighted)",
    group: "Abs",
    type: "Bodyweight loadable",
    youtubeLink: "",
  },
];

export const defaultExercises: Exercise[] = baseDefaultExercises.map(
  (exercise, index) => ({
    id: index + 1,
    ...exercise,
    isDefault: true,
  })
);
