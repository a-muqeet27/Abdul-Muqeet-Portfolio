export type AppRole =
  | "driver"
  | "passenger"
  | "vehicle-owner"
  | "admin"
  | "emergency";

export type RoleFilter = "all" | AppRole;

export type ShowcaseScreenshot = {
  src: string;
  caption: string;
  role: AppRole;
  variant?: "phone" | "wide";
};

export type ProjectShowcase = {
  poster: { src: string; caption: string };
  thumbnail: { src: string; alt: string };
  demoVideo: {
    label: string;
    url: string;
    type: "youtube" | "video" | "github";
    embedUrl?: string;
  };
  screenshots: ShowcaseScreenshot[];
  features: string[];
  dashboardRoles: string[];
};

export const roleFilters: { id: RoleFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "driver", label: "Driver" },
  { id: "passenger", label: "Passenger" },
  { id: "vehicle-owner", label: "Vehicle Owner" },
  { id: "admin", label: "Admin" },
  { id: "emergency", label: "Emergency Contacts" },
];

const img = (file: string) => `/images/alert-mate/${file}`;

export const alertMateShowcase: ProjectShowcase = {
  poster: {
    src: img("poster.png"),
    caption: "Alert Mate — Final Year Project Poster",
  },
  thumbnail: {
    src: img("Logo.png"),
    alt: "Alert Mate Logo",
  },
  demoVideo: {
    label: "Watch Demo Video",
    url: "https://drive.google.com/file/d/10OwIoC6OKUktm9TGcGTTCZilqyx7abkz/view?usp=sharing",
    type: "video",
    embedUrl:
      "https://drive.google.com/file/d/10OwIoC6OKUktm9TGcGTTCZilqyx7abkz/preview",
  },
  screenshots: [
    { src: img("d1.jpg"), caption: "Drowsiness Monitoring", role: "driver" },
    { src: img("d2.jpg"), caption: "Drowsiness Monitoring", role: "driver" },
    { src: img("d3.jpg"), caption: "History", role: "driver" },
    { src: img("d4.jpg"), caption: "Live Monitoring", role: "driver" },
    { src: img("d5.jpg"), caption: "Live Monitoring", role: "driver" },
    {
      src: img("map.jpg"),
      caption: "Live Driver Tracking",
      role: "driver",
      variant: "wide",
    },
    {
      src: img("p1.jpg"),
      caption: "Connect with Driver",
      role: "passenger",
    },
    {
      src: img("p2.jpg"),
      caption: "Connect with Driver",
      role: "passenger",
    },
    {
      src: img("p3.jpg"),
      caption: "Connect with Driver",
      role: "passenger",
    },
    {
      src: img("p4.jpg"),
      caption: "Send Emergency Alert",
      role: "passenger",
    },
    { src: img("o1.jpg"), caption: "Add Vehicle", role: "vehicle-owner" },
    {
      src: img("o2.jpg"),
      caption: "Fleet Overview",
      role: "vehicle-owner",
    },
    { src: img("a1.png"), caption: "Statistics", role: "admin" },
    { src: img("a2.png"), caption: "User Registry", role: "admin" },
    { src: img("a3.png"), caption: "Vehicle Registry", role: "admin" },
    { src: img("a4.png"), caption: "Recent Activities", role: "admin" },
    { src: img("e1.jpg"), caption: "Emergency", role: "emergency" },
    { src: img("e2.jpg"), caption: "Emergency", role: "emergency" },
    { src: img("e3.jpg"), caption: "Emergency", role: "emergency" },
  ],
  features: [
    "Drowsiness Monitoring",
    "Facial Landmarks Tracking",
    "Driver Fatigue Analysis",
    "Emergency Alerts",
    "Live Driver Tracking",
    "Vehicle(s) Registration",
    "Verification System",
    "Emergency Calls",
    "Push Notifications",
    "Separate Dashboards for Different User Roles",
  ],
  dashboardRoles: [
    "Driver",
    "Vehicle Owner",
    "Passenger",
    "Administrator",
  ],
};
