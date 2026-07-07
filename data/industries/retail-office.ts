import { IndustryData } from "@/data/industries/types";

export const retailOffice: IndustryData = {
  slug: "retail-office",
  eyebrow: "Industry Solution",
  title: "Retail & Office Solutions",
  tagline: "Every till, floor and server room, secured and running.",
  description:
    "Retail floors and offices lose money the moment a till goes down, a stockroom camera has a blind spot, or the wifi drops during a busy hour. We design and install the surveillance, networking, power backup and IT infrastructure that keeps a store or workplace running, whether it's a single outlet or a multi-location chain.",
  heroImage:
    "https://images.unsplash.com/photo-1774494168068-0f716c3aafcf?w=1600&auto=format&fit=crop&q=80",
  stats: [
    { value: "200+", label: "Locations Equipped" },
    { value: "24/7", label: "Monitoring Coverage" },
    { value: "36 hrs", label: "Average Install Time" },
    { value: "99.9%", label: "Uptime SLA" },
  ],
  challenges: [
    {
      icon: "vault",
      title: "Inventory and asset security",
      description:
        "Stockrooms, tills and server closets are high-shrinkage points. Coverage needs to run floor to backroom, not just at the entrance.",
    },
    {
      icon: "people",
      title: "Employee and customer safety",
      description:
        "From the shop floor to the parking lot, safety has to be visible and verifiable, not just assumed.",
    },
    {
      icon: "compliance",
      title: "Safety and audit compliance",
      description:
        "Fire authorities and corporate audits expect retrievable access, footage and incident logs on demand, not best-effort records.",
    },
    {
      icon: "downtime",
      title: "Billing and network downtime",
      description:
        "A till that freezes or wifi that drops during peak hours costs sales on the spot. Systems have to hold up under daily load.",
    },
    {
      icon: "visibility",
      title: "Multi-location blind spots",
      description:
        "Chains and corporate offices need one dashboard across every outlet or floor, not a different login for every location.",
    },
  ],
  products: [
    {
      icon: "camera",
      title: "High End CCTV Camera",
      description:
        "Coverage across shop floors, stockrooms, tills and entry points, with remote playback for management.",
    },
    {
      icon: "fire",
      title: "Fire Alarm",
      description:
        "Early smoke and heat detection wired into a central panel, sized for retail floors, stockrooms and office buildings alike.",
    },
    {
      icon: "wifi",
      title: "Wifi Zone",
      description:
        "Reliable wifi coverage for staff systems, customer access and back-office use, without the peak-hour drop-offs.",
    },
    {
      icon: "ups",
      title: "Online UPS",
      description:
        "Instant, uninterrupted power backup for tills, servers and critical office systems during outages.",
    },
    {
      icon: "pos",
      title: "Billing Desktop and Thermal Printers",
      description:
        "Till and billing-counter hardware built for fast, reliable processing during peak footfall.",
    },
    {
      icon: "server",
      title: "Servers",
      description:
        "On-site server infrastructure sized for inventory systems, ERP platforms and office applications.",
    },
    {
      icon: "solar",
      title: "Solar Panel",
      description:
        "Rooftop solar sized to offset store or office load and keep essential systems running during grid outages.",
    },
    {
      icon: "itequipment",
      title: "IT Equipments",
      description:
        "Desktops, laptops and peripherals for offices and back-of-store use, procured and configured as one rollout.",
    },
    {
      icon: "lockers",
      title: "Lockers",
      description:
        "Secure staff and customer storage for belongings and valuables, sized to footfall and floor layout.",
    },
    {
      icon: "audio",
      title: "Public Address Audio System",
      description:
        "Store-wide or floor-wide paging and announcements, zoned by department, aisle or office floor.",
    },
    {
      icon: "metaldetector",
      title: "Metal Detector Gate",
      description:
        "Discreet entry screening for retail entrances and office lobbies, sized for footfall without creating bottlenecks.",
    },
    {
      icon: "telephone",
      title: "Telephone Exchange EPABX",
      description:
        "Internal extension and call-routing infrastructure connecting reception, departments and back office.",
    },
    {
      icon: "conference",
      title: "Conference Room and Auditorium Solution",
      description:
        "AV and display setups for meeting rooms, town halls and training sessions, sized to the room and audience.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Site assessment",
      description:
        "We walk the store or office, map floors, stockrooms and server areas, and check what's already in place before recommending anything.",
    },
    {
      step: "02",
      title: "Design & compliance check",
      description:
        "A layout sized to the floor plan and cross-checked against fire safety and corporate audit requirements.",
    },
    {
      step: "03",
      title: "Installation",
      description:
        "Scheduled around trading hours or after office close so business isn't disrupted while the work happens.",
    },
    {
      step: "04",
      title: "Monitoring & support",
      description:
        "Ongoing maintenance and a support line, so a faulty till, camera or access point gets fixed before it becomes lost sales.",
    },
  ],
  testimonial: {
    quote:
      "We rolled out CCTV, UPS and wifi across twelve outlets over two weekends without a single day of closed trading. Head office finally has one dashboard for every store.",
    name: "Sanjay Kapoor",
    role: "Operations Head, retail chain",
  },
  faqs: [
    {
      question: "Can this integrate with the POS or ERP system we already use?",
      answer:
        "In most cases, yes. We assess your existing billing and inventory systems during the site visit and integrate access, footage and billing data with what's already running rather than replacing it outright.",
    },
    {
      question: "Do you handle rollouts across multiple stores or office locations?",
      answer:
        "Yes — multi-location rollout is where we spend most of our time. We stagger installs around trading hours and give head office a single dashboard across every location.",
    },
    {
      question: "How is CCTV and access-control footage stored?",
      answer:
        "Retention periods are set to match your corporate policy, typically 30 to 90 days, with local and cloud backup options depending on the location.",
    },
    {
      question: "What happens if a till, camera or UPS fails after installation?",
      answer:
        "Every install includes a support line and scheduled maintenance visits, so faults get flagged and fixed before they turn into lost sales or downtime.",
    },
  ],
};