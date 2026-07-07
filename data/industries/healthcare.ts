import { IndustryData } from "@/data/industries/types";

export const healthcare: IndustryData = {
  slug: "healthcare-pharma",
  eyebrow: "Industry Solution",
  title: "Healthcare & Pharma Solutions",
  tagline: "Every ward, pharmacy counter and server room, secured and always on.",
  description:
    "Hospitals and pharma facilities can't afford downtime — a camera blackspot near a drug store, a UPS that fails mid-procedure, or an access log that can't be produced on demand all carry real risk. We design and install the surveillance, access control, power backup and IT infrastructure that keeps a facility compliant and running, whether it's a single clinic or a multi-facility hospital group.",
  heroImage:
    "https://plus.unsplash.com/premium_photo-1681842931981-12ecdd712705?w=1600&auto=format&fit=crop&q=80",
  stats: [
    { value: "150+", label: "Facilities Equipped" },
    { value: "24/7", label: "Monitoring Coverage" },
    { value: "48 hrs", label: "Average Install Time" },
    { value: "99.99%", label: "Uptime SLA" },
  ],
  challenges: [
    {
      icon: "vault",
      title: "Pharmacy and drug-store security",
      description:
        "Controlled substances and high-value equipment need coverage and access control that goes well beyond a front-desk camera.",
    },
    {
      icon: "people",
      title: "Patient and staff safety",
      description:
        "Wards, corridors and parking areas need visible, verifiable coverage around the clock, not just at entry points.",
    },
    {
      icon: "compliance",
      title: "Regulatory and audit compliance",
      description:
        "Health authorities and accreditation bodies expect retrievable access, footage and visitor logs on demand, not best-effort records.",
    },
    {
      icon: "downtime",
      title: "Critical system uptime",
      description:
        "A power blip during a procedure or a network drop at the pharmacy counter isn't a minor outage — backup has to be instant.",
    },
    {
      icon: "visibility",
      title: "Multi-facility blind spots",
      description:
        "Hospital groups need one dashboard across every block and branch, not a different login for every building.",
    },
  ],
  products: [
    {
      icon: "camera",
      title: "High End CCTV Camera",
      description:
        "Coverage across wards, corridors, pharmacy counters and entry points, with remote playback for administration.",
    },
    {
      icon: "access",
      title: "Access Control and Biometric",
      description:
        "Biometric and card-based entry for ICUs, pharmacies and server rooms, with a full log of who went where and when.",
    },
    {
      icon: "ups",
      title: "Online UPS",
      description:
        "Instant, uninterrupted power backup sized for critical equipment, server rooms and procedure areas.",
    },
    {
      icon: "solar",
      title: "Solar Panel",
      description:
        "Rooftop solar sized to offset facility load and keep essential systems running during grid outages.",
    },
    {
      icon: "conference",
      title: "Conference Room and Auditorium Solution",
      description:
        "AV and display setups for board rooms, training halls and CME sessions, sized to the room and audience.",
    },
    {
      icon: "pos",
      title: "Billing Desktop and Printers",
      description:
        "Reception and billing-counter hardware built for fast, reliable processing during peak OPD hours.",
    },
    {
      icon: "lock",
      title: "Digital Lock",
      description:
        "Keyless entry for pharmacy stores, record rooms and cabinets, tied into the facility's access log.",
    },
    {
      icon: "audio",
      title: "Public Address Audio System",
      description:
        "Facility-wide paging and emergency announcements, zoned by ward, floor or building.",
    },
    {
      icon: "telephone",
      title: "Telephone Exchange EPABX",
      description:
        "Internal extension and call-routing infrastructure connecting wards, reception, pharmacy and admin offices.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Facility assessment",
      description:
        "We walk the facility, map wards, pharmacy areas and server rooms, and check what's already in place before recommending anything.",
    },
    {
      step: "02",
      title: "Design & compliance check",
      description:
        "A layout sized to the facility plan and cross-checked against regulatory and accreditation requirements.",
    },
    {
      step: "03",
      title: "Installation",
      description:
        "Scheduled around OPD hours and critical care areas so patient care isn't disrupted while the work happens.",
    },
    {
      step: "04",
      title: "Monitoring & support",
      description:
        "Ongoing maintenance and a support line, so a faulty camera, UPS or access point gets fixed before it becomes a compliance gap.",
    },
  ],
  testimonial: {
    quote:
      "We rolled out access control and backup power across three blocks without a single day of disrupted OPD service. Compliance audits that used to take a week now take an afternoon.",
    name: "Dr. Rakesh Suri",
    role: "Facility Director, multi-specialty hospital group",
  },
  faqs: [
    {
      question: "Can this integrate with hospital management or pharmacy software we already use?",
      answer:
        "In most cases, yes. We assess your existing systems during the facility visit and integrate access, billing and surveillance data with what's already running rather than replacing it outright.",
    },
    {
      question: "Do you handle rollouts across multiple hospital blocks or branches?",
      answer:
        "Yes — multi-facility rollout is where we spend most of our time. We stagger installs around OPD and critical care schedules and give administration a single dashboard across every location.",
    },
    {
      question: "How is CCTV and access-control data stored for audits?",
      answer:
        "Retention periods are set to match your accreditation and regulatory requirements, typically 30 to 90 days, with local and cloud backup options depending on the facility.",
    },
    {
      question: "What happens if a UPS or access point fails after installation?",
      answer:
        "Every install includes a support line and scheduled maintenance visits, so faults get flagged and fixed before they turn into a patient-care or compliance issue.",
    },
  ],
};