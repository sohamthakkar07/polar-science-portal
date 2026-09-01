import { LearningModule } from '../types/polar';

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'learn-cryosphere-sea-ice',
    title: 'The Polar Cryosphere: Sea Ice vs. Land Ice',
    tagline: 'Why melting sea ice doesn’t raise sea level, but melting ice sheets will reshape every coastline on Earth.',
    topic: 'Cryosphere',
    region: 'Antarctic',
    readingTimeMinutes: 7,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Sea ice floes drifting across the Southern Ocean off East Antarctica',
    eli15: {
      analogy: 'Think of an ice cube floating inside a full glass of water. When that ice cube melts, the water in the glass does NOT overflow, because the floating ice already displaced its own weight in liquid. That is Sea Ice. Now imagine throwing an ice cube from your freezer onto the top of the glass. The water immediately overflows. That is Land Ice (Glaciers & Ice Sheets)!',
      simpleExplanation: 'Sea ice is frozen ocean seawater (1 to 4 meters thick) that grows each winter and shrinks each summer. Because it is already floating in the ocean, its melting does not directly raise sea levels. However, it acts as a giant white planetary mirror (albedo) reflecting 85% of solar heat back into space. Glaciers and Ice Sheets (like Antarctica and Greenland), on the other hand, are kilometers-thick slabs of compressed snow sitting on rock. When they melt into the ocean, they add brand new water volume, raising global sea levels.',
      keyTakeaway: 'Sea ice controls Earth’s temperature mirror; Land ice controls global sea levels.',
      funFact: 'Antarctica holds about 61% of all fresh water on Earth. If the entire Antarctic Ice Sheet were to melt, global sea levels would rise by approximately 58 meters (190 feet)!',
      didYouKnow: 'Arctic sea ice floats on an ocean surrounded by continents; Antarctica is a frozen continent surrounded by stormy oceans.'
    },
    goDeeper: {
      scientificPrinciples: [
        'Thermodynamic vs Dynamic Sea Ice Growth (Fraxil ice → Nilas → Pancake ice → Consolidated pack)',
        'Brine Rejection & Thermohaline Circulation (Antarctic Bottom Water formation)',
        'Ice Albedo Feedback Loop: α_ice ≈ 0.85 vs α_ocean ≈ 0.06'
      ],
      governingEquationsOrMechanisms: 'Radiative equilibrium: Net flux ΔQ = (1 - α)S_in - εσT⁴. When reflective sea ice (α=0.85) converts to dark open ocean (α=0.06), the ocean absorbs ~14 times more solar radiation, triggering a self-reinforcing positive warming feedback.',
      activeResearchFrontiers: 'Quantifying multi-year ice thickness using ICESat-2 photon-counting lidar and CryoSat-2 radar altimetry to predict the first ice-free Arctic summer.',
      instrumentsUsed: ['Passive Microwave Radiometers (SSMIS)', 'Laser Altimeters (ICESat-2 ATLAS)', 'SAR Satellites (Sentinel-1, NISAR)']
    },
    keyQuestionsAnswered: [
      {
        question: 'How thick is polar sea ice compared to the Antarctic ice sheet?',
        answer: 'Sea ice is remarkably thin—typically between 1 and 4 meters thick. In contrast, the Antarctic ice sheet averages over 2,160 meters (over 2 km) in thickness, reaching a maximum depth of nearly 4,800 meters!'
      },
      {
        question: 'What is brine rejection and why does it matter?',
        answer: 'When seawater freezes into ice crystals, salt is expelled because salt cannot fit into the water crystal lattice. This ultra-cold, ultra-salty water sinks rapidly to the abyss, forming Antarctic Bottom Water (AABW) which drives the global ocean conveyor belt.'
      }
    ],
    connectedDatasetIds: ['nsidc-sea-ice-index'],
    connectedStationIds: ['maitri', 'bharati'],
    connectedPaperIds: ['paper-nsidc-sea-ice-trends-2023'],
    relatedQuizIds: ['quiz-sea-ice-dynamics', 'myth-sea-ice-level'],
    provenance: {
      sourceOrganization: 'National Snow and Ice Data Center (NSIDC) & NCPOR',
      sourceOrgShort: 'NSIDC / NCPOR',
      originalSourceUrl: 'https://nsidc.org/learn/parts-cryosphere/sea-ice',
      license: 'Educational Open Content / CC-BY 4.0',
      accessStatus: 'Open Access',
      attribution: 'Grounded in NSIDC Cryosphere Science Education & NCPOR Antarctic Research Publications.',
      isVerified: true
    }
  },
  {
    id: 'learn-antarctic-ozone-hole',
    title: 'The Antarctic Ozone Hole: How Science Saved the Sky',
    tagline: 'The story of the stratospheric crisis, polar vortex chemistry, and the most successful environmental treaty in history.',
    topic: 'Atmosphere',
    region: 'Antarctic',
    readingTimeMinutes: 8,
    coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The stratosphere glowing above Halley VI Station in the Antarctic spring',
    eli15: {
      analogy: 'Imagine wearing a giant pair of sunglasses around the entire planet that blocks dangerous UV sunburn rays from blinding life on Earth. In the 1980s, chemicals from old aerosol hairsprays and refrigerators acted like acid dropping onto those sunglasses, eating a huge hole over Antarctica every spring.',
      simpleExplanation: 'The ozone layer sits high in the stratosphere (15–35 km up) and absorbs harmful ultraviolet-B radiation. In 1985, British scientists at Halley Station discovered that chlorine atoms from chlorofluorocarbons (CFCs) were destroying ozone over Antarctica every spring. Because Antarctica is the coldest place on Earth, icy clouds form in the stratosphere where dormant chlorine turns into ozone-eating monsters when the spring sun rises. In 1987, the world signed the Montreal Protocol to ban CFCs, and the ozone layer is now steadily healing!',
      keyTakeaway: 'The Montreal Protocol proves that when global science and policy unite, we can successfully reverse planetary-scale environmental damage.',
      funFact: 'A single chlorine atom released from a CFC molecule can break apart over 100,000 ozone molecules before it is removed from the atmosphere!',
      didYouKnow: 'Scientists predict that the Antarctic ozone hole will fully recover to pre-1980 levels around the year 2066.'
    },
    goDeeper: {
      scientificPrinciples: [
        'Chapman Photochemical Mechanism for Ozone Generation and Natural Destruction',
        'Heterogeneous Catalysis on Polar Stratospheric Clouds (PSCs / Nacreous Clouds)',
        'Polar Vortex Isolation: Potential Vorticity barriers trapping ozone-depleted air masses'
      ],
      governingEquationsOrMechanisms: 'Catalytic chlorine destruction cycle: (1) Cl + O₃ → ClO + O₂, (2) ClO + O → Cl + O₂. Net reaction: O₃ + O → 2 O₂. On Type I and Type II PSC ice crystals below -78°C, reservoir species (HCl and ClONO₂) convert to photo-labile Cl₂ which photolyzes at sunrise into reactive free radical Cl atoms.',
      activeResearchFrontiers: 'Assessing the impacts of volcanic aerosols (e.g., 2022 Hunga Tonga eruption water vapor injection) and wildfire pyrocumulonimbus smoke on stratospheric ozone recovery rates.',
      instrumentsUsed: ['Dobson Ozone Spectrophotometers', 'Ozone Sondes (Weather balloons)', 'NASA OMI / OMPS Satellite Sensors']
    },
    keyQuestionsAnswered: [
      {
        question: 'Why does the ozone hole only open over Antarctica and not over the equator?',
        answer: 'Because Antarctica gets extremely cold during its pitch-black winter (-80°C to -90°C in the stratosphere). This extreme cold creates Polar Stratospheric Clouds (PSCs) and a tight wind whirlpool called the Polar Vortex, which creates the exact chemical reaction chamber required for rapid ozone destruction.'
      }
    ],
    connectedDatasetIds: ['bas-halley-ozone-column'],
    connectedStationIds: ['halley-vi', 'maitri'],
    connectedPaperIds: ['paper-halley-ozone-discovery-1985'],
    relatedQuizIds: ['quiz-ozone-hole-science', 'myth-ozone-climate'],
    provenance: {
      sourceOrganization: 'NASA Goddard Space Flight Center & British Antarctic Survey',
      sourceOrgShort: 'NASA / BAS',
      originalSourceUrl: 'https://ozonewatch.gsfc.nasa.gov/facts/history.html',
      license: 'Public Domain / Open Data',
      accessStatus: 'Open Access',
      attribution: 'NASA Ozone Watch Science Summary & WMO/UNEP Scientific Assessment of Ozone Depletion.',
      isVerified: true
    }
  },
  {
    id: 'learn-indian-polar-programme',
    title: 'India’s Polar Journey: From Gangotri to the Third Pole',
    tagline: 'How India established permanent scientific strongholds across Antarctica, the High Arctic, and the Western Himalayas.',
    topic: 'Indian Polar Programme',
    region: 'Antarctic',
    readingTimeMinutes: 9,
    coverImage: 'https://images.unsplash.com/photo-1548685913-fe6574346a23?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Bharati Station in the Larsemann Hills, Princess Elizabeth Land, East Antarctica',
    eli15: {
      analogy: 'Imagine a triangle connecting the South Pole (Antarctica), the North Pole (Arctic), and the highest mountains on Earth (Himalayas). India is one of the few nations on Earth with active, permanent research bases on all three corners of this planetary ice triangle!',
      simpleExplanation: 'India’s polar journey began in 1981 with Operation Gangotri. Since then, India has built three Antarctic stations: Dakshin Gangotri (1983), Maitri (1989), and Bharati (2012). In 2008, India established Himadri at 79°N in Svalbard in the Arctic, and in 2014 deployed IndARC—an undersea robotic mooring. In 2016, India built Himansh in the high Himalayas. Together, these stations monitor global climate changes, teleconnections with the Indian Monsoon, space weather, and freshwater glaciers.',
      keyTakeaway: 'India’s polar research connects polar ice dynamics directly with the climate, monsoon, and water security of over 1.4 billion people.',
      funFact: 'Bharati station is built from 134 customized sea containers and is positioned right along the polar satellite orbit path, downloading satellite data from ISRO satellites every 90 minutes!',
      didYouKnow: 'The rocks of Bharati in Antarctica were once physically attached to the Eastern Ghats of India hundreds of millions of years ago as part of the supercontinent Gondwana.'
    },
    goDeeper: {
      scientificPrinciples: [
        'Gondwana Supercontinent Geological Reconstruction (Prydz Bay–Eastern Ghats belt correlation)',
        'Cryosphere-Monsoon Teleconnections (Arctic sea-ice modulation of Indian summer monsoon jet)',
        'Third Pole Glacier Mass Balance & Hydro-meteorological Discharge Modeling'
      ],
      governingEquationsOrMechanisms: 'Atmospheric Rossby wave teleconnections: Reduced Arctic sea ice in the Barents-Kara seas alters the mid-latitude jet stream waviness, triggering anomalous geopotential height patterns that modulate the onset and spatial distribution of the Indian Summer Monsoon.',
      activeResearchFrontiers: 'Operationalizing year-round autonomous observatories in the Arctic and establishing a replacement state-of-the-art station for Maitri (Maitri-II) by NCPOR.',
      instrumentsUsed: ['ISRO Earth Observation Ground Telemetry Antennae', 'IndARC Acoustic & CTD Mooring Arrays', 'Differential GPS & UAV Lidar']
    },
    keyQuestionsAnswered: [
      {
        question: 'Why does India invest in Arctic and Antarctic science?',
        answer: 'Polar regions drive Earth’s global climate engine. What happens in the Arctic and Antarctic directly impacts monsoon rainfall patterns, agricultural productivity, and extreme weather events in India. Furthermore, Antarctic ice cores provide historical climate benchmarks going back hundreds of thousands of years.'
      }
    ],
    connectedDatasetIds: ['ncpor-maitri-met-daily', 'ncpor-himadri-kongsfjorden-ctd', 'ncpor-himansh-chandra-glaciers'],
    connectedStationIds: ['maitri', 'bharati', 'himadri', 'himansh', 'indarc'],
    connectedPaperIds: ['paper-maitri-climate-trends-2021', 'paper-indarc-kongsfjorden-physics-2019'],
    relatedQuizIds: ['quiz-indian-polar-science', 'myth-antarctica-desert'],
    provenance: {
      sourceOrganization: 'National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences',
      sourceOrgShort: 'NCPOR (MoES)',
      originalSourceUrl: 'https://ncpor.res.in/',
      license: 'Government Open Data License - India',
      accessStatus: 'Open Access',
      attribution: 'National Centre for Polar and Ocean Research Official Scientific Documentation.',
      isVerified: true
    }
  },
  {
    id: 'learn-southern-ocean-conveyor',
    title: 'The Southern Ocean: The Planetary Climate Engine',
    tagline: 'How the world’s stormiest ocean absorbs 75% of excess heat and drives the global thermohaline conveyor belt.',
    topic: 'Ocean',
    region: 'Global Ocean',
    readingTimeMinutes: 7,
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The turbulent waters of the Antarctic Circumpolar Current in the Drake Passage',
    eli15: {
      analogy: 'Think of Earth as a giant house and the Southern Ocean as a massive air-conditioner and vacuum cleaner combined. It vacuums up 75% of all the excess heat and 40% of all the carbon dioxide produced by human industry, storing it deep down where it cannot heat the air right now.',
      simpleExplanation: 'The Southern Ocean surrounds Antarctica and connects the Atlantic, Pacific, and Indian oceans. Driven by furious westerly winds (the "Roaring Forties" and "Furious Fifties"), the Antarctic Circumpolar Current is the largest ocean current on Earth, moving 100 times more water than all the rivers on Earth combined! As salty sea water freezes along the Antarctic coast, the densest water on Earth (Antarctic Bottom Water) sinks into the deep abyss, pumping fresh oxygen to the bottom of all world oceans.',
      keyTakeaway: 'Without the Southern Ocean absorbing excess planetary heat, global air temperatures would be significantly hotter today.',
      funFact: 'The Antarctic Circumpolar Current flows clockwise around Antarctica without hitting any continental barriers—a continuous 24,000 km loop!',
      didYouKnow: 'The Southern Ocean is teeming with billions of tons of Antarctic Krill, which form the dietary backbone for whales, seals, and penguins.'
    },
    goDeeper: {
      scientificPrinciples: [
        'Ekman Divergence and Upwelling of Nutrient-Rich Circumpolar Deep Water (CDW)',
        'Antarctic Bottom Water (AABW) and Subantarctic Mode Water (SAMW) Ventilation Pathways',
        'High-Nutrient Low-Chlorophyll (HNLC) Dynamics and Iron Limitation'
      ],
      governingEquationsOrMechanisms: 'Meridional Overturning Circulation (MOC): Wind stress τ_w drives northward surface Ekman transport (M_E = -τ_x / ρf), inducing deep upwelling of old, carbon-rich CDW, while coastal buoyancy loss in polynyas drives dense shelf water formation with potential density σ_θ > 27.85 kg/m³.',
      activeResearchFrontiers: 'Investigating whether melting Antarctic ice shelves are freshening coastal waters enough to slow down the global AABW overturning circulation.',
      instrumentsUsed: ['Autonomous Argo Profiling Floats', 'Deep-Argo (6000m)', 'Shipboard CTD Rosettes', 'Gliders (Seagliders)']
    },
    keyQuestionsAnswered: [
      {
        question: 'Why is the Southern Ocean called a High-Nutrient Low-Chlorophyll (HNLC) region?',
        answer: 'Because despite having abundant nitrate and phosphate nutrients, phytoplankton cannot grow to full capacity because of a shortage of dissolved iron (micronutrient limitation), which is scarce due to the lack of surrounding land masses.'
      }
    ],
    connectedDatasetIds: ['noaa-argo-southern-ocean'],
    connectedStationIds: ['bharati', 'rothera'],
    connectedPaperIds: ['paper-nsidc-sea-ice-trends-2023'],
    relatedQuizIds: ['quiz-ocean-conveyor'],
    provenance: {
      sourceOrganization: 'Southern Ocean Observing System (SOOS) & NOAA',
      sourceOrgShort: 'SOOS / NOAA',
      originalSourceUrl: 'https://soos.aq/',
      license: 'Creative Commons CC-BY 4.0',
      accessStatus: 'Open Access',
      attribution: 'Southern Ocean Observing System Scientific Working Groups.',
      isVerified: true
    }
  }
];
