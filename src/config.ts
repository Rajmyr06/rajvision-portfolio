export type ProjectStatus = "completed" | "in-progress";

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  status: ProjectStatus;
  featured: boolean;
  role: string;
  teamType: "individual" | "team";
  technologies: string[];
  image: string;
  imageAlt: string;
  description: string;
  highlights: string[];
  repository?: string;
  liveDemo?: string;
  externalLink?: string;
}

export const config = {
  hero: {
    eyebrow: "Informatics Student",
    primaryRole: "Software Developer",
    secondaryRole: "Applied Machine Learning",
  },
  developer: {
    name: "Rohit",
    fullName: "Rohit Raj",
    title: "Software Developer & Applied Machine Learning Enthusiast",
    description:
      "Informatics student focused on software engineering, Laravel backend development, applied machine learning, and user-centered digital products.",
  },
  social: {
    github: "Rajmyr06",
    email: "rohitraj06222005@gmail.com",
    location: "Yogyakarta, Indonesia",
  },
  about: {
    title: "About Me",
    description:
      "I’m an Informatics undergraduate and aspiring Laravel Full-Stack Software Engineer focused on building reliable, maintainable web applications. My work covers Laravel-based backend systems, database design, REST APIs, authentication, responsive interfaces, and applied machine learning for real-world problems. With a background in UI/UX and multimedia, I approach software as both an engineering system and a user-centered product combining clean implementation with functional and visually coherent experiences.",
  },
  experiences: [
    {
      position: "Full-Stack Developer",
      company: "MediLabs — Academic Software Project",
      period: "2026",
      location: "Universitas Ahmad Dahlan",
      description:
        "Built and refined a Laravel-based clinical laboratory reservation system covering authentication, role-based access, patient data, reservation workflows, REST APIs, and automated feature tests.",
      responsibilities: [
        "Implemented patient and administrator workflows",
        "Applied ownership validation and role-based authorization",
        "Documented the API, database, setup, and test coverage",
      ],
      technologies: [
        "Laravel",
        "PHP",
        "MySQL",
        "Blade",
        "REST API",
        "Feature Testing",
      ],
    },
    {
      position: "Machine Learning Researcher",
      company: "Hematology Classification Research",
      period: "2026 - Present",
      location: "Academic Research",
      description:
        "Conducting a comparative study of Random Forest and XGBoost for multiclass hematology data, with attention to preprocessing, class imbalance, macro metrics, and SHAP-based interpretation.",
      responsibilities: [
        "Prepared a reproducible preprocessing and evaluation workflow",
        "Compared ensemble models using class-aware metrics",
        "Documented limitations and non-diagnostic use",
      ],
      technologies: [
        "Python",
        "pandas",
        "scikit-learn",
        "XGBoost",
        "SMOTE",
        "SHAP",
      ],
    },
    {
      position: "Product Developer",
      company: "Planora — Independent Project",
      period: "2025 - 2026",
      location: "Independent Project",
      description:
        "Developed a student productivity application combining task management, finance tracking, attendance, reminders, notifications, and personal account management.",
      responsibilities: [
        "Designed mobile-first product workflows",
        "Implemented authentication and per-user data",
        "Built task, finance, attendance, and profile features",
      ],
      technologies: ["JavaScript", "Supabase", "Database", "Responsive Design"],
    },
    {
      position: "Founder & Creative Lead",
      company: "Luxyer Studio",
      period: "2025 - Present",
      location: "Indonesia",
      description:
        "Developing an independent streetwear brand through product concepts, apparel design, visual identity, campaign content, and a digital pre-order experience.",
      responsibilities: [
        "Created the visual identity and product direction",
        "Designed apparel and campaign materials",
        "Developed the digital pre-order presence",
      ],
      technologies: ["Brand Identity", "Figma", "Apparel Design", "Web Design"],
    },
  ],
  projects: [
    {
      id: 1,
      slug: "medilabs",
      title: "MediLabs",
      subtitle: "Clinical Laboratory Reservation System",
      category: "Software Engineering",
      year: "2026",
      status: "completed",
      featured: true,
      role: "Full-Stack Developer",
      teamType: "team",
      technologies: [
        "Laravel 13",
        "PHP 8.3",
        "MySQL",
        "Blade",
        "REST API",
        "Feature Testing",
      ],
      image: "/images/projects/medilabs-thumbnail.webp",
      imageAlt:
        "MediLabs patient and administrator laboratory reservation interfaces",
      description:
        "A web-based clinical laboratory reservation and patient registration system with role-based access, service management, queue numbers, reservation status workflows, CSV export, and automated testing.",
      highlights: [
        "Patient and administrator authorization",
        "Reservation ownership validation",
        "Documented database, API, and test workflow",
      ],
      repository:
        "https://github.com/Rohitrraj/RPL2026-Projek-Medilabs",
    },
    {
      id: 2,
      slug: "hematology-machine-learning",
      title: "Hematology ML Analysis",
      subtitle: "Random Forest vs XGBoost Classification Study",
      category: "Machine Learning Research",
      year: "2026",
      status: "in-progress",
      featured: true,
      role: "Machine Learning Researcher",
      teamType: "individual",
      technologies: [
        "Python",
        "pandas",
        "scikit-learn",
        "Random Forest",
        "XGBoost",
        "SMOTE",
        "SHAP",
      ],
      image: "/images/projects/hematology-ml-thumbnail.webp",
      imageAlt:
        "Notebook code for hematology classification using Random Forest, XGBoost, SMOTE, and SHAP",
      description:
        "A reproducible comparative study of ensemble models for multiclass hematology data, emphasizing imbalanced classification, macro evaluation metrics, and interpretable results.",
      highlights: [
        "Stratified evaluation and cross-validation",
        "Class imbalance handling with SMOTE",
        "SHAP-based feature interpretation",
      ],
    },
    {
      id: 3,
      slug: "planora",
      title: "Planora",
      subtitle: "Student Productivity & Personal Management",
      category: "Web Application",
      year: "2025",
      status: "completed",
      featured: true,
      role: "Product Developer",
      teamType: "individual",
      technologies: ["JavaScript", "Supabase", "Authentication", "Responsive UI"],
      image: "/images/projects/planora-thumbnail.webp",
      imageAlt: "Planora student productivity dashboard",
      description:
        "A student-focused productivity platform combining tasks, finance, attendance, reminders, notifications, profile management, and per-user data in one responsive experience.",
      highlights: [
        "Authentication and isolated user data",
        "Task, finance, and attendance workflows",
        "Mobile-first responsive interface",
      ],
      liveDemo: "https://planoratodo.netlify.app/",
    },
    {
      id: 4,
      slug: "ai-painting-classification",
      title: "AI Painting Style Classification",
      subtitle: "Image Classification for Painting Styles",
      category: "Deep Learning",
      year: "2025",
      status: "completed",
      featured: true,
      role: "Machine Learning Developer",
      teamType: "individual",
      technologies: [
        "Python",
        "TensorFlow",
        "CNN",
        "Image Processing",
        "Streamlit",
      ],
      image: "/images/projects/ai-painting-thumbnail.webp",
      imageAlt: "Painting style classification inference interface",
      description:
        "An image classification project that explores painting-style recognition through dataset preprocessing, CNN training, model evaluation, and an interactive prediction interface.",
      highlights: [
        "Image preprocessing and model training",
        "Class-level evaluation",
        "Interactive inference interface",
      ],
    },
    {
      id: 5,
      slug: "parking-management",
      title: "Parking Management App",
      subtitle: "Mobile Parking Reservation & Management",
      category: "Mobile Development",
      year: "2025",
      status: "completed",
      featured: false,
      role: "Mobile Developer",
      teamType: "individual",
      technologies: ["Kotlin", "Android Studio", "Firebase", "Material Design"],
      image: "/images/projects/parking-app-thumbnail.webp",
      imageAlt: "Parking management Android application screens",
      description:
        "An Android application for discovering parking locations, managing reservations, monitoring booking status, and presenting a clear mobile-first parking flow.",
      highlights: [
        "Firebase-backed mobile data",
        "Reservation and status workflow",
        "Multi-screen Android interface",
      ],
    },
    {
      id: 6,
      slug: "luxyer-studio",
      title: "Luxyer Studio",
      subtitle: "Streetwear Brand & Digital Pre-order Experience",
      category: "Creative Product",
      year: "2025 — Present",
      status: "in-progress",
      featured: false,
      role: "Founder & Creative Lead",
      teamType: "individual",
      technologies: [
        "Brand Strategy",
        "Figma",
        "Apparel Design",
        "Visual Direction",
        "Web Design",
      ],
      image: "/images/projects/luxyer-studio-thumbnail-v2.webp",
      imageAlt:
        "Luxyer Studio Drop 001 streetwear collection with black and white apparel mockups",
      description:
        "An independent streetwear project combining brand strategy, apparel design, visual storytelling, campaign direction, and a web-based pre-order presence.",
      highlights: [
        "Brand and product direction",
        "Apparel and campaign design",
        "Digital pre-order experience",
      ],
      liveDemo: "https://preorderluxyer.netlify.app/",
    },
    {
      id: 7,
      slug: "campus-media-production",
      title: "Campus Media Production",
      subtitle: "Video Profile, Event Documentation & Visual Storytelling",
      category: "Selected Creative Work",
      year: "2024 — 2026",
      status: "completed",
      featured: false,
      role: "Multimedia Production",
      teamType: "team",
      technologies: [
        "Videography",
        "Video Editing",
        "Storyboarding",
        "Production",
      ],
      image: "/images/projects/campus-media-thumbnail-v2.webp",
      imageAlt:
        "Behind-the-scenes campus video production with a clapperboard and camera crew",
      description:
        "Selected campus production work covering organization profiles, event documentation, storyboarding, shooting, editing, and an award-winning video profile.",
      highlights: [
        "Collaborative production workflow",
        "Visual narrative and editing",
        "Award-winning organization profile",
      ],
    },
    {
      id: 8,
      slug: "uiux-learning-path",
      title: "UI/UX Learning Path",
      subtitle: "Interactive Learning Product Prototype",
      category: "UI/UX Design",
      year: "2025",
      status: "completed",
      featured: false,
      role: "Product Designer",
      teamType: "individual",
      technologies: ["Figma", "User Flow", "Wireframing", "Prototyping"],
      image: "/images/projects/uiux-learning-path-thumbnail.webp",
      imageAlt: "UI UX learning path application prototype",
      description:
        "A product interface concept that organizes UI/UX learning into an approachable path, supported by user flow, interface exploration, and an interactive prototype.",
      highlights: [
        "Structured learning flow",
        "Responsive interface exploration",
        "Interactive Figma prototype",
      ],
      externalLink:
        "https://www.figma.com/proto/hzOtYyFUiYL7aHikh4iRLc/Nexoria.AI?node-id=0-1&t=IGWXgyfmxTji5nOE-1",
    },
    {
      id: 9,
      slug: "learn-trade-with-raj",
      title: "Learn Trade with Raj",
      subtitle: "Crypto & Forex Learning Tracker",
      category: "Educational Web Application",
      year: "2025",
      status: "completed",
      featured: false,
      role: "Web Developer",
      teamType: "individual",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Local Storage",
        "Responsive Design",
      ],
      image: "/images/projects/learn-trade-with-raj-thumbnail.webp",
      imageAlt:
        "Learn Trade with Raj dashboard showing Crypto and Forex learning progress",
      description:
        "A beginner-friendly learning tracker that combines 20 structured Crypto and Forex lessons, progress monitoring, a seven-day learning streak, trade journaling, and interactive quizzes without presenting financial advice.",
      highlights: [
        "Ten Crypto and ten Forex learning modules",
        "Progress, streak, and quiz tracking",
        "Local trading journal with browser-based persistence",
      ],
      liveDemo: "https://learntradewithraj.netlify.app/",
    },
  ] satisfies Project[],
  contact: {
    email: "rohitraj06222005@gmail.com",
    github: "https://github.com/Rajmyr06",
    linkedin: "https://www.linkedin.com/in/rohit-raj-8694a6266/",
    resume: "/documents/Rohit_Raj_CV_ATS.pdf",
  },
  skills: {
    develop: {
      title: "SOFTWARE ENGINEERING",
      description: "Maintainable web applications and backend systems",
      details:
        "Building web applications with Laravel, PHP, MySQL, REST APIs, authentication, authorization, database design, automated tests, and responsive interfaces.",
      tools: [
        "Laravel",
        "PHP",
        "MySQL",
        "REST API",
        "Blade",
        "JavaScript",
        "Git",
        "GitHub",
      ],
    },
    design: {
      title: "APPLIED MACHINE LEARNING",
      description: "Reproducible analysis and interpretable models",
      details:
        "Working with structured data, preprocessing, imbalanced classification, Random Forest, XGBoost, class-aware evaluation, and SHAP-based interpretation.",
      tools: [
        "Python",
        "pandas",
        "NumPy",
        "scikit-learn",
        "Random Forest",
        "XGBoost",
        "SMOTE",
        "SHAP",
      ],
    },
  },
};
