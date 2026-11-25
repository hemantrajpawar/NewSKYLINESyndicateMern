// Central brand, contact and imagery configuration.
// Contact details are provisional: verify every value before launch.
// Nothing in the public UI should hardcode a phone number, email or handle.

export const siteConfig = {
  name: "Skyline Syndicate",
  legalName: "Skyline Syndicate Advisory LLP",
  descriptor: "Premium Real Estate Consulting & Advisory",
  tagline: "Spaces for a better tomorrow.",
  establishedYear: 2026,
  city: "Pune",
  region: "Maharashtra",
  locationLabel: "Pune · Maharashtra",
  logo: {
  url: "/images/logo.png",
  alt: "Skyline Syndicate emblem",
},
  contact: {
    // PROVISIONAL — pending verification.
    phoneDisplay: "+91 93 0735 1976",
    phoneHref: "tel:+919307351976",
    email: "enquire.skylinesyndicate@gmail.com",
    whatsappNumber: "919307351976",
    whatsappMessage:
      "Hello Skyline Syndicate, I would like to request a private advisory consultation.",
    instagramUrl: "https://www.instagram.com/skyline__syndicate?utm_source=qr&knvt=bXBydDQyYXg1anl2",
    instagramHandle: "@SKYLINE_SYNDICATE",
    addressLines: [
      "Excella Co-working",
      "Baner - Balewadi Rd, near Syngenta, Laxman Nagar",
      " Baner, Pune, Maharashtra 411045",
    ],
    hours: [
      { day: "Monday – Friday", time: "9:00 – 19:00" },
      { day: "Saturday", time: "9:00 – 19:00" },
      { day: "Sunday", time: "By appointment" },
    ],
  },
  nav: [
    { label: "Services", to: "/services" },
    { label: "Our Approach", to: "/approach" },
    { label: "About Us", to: "/about" },
    { label: "Insights", to: "/insights" },
    { label: "Contact Us", to: "/contact" },
  ],
  microMarkets: [
    "Koregaon Park",
    "Kalyani Nagar",
    "Viman Nagar",
    "Baner",
    "Balewadi",
    "Kharadi",
    "Aundh",
    "Senapati Bapat Road",
    "Bhosale Nagar",
    "Hinjawadi IT Corridor",
    "Chakan–Talegaon Industrial Axis",
  ],
};

export const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.contact.whatsappMessage
)}`;

export const mailtoHref = `mailto:${siteConfig.contact.email}`;

const MEDIA = "https://media.base44.com/images/public/6adb0d688126b98173c16ee9";

export const images = {
  hero: "/images/hero.png",
  courtyard: "/images/courtyard.png",
  material: "/images/material.png",
  puneDusk: "/images/pune-dusk.png",
  residential: "/images/residential.png",
  commercial: "/images/commercial.png",
  luxury: "/images/luxury.png",
  land: "/images/land.png",
  industrial: "/images/industrial.png",
  selling: "/images/selling.png",
  metro: "/images/metro.png",
  facadeGeometry: "/images/facade-geometry.png",
  apartment: "/images/apartment.png",
  glassReflection: "/images/glass-reflection.png",
};