export const site = {
  name: "Abdul Muqeet",
  title: "Abdul Muqeet's Portfolio",
  subtitle:
    "Software Developer as an expert in AI/ML and Mobile Application Development",
  profileImage: "/images/Abdul Muqeet.jpg",
  resumeFile: "/Abdul Muqeet's Resume.pdf",
  resumeDownloadName: "Abdul Muqeet's Resume.pdf",
};

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#technologies", label: "Technologies" },
  { href: "#download", label: "Download" },
  { href: "#connect", label: "Connect" },
] as const;

export const aboutParagraphs = [
  "I am a passionate and dedicated software developer with a strong foundation in web development and mobile applications. My journey in technology started with curiosity and has evolved into a commitment to creating innovative solutions that make a difference. I enjoy tackling complex problems and turning them into simple, beautiful, and intuitive designs.",
  "When I'm not coding, I love to explore new technologies, contribute to open-source projects, and continuously improve my skills. I believe in writing clean, efficient code and following best practices to deliver high-quality software solutions.",
];

export const education = [
  {
    image: "/images/COMSATS.png",
    school: "COMSATS University Islamabad, Lahore Campus",
    level: "Bachelor's in Computer Science",
    year: "2022 - Present",
    marks: "CGPA: 3.19",
  },
  {
    image: "/images/PGC.png",
    school: "Punjab College of Science",
    level: "Intermediate in Pre-Medical with Mathematics",
    year: "2019 - 2021",
    marks: "Marks: 957/1100 in Pre-Medical and 164/200 in Mathematics",
  },
  {
    image: "/images/AES.png",
    school: "Adabistan-e-Soophia Higher Seconday School",
    level: "Matriculation in Science",
    year: "2006 - 2019",
    marks: "Marks: 1046/1100",
  },
];

export const experience = {
  intro: "A timeline of professional growth and impactful contributions.",
  items: [
    {
      logo: "/images/DevelopersHub_Corporation.jpeg",
      role: "Flutter Developer Intern",
      company: "DevelopersHub Corporation",
      date: "April 13th, 2026 - May 25th, 2026",
      bullets: [
        "Developed Flutter applications with responsive and userfriendly UI designs.",
        "Integrated REST APIs and displayed JSON data dynamically in Flutter apps.",
        "Configured Firebase Authentication and Firestore database integration.",
        "Used GitHub for version control and project documentation.",
      ],
      tags: ["Flutter", "Frontend", "Backend", "API", "Firestore"],
    },
  ],
};

export const featuredProject = {
  title: "Drowsiness Detection Model",
  image: "/images/Drowsiness Detection Model.png",
  github: "https://github.com/a-muqeet27/Drowsiness-Detection-Model.git",
  description:
    "A Drowsiness Detection Model uses Computer Vision and Machine Learning techniques to monitor eye-closure and yawning in real time to identify signs of drowsiness.",
  tools: [
    "Python",
    "OpenCV",
    "TensorFlow",
    "Keras",
    "PyTorch",
    "NumPy",
    "Pandas",
  ],
};

export const projects = [
  {
    title: "Alert Mate",
    image: "/images/Alert Mate.jpeg",
    github: "https://github.com/a-muqeet27/Alert-Mate-FYP.git",
    description:
      "My Final Year Project of Drowsiness Detection System using Mobile Application and Integrated Model that detects drowsiness using Facial Landmarks Techniques.",
    tools: ["Flutter", "Firebase", "FastAPI", "Python", "OpenCV", "PyTorch"],
  },
  {
    title: "Book Verse",
    image: "/images/Book Verse.png",
    github: "https://github.com/a-muqeet27/BookVerse.git",
    description:
      "BookVerse is a Flutter-based mobile application designed to provide users with a reading experience. The app features to browse, search, and purchase books.",
    tools: ["Flutter", "Firebase"],
  },
  {
    title: "PERG",
    image: "/images/PERG.png",
    github: "https://github.com/a-muqeet27/PERG-Parallel-File-Search-.git",
    description:
      "Parallel File Search project using GUI which is a parallelized version of the traditional grep tool. It improves search performance across large files or multiple files using multi-threading, making it suitable for real-time log analysis and big data environments.",
    tools: ["HTML", "JavaFX", "C++", "OpenMP"],
  },
  {
    title: "Twitter Replica",
    image: "/images/Twitter.jpeg",
    github: "https://github.com/a-muqeet27/Twitter-Replica-.git",
    description:
      "The Twitter Replica is a DSA-based project that simulates functionalities such as posting tweets, and following users. It uses data structures like stack, queues and linked list to manage users.",
    tools: ["Java", "JavaFX"],
  },
  {
    title: "Oil Inventory Management System",
    image: "/images/DATABASE DIAGRAM.png",
    github: "https://github.com/a-muqeet27/Oil-Inventory-Management-System.git",
    description:
      "The Oil Inventory Management System is a database project designed to manage oil products, customers, and stock. It uses relational schema to maintain data integrity. SQL queries are implemented while database views provide simplified access to frequently used inventory information.",
    tools: ["MS SQL"],
  },
  {
    title: "Traffic Signal Recognition",
    image: "/images/Traffic.jpeg",
    github: "https://github.com/a-muqeet27/Traffic-Signal-Recognition",
    description:
      "A traffic signal recognition tool which tells the current signal state when an image is passed to it.",
    tools: ["MATLAB", "Image Processing"],
  },
];

export const technologies = [
  { name: "Flutter", image: "/images/Flutter.png" },
  { name: "HTML5", image: "/images/HTML.png" },
  { name: "CSS3", image: "/images/CSS.png" },
  { name: "C++", image: "/images/C++.png" },
  { name: "Java", image: "/images/Java.png" },
  { name: "Python", image: "/images/Python.png" },
  { name: "Dart", image: "/images/Dart.svg" },
  { name: "JavaScript", image: "/images/JS.png" },
  { name: "OpenCV", image: "/images/OpenCV.png" },
  { name: "TensorFlow", image: "/images/TensorFlow.png" },
  { name: "Scikit-learn", image: "/images/Scikit-learn.png" },
  { name: "PyTorch", image: "/images/PyTorch.png" },
  { name: "FastAPI", image: "/images/FastAPI.png" },
  { name: "REST APIs", image: "/images/REST APIs.png" },
  { name: "Firebase", image: "/images/Firebase.png" },
  { name: "MS SQL Server", image: "/images/MSSQL.webp" },
  { name: "Firebase Firestore", image: "/images/Firebase Firestore.png" },
  { name: "GitHub", image: "/images/Github.png" },
  { name: "VS Code", image: "/images/VS Code.png" },
  { name: "MATLAB", image: "/images/MATLAB.svg" },
  { name: "Google Colab", image: "/images/Colab.svg" },
];

export const socialLinks = [
  {
    href: "https://github.com/a-muqeet27",
    label: "GitHub",
    icon: "github" as const,
  },
  {
    href: "https://www.linkedin.com/in/abdul-muqeet-naeem-744211292/",
    label: "LinkedIn",
    icon: "linkedin" as const,
  },
  {
    href: "mailto:a.muqeet.naeem2711@gmail.com?subject=Portfolio%20Inquiry",
    label: "Email",
    icon: "mail" as const,
  },
  {
    href: "https://wa.me/923247006001",
    label: "WhatsApp",
    icon: "whatsapp" as const,
  },
];
