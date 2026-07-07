export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustryChallenge {
  icon: "vault" | "people" | "compliance" | "downtime" | "visibility";
  title: string;
  description: string;
}

export interface IndustryProduct {
  icon:
    | "smartclass"
    | "camera"
    | "fire"
    | "gps"
    | "server"
    | "network"
    | "pos"
    | "itequipment"
    | "videowall"
    | "furniture";
  title: string;
  description: string;
}

export interface IndustryProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface IndustryFAQ {
  question: string;
  answer: string;
}

export interface IndustryData {
  slug: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  stats: IndustryStat[];
  challenges: IndustryChallenge[];
  products: IndustryProduct[];
  process: IndustryProcessStep[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
  };
  faqs: IndustryFAQ[];
}

export const education: IndustryData = {
  slug: "education",
  eyebrow: "Industry Solution",
  title: "Education Solutions",
  tagline: "Every classroom, bus and campus gate, covered and connected.",
  description:
    "Schools and colleges run on trust between parents, staff and students — buses need tracking, campuses need watching, and classrooms need to actually work when the projector switches on. We design and install the smart classroom, surveillance, networking and IT infrastructure that keeps a campus running, whether it's one building or a multi-campus institution.",
  heroImage:
    "https://images.unsplash.com/photo-1681164315051-add1906a9b07?w=1600&auto=format&fit=crop&q=80",
  stats: [
    { value: "300+", label: "Campuses Equipped" },
    { value: "24/7", label: "Monitoring Coverage" },
    { value: "72 hrs", label: "Average Install Time" },
    { value: "99.9%", label: "Uptime SLA" },
  ],
  challenges: [
    {
      icon: "vault",
      title: "Campus and asset security",
      description:
        "Labs, server rooms and equipment stores are high-value targets. Coverage needs to run gate to gate, not just at the entrance.",
    },
    {
      icon: "people",
      title: "Student and staff safety",
      description:
        "From the school gate to the bus route, safety has to be visible and verifiable, not just assumed.",
    },
    {
      icon: "compliance",
      title: "Attendance and compliance records",
      description:
        "Boards and parents expect retrievable attendance, transport and access logs on demand, not best-effort registers.",
    },
    {
      icon: "downtime",
      title: "Classroom technology downtime",
      description:
        "A projector or smart board that doesn't turn on mid-lesson costs teaching time. Systems have to hold up under daily use.",
    },
    {
      icon: "visibility",
      title: "Multi-campus blind spots",
      description:
        "Administrators need one view across every building and bus, not a different login for every block or branch.",
    },
  ],
  products: [
    {
      icon: "smartclass",
      title: "Smart Classes and Labs",
      description:
        "Interactive boards and lab setups that turn a standard classroom into a digital-first learning space.",
    },
    {
      icon: "camera",
      title: "CCTV Camera",
      description:
        "Coverage across corridors, gates, labs and playgrounds, with remote playback for administration.",
    },
    {
      icon: "fire",
      title: "Fire Alarm",
      description:
        "Early smoke and heat detection wired into a central panel, sized for classrooms, labs and hostels alike.",
    },
    {
      icon: "gps",
      title: "Buses Camera and GPS",
      description:
        "Live tracking and onboard recording for the school fleet, so parents and admins know where every bus is.",
    },
    {
      icon: "server",
      title: "Servers",
      description:
        "On-site server infrastructure sized for student records, learning platforms and campus applications.",
    },
    {
      icon: "network",
      title: "Networking Equipments",
      description:
        "Structured cabling and switching that gets reliable connectivity to every classroom and lab, not just the office.",
    },
    {
      icon: "pos",
      title: "Billing Desktop and Printers",
      description:
        "Fee counter and admin hardware built for fast, reliable processing during peak enrollment periods.",
    },
    {
      icon: "itequipment",
      title: "IT Equipments",
      description:
        "Desktops, laptops and peripherals for labs and offices, procured and configured as one rollout.",
    },
    {
      icon: "videowall",
      title: "Video Wall | Active LED Wall | Video Standys | Projectors",
      description:
        "Display systems for auditoriums, seminar halls and reception areas, sized to the room and the audience.",
    },
    {
      icon: "furniture",
      title: "Classroom Furniture and Chairs",
      description:
        "Durable, ergonomic furniture fitted out alongside the technology, so a new classroom is ready on day one.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Campus assessment",
      description:
        "We walk the campus, map classrooms, labs and transport routes, and check what's already in place before recommending anything.",
    },
    {
      step: "02",
      title: "Design & compliance check",
      description:
        "A layout sized to the campus plan and cross-checked against safety and record-keeping requirements.",
    },
    {
      step: "03",
      title: "Installation",
      description:
        "Scheduled around the academic calendar so classes aren't disrupted while the work happens.",
    },
    {
      step: "04",
      title: "Monitoring & support",
      description:
        "Ongoing maintenance and a support line, so a faulty camera, board or bus tracker gets fixed before it becomes a gap.",
    },
  ],
  testimonial: {
    quote:
      "We equipped six blocks and the entire bus fleet in one summer break. Parents can see the buses moving and our admin office finally has one dashboard for the whole campus.",
    name: "Anil Mehra",
    role: "Administrator, private school group",
  },
  faqs: [
    {
      question: "Can this integrate with the smart boards or cameras we already have?",
      answer:
        "In most cases, yes. We assess your existing hardware during the campus visit and reuse whatever's still fit for purpose, rather than ripping everything out.",
    },
    {
      question: "Do you handle rollouts across multiple campuses or blocks?",
      answer:
        "Yes — multi-campus and multi-block rollout is where we spend most of our time. We stagger installs around the academic calendar and give administration a single dashboard across every location.",
    },
    {
      question: "How is bus GPS and camera footage stored?",
      answer:
        "Retention periods are set to match your institution's policy, typically 30 to 90 days, with local and cloud backup options depending on the campus.",
    },
    {
      question: "What happens if a smart board or camera fails after installation?",
      answer:
        "Every install includes a support line and scheduled maintenance visits, so faults get flagged and fixed before they turn into a teaching disruption.",
    },
  ],
};