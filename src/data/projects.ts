export type ProjectGalleryItem = {
  src: string;
  caption?: string;
};

export type Project = {
  title: string;
  image: string;
  github: string;
  description: string;
  tools: string[];
  gallery?: ProjectGalleryItem[];
  highlights?: string[];
  badge?: string;
};

export const featuredProject: Project = {
  title: "Alert Mate",
  image: "/images/Alert Mate.jpeg",
  github: "https://github.com/a-muqeet27/Alert-Mate-FYP.git",
  description:
    "My Final Year Project — a Drowsiness Detection System using a mobile application and integrated model that detects drowsiness using facial landmarks techniques.",
  tools: ["Flutter", "Firebase", "FastAPI", "Python", "OpenCV", "PyTorch"],
  badge: "FINAL YEAR PROJECT",
  gallery: [
    {
      src: "/images/Alert Mate.jpeg",
      caption: "Alert Mate Mobile Application",
    },
    {
      src: "/images/Drowsiness Detection Model.png",
      caption: "Integrated Drowsiness Detection Model",
    },
  ],
  highlights: [
    "Mobile application for drowsiness detection",
    "Integrated model using facial landmarks techniques",
    "Flutter frontend with Firebase backend integration",
    "FastAPI and Python for model serving and processing",
  ],
};

export const projects: Project[] = [
  {
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
    gallery: [
      {
        src: "/images/Drowsiness Detection Model.png",
        caption: "Drowsiness Detection Model Architecture",
      },
    ],
    highlights: [
      "Real-time eye-closure and yawning monitoring",
      "Computer vision and machine learning based detection",
      "Built with OpenCV, TensorFlow, Keras, and PyTorch",
    ],
  },
  {
    title: "Book Verse",
    image: "/images/Book Verse.png",
    github: "https://github.com/a-muqeet27/BookVerse.git",
    description:
      "BookVerse is a Flutter-based mobile application designed to provide users with a reading experience. The app features to browse, search, and purchase books.",
    tools: ["Flutter", "Firebase"],
    gallery: [
      { src: "/images/Book Verse.png", caption: "Book Verse App Interface" },
    ],
    highlights: [
      "Browse, search, and purchase books",
      "Flutter-based mobile reading experience",
      "Firebase powered backend",
    ],
  },
  {
    title: "PERG",
    image: "/images/PERG.png",
    github: "https://github.com/a-muqeet27/PERG-Parallel-File-Search-.git",
    description:
      "Parallel File Search project using GUI which is a parallelized version of the traditional grep tool. It improves search performance across large files or multiple files using multi-threading, making it suitable for real-time log analysis and big data environments.",
    tools: ["HTML", "JavaFX", "C++", "OpenMP"],
    gallery: [{ src: "/images/PERG.png", caption: "PERG Parallel File Search GUI" }],
    highlights: [
      "Parallelized grep-style file search",
      "Multi-threaded performance for large files",
      "GUI built with JavaFX and OpenMP",
    ],
  },
  {
    title: "Twitter Replica",
    image: "/images/Twitter.jpeg",
    github: "https://github.com/a-muqeet27/Twitter-Replica-.git",
    description:
      "The Twitter Replica is a DSA-based project that simulates functionalities such as posting tweets, and following users. It uses data structures like stack, queues and linked list to manage users.",
    tools: ["Java", "JavaFX"],
    gallery: [
      { src: "/images/Twitter.jpeg", caption: "Twitter Replica Application" },
    ],
    highlights: [
      "Tweet posting and user following simulation",
      "Stack, queue, and linked list based user management",
      "Java and JavaFX desktop application",
    ],
  },
  {
    title: "Oil Inventory Management System",
    image: "/images/DATABASE DIAGRAM.png",
    github: "https://github.com/a-muqeet27/Oil-Inventory-Management-System.git",
    description:
      "The Oil Inventory Management System is a database project designed to manage oil products, customers, and stock. It uses relational schema to maintain data integrity. SQL queries are implemented while database views provide simplified access to frequently used inventory information.",
    tools: ["MS SQL"],
    gallery: [
      {
        src: "/images/DATABASE DIAGRAM.png",
        caption: "Database Schema Diagram",
      },
    ],
    highlights: [
      "Manages oil products, customers, and stock",
      "Relational schema with SQL queries and views",
      "MS SQL Server database project",
    ],
  },
  {
    title: "Traffic Signal Recognition",
    image: "/images/Traffic.jpeg",
    github: "https://github.com/a-muqeet27/Traffic-Signal-Recognition",
    description:
      "A traffic signal recognition tool which tells the current signal state when an image is passed to it.",
    tools: ["MATLAB", "Image Processing"],
    gallery: [
      {
        src: "/images/Traffic.jpeg",
        caption: "Traffic Signal Recognition",
      },
    ],
    highlights: [
      "Detects traffic signal state from images",
      "Image processing with MATLAB",
    ],
  },
];
