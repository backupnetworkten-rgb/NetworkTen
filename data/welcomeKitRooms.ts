export type WelcomePropertyType =
  | "Apartment"
  | "Villa"
  | "Independent House"
  | "Penthouse"
  | "Office"
  | "Commercial"
  | "Other";

export interface WelcomeRoomDefinition {
  id: string;
  title: string;
  description: string;
  placeholder: string;
  category:
    | "Residential"
    | "Office"
    | "Commercial"
    | "Outdoor"
    | "Other";
  defaultVisible?: boolean;
}

export interface WelcomePropertyConfiguration {
  label: string;
  value: string;
}

/* =========================================================
   PROPERTY TYPES
========================================================= */

export const WELCOME_PROPERTY_TYPES: WelcomePropertyType[] = [
  "Apartment",
  "Villa",
  "Independent House",
  "Penthouse",
  "Office",
  "Commercial",
  "Other",
];

/* =========================================================
   CONFIGURATION OPTIONS
========================================================= */

export const WELCOME_CONFIGURATIONS: Record<
  WelcomePropertyType,
  WelcomePropertyConfiguration[]
> = {
  Apartment: [
    {
      label: "Studio / 1 RK",
      value: "Studio",
    },
    {
      label: "1 BHK",
      value: "1 BHK",
    },
    {
      label: "2 BHK",
      value: "2 BHK",
    },
    {
      label: "3 BHK",
      value: "3 BHK",
    },
    {
      label: "4 BHK",
      value: "4 BHK",
    },
    {
      label: "5 BHK+",
      value: "5 BHK+",
    },
  ],

  Villa: [
    {
      label: "3 BHK",
      value: "3 BHK",
    },
    {
      label: "4 BHK",
      value: "4 BHK",
    },
    {
      label: "5 BHK",
      value: "5 BHK",
    },
    {
      label: "6 BHK+",
      value: "6 BHK+",
    },
  ],

  "Independent House": [
    {
      label: "2 BHK",
      value: "2 BHK",
    },
    {
      label: "3 BHK",
      value: "3 BHK",
    },
    {
      label: "4 BHK",
      value: "4 BHK",
    },
    {
      label: "5 BHK",
      value: "5 BHK",
    },
    {
      label: "6 BHK+",
      value: "6 BHK+",
    },
  ],

  Penthouse: [
    {
      label: "2 BHK",
      value: "2 BHK",
    },
    {
      label: "3 BHK",
      value: "3 BHK",
    },
    {
      label: "4 BHK",
      value: "4 BHK",
    },
    {
      label: "5 BHK+",
      value: "5 BHK+",
    },
  ],

  Office: [
    {
      label: "Small Office",
      value: "Small Office",
    },
    {
      label: "Medium Office",
      value: "Medium Office",
    },
    {
      label: "Large Office",
      value: "Large Office",
    },
    {
      label: "Corporate / HQ",
      value: "Corporate / HQ",
    },
  ],

  Commercial: [
    {
      label: "Retail Store",
      value: "Retail Store",
    },
    {
      label: "Showroom",
      value: "Showroom",
    },
    {
      label: "Restaurant / Café",
      value: "Restaurant / Café",
    },
    {
      label: "Clinic",
      value: "Clinic",
    },
    {
      label: "Salon / Spa",
      value: "Salon / Spa",
    },
    {
      label: "Other Commercial",
      value: "Other Commercial",
    },
  ],

  Other: [
    {
      label: "Custom Property",
      value: "Custom Property",
    },
  ],
};

/* =========================================================
   RESIDENTIAL ROOMS
========================================================= */

const RESIDENTIAL_BASE_ROOMS: WelcomeRoomDefinition[] = [
  {
    id: "living-room",
    title: "Living Room",
    description:
      "Tell us how you want your main living space to look, feel and function.",
    placeholder:
      "Seating requirements, TV unit, storage, lighting, feature wall, décor, etc.",
    category: "Residential",
  },

  {
    id: "dining-area",
    title: "Dining Area",
    description:
      "Help us understand your dining and entertaining requirements.",
    placeholder:
      "Dining table size, seating capacity, crockery storage, lighting, display unit, etc.",
    category: "Residential",
  },

  {
    id: "kitchen",
    title: "Kitchen",
    description:
      "Tell us about your kitchen requirements and priorities.",
    placeholder:
      "Modular kitchen, storage, appliances, island, breakfast counter, finishes, etc.",
    category: "Residential",
  },

  {
    id: "master-bedroom",
    title: "Master Bedroom",
    description:
      "Describe your ideal master bedroom.",
    placeholder:
      "Bed size, wardrobe, dressing, TV, study corner, lighting, storage, colours, etc.",
    category: "Residential",
  },

  {
    id: "bathrooms",
    title: "Bathrooms",
    description:
      "Tell us about your bathroom requirements.",
    placeholder:
      "Number of bathrooms, vanity, shower, bathtub, storage, finishes, mirrors, lighting, etc.",
    category: "Residential",
  },

  {
    id: "balcony",
    title: "Balcony",
    description:
      "Describe how you would like to use your balcony.",
    placeholder:
      "Seating, plants, outdoor lighting, storage, flooring, privacy, etc.",
    category: "Outdoor",
  },

  {
    id: "pooja-room",
    title: "Pooja Room",
    description:
      "Tell us about your prayer / meditation space.",
    placeholder:
      "Pooja unit, storage, seating, lighting, materials, doors, etc.",
    category: "Residential",
  },

  {
    id: "study-home-office",
    title: "Study / Home Office",
    description:
      "Tell us about your work or study requirements.",
    placeholder:
      "Desk size, storage, bookshelves, monitor setup, lighting, background wall, etc.",
    category: "Residential",
  },

  {
    id: "utility",
    title: "Utility / Service Area",
    description:
      "Describe your utility and service requirements.",
    placeholder:
      "Washing machine, dryer, storage, cleaning supplies, utility sink, etc.",
    category: "Residential",
  },

  {
    id: "other-residential",
    title: "Other Space",
    description:
      "Add anything else that should be considered.",
    placeholder:
      "Guest room, hobby room, gym, entertainment room, servant room, etc.",
    category: "Other",
  },
];

/* =========================================================
   VILLA / HOUSE ADDITIONAL ROOMS
========================================================= */

const VILLA_EXTRA_ROOMS: WelcomeRoomDefinition[] = [
  {
    id: "entrance-foyer",
    title: "Entrance / Foyer",
    description:
      "Describe the first impression you want your home to create.",
    placeholder:
      "Console, mirror, shoe storage, lighting, artwork, feature wall, etc.",
    category: "Residential",
  },

  {
    id: "family-lounge",
    title: "Family Lounge",
    description:
      "Tell us how your family will use this space.",
    placeholder:
      "TV, recliners, sectional seating, storage, games, books, etc.",
    category: "Residential",
  },

  {
    id: "study",
    title: "Study",
    description:
      "Describe your dedicated study requirements.",
    placeholder:
      "Desk, bookshelves, storage, seating, lighting, acoustic requirements, etc.",
    category: "Residential",
  },

  {
    id: "terrace",
    title: "Terrace",
    description:
      "Tell us how you would like to use your terrace.",
    placeholder:
      "Outdoor seating, plants, pergola, lighting, BBQ, entertainment, etc.",
    category: "Outdoor",
  },

  {
    id: "outdoor-garden",
    title: "Outdoor / Garden",
    description:
      "Describe your outdoor space requirements.",
    placeholder:
      "Landscaping, seating, pathway, lighting, outdoor kitchen, water feature, etc.",
    category: "Outdoor",
  },
];

/* =========================================================
   OFFICE ROOMS
========================================================= */

const OFFICE_ROOMS: WelcomeRoomDefinition[] = [
  {
    id: "reception",
    title: "Reception",
    description:
      "Describe your reception and brand experience.",
    placeholder:
      "Reception desk, branding wall, seating, display, lighting, storage, etc.",
    category: "Office",
  },

  {
    id: "waiting-area",
    title: "Waiting Area",
    description:
      "Tell us about visitor seating and experience.",
    placeholder:
      "Number of seats, lounge furniture, display, magazines, charging points, etc.",
    category: "Office",
  },

  {
    id: "open-workspace",
    title: "Open Workspace",
    description:
      "Describe your employee workspace requirements.",
    placeholder:
      "Number of workstations, desk layout, storage, acoustic treatment, lighting, etc.",
    category: "Office",
  },

  {
    id: "meeting-room",
    title: "Meeting Room",
    description:
      "Tell us about your meeting room requirements.",
    placeholder:
      "Seating capacity, display, video conferencing, whiteboard, storage, lighting, etc.",
    category: "Office",
  },

  {
    id: "conference-room",
    title: "Conference Room",
    description:
      "Describe your conference room requirements.",
    placeholder:
      "Conference table, seating capacity, display / LED, video conferencing, audio, room control, etc.",
    category: "Office",
  },

  {
    id: "director-cabin",
    title: "Director / Executive Cabin",
    description:
      "Describe the executive workspace.",
    placeholder:
      "Executive desk, visitor seating, storage, display, meeting area, feature wall, etc.",
    category: "Office",
  },

  {
    id: "employee-cabins",
    title: "Cabins / Private Offices",
    description:
      "Tell us how many private cabins are required and what each needs.",
    placeholder:
      "Number of cabins, desk type, visitor seating, storage, privacy, lighting, etc.",
    category: "Office",
  },

  {
    id: "breakout-area",
    title: "Breakout / Collaboration Area",
    description:
      "Describe informal collaboration spaces.",
    placeholder:
      "Lounge seating, high tables, café seating, writable walls, charging, etc.",
    category: "Office",
  },

  {
    id: "pantry",
    title: "Pantry / Cafeteria",
    description:
      "Tell us about your employee dining requirements.",
    placeholder:
      "Kitchen appliances, counters, seating, storage, water station, etc.",
    category: "Office",
  },

  {
    id: "server-it-room",
    title: "Server / IT Room",
    description:
      "Describe your IT infrastructure space.",
    placeholder:
      "Server racks, networking, UPS, cooling, access control, cable management, etc.",
    category: "Office",
  },

  {
    id: "staff-area",
    title: "Staff / Utility Area",
    description:
      "Tell us about supporting spaces.",
    placeholder:
      "Storage, housekeeping, printing, lockers, utility requirements, etc.",
    category: "Office",
  },

  {
    id: "office-washrooms",
    title: "Washrooms",
    description:
      "Describe your office washroom requirements.",
    placeholder:
      "Number of washrooms, accessibility, vanity, partitions, materials, etc.",
    category: "Office",
  },
];

/* =========================================================
   COMMERCIAL ROOMS
========================================================= */

const COMMERCIAL_ROOMS: WelcomeRoomDefinition[] = [
  {
    id: "commercial-entrance",
    title: "Entrance / Frontage",
    description:
      "Describe the customer-facing entrance experience.",
    placeholder:
      "Entrance treatment, branding, signage, lighting, façade, display, etc.",
    category: "Commercial",
  },

  {
    id: "commercial-reception",
    title: "Reception / Customer Desk",
    description:
      "Tell us about your customer reception requirements.",
    placeholder:
      "Reception counter, waiting, branding, storage, queue management, etc.",
    category: "Commercial",
  },

  {
    id: "showroom-display",
    title: "Showroom / Display Area",
    description:
      "Describe how products or services should be displayed.",
    placeholder:
      "Display units, lighting, product zones, circulation, branding, storage, etc.",
    category: "Commercial",
  },

  {
    id: "customer-area",
    title: "Customer / Seating Area",
    description:
      "Tell us about the customer experience.",
    placeholder:
      "Seating capacity, lounge, tables, privacy, charging, décor, etc.",
    category: "Commercial",
  },

  {
    id: "commercial-office",
    title: "Office / Administration",
    description:
      "Describe your administrative workspace.",
    placeholder:
      "Desks, cabins, storage, meeting area, filing, lighting, etc.",
    category: "Commercial",
  },

  {
    id: "commercial-storage",
    title: "Storage",
    description:
      "Tell us about inventory and storage requirements.",
    placeholder:
      "Shelving, cabinets, stock storage, concealed storage, access requirements, etc.",
    category: "Commercial",
  },

  {
    id: "commercial-pantry",
    title: "Pantry / Service Area",
    description:
      "Describe your pantry or service area.",
    placeholder:
      "Counter, sink, appliances, storage, staff requirements, etc.",
    category: "Commercial",
  },

  {
    id: "commercial-washrooms",
    title: "Washrooms",
    description:
      "Tell us about customer and staff washroom requirements.",
    placeholder:
      "Number of washrooms, accessibility, vanity, partitions, materials, etc.",
    category: "Commercial",
  },

  {
    id: "commercial-other",
    title: "Other Commercial Space",
    description:
      "Add any additional area that needs design attention.",
    placeholder:
      "Training room, consultation room, salon stations, treatment room, kitchen, etc.",
    category: "Other",
  },
];

/* =========================================================
   BEDROOM GENERATOR
========================================================= */

function getBedroomCount(
  configuration: string
): number {
  if (
    configuration === "Studio" ||
    configuration === "1 BHK"
  ) {
    return 0;
  }

  if (configuration === "2 BHK") {
    return 1;
  }

  if (configuration === "3 BHK") {
    return 2;
  }

  if (configuration === "4 BHK") {
    return 3;
  }

  if (
    configuration === "5 BHK" ||
    configuration === "5 BHK+"
  ) {
    return 4;
  }

  if (
    configuration === "6 BHK" ||
    configuration === "6 BHK+"
  ) {
    return 5;
  }

  return 2;
}

/* =========================================================
   CREATE BEDROOMS
========================================================= */

function createBedrooms(
  configuration: string
): WelcomeRoomDefinition[] {
  const bedroomCount =
    getBedroomCount(configuration);

  return Array.from(
    {
      length: bedroomCount,
    },
    (_, index) => {
      const bedroomNumber =
        index + 2;

      return {
        id: `bedroom-${bedroomNumber}`,

        title: `Bedroom ${bedroomNumber}`,

        description:
          `Tell us about the requirements for Bedroom ${bedroomNumber}.`,

        placeholder:
          "Bed size, wardrobe, study, TV, storage, lighting, colours, furniture, etc.",

        category: "Residential" as const,
      };
    }
  );
}

/* =========================================================
   RESIDENTIAL ROOM GENERATOR
========================================================= */

function getResidentialRooms(
  propertyType: WelcomePropertyType,
  configuration: string
): WelcomeRoomDefinition[] {
  const bedrooms =
    createBedrooms(configuration);

  const rooms = [
    ...RESIDENTIAL_BASE_ROOMS,
  ];

  if (
    propertyType === "Villa" ||
    propertyType === "Independent House" ||
    propertyType === "Penthouse"
  ) {
    return [
      ...VILLA_EXTRA_ROOMS.slice(
        0,
        propertyType === "Penthouse"
          ? VILLA_EXTRA_ROOMS.length
          : 4
      ),
      ...rooms.slice(
        0,
        4
      ),
      ...bedrooms,
      ...rooms.slice(4),
    ];
  }

  return [
    ...rooms.slice(0, 4),
    ...bedrooms,
    ...rooms.slice(4),
  ];
}

/* =========================================================
   PUBLIC ROOM RESOLVER
========================================================= */

export function getWelcomeKitRooms(
  propertyType: string,
  configuration: string
): WelcomeRoomDefinition[] {
  const type =
    propertyType as WelcomePropertyType;

  switch (type) {
    case "Apartment":
    case "Villa":
    case "Independent House":
    case "Penthouse":
      return getResidentialRooms(
        type,
        configuration
      );

    case "Office":
      return OFFICE_ROOMS;

    case "Commercial":
      return COMMERCIAL_ROOMS;

    default:
      return [
        {
          id: "custom-space",
          title: "Custom Space",
          description:
            "Describe this space and tell us what you need.",
          placeholder:
            "Please describe the space, its purpose and your requirements.",
          category: "Other",
        },
      ];
  }
}

/* =========================================================
   ROOM REQUIREMENT HELPERS
========================================================= */

export function createInitialRoomRequirements(
  rooms: WelcomeRoomDefinition[]
): Record<string, string> {
  return rooms.reduce(
    (result, room) => {
      result[room.id] = "";
      return result;
    },
    {} as Record<string, string>
  );
}