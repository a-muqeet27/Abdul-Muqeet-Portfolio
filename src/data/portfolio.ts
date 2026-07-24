export const site = {
  name: "Abdul Muqeet",
  title: "Abdul Muqeet's Portfolio",
  subtitle:
    "Software Developer as an expert in AI/ML and Development",
  profileImage: "/images/Abdul Muqeet.jpg",
  resumeFile: "/Abdul Muqeet's Resume.pdf",
  resumeDownloadName: "Abdul Muqeet's Resume.pdf",
};

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
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
    level: "Bachelor of Science in Computer Science",
    year: "2022 - 2026",
    marks: "CGPA: 3.24",
  },
  {
    image: "/images/PGC.png",
    school: "Punjab College of Science",
    level: "FSc. Intermediate in Pre-Medical with Mathematics",
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
      logo: "/images/NETSOL.png",
      role: "Full Stack Development Engineering Intern",
      company: "NETSOL Technologies",
      date: "July 8th, 2026 - Present",
      bullets: [
        "Developing web applications using MVC (.NET 10) architecture.",
        "Building CRUD-based applications using Controllers, Views, Models, and Razor Pages/View Engine.",
        "Creating and managing database using Entity Framework Core.",
      ],
      tags: [".NET 10", "Entity Framework", "MVC"],
    },
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

export { featuredProject, projects } from "./projects";
export type { Project, ProjectGalleryItem } from "./projects";

export const technologies = [
  { name: "Flutter", image: "/images/Flutter.png", category: "mobile" as const },
  { name: "Dart", image: "/images/Dart.svg", category: "mobile" as const },
  { name: "HTML5", image: "/images/HTML.png", category: "web" as const },
  { name: "CSS3", image: "/images/CSS.png", category: "web" as const },
  { name: "JavaScript", image: "/images/JS.png", category: "web" as const },
  { name: "React.js", image: "/images/react.svg", category: "web" as const },
  { name: "Tailwind CSS", image: "/images/tailwind.svg", category: "web" as const },
  { name: "C++", image: "/images/C++.png", category: "languages" as const },
  { name: "C#", image: "/images/csharp.svg", category: "languages" as const },
  { name: "Java", image: "/images/Java.png", category: "languages" as const },
  { name: "Python", image: "/images/Python.png", category: "languages" as const },
  { name: "OpenCV", image: "/images/OpenCV.png", category: "ai-ml" as const },
  { name: "TensorFlow", image: "/images/TensorFlow.png", category: "ai-ml" as const },
  { name: "Scikit-learn", image: "/images/Scikit-learn.png", category: "ai-ml" as const },
  { name: "PyTorch", image: "/images/PyTorch.png", category: "ai-ml" as const },
  { name: "FastAPI", image: "/images/FastAPI.png", category: "backend" as const },
  { name: ".NET 10", image: "/images/dotnet.svg", category: "backend" as const },
  { name: "Node.js", image: "/images/nodejs.svg", category: "backend" as const },
  { name: "Express.js", image: "/images/express.svg", category: "backend" as const },
  { name: "REST APIs", image: "/images/REST APIs.png", category: "backend" as const },
  { name: "Firebase", image: "/images/Firebase.png", category: "database" as const },
  { name: "MS SQL Server", image: "/images/MSSQL.webp", category: "database" as const },
  {
    name: "Entity Framework",
    image: "/images/entity-framework.svg",
    category: "database" as const,
  },
  {
    name: "Firebase Firestore",
    image: "/images/Firebase Firestore.png",
    category: "database" as const,
  },
  { name: "GitHub", image: "/images/Github.png", category: "tools" as const },
  { name: "VS Code", image: "/images/VS Code.png", category: "tools" as const },
  { name: "MATLAB", image: "/images/MATLAB.svg", category: "tools" as const },
  { name: "Google Colab", image: "/images/Colab.svg", category: "tools" as const },
];

export const techCategories = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "languages", label: "Languages" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "tools", label: "Tools" },
] as const;

export type TechCategoryId = (typeof techCategories)[number]["id"];

export const aboutStats = [
  { label: "Projects Built", value: 17, decimals: 0 },
  { label: "Technologies", value: technologies.length, decimals: 0 },
  { label: "CGPA", value: 3.24, decimals: 2 },
] as const;

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
