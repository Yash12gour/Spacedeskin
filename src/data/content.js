/**
 * Content data for SpaceDesk Co-Working application.
 * All text lives here to ensure consistent copy across components.
 */
import conferenceRoomImage from "../assets/images/regenerated_image_1792407171507.png";
import meetingRoomImage from "../assets/images/regenerated_image_1792407456272.png";
import dedicatedDeskImage from "../assets/images/regenerated_image_1792407655199.png";
import privateCabinImage from "../assets/images/regenerated_image_1792407887850.png";
import privateOfficeSuiteImage from "../assets/images/regenerated_image_1792406761168.png";
import managedOfficeImage from "../assets/images/regenerated_image_1792406317391.png";
import testimonial1Image from "../assets/images/regenerated_image_1792559273496.png";
import testimonial2Image from "../assets/images/regenerated_image_1792558569477.png";
import testimonial3Image from "../assets/images/regenerated_image_1792559079932.png";
import avatar1Image from "../assets/images/regenerated_image_1793076033467.png";
import avatar2Image from "../assets/images/regenerated_image_1793076046510.png";
import avatar3Image from "../assets/images/regenerated_image_1793076059550.png";

export const brandName = "SpaceDesk";

export const logo = "/logo.png";
export const logoLight = "/logo.png";
export const favicon = "/favicon.png";

export const awardText = {
  line1: "Best Co-Working",
  line2: "Space in Bhopal",
};

export const headline = {
  line1: "Coworking in Bhopal,",
  line2: "Made Simple",
};

export const subline = "Dedicated desks, private team cabins, and meeting rooms in Misrod, Bhopal. High-speed dual fiber internet, 100% power backup, and fully managed offices.";

export const buttonLabels = {
  bookNow: "Book a Free Tour",
  readMore: "See Plans & Pricing",
  plansPricing: "See Plans & Pricing",
  login: "Login",
  bookTour: "Book a Free Tour",
  viewAvailableDates: "Check Availability",
};

export const announcementText = {
  text: "Visit our campus at Jaswant Tower, Misrod. Enjoy complimentary artisan coffee and experience our 300 Mbps fiber firsthand.",
  label: "Visit Us",
};

export const partnerNames = [
  "Dishika Traders",
  "Dogma Soft",
  "Tech Founders",
  "Creative Studios",
  "Remote Professionals",
  "Growing Teams",
];

export const menuItems = [
  { label: "About Us", href: "#about-page", isAboutPage: true },
  { label: "Why SpaceDesk", href: "#about" },
  { label: "Explore Spaces", href: "#spaces" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "Location", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

export const heroImage = "/images/hero-modern-coworking-office.jpeg";

export const slides = [
  {
    type: "video",
    src: "/videos/coworking-team-meeting.mp4",
  },
];

export const avatars = [
  avatar1Image,
  avatar2Image,
  avatar3Image,
];

export const newLocationImage = "/images/hero-modern-coworking-office.jpeg";

// 1) Why Work at SpaceDesk (#about)
export const valuesSection = {
  title: "Why Work at SpaceDesk",
  seeMoreText: "See More",
  heading: "Why Work at SpaceDesk",
  description: "Everything a Bhopal freelancer, startup or growing team needs is already set up. Bring your laptop, plug in and get on with your day.",
  items: [
    {
      id: "fast-internet",
      icon: "wifi",
      title: "Fast Internet & Power Backup",
      description: "Dual 300 Mbps high-speed fiber lines with load balancing and uninterrupted generator power backup.",
      points: [
        "Dual enterprise fiber lines at 300 Mbps with load balancing and automated failover.",
        "Industrial generator and online UPS power systems keep your workstation running continuously.",
      ],
    },
    {
      id: "community",
      icon: "users",
      title: "A Friendly Community",
      isDark: true,
      description: "Connect and innovate alongside tech founders, creative freelancers, and growing corporate teams.",
      points: [
        "Network with entrepreneurs, digital professionals, and remote specialists across Bhopal.",
        "A welcoming, collaborative atmosphere featuring comfortable breakout zones and shared lounges.",
      ],
    },
    {
      id: "safe-secure-access",
      icon: "shield",
      title: "Safe & Secure Access",
      description: "Smart biometric entry systems and keycard access backed by continuous CCTV security.",
      points: [
        "Keycard and biometric access controls with round-the-clock security monitoring.",
        "24/7 facility access available for Dedicated Desk and Private Cabin members.",
      ],
    },
  ],
};

// 2) Explore Spaces (#spaces)
export const spacesSection = {
  title: "Explore Our Coworking Spaces in Bhopal",
  subtitle: "From a dedicated desk to a private office for your whole team, pick the space that fits how you work.",
  featuredButtonText: "Check Availability",
  items: [
    {
      id: "dedicated-desk",
      title: "Dedicated Desk",
      description: "Your dedicated reserved desk ready every morning. Includes ergonomic chair, storage locker, and meeting room credits at ₹5,000 a month.",
      alt: "Desk with a laptop beside a tall window",
      image: dedicatedDeskImage,
      featured: true,
    },
    {
      id: "private-cabin",
      title: "Private Cabin",
      description: "Lockable private team cabin offering acoustic privacy, writable whiteboards, and high-speed fiber at ₹25,000 a month.",
      alt: "Bright corridor with glass-fronted private rooms",
      image: privateCabinImage,
      featured: false,
    },
    {
      id: "private-office-suite",
      title: "Private Office Suite",
      description: "Tailored office suites designed for expanding companies and branch offices, with dedicated facility support at ₹50,000 a month.",
      alt: "Office space with glass partitions and desks",
      image: privateOfficeSuiteImage,
      featured: false,
    },
    {
      id: "managed-office",
      title: "Managed Office",
      description: "Fully serviced enterprise workspace solutions featuring bespoke floor plans, dedicated operations, and IT support.",
      alt: "Custom managed office space with modern workstations",
      image: managedOfficeImage,
      featured: false,
    },
    {
      id: "meeting-room",
      title: "Meeting Room",
      description: "Soundproof conference room for client pitches and video conferences, equipped with high-definition smart displays.",
      alt: "Meeting room with a long wooden table and large windows",
      image: meetingRoomImage,
      featured: false,
    },
    {
      id: "conference-room",
      title: "Conference Room",
      description: "Executive seminar space seating up to 25 attendees, featuring surround sound audio, dual displays, and projector support.",
      alt: "Large open room with rows of desks and people working",
      image: conferenceRoomImage,
      featured: false,
    },
  ],
};

// 3) Testimonials (#testimonials)
export const testimonialsSection = {
  title: "What Our Members Say",
  items: [
    {
      id: 1,
      quote: "SpaceDesk gave our team the perfect private office setup. Having fast internet, uninterrupted power, and zero daily office management headaches lets us focus completely on client requirements and daily work.",
      author: "Dishika Traders",
      role: "SpaceDesk Member",
      personImage: testimonial1Image,
      bgImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 2,
      quote: "Handling daily transactions and partner support needs fast, uninterrupted systems. SpaceDesk gives our operations and support team a professional cabin setup, reliable power backup, and great meeting rooms to train partners and manage operations.",
      author: "Dogma Soft",
      role: "SpaceDesk Member",
      personImage: testimonial2Image,
      bgImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 3,
      quote: "The meeting and conference rooms are fully equipped for our client presentations. Our enterprise clients are always impressed by the corporate setup.",
      author: "Regional Sales Lead",
      role: "SpaceDesk Member",
      personImage: testimonial3Image,
      bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    },
  ],
};

// 4) Pricing Plan (#pricing)
export const pricingSection = {
  title: "Coworking Space Pricing in Bhopal",
  subtitle: "Simple daily and monthly plans, with no hidden charges.",
  plans: [
    {
      id: "managed-office",
      name: "Managed Office",
      tag: "For Enterprises",
      price: "₹75,000",
      period: "/month",
      targetAudience: "For growing teams and enterprises",
      buttonText: "Enquire Managed Office",
      features: [
        "Tailored private office suite",
        "High-speed enterprise Wi-Fi & backup",
        "Dedicated operations & facility manager",
        "Meeting room credits & cabins",
        "Daily housekeeping & reception support",
      ],
    },
    {
      id: "dedicated-desk",
      name: "Dedicated Desk",
      tag: "Best for Freelancers",
      price: "₹5,000",
      period: "/month",
      targetAudience: "For solo creators and remote pros",
      buttonText: "Choose Dedicated Desk",
      isHighlighted: true,
      features: [
        "Reserved desk",
        "Ergonomic chair",
        "24/7 access",
        "Meeting room credits",
        "Storage locker",
      ],
    },
    {
      id: "private-cabin",
      name: "Private Cabin",
      tag: "Private Space",
      price: "₹25,000",
      period: "/month",
      targetAudience: "For startups and small teams",
      buttonText: "Ask About Cabins",
      features: [
        "Lockable private cabin",
        "Acoustic privacy",
        "Whiteboards",
        "Space for your own branding",
        "Fast internet and power backup",
      ],
    },
  ],
};

// 5) Contact (#contact)
export const contactSection = {
  heading: "Book a Free Tour of Our Bhopal Coworking Space",
  paragraph: "Schedule a free walkthrough of our Misrod campus. Tour our workspaces, enjoy artisan coffee, and test our 300 Mbps internet on your laptop. No sales pressure.",
  details: {
    phone: "+91 92329 42092",
    email: "info@spacedesk.in",
    address: "Jaswant Tower,Office No.4,5,6, 4th Floor, Narmadapuram Road, Misrod, Bhopal, Madhya Pradesh 462026",
    hours: "Mon to Sat, 8:00 AM to 9:00 PM",
    whatsappUrl: "https://wa.me/919232942092",
  },
  links: {
    company: {
      title: "Company",
      links: [
        { label: "About Us", href: "#about-page" },
        { label: "Membership Plans", href: "/services" },
        { label: "Contact", href: "#contact-page" },
      ],
    },
    community: {
      title: "Community",
      links: [
        { label: "Events", href: "#events-page" },
        { label: "Member Stories", href: "#testimonials" },
        { label: "Amenities", href: "#amenities-page" },
      ],
    },
    resources: {
      title: "Resources",
      links: [
        { label: "Blog", href: "#blog-page" },
        { label: "FAQs", href: "#faq-page" },
        { label: "Privacy Policy", href: "#privacy" },
      ],
    },
  },
  photo: "/images/contact.jpg",
  video: "/videos/coworking-team-meeting.mp4",
  newsletterLabel: "Stay in the Loop",
  newsletterSubline: "Receive curated workplace insights, community events, and productivity updates. Zero spam, unsubscribe anytime.",
  newsletterPlaceholder: "Your email address",
  companyVideoText: "Take a Video Tour",
  companyVideoSrc: "/videos/coworking-team-meeting.mp4",
  circularBadgeText: "SPACEDESK CO-WORKING • BHOPAL •",
};

// Footer
export const footerSection = {
  copyright: "© 2026 SpaceDesk Co-Working. Premium coworking space in Misrod, Bhopal. All rights reserved.",
  links: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Cookie Policy", href: "#cookies" },
  ],
};

export default {
  brandName,
  logo,
  logoLight,
  favicon,
  heroImage,
  awardText,
  headline,
  subline,
  buttonLabels,
  announcementText,
  partnerNames,
  menuItems,
  slides,
  avatars,
  newLocationImage,
  valuesSection,
  spacesSection,
  testimonialsSection,
  pricingSection,
  contactSection,
  footerSection,
};
