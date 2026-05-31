// FactoryRouter Product × Channel Intelligence
// Opportunity Score = Demand Trend + Channel Fit + Supplier Accessibility (each 1–5, total 3–15)
// Scores are qualitative judgments, not statistical models.

export type ChannelFitRow = {
  channel: string;
  fit: number; // 1–5
  reason: string;
};

export type ProductIntel = {
  slug: string;
  name: string;
  category: string;
  demandTrend: number;
  channelFit: number;
  supplierAccessibility: number;
  opportunityScore: number; // sum
  bestChannels: string[];
  insight: string; // short card summary
  marketOverview: {
    demandDrivers: string;
    mainMarkets: string;
    priceBands: string;
    buyerBehavior: string;
  };
  channelFitTable: ChannelFitRow[];
  supplierLandscape: {
    regions: string;
    factoryTypes: string;
    capabilityRequirements: string;
  };
  keyPlayers: {
    brands: string;
    retailers: string;
    platforms: string;
    positioning: string;
  };
  routingNote: string; // THE moat — operator-level observations
  aiOpportunity: {
    workflow: string;
    content: string;
    leadQualification: string;
  };
};

export const productIntelData: ProductIntel[] = [
  {
    slug: "murphy-bed",
    name: "Murphy Bed",
    category: "Space-Saving Furniture",
    demandTrend: 4,
    channelFit: 3,
    supplierAccessibility: 4,
    opportunityScore: 11,
    bestChannels: ["Wayfair", "Shopify DTC"],
    insight:
      "Strong demand from urban renters and small-space buyers. Most suppliers fail at channel selection, not manufacturing.",
    marketOverview: {
      demandDrivers:
        "Rising urban density, remote-work home office demand, and increasing awareness of space-saving solutions have driven sustained interest in Murphy Beds. The segment benefits from home improvement trends and growing acceptance of multi-purpose furniture.",
      mainMarkets:
        "United States (primary), Canada, Western Europe. Urban metros with high rent costs show the strongest conversion rates. Secondary markets include Australia and the UK.",
      priceBands:
        "Entry-level wall beds: $500–$1,200 retail. Mid-range with integrated shelving: $1,500–$3,000. Premium custom installations: $4,000+. Hardware kits for DIY: $200–$600.",
      buyerBehavior:
        "Buyers research heavily before purchase — average 3–5 weeks consideration. YouTube tutorials and before/after content drive high-intent traffic. Purchase is rarely impulsive. Reviews and return policies are critical trust signals.",
    },
    channelFitTable: [
      {
        channel: "Wayfair",
        fit: 5,
        reason:
          "Wayfair's white-glove delivery and large-item expertise makes it the natural fit. High-AOV tolerance and buyer intent match the segment well.",
      },
      {
        channel: "Shopify DTC",
        fit: 4,
        reason:
          "DTC allows premium positioning, richer storytelling, and better margin control. Requires investment in content and paid media.",
      },
      {
        channel: "Amazon",
        fit: 2,
        reason:
          "Freight economics are punishing for large furniture. Return rates kill margin. Brand building is difficult. Not recommended as primary channel.",
      },
      {
        channel: "Walmart Marketplace",
        fit: 3,
        reason:
          "Better freight infrastructure than Amazon for large items. Lower buyer intent for premium furniture. Works for entry-level SKUs.",
      },
      {
        channel: "TikTok Shop",
        fit: 2,
        reason:
          "High AOV limits impulse conversion. Space transformation content performs well organically, but closing a $2,000+ purchase through social commerce is difficult.",
      },
    ],
    supplierLandscape: {
      regions:
        "Primary manufacturing in Guangdong (Foshan, Dongguan) and Zhejiang. Hardware components often sourced from Italy or Taiwan for premium lines.",
      factoryTypes:
        "Panel furniture factories with CNC capabilities, specialized wall bed hardware assemblers, and custom joinery shops for premium segments.",
      capabilityRequirements:
        "CNC precision cutting, hardware sourcing relationships, flat-pack assembly design, weight tolerance engineering (100kg+ load), and packaging capable of surviving LTL freight.",
    },
    keyPlayers: {
      brands: "Resource Furniture, Expand Furniture, Clei (Italian premium)",
      retailers: "Wayfair, Pottery Barn, Crate & Barrel (premium segment)",
      platforms: "Amazon (volume), Wayfair (primary), manufacturer DTC sites",
      positioning:
        "Winning brands focus on the transformation story — space gained, lifestyle unlocked — rather than product specifications.",
    },
    routingNote:
      "Murphy Beds rarely fail because of manufacturing. The product is mature and Chinese factories produce excellent quality at competitive prices.\n\nMost failures come from channel mismatch.\n\nAmazon's return rates for large furniture can reach 12–18%. A single returned Murphy Bed can eliminate the margin on 3–5 successful sales. Suppliers who launch on Amazon first often burn out before finding their footing.\n\nWayfair is usually the better first channel. Their logistics infrastructure, buyer intent, and return handling are purpose-built for large furniture. The onboarding process is more demanding, but the economics hold up.\n\nThe second move after Wayfair traction is almost always DTC — a clean Shopify store with strong room transformation content. Buyers who already know the brand convert at significantly higher rates direct.",
    aiOpportunity: {
      workflow:
        "AI can dramatically accelerate product listing creation — generating optimized titles, bullet points, and descriptions from factory spec sheets. A well-trained workflow can produce Wayfair and Amazon listings in under 10 minutes per SKU.",
      content:
        "AI-generated before/after room visualization from product images could meaningfully improve conversion rates. This is an underserved capability in the Murphy Bed space.",
      leadQualification:
        "AI can pre-qualify supplier leads by parsing capability statements, certifications, and product portfolios — reducing manual review time from hours to minutes.",
    },
  },

  {
    slug: "standing-desk",
    name: "Standing Desk",
    category: "Office Furniture",
    demandTrend: 5,
    channelFit: 4,
    supplierAccessibility: 5,
    opportunityScore: 14,
    bestChannels: ["Amazon", "Shopify DTC", "Wayfair"],
    insight:
      "Peak WFH demand has stabilized but remains strong. Highly competitive on Amazon — DTC and B2B corporate channels offer better economics.",
    marketOverview: {
      demandDrivers:
        "Remote and hybrid work normalization, ergonomics awareness, and corporate wellness initiatives continue to drive demand. The category has matured from pandemic spike into sustained baseline.",
      mainMarkets:
        "United States (dominant), Canada, UK, Germany, Australia. Corporate procurement is an underserved channel with strong repeat purchase potential.",
      priceBands:
        "Manual crank: $150–$350. Electric single-motor: $350–$700. Electric dual-motor premium: $700–$1,500. Corporate/enterprise custom: negotiated.",
      buyerBehavior:
        "Consumer buyers research on YouTube and Reddit before converting. B2B buyers respond to spec sheets, warranty terms, and volume pricing. Ergonomics certifications (BIFMA) are increasingly important for corporate sales.",
    },
    channelFitTable: [
      {
        channel: "Amazon",
        fit: 4,
        reason:
          "High search volume, established category. Competitive but viable with strong reviews and optimized listings. FBA works well for standing desks.",
      },
      {
        channel: "Shopify DTC",
        fit: 5,
        reason:
          "Premium positioning, warranty storytelling, and B2B landing pages all work well on DTC. Flexispot and Uplift have proven the model.",
      },
      {
        channel: "Wayfair",
        fit: 4,
        reason:
          "Good buyer intent for home office category. Less competitive than Amazon. White-glove not typically required.",
      },
      {
        channel: "Walmart Marketplace",
        fit: 3,
        reason:
          "Growing home office category on Walmart. Less competitive than Amazon. Works for mid-range price points.",
      },
      {
        channel: "TikTok Shop",
        fit: 3,
        reason:
          "Workspace setup content performs well. $400–$700 price point is reachable but requires strong content strategy.",
      },
    ],
    supplierLandscape: {
      regions:
        "Guangdong and Zhejiang dominate manufacturing. Tianjin has strong steel frame production. Component sourcing (motors, control boxes) concentrated in Guangdong.",
      factoryTypes:
        "Steel fabrication factories, electric actuator assemblers, surface finishing specialists. Many factories produce both consumer and commercial grades.",
      capabilityRequirements:
        "Steel tube welding and powder coating, electric motor integration, control box programming, weight load testing (150kg+), and flat-pack packaging engineering.",
    },
    keyPlayers: {
      brands: "Flexispot, Uplift Desk, Autonomous, Vari, Fully",
      retailers: "Amazon, Costco, Best Buy (emerging), Office Depot",
      platforms: "Amazon (primary), brand DTC stores",
      positioning:
        "Winning brands own the wellness and productivity narrative, not just the product spec. Warranty and customer service are significant differentiators.",
    },
    routingNote:
      "Standing desks are the most competitive Chinese furniture export category on Amazon. Price compression has been severe — margins on entry-level electric desks are thin.\n\nThe real opportunity is in B2B corporate procurement. Companies kitting out hybrid offices need volume, want warranties, and care less about price than they do about reliability and service terms. This channel is underserved by most Chinese suppliers.\n\nDTC is the second opportunity. Flexispot and Uplift have proven that brands built around ergonomics positioning can command 30–50% premium over Amazon prices.\n\nFor suppliers entering this category: do not lead with Amazon. Build a DTC brand with a clear wellness/ergonomics story, then use Amazon as a secondary channel for volume.",
    aiOpportunity: {
      workflow:
        "B2B quote generation — AI can produce customized volume pricing and spec proposals from a simple intake form. This removes the 2–3 day back-and-forth that kills corporate deals.",
      content:
        "Workspace transformation content and ergonomics education are high-performing content types. AI can accelerate production of comparison guides, setup tutorials, and benefit explainers.",
      leadQualification:
        "Corporate RFQ qualification — AI can parse inquiry emails to identify company size, timeline, budget indicators, and decision-maker level before human review.",
    },
  },

  {
    slug: "planter-pot",
    name: "Planter Pot",
    category: "Home & Garden",
    demandTrend: 3,
    channelFit: 5,
    supplierAccessibility: 5,
    opportunityScore: 13,
    bestChannels: ["TikTok Shop", "Amazon", "Shopify DTC"],
    insight:
      "Highly visual, lifestyle-driven category with exceptional TikTok Shop fit. Bundle strategy with soil or accessories significantly improves margin.",
    marketOverview: {
      demandDrivers:
        "Houseplant culture, biophilic design trends, and urban gardening awareness continue to drive the category. Social media amplification keeps demand visible year-round with seasonal spikes in spring.",
      mainMarkets:
        "United States, UK, Australia, Canada. Urban and suburban demographics with disposable income and home ownership skew highest.",
      priceBands:
        "Basic ceramic/plastic pots: $8–$30. Designer or artisan-style: $30–$120. Large outdoor statement planters: $80–$300. Specialty materials (terracotta, metal, fibreglass): $25–$200.",
      buyerBehavior:
        "Impulse-friendly at lower price points. Discovery-driven — buyers often don't search with intent but convert after seeing content. Repeat purchase potential is high if brand memory is established.",
    },
    channelFitTable: [
      {
        channel: "TikTok Shop",
        fit: 5,
        reason:
          "Perfect category for social commerce — visual, lifestyle, low AOV, impulse-friendly. Plant styling videos perform exceptionally well. Commission model works at these margins.",
      },
      {
        channel: "Amazon",
        fit: 5,
        reason:
          "Massive search volume, FBA logistics work well at this weight/size. Highly competitive but achievable with differentiated design and strong imagery.",
      },
      {
        channel: "Shopify DTC",
        fit: 4,
        reason:
          "Works well for premium or artisan positioning. Bundles (pot + soil + care kit) can improve AOV and tell a better brand story.",
      },
      {
        channel: "Wayfair",
        fit: 3,
        reason:
          "Home decor category is active on Wayfair. Less social discovery, more search-based. Works for premium outdoor planters.",
      },
      {
        channel: "Walmart Marketplace",
        fit: 4,
        reason:
          "Strong garden category on Walmart. Lower ASP but high volume potential. Entry-level and mid-range products work well.",
      },
    ],
    supplierLandscape: {
      regions:
        "Guangdong (Guangzhou, Foshan), Jiangsu, and Shandong. Yixing (Jiangsu) is world-famous for Zisha/terracotta work. Ceramics clusters in Jingdezhen.",
      factoryTypes:
        "Ceramics factories, injection moulding plastics factories, fibreglass/GRP manufacturers, metal fabricators. Wide variety allows rapid design iteration.",
      capabilityRequirements:
        "Design capability for trend-responsive SKUs, ceramic glaze development, drainage engineering, weight optimization for shipping, and UV-resistant outdoor finishes.",
    },
    keyPlayers: {
      brands: "La Jolíe Muse, Mkono, Fox & Fern, POTEY",
      retailers: "Amazon (dominant), Target, Home Depot, Walmart",
      platforms: "Amazon, TikTok Shop (fast growing), Etsy (artisan)",
      positioning:
        "Leading brands combine design aesthetics with content marketing. The plant parent community responds to brands that understand the lifestyle, not just the product.",
    },
    routingNote:
      "Planters are one of the few categories where TikTok Shop is already a primary revenue channel, not an experiment.\n\nThe winning formula is simple: find a designer with plant styling sensibility, produce 30-second transformation videos, enable TikTok Shop affiliate commissions, and iterate on what converts.\n\nThe bundle play is underutilized. Most suppliers sell pots alone. A pot + premium soil + plant care card bundle at $35–$45 AOV converts better than a standalone $15 pot and delivers 3x the margin.\n\nFor suppliers: do not lead with commodity pots. Identify one design direction — minimalist concrete, earthy terracotta, or statement colorways — and own it. Generic pot libraries get lost.",
    aiOpportunity: {
      workflow:
        "AI-assisted trend detection — scraping TikTok, Pinterest, and Instagram for emerging design aesthetics and translating them into factory briefs. This can compress the trend-to-production cycle from 6 months to 6 weeks.",
      content:
        "AI video scriptwriting for TikTok Shop affiliates. Generating plant care guides and styling tips for product pages. Product description variants for A/B testing.",
      leadQualification:
        "Affiliate creator qualification — AI can evaluate creator profile fit (follower quality, niche alignment, engagement rate) before outreach.",
    },
  },

  {
    slug: "outdoor-storage-shed",
    name: "Outdoor Storage Shed",
    category: "Outdoor Living",
    demandTrend: 3,
    channelFit: 2,
    supplierAccessibility: 3,
    opportunityScore: 8,
    bestChannels: ["Wayfair", "Walmart Marketplace"],
    insight:
      "High freight costs and complex logistics make most channels uneconomical. Wayfair and Walmart have better infrastructure for heavy/large outdoor products.",
    marketOverview: {
      demandDrivers:
        "Suburban homeownership, garden expansion post-pandemic, and e-bike/equipment storage needs continue to drive the category. Home improvement cycles correlate with housing market activity.",
      mainMarkets:
        "United States (dominant — suburban homeowner with yard). Canada. UK and Germany for smaller garden sheds. Australia for outdoor living.",
      priceBands:
        "Small plastic sheds (4x6 ft): $150–$400. Mid-range metal/wood composite: $400–$1,200. Premium large wood sheds: $1,500–$5,000+. Installation services add $200–$800.",
      buyerBehavior:
        "Considered purchase with long research cycles (4–8 weeks). YouTube assembly videos and installation reviews are major influence points. Buyers care deeply about durability claims, warranty, and real-world reviews.",
    },
    channelFitTable: [
      {
        channel: "Wayfair",
        fit: 4,
        reason:
          "Wayfair's large-item delivery infrastructure is well-suited. High buyer intent for outdoor living. Assembly service partnerships available.",
      },
      {
        channel: "Walmart Marketplace",
        fit: 4,
        reason:
          "Strong home improvement category, improving last-mile capabilities. Works well for mid-range plastic and metal sheds.",
      },
      {
        channel: "Amazon",
        fit: 1,
        reason:
          "LTL freight economics are brutal. Return handling is extremely costly. Most shed suppliers who start on Amazon exit within 12 months.",
      },
      {
        channel: "Shopify DTC",
        fit: 3,
        reason:
          "Works for premium wood sheds with strong storytelling. Requires significant logistics setup for large-item shipping.",
      },
      {
        channel: "TikTok Shop",
        fit: 1,
        reason:
          "AOV is too high for social commerce impulse. Assembly complexity works against quick conversion. Not recommended.",
      },
    ],
    supplierLandscape: {
      regions:
        "Guangdong, Shandong (steel fabrication), and Hebei for metal sheds. Wood composite sheds often assembled from Southeast Asian timber components.",
      factoryTypes:
        "Sheet metal stamping and roll-forming factories, injection moulding for resin/plastic sheds, wood processing mills.",
      capabilityRequirements:
        "Structural load engineering (wind, snow loads for US building codes), weatherproofing and anti-corrosion treatments, flat-pack assembly design optimized for homeowner self-install, and LTL-optimized packaging.",
    },
    keyPlayers: {
      brands: "Rubbermaid, Suncast, Arrow Storage, Keter, Lifetime Products",
      retailers: "Home Depot, Lowe's, Walmart, Wayfair, Costco",
      platforms: "Wayfair, Walmart Marketplace, brand DTC sites",
      positioning:
        "Established players compete on durability claims, warranty length, and ease of assembly. Assembly service bundling is an emerging differentiator.",
    },
    routingNote:
      "Outdoor storage sheds have one of the worst freight-to-product-value ratios in furniture. A typical 8x10 metal shed ships LTL at 500–700 lbs. The freight cost can represent 20–30% of the retail price.\n\nThis makes Amazon's return policy catastrophic — a single return can cost $300–$500 in freight alone. Suppliers who don't model this before launch are in for a painful surprise.\n\nWayfair and Walmart Marketplace have significantly better infrastructure for this category. Both have developed freight programs and assembly service partnerships that make the economics work.\n\nThe most defensible position in this category is assembly service bundling. Suppliers who partner with local installation services or national assembly brands (TaskRabbit, Handy) can differentiate meaningfully and command a premium. This is an underexplored opportunity.",
    aiOpportunity: {
      workflow:
        "AI-assisted compliance checking — automatically verifying that product specifications meet US building code wind/snow load requirements by state, reducing manual compliance review time.",
      content:
        "Assembly instruction optimization — AI-improved visual instructions and video scripts reduce customer support load (assembly questions are the #1 support category for sheds).",
      leadQualification:
        "Retailer buyer outreach — AI can draft personalized pitch decks for Home Depot/Lowe's buyer outreach, adapting product positioning to each retailer's category strategy.",
    },
  },
];

// Channel definitions
export type ChannelIntel = {
  id: string;
  name: string;
  bestProductTypes: string;
  strengths: string[];
  weaknesses: string[];
  shouldUse: string;
  shouldAvoid: string;
};

export const channelIntelData: ChannelIntel[] = [
  {
    id: "amazon",
    name: "Amazon",
    bestProductTypes:
      "Small-to-mid-size products under 50 lbs, high search volume categories, consumables with repeat purchase, branded items with strong reviews.",
    strengths: [
      "Massive buyer intent — customers arrive ready to purchase",
      "FBA handles logistics, returns, and customer service",
      "Best-in-class search discovery for established categories",
      "Prime shipping builds conversion trust",
    ],
    weaknesses: [
      "Punishing return economics for large/heavy items",
      "Brand differentiation is extremely difficult",
      "Fee structure (referral + FBA) compresses margin",
      "Counterfeit and gray-market competition in popular categories",
    ],
    shouldUse:
      "Suppliers with products under 50 lbs, strong review moat potential, and price points above $30. Best for categories with high organic search volume.",
    shouldAvoid:
      "Large furniture, heavy outdoor products, anything with high return rates (beds, mattresses, assembled furniture). Do not use Amazon as a primary channel for LTL categories.",
  },
  {
    id: "wayfair",
    name: "Wayfair",
    bestProductTypes:
      "Furniture, large home décor, outdoor living, rugs, lighting. Large-item specialists. High-AOV products ($200+) in home categories.",
    strengths: [
      "Purpose-built logistics for large furniture and home goods",
      "High buyer intent for home category",
      "White-glove delivery network for premium items",
      "Less fee compression than Amazon for large items",
    ],
    weaknesses: [
      "Demanding onboarding and compliance requirements",
      "Lower traffic than Amazon — requires category investment",
      "Return rates can still be significant in furniture",
      "Slower payment cycles than some other channels",
    ],
    shouldUse:
      "Furniture and large home goods suppliers. Products where freight economics matter. Suppliers willing to invest in professional photography and detailed product specs.",
    shouldAvoid:
      "Small accessories and impulse-buy items. Products below $100 AOV where margins don't support Wayfair's fee structure.",
  },
  {
    id: "shopify-dtc",
    name: "Shopify DTC",
    bestProductTypes:
      "Premium or branded products with a story to tell. High-AOV items where brand differentiation justifies direct purchase. Repeat-purchase categories.",
    strengths: [
      "Full brand control — own the customer relationship",
      "Highest margin channel (no marketplace fee)",
      "Email list and CRM asset building",
      "Flexible for bundles, subscriptions, and upsells",
    ],
    weaknesses: [
      "Requires significant upfront investment in content and paid media",
      "No built-in traffic — customer acquisition cost is the supplier's problem",
      "Operations complexity — logistics, returns, customer service owned by brand",
      "Longer time-to-revenue than marketplace channels",
    ],
    shouldUse:
      "Brands with a compelling story, premium positioning, or strong repeat purchase potential. Suppliers who have already validated product-market fit on a marketplace.",
    shouldAvoid:
      "Commodity products without differentiation. Suppliers without marketing capability or budget. First-time market entries without prior customer validation.",
  },
  {
    id: "tiktok-shop",
    name: "TikTok Shop",
    bestProductTypes:
      "Visual, lifestyle-driven products. Impulse-friendly price points ($15–$100). Beauty, home décor, kitchen gadgets, fashion accessories, planters, small gadgets.",
    strengths: [
      "Discovery engine — buyers find products they weren't searching for",
      "Affiliate creator network drives traffic at performance-based cost",
      "Fast-growing with favorable algorithm for new products",
      "Strong conversion for visually compelling products",
    ],
    weaknesses: [
      "High AOV products ($200+) rarely convert through social commerce",
      "Creator-dependent — finding quality affiliates is time-consuming",
      "Policy and platform risk — TikTok's US future has been uncertain",
      "Returns and customer service complexity at scale",
    ],
    shouldUse:
      "Suppliers with visual products, lifestyle story potential, and price points under $100. Brands willing to invest in creator relationships and content production.",
    shouldAvoid:
      "Considered purchases requiring research. High-AOV furniture, heavy equipment, or technical products. Brands not prepared to manage creator relationships.",
  },
  {
    id: "walmart-marketplace",
    name: "Walmart Marketplace",
    bestProductTypes:
      "Value-to-mid-range products, household essentials, outdoor and garden, automotive, sporting goods. Large-item categories where Walmart's freight infrastructure helps.",
    strengths: [
      "Growing third-party marketplace with improving seller tools",
      "Better large-item freight infrastructure than Amazon",
      "Less competition than Amazon in many categories",
      "Walmart+ membership driving buyer intent",
    ],
    weaknesses: [
      "Stricter compliance and brand requirements than Amazon",
      "Lower average order values than Wayfair or DTC",
      "Brand building is difficult — similar dynamic to Amazon",
      "Traffic still significantly behind Amazon",
    ],
    shouldUse:
      "Suppliers with competitively priced products in home, garden, outdoor, or general merchandise. Good secondary channel for Amazon sellers looking to diversify.",
    shouldAvoid:
      "Premium luxury brands — Walmart's buyer demographics skew value-conscious. Not recommended as first channel without marketplace experience.",
  },
];
