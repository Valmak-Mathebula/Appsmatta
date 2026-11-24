// =====================================================================
// EDIT THIS FILE to change prices, WhatsApp number and support hours.
// Everything on the website reads from here.
// =====================================================================

// International format, no "+", no spaces. e.g. South Africa 082 123 4567 -> 27821234567
export const WHATSAPP_NUMBER = "27764674483";

export const whatsappLink = (message = "Hi AppsMatta, I'd like a free website sample.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const EMAIL = "info@appsmatta.com";

export const packages = [
  {
    name: "Starter",
    pages: "1 page",
    price: 350,
    priceLabel: "R350",
    tagline: "One powerful page that gets you found.",
    features: [
      "Single-page website",
      "Mobile friendly design",
      "WhatsApp & contact buttons",
      "Contact details & map",
      "Free 1-week live sample",
    ],
  },
  {
    name: "Standard",
    pages: "3 pages",
    price: 600,
    priceLabel: "R600",
    popular: true,
    tagline: "Everything a small business needs.",
    features: [
      "Home page",
      "Products or Services page",
      "Contact page with enquiry form",
      "Mobile friendly design",
      "Free 1-week live sample",
    ],
  },
  {
    name: "Business",
    pages: "5 to 10 pages",
    price: 1500,
    priceLabel: "R1,500",
    tagline: "A full website for a growing business.",
    features: [
      "Up to 10 pages",
      "Home, About, Services/Products, Gallery, FAQ, Contact...",
      "Contact form & WhatsApp integration",
      "Mobile friendly design",
      "Free 1-week live sample",
    ],
  },
];

// Advanced websites are quoted per project. The "from" price is a starting point - adjust as you like.
export const advanced = {
  fromPrice: "R3,500",
  features: [
    "User registration & login",
    "Multiple products with pricing",
    "Product categories & search",
    "Enquiry / order requests",
    "Owner admin area to manage products and prices",
    "User access levels (visitor, registered user, owner)",
  ],
};

export const hosting = [
  {
    name: "Hosting",
    price: "R60",
    features: [
      "Website hosting",
      "SSL certificate (secure padlock)",
      "Email support",
      "Website kept online & running",
    ],
  },
  {
    name: "Hosting + WhatsApp Support",
    price: "R100",
    popular: true,
    features: [
      "Everything in Hosting",
      "WhatsApp assistance (text & voice notes only, no calls)",
      "Weekdays 18:00 - 00:00",
      "Weekends: 24 hours",
      "3 small content changes per month included",
    ],
  },
];

export const supportHours = [
  { day: "Monday - Friday", time: "18:00 - 00:00" },
  { day: "Saturday & Sunday", time: "24 hours" },
];

export const domains = {
  list: [
    { ext: ".com", price: "R336" },
    { ext: ".co.za", price: "R124" },
    { ext: ".cloud", price: "R249" },
    { ext: ".store", price: "R100" },
    { ext: ".tech", price: "R100" },
    { ext: ".online", price: "R38" },
    { ext: ".site", price: "R38" },
    { ext: ".xyz", price: "R25" },
  ],
  note: "Prices are per year. Other extensions available on request.",
};

export const updates = [
  { item: "Small content change (text, image, price, opening hours)", price: "R80 each (3 per month free on WhatsApp Support plan)" },
  { item: "Add a new page", price: "R150 per page" },
  { item: "New feature (forms, galleries, booking, payments...)", price: "Quoted per request" },
  { item: "Redesign of an existing website", price: "Quoted per request" },
];
