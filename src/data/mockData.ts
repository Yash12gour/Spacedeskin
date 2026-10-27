import { WorkspaceItem, AmenityItem, LocationItem, TestimonialItem, CommunityEvent } from '../types';
import conferenceRoomImage from '../assets/images/regenerated_image_1792407171507.png';
import meetingRoomImage from '../assets/images/regenerated_image_1792407456272.png';
import dedicatedDeskImage from '../assets/images/regenerated_image_1792407655199.png';
import privateCabinImage from '../assets/images/regenerated_image_1792407887850.png';
import privateOfficeSuiteImage from '../assets/images/regenerated_image_1792406761168.png';
import managedOfficeImage from '../assets/images/regenerated_image_1792406317391.png';
import locationImage from '../assets/images/regenerated_image_1792408478588.png';
import testimonial1Image from '../assets/images/regenerated_image_1792559273496.png';
import testimonial2Image from '../assets/images/regenerated_image_1792558569477.png';
import testimonial3Image from '../assets/images/regenerated_image_1792559079932.png';

export const WORKSPACES: WorkspaceItem[] = [
  {
    id: 'flexible-day-pass',
    title: 'Flexible Day Pass',
    category: 'flexible',
    shortDesc: 'Need a flexible desk for the day? Walk in, plug in, and work with 300 Mbps Wi-Fi, ergonomic seating, and fresh coffee included from ₹499.',
    fullDesc: 'Need a flexible desk for the day? Walk in, plug in, and work with 300 Mbps Wi-Fi, ergonomic seating, and fresh coffee included from ₹499.',
    price: '₹499',
    period: '/ Day',
    capacity: '1 Person',
    availability: 'Available',
    features: [
      'Open desk access',
      '300 Mbps high-speed Wi-Fi',
      'Premium tea and coffee included',
      'Common lounge access',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Check Availability',
    isPopular: false,
  },
  {
    id: 'dedicated-desk',
    title: 'Dedicated Desk',
    category: 'solo',
    shortDesc: 'Your personal reserved desk ready every morning. Ergonomic chair, private locker, and meeting room credits at ₹5,000 a month.',
    fullDesc: 'Your personal reserved desk ready every morning. Ergonomic chair, private locker, and meeting room credits at ₹5,000 a month.',
    price: '₹5,000',
    period: '/ Month',
    capacity: '1 Person',
    availability: 'Available',
    features: [
      'Reserved desk',
      'Ergonomic chair',
      '24/7 access',
      'Meeting room credits',
      'Storage locker',
    ],
    imageUrl: dedicatedDeskImage,
    badge: 'Check Availability',
    isPopular: true,
  },
  {
    id: 'private-cabin',
    title: 'Private Cabin',
    category: 'team',
    shortDesc: 'A secure lockable team cabin with acoustic privacy, dedicated whiteboards, and high-speed fiber internet at ₹25,000 a month.',
    fullDesc: 'A secure lockable team cabin with acoustic privacy, dedicated whiteboards, and high-speed fiber internet at ₹25,000 a month.',
    price: '₹25,000',
    period: '/ Month',
    capacity: '4 – 8 Persons',
    availability: 'Available',
    features: [
      'Lockable private cabin',
      'Acoustic privacy',
      'Whiteboards',
      'Space for your own branding',
      'Fast internet and power backup',
    ],
    imageUrl: privateCabinImage,
    badge: 'Check Availability',
    isPopular: false,
  },
  {
    id: 'private-office-suite',
    title: 'Private Office Suite',
    category: 'team',
    shortDesc: 'A fully customized office suite tailored for growing companies and branch teams, with dedicated facility support at ₹50,000 a month.',
    fullDesc: 'A fully customized office suite tailored for growing companies and branch teams, with dedicated facility support at ₹50,000 a month.',
    price: '₹50,000',
    period: '/ Month',
    capacity: '8 – 20 Persons',
    availability: 'Available',
    features: [
      'Fully customized workspace setup',
      'Dedicated facility support',
      'Enterprise security & high-speed Wi-Fi',
      'Priority meeting room access',
    ],
    imageUrl: privateOfficeSuiteImage,
    badge: 'Check Availability',
    isPopular: false,
  },
  {
    id: 'managed-office',
    title: 'Managed Office',
    category: 'team',
    shortDesc: 'A fully managed, custom-built office tailored for enterprises and growing companies with dedicated operations support.',
    fullDesc: 'A fully managed, custom-built office tailored for enterprises and growing companies with dedicated operations support.',
    price: 'Custom',
    period: '/ Month',
    capacity: '10 – 50+ Persons',
    availability: 'Available',
    features: [
      'Tailored layout & branding',
      'Dedicated operations & facility manager',
      'High-speed enterprise fiber & backup',
      'Meeting rooms & executive cabins included',
      'Daily housekeeping & hospitality services',
    ],
    imageUrl: managedOfficeImage,
    badge: 'Check Availability',
    isPopular: false,
  },
  {
    id: 'meeting-room',
    title: 'Meeting Room',
    category: 'team',
    shortDesc: 'A soundproof room for client pitches, team reviews and video calls, with a smart display. Ask us for rates.',
    fullDesc: 'A soundproof room for client pitches, team reviews and video calls, with a smart display. Ask us for rates.',
    price: 'Ask Us',
    period: '',
    capacity: '6 – 10 Persons',
    availability: 'Available by Hour',
    features: [
      'Soundproof acoustic privacy',
      'Smart presentation display',
      'High-definition conferencing equipment',
      'Meeting room credits with Dedicated Desk',
    ],
    imageUrl: meetingRoomImage,
    badge: 'Check Availability',
    isPopular: false,
  },
  {
    id: 'conference-room',
    title: 'Conference Room',
    category: 'flexible',
    shortDesc: 'Seats up to 25 for workshops and seminars. Surround sound, dual monitors and projector support. Custom hourly rates.',
    fullDesc: 'Seats up to 25 for workshops and seminars. Surround sound, dual monitors and projector support. Custom hourly rates.',
    price: 'Custom',
    period: '/ Hourly',
    capacity: 'Up to 25 Attendees',
    availability: 'Hourly Booking',
    features: [
      'Seats up to 25 people',
      'Surround sound audio',
      'Dual monitors & projector support',
      'Executive seating for workshops and seminars',
    ],
    imageUrl: conferenceRoomImage,
    badge: 'Check Availability',
    isPopular: false,
  },
];

export const AMENITIES: AmenityItem[] = [
  {
    id: 'gigabit-wifi',
    title: '300 Mbps Dual Fiber',
    category: 'Connectivity',
    description: 'Dual 300 Mbps fiber lines with load balancing and auto-failover.',
    iconName: 'Wifi',
  },
  {
    id: 'power-backup',
    title: 'Full Power Backup',
    category: 'Infrastructure',
    description: 'Industrial generator and online UPS power ensure zero disruption.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'ergonomic-seating',
    title: 'Front Desk & Reception',
    category: 'Convenience',
    description: 'Dedicated front desk reception to welcome clients and manage mail.',
    iconName: 'Users',
  },
  {
    id: 'onsite-parking',
    title: 'Secure Onsite Parking',
    category: 'Convenience',
    description: 'Reserved parking for two-wheelers and four-wheelers with security.',
    iconName: 'Car',
  },
  {
    id: 'biometric-security',
    title: '24/7 Access & Biometric Entry',
    category: 'Security',
    description: 'Biometric and keycard access backed by 24/7 CCTV surveillance.',
    iconName: 'Moon',
  },
  {
    id: 'housekeeping',
    title: 'Housekeeping & Sanitization',
    category: 'Maintenance',
    description: 'Daily professional cleaning, waste management, and sanitized washrooms.',
    iconName: 'Flame',
  },
  {
    id: 'printing-support',
    title: 'Printing & Office Support',
    category: 'Productivity',
    description: 'High-speed laser printing, copying, and scanning with staff assistance.',
    iconName: 'Printer',
  },
];

export const LOCATIONS: LocationItem[] = [
  {
    id: 'jaswant-tower',
    name: 'SpaceDesk Co-Working, Misrod',
    neighborhood: 'Misrod, Narmadapuram Rd',
    address: 'Jaswant Tower,Office No.4,5,6, 4th Floor, Narmadapuram Road, Misrod, Bhopal, Madhya Pradesh 462026',
    city: 'Bhopal, Madhya Pradesh',
    postalCode: '462026',
    hours: 'Mon to Sat, 8:00 AM to 9:00 PM (24/7 access for Dedicated Desk and Private Cabin members)',
    phone: '+91 92329 42092',
    transit: 'On Narmadapuram Road, close to Maple High Street, with easy access from across the city.',
    landmarks: ['Jaswant Tower', 'Misrod', 'Narmadapuram Road'],
    features: [
      '60+ desks with ergonomic chairs',
      '5+ lockable private cabins',
      '300 Mbps dual fiber internet',
      'Full power backup',
      'Reserved two-wheeler and car parking',
    ],
    imageUrl: locationImage,
    mapUrl: 'https://share.google/AiVJ9O46t3o2ku7QI',
  },
];

export const BLOG_POSTS = [
  {
    id: 'b1',
    category: 'WORKSPACE',
    date: '07 Oct 2026',
    title: 'Professional Functionality Meets Personal Well-Being at SpaceDesk',
    excerpt: 'Discover how our workspaces in Bhopal are engineered for focus, productivity, and sustainable professional growth.',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b2',
    category: 'COMMUNITY',
    date: '01 Oct 2026',
    title: 'Why Startups and Remote Teams Choose SpaceDesk Co-Working in Bhopal',
    excerpt: 'From high-speed fiber internet to private lockable cabins, explore the amenities that empower modern businesses.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
];

export const FAQS = [
  {
    question: 'Where is SpaceDesk located in Bhopal?',
    answer: 'SpaceDesk is located on the 4th Floor of Jaswant Tower, Narmadapuram Road, Misrod, Bhopal, Madhya Pradesh 462026, easily accessible via major transit routes.',
  },
  {
    question: 'What are the operating hours of SpaceDesk?',
    answer: 'Our reception and day-pass hours are Monday through Saturday, 8:00 AM to 9:00 PM. Dedicated Desk and Private Cabin members enjoy continuous 24/7 access.',
  },
  {
    question: 'What internet speed is provided at SpaceDesk?',
    answer: 'We provide dual enterprise-grade fiber connections at 300 Mbps with automated load balancing and instant failover for uninterrupted productivity.',
  },
  {
    question: 'What membership plans are available?',
    answer: 'We offer Flexible Day Passes (₹499/Day), Dedicated Desks (₹5,000/Month), Private Cabins (₹25,000/Month), Private Office Suites (₹50,000/Month), and Hourly Meeting/Conference Rooms.',
  },
  {
    question: 'How can I book a tour?',
    answer: 'You can book a free walkthrough instantly via our online tour modal, by calling or WhatsApp at +91 92329 42092, or by emailing info@spacedesk.in.',
  },
];

export const STATS = [
  { category: 'Desks', value: '60+', label: 'Workstations', isAccent: false },
  { category: 'Cabins', value: '5+', label: 'Private Cabins', isAccent: false },
  { category: 'Internet', value: '300 Mbps', label: 'Dual Fiber Internet', isAccent: true },
  { category: 'Experience', value: '2+', label: 'Years Running', isAccent: false },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    quote: "SpaceDesk gave our team the perfect private office setup. Having fast internet, uninterrupted power, and zero daily office management headaches lets us focus completely on client requirements and daily work.",
    author: "Dishika Traders",
    role: "SpaceDesk Member",
    company: "Dishika Traders",
    spaceType: "Private Cabin Member",
    avatarUrl: testimonial1Image,
    personImage: testimonial1Image,
    bgImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: '2',
    quote: "Handling daily transactions and partner support needs fast, uninterrupted systems. SpaceDesk gives our operations and support team a professional cabin setup, reliable power backup, and great meeting rooms to train partners and manage operations.",
    author: "Dogma Soft",
    role: "SpaceDesk Member",
    company: "Dogma Soft",
    spaceType: "Dedicated Desk Member",
    avatarUrl: testimonial2Image,
    personImage: testimonial2Image,
    bgImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: '3',
    quote: "The meeting and conference rooms are fully equipped for our client presentations. Our enterprise clients are always impressed by the corporate setup.",
    author: "Regional Sales Lead",
    role: "SpaceDesk Member",
    company: "Enterprise Client",
    spaceType: "Enterprise Suite Member",
    avatarUrl: testimonial3Image,
    personImage: testimonial3Image,
    bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
  },
];

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: 'ev-1',
    title: 'Startup Founder Networking Meetup',
    date: '15 OCT',
    time: '5:00 PM',
    category: 'Networking',
    attendees: 40,
    host: 'SpaceDesk Community',
    description: 'Connect with Bhopal innovators, founders, and freelancers in our collaborative event space.',
  },
  {
    id: 'ev-2',
    title: 'Tech & Growth Workshop',
    date: '28 OCT',
    time: '3:00 PM',
    category: 'Workshop',
    attendees: 25,
    host: 'SpaceDesk Team',
    description: 'A practical session on scaling remote teams and maintaining productivity in shared workspaces.',
  },
];
