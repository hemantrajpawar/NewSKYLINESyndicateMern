import { images } from "./siteConfig";

export const services = [
  {
    id: "residential-advisory",
    code: "01",
    title: "Residential Properties",
    lead: "Thoughtfully evaluated homes across Pune's established and emerging residential destinations, aligned with your lifestyle and investment objectives.",
    body: "We work alongside you from the first shortlist to possession  verifying the promoter, scrutinising the title, testing the layout against how you will actually live, and pressure-testing the price before anything is signed.",
    focus: "Koregaon Park · Kalyani Nagar · Baner",
    points: [
      "Promoter solvency and delivery history verification",
      "True carpet area checked against sanctioned plans",
      "Orientation, acoustics, airflow and long-term livability",
      "Exit liquidity and resale considerations",
    ],
    image: images.residential,
    imageAlt: "Marble and hardwood meeting at a brass detail in a calm residential interior",
  },
  {
    id: "commercial-advisory",
    code: "02",
    title: "Commercial Real Estate",
    lead: "Strategically located office, IT and retail spaces, evaluated for business requirements, location advantages and long-term commercial value.",
    body: "Space efficiency, lease structure and operational fit decide whether a commercial asset earns its place on your balance sheet. We examine the building, the covenant and the exit before the term sheet.",
    focus: "Kharadi · Hinjawadi · Viman Nagar",
    points: [
      "Grade-A building and structural due diligence",
      "Absorption and vacancy context in key Pune corridors",
      "Lease lock-ins, escalation terms and yield stability",
      "Capex against operational yield modelling",
    ],
    image: images.commercial,
    imageAlt: "Base of a Grade-A office tower at dusk with a warm reflected horizon",
  },
  {
    id: "luxury-property-advisory",
    code: "03",
    title: "Luxury Properties",
    lead: "Exclusive residences and distinguished property assets, selected for their location, architectural merit and enduring value.",
    body: "For buyers who cannot be seen shopping. Access to unlisted residences, architectural review of what makes an asset genuinely rare, and negotiation conducted under mutual discretion.",
    focus: "Bespoke penthouses · Heritage enclaves",
    points: [
      "Access to privately held, unlisted residences",
      "Architectural integrity, privacy and interior assessment",
      "Discreet negotiation under mutual confidentiality",
      "Long-horizon holding and succession considerations",
    ],
    image: images.luxury,
    imageAlt: "Penthouse terrace with an infinity pool overlooking a city at dusk",
  },
  {
    id: "land-plot-advisory",
    code: "04",
    title: "Land & Plots",
    lead: "Land parcels evaluated beyond location, with careful consideration of title, zoning, development potential and future prospects.",
    body: "Parcels carry history  lineage, mutation, zoning and access. We trace it, then test whether the development you are imagining is permitted, serviced and realistically deliverable.",
    focus: "Growth corridors · Peripheral belts",
    points: [
      "7/12 extract lineage, mutation records and title search",
      "PMRDA and PMC development control and FSI audits",
      "Topographical, geotechnical and access easement checks",
      "Land banking and phased feasibility review",
    ],
    image: images.land,
    imageAlt: "Aerial view of open development land divided into parcels by access roads",
  },
  {
    id: "industrial-real-estate-advisory",
    code: "05",
    title: "Industrial & Logistics",
    lead: "Industrial land, warehouses and logistics facilities assessed for connectivity, infrastructure and operational suitability.",
    body: "Warehousing and light industrial assets are bought on throughput, not aesthetics. We assess regulatory standing, access, floor load and power before the numbers are modelled.",
    focus: "Chakan · Talegaon · Ranjangaon belt",
    points: [
      "MIDC compliance, allotment transfers and zone clearances",
      "Arterial access and supply-chain positioning",
      "Floor load, power sanction and effluent zoning",
      "Built-to-suit and sale-and-leaseback structures",
    ],
    image: images.industrial,
    imageAlt: "Modern logistics facility facade in dark metal cladding at dusk",
  }
];

export const segments = [
  {
    number: "01",
    title: " First-Time Homebuyers",
    mandate: "Capital protection and certainty",
    body: "From property selection and price evaluation to developer credentials, legal considerations and possession timelines, we help first-time buyers approach their purchase with clarity and confidence.",
    points: [
      "Developer delivery history and pending litigation screening",
      "Independent carpet area and price-per-square-foot clarity",
      "Payment milestones tied to verified construction stages",
    ],
  },
  {
    number: "02",
    title: " Real Estate Investors",
    mandate: "Yield and capital strategy",
    body: "Investment opportunities evaluated through rental potential, market fundamentals, capital appreciation prospects and exit considerations  with a clear focus on risk and long-term returns.",
    points: [
      "Rental yield benchmarking across asset types",
      "Infrastructure impact mapping across Pune corridors",
      "Holding structure and liquidity exit planning",
    ],
  },
  {
    number: "03",
    title: " HNI & Luxury Buyers",
    mandate: "Discretion and rarity",
    body: "Discreet representation for discerning buyers seeking premium residences and exclusive property assets, with attention to location, privacy, asset quality and long-term value.",
    points: [
      "Confidential engagement under mutual non-disclosure",
      "Private viewings without public market exposure",
      "Architectural, acoustic and privacy diligence",
    ],
  },
  {
    number: "04",
    title: "Businesses & Enterprises",
    mandate: "Corporate real estate strategy",
    body: "Real estate solutions aligned with business requirements, from office and retail spaces to industrial facilities, evaluated on location, connectivity, operational suitability and occupancy costs.",
    points: [
      "Commute density and talent retention radius analysis",
      "Lease covenants, CAM exposure and escalation caps",
      "Fitout capex against landlord amortisation",
    ],
  },
  {
    number: "05",
    title: " Property Owners & Sellers",
    mandate: "Clean capital realisation",
    body: "Strategic support for property owners through market-based valuation, positioning, buyer identification and a structured approach to achieving the right sale outcome.",
    points: [
      "Objective valuation free of inflated promises",
      "Direct, vetted buyer matching",
      "Legal and tax counsel alignment before closing",
    ],
  },
];

export const stages = [
  {
    step: "01",
    stage: "Stage I",
    title: "Understand",
    body: "We begin by understanding your objectives, budget, preferred location, intended use and long-term expectations. Every requirement starts with the right questions.",
    points: [
      "Principal discovery session",
      "Financial timeline and allocation constraints",
      "Risk sensitivity and exit horizon",
    ],
  },
  {
    step: "02",
    stage: "Stage II",
    title: "Research",
    body: "We study relevant locations, developments, developers, pricing, infrastructure and market conditions to identify opportunities aligned with your requirements.",
    points: [
      "PMRDA zoning and master plan scrutiny",
      "Ground-level infrastructure and access audits",
      "Promoter financial health and debt exposure",
    ],
  },
  {
    step: "03",
    stage: "Stage III",
    title: "Evaluate",
    body: "We assess shortlisted properties on location, pricing, specifications, available project approvals, suitability and potential. The objective is to understand the opportunity beyond its presentation.",
    points: [
      "Verified transaction price reconciliation",
      "Comparison with competing opportunities",
      "Downside protection and liquidity stress tests",
    ],
  },
  {
    step: "04",
    stage: "Stage IV",
    title: "PRESENT",
    body: "We present relevant options, explain their distinguishing features and facilitate site visits, enabling you to compare opportunities and make an informed choice.",
    points: [
      "Independence from vendor commissions",
      "Written advisory memorandum and risk matrix",
      "Negotiation strategy and term structuring",
    ],
  },
  {
    step: "05",
    stage: "Stage V",
    title: "FACILITATE",
    body: "From negotiations and transaction coordination to documentation, registration and possession formalities, we assist in moving the chosen opportunity towards completion.",
    points: [
      "Title advocate coordination and search reports",
      "Agreement scrutiny and milestone audits",
      "Registration support and handover verification",
    ],
  },
];

export const whyUs = [
  {
    title: "MARKET-LED UNDERSTANDING",
    body: "Every property is evaluated in the context of its location, surrounding infrastructure, market demand and future development potential.",
  },
  {
    title: "RESEARCH BEFORE RECOMMENDATION",
    body: "From developer credentials and project approvals to pricing, specifications and possession timelines, we focus on the details that matter before a property decision is made.",
  },
  {
    title: "EXPERTISE ACROSS SEGMENTS",
    body: "Residential, commercial, luxury, land and industrial real estate, approached with relevant market knowledge and a consistent standard of evaluation.",
  }
  
];

export const insights = [
  {
    slug: "punes-changing-real-estate-landscape",
    category: "Macro review",
    readTime: "5 min read",
    title: "Pune's Changing Real Estate Landscape",
    summary:
      "How metro connectivity and new ring-road corridors are redistributing residential demand away from the traditional centre.",
    image: images.metro,
    imageAlt: "Elevated metro viaduct curving through a city at dusk",
    takeaway:
      "Infrastructure is realigning Pune's economic centre of gravity toward decentralised, transit-oriented micro-hubs.",
    body: [
      "For decades, Pune's prime residential wealth stayed anchored around the historic core and the eastern corridors of Koregaon Park, Kalyani Nagar and Boat Club Road. The past three years have begun to shift that pattern.",
      "Metro expansion and the ring-road programme are decoupling accessibility from proximity to the old centre. Western corridors such as Baner, Balewadi and Mahalunge are turning from suburban extensions into self-sustaining commercial-residential ecosystems.",
      "For buyers, this means postal-code assumptions deserve to be questioned. A decision is stronger when infrastructure completion timelines are mapped against a developer's financial position.",
    ],
  },
  {
    slug: "real-estate-as-an-investment",
    category: "Capital strategy",
    readTime: "6 min read",
    title: "How to Think About Real Estate as an Investment",
    summary:
      "Yield versus capital appreciation, and why a flat, an office and a land parcel should never be judged on the same terms.",
    image: images.glassReflection,
    imageAlt: "Glass tower reflecting a neighbouring stone building at sunset",
    takeaway:
      "Total return — net yield, inflation protection and downside preservation — matters more than any single headline number.",
    body: [
      "Property is not one asset class. A flat in an oversupplied high-rise cluster behaves very differently from a pre-leased commercial floor or an industrial land parcel.",
      "Rental yield in Pune's residential market is modest once taxes, maintenance, vacancy and transaction costs are accounted for, which means capital growth and exit liquidity carry much of the return.",
      "Clarity of purpose comes first: is the capital deployed for cash flow, or for preservation across a generation? The right asset is different for each, and so is the diligence.",
    ],
  },
  {
    slug: "first-time-buyers-considerations",
    category: "Buyer advisory",
    readTime: "4 min read",
    title: "What Should First-Time Buyers Consider Before Deciding?",
    summary:
      "Beyond the sample flat: statutory compliance, title clarity, carpet-area ratios and the lifetime cost of ownership.",
    image: images.apartment,
    imageAlt: "Contemporary apartment tower facade with deep balconies in morning light",
    takeaway:
      "Finishes are temporary. Sanctioned plans, promoter leverage and title provenance are permanent.",
    body: [
      "A first home is the purchase most exposed to emotion. Illuminated show flats and rendered brochures are designed to answer questions you have not yet thought to ask.",
      "Start with the promoter: balance sheet, construction debt and unsold inventory. Execution risk during a slow market is a financial risk to you, not only a delay.",
      "Then compare the sanctioned layout with the marketing plan, and total the real cost of ownership — stamp duty, registration, GST, club charges, infrastructure contributions and maintenance — before the budget is fixed.",
    ],
  },
  {
    slug: "residential-or-commercial-difference",
    category: "Asset comparison",
    readTime: "7 min read",
    title: "Residential or Commercial: Understanding the Difference",
    summary:
      "Risk exposure, liquidity velocity and legal frameworks compared, without a preferred answer.",
    image: images.facadeGeometry,
    imageAlt: "Layered stone and shadow building facades in low warm sunlight",
    takeaway:
      "Commercial assets favour cash flow and institutional covenants; residential assets favour liquidity and simplicity.",
    body: [
      "The choice between residential and commercial is an exercise in risk-adjusted allocation, not a matter of preference.",
      "Commercial assets generally carry stronger yields, structured escalations and tenants who absorb fit-out and internal maintenance — against higher entry thresholds and longer vacancy cycles when a tenant exits.",
      "Residential assets yield less but transact faster and cost less to re-let. Most considered portfolios hold both, in proportions that follow the owner's liquidity needs rather than the market's mood.",
    ],
  },
];

export const principles = [
  {
    title: "Advice without a sales target",
    body: "We are retained by the client. No developer incentive sits behind a recommendation, which is why the most useful sentence we can offer is sometimes: do not buy this.",
  },
  {
    title: "Diligence as standard",
    body: "Title, sanction, promoter solvency and livability are examined on every mandate — a first apartment and a warehousing portfolio get the same tests.",
  },
  {
    title: "Discretion by default",
    body: "Client identities, holdings and negotiations stay private. Viewings and outreach are arranged without public exposure.",
  },
  {
    title: "Written reasoning",
    body: "Recommendations are documented, with the assumptions and the risks visible, so a decision can be reviewed rather than remembered.",
  },
];

export const interestOptions = [
  "Residential",
  "Commercial",
  "Luxury",
  "Land & Plots",
  "Industrial",
  "Selling",
  "Other",
];

export const contactMethods = ["Email", "Phone call", "WhatsApp"];