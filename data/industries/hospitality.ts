import { IndustryData } from "@/data/industries/types";

export const hospitality: IndustryData = {
  slug: "hospitality",
  eyebrow: "Industry Solution",
  title: "Hospitality Solutions",
  tagline: "Every lobby, corridor and guest room, connected and covered.",
  description:
    "Guests notice the moment wifi drops or a hallway feels unwatched — hospitality runs on infrastructure that stays invisible until it's needed. We design and install the surveillance, networking, safety and guest-experience systems that keep a property running smoothly, whether it's a single boutique hotel or a multi-property chain.",
  heroImage:
    "https://images.squarespace-cdn.com/content/v1/5512c58de4b07319c3fed0c7/1767016852691-G7N558EQZDHKL58CXQW3/2-99SUSHI.jpg",
  stats: [
    { value: "80+", label: "Properties Equipped" },
    { value: "24/7", label: "Monitoring Coverage" },
    { value: "36 hrs", label: "Average Install Time" },
    { value: "99.9%", label: "Uptime SLA" },
  ],
  challenges: [
    {
      icon: "vault",
      title: "Guest and property security",
      description:
        "Lobbies, corridors and back-of-house areas are all points of exposure. Coverage needs to run property-wide, not just at the entrance.",
    },
    {
      icon: "people",
      title: "Guest and staff safety",
      description:
        "From parking to the pool deck, safety has to be visible and verifiable without making the property feel like it's under surveillance.",
    },
    {
      icon: "compliance",
      title: "Fire safety and licensing compliance",
      description:
        "Fire authorities and licensing bodies expect retrievable alarm, access and visitor logs on demand, not best-effort records.",
    },
    {
      icon: "downtime",
      title: "Guest experience downtime",
      description:
        "Wifi drops or a metal detector that flags every guest at check-in cost more than convenience — they cost reviews. Systems have to hold up under daily use.",
    },
    {
      icon: "visibility",
      title: "Multi-property blind spots",
      description:
        "Hotel groups need one dashboard across every property, not a different login for every location.",
    },
  ],
  products: [
    {
      icon: "camera",
      title: "High End CCTV Camera",
      description:
        "Coverage across lobbies, corridors, parking and back-of-house areas, with remote playback for management.",
    },
    {
      icon: "fire",
      title: "Fire Alarm",
      description:
        "Early smoke and heat detection wired into a central panel, sized for guest floors, kitchens and back-of-house alike.",
    },
    {
      icon: "wifi",
      title: "Wifi Zone",
      description:
        "Property-wide wifi coverage built to handle peak occupancy without the lobby-to-room dead zones guests notice first.",
    },
    {
      icon: "network",
      title: "Network Equipments",
      description:
        "Structured cabling and switching that gets reliable connectivity to every floor, not just the front desk.",
    },
    {
      icon: "server",
      title: "Servers",
      description:
        "On-site server infrastructure sized for property management systems, booking platforms and guest applications.",
    },
    {
      icon: "solar",
      title: "Solar Panel",
      description:
        "Rooftop solar sized to offset property load and keep essential systems running during grid outages.",
    },
    {
      icon: "gps",
      title: "Vehicle Camera and GPS",
      description:
        "Live tracking and onboard recording for shuttle and valet fleets, so guests and management know where every vehicle is.",
    },
    {
      icon: "lockers",
      title: "Lockers",
      description:
        "Secure guest and staff storage for luggage, valuables and back-of-house use, sized to the property's footfall.",
    },
    {
      icon: "metaldetector",
      title: "Metal Detector Gate",
      description:
        "Discreet entry screening for lobbies and banquet halls, sized for guest flow without creating bottlenecks.",
    },
    {
      icon: "telephone",
      title: "Telephone Exchange EPABX",
      description:
        "Internal extension and call-routing infrastructure connecting reception, housekeeping, rooms and back office.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Property assessment",
      description:
        "We walk the property, map guest floors, back-of-house and parking areas, and check what's already in place before recommending anything.",
    },
    {
      step: "02",
      title: "Design & compliance check",
      description:
        "A layout sized to the property plan and cross-checked against fire safety and licensing requirements.",
    },
    {
      step: "03",
      title: "Installation",
      description:
        "Scheduled around low-occupancy periods and floor-by-floor so guest stays aren't disrupted while the work happens.",
    },
    {
      step: "04",
      title: "Monitoring & support",
      description:
        "Ongoing maintenance and a support line, so a faulty camera, access point or fire panel gets fixed before it becomes a guest complaint.",
    },
  ],
  testimonial: {
    quote:
      "We rewired wifi and surveillance across four floors during a slow season without guests noticing a thing. Front desk finally has one dashboard for cameras, access and the shuttle fleet.",
    name: "Priya Nambiar",
    role: "General Manager, boutique hotel group",
  },
  faqs: [
    {
      question: "Can this integrate with the property management system we already use?",
      answer:
        "In most cases, yes. We assess your existing PMS and hardware during the property visit and integrate access, billing and surveillance data with what's already running rather than replacing it outright.",
    },
    {
      question: "Do you handle rollouts across multiple properties or a chain?",
      answer:
        "Yes — multi-property rollout is where we spend most of our time. We stagger installs around occupancy calendars and give management a single dashboard across every location.",
    },
    {
      question: "How is guest wifi and CCTV data handled for privacy?",
      answer:
        "Guest network traffic and camera footage are kept on separate, access-controlled systems, with retention periods set to match your property's policy — typically 30 to 90 days for footage.",
    },
    {
      question: "What happens if a camera, wifi node or fire panel fails after installation?",
      answer:
        "Every install includes a support line and scheduled maintenance visits, so faults get flagged and fixed before they turn into a guest-facing issue.",
    },
  ],
};