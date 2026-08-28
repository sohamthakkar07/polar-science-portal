import { QuizQuestion } from '../types/polar';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. Myth or Fact Questions
  {
    id: 'myth-penguins-north-pole',
    type: 'myth-fact',
    topic: 'Polar Life',
    region: 'Arctic',
    difficulty: 'Beginner',
    question: 'Myth or Fact: Penguins live at the North Pole alongside polar bears.',
    isMyth: true,
    mythFactStatement: 'Penguins live at the North Pole alongside polar bears.',
    whyExplanation: 'MYTH! Wild penguins only live in the Southern Hemisphere (with the majority in and around Antarctica, South America, South Africa, Australia, and New Zealand). Polar bears live exclusively in the Northern Hemisphere (Arctic). In nature, a polar bear and a penguin have NEVER met!',
    scientificContext: 'Geographic isolation and divergent evolution separated Arctic carnivores (Ursus maritimus) and Southern Ocean flightless seabirds (Spheniscidae).',
    options: [
      { id: 'opt-myth', text: '🧊 MYTH', isCorrect: true, explanation: 'Correct! Penguins live only in the Southern Hemisphere, while polar bears live only in the Arctic.' },
      { id: 'opt-fact', text: '✅ FACT', isCorrect: false, explanation: 'Incorrect! Penguins are Southern Hemisphere birds; they do not exist naturally in the Arctic.' }
    ],
    badgeRewardId: 'badge-myth-buster',
    provenance: {
      sourceOrganization: 'SCAR Expert Group on Birds and Marine Mammals',
      sourceOrgShort: 'SCAR',
      originalSourceUrl: 'https://www.scar.org/',
      license: 'Public Domain',
      accessStatus: 'Open Access',
      attribution: 'Scientific Committee on Antarctic Research (SCAR) Biology Group.',
      isVerified: true
    }
  },
  {
    id: 'myth-antarctica-desert',
    type: 'myth-fact',
    topic: 'Climate',
    region: 'Antarctic',
    difficulty: 'Beginner',
    question: 'Myth or Fact: Antarctica is technically the world’s largest desert.',
    isMyth: false,
    mythFactStatement: 'Antarctica is technically the world’s largest desert.',
    whyExplanation: 'FACT! A desert is defined by annual precipitation, not temperature. Antarctica’s interior polar plateau receives less than 50 mm (2 inches) of precipitation per year—less than the Sahara Desert! The air is so cold that it cannot hold moisture, making Antarctica the driest continent on Earth.',
    scientificContext: 'High pressure over the Polar Plateau and extreme negative saturation vapor pressure at -50°C result in hyper-arid climatic conditions.',
    options: [
      { id: 'opt-myth', text: '🧊 MYTH', isCorrect: false, explanation: 'Incorrect! Deserts are defined by precipitation, not heat. Antarctica receives less rain/snow than the Sahara.' },
      { id: 'opt-fact', text: '✅ FACT', isCorrect: true, explanation: 'Correct! With under 50 mm of precipitation per year in the interior, Antarctica is the world’s largest desert.' }
    ],
    badgeRewardId: 'badge-climate-detective',
    provenance: {
      sourceOrganization: 'National Snow and Ice Data Center (NSIDC)',
      sourceOrgShort: 'NSIDC',
      originalSourceUrl: 'https://nsidc.org/learn/parts-cryosphere/ice-sheets',
      license: 'Open Access',
      accessStatus: 'Open Access',
      attribution: 'NSIDC Polar Climate Characteristics.',
      isVerified: true
    }
  },
  {
    id: 'myth-sea-ice-level',
    type: 'myth-fact',
    topic: 'Cryosphere',
    region: 'Antarctic',
    difficulty: 'Intermediate',
    question: 'Myth or Fact: Melting Arctic sea ice directly causes global sea levels to rise by meters.',
    isMyth: true,
    mythFactStatement: 'Melting Arctic sea ice directly causes global sea levels to rise by meters.',
    whyExplanation: 'MYTH! Sea ice is already floating in the ocean and displacing its own mass according to Archimedes’ principle. When sea ice melts, ocean volume remains virtually unchanged. It is the melting of land-based ice sheets (like Greenland and Antarctica) and mountain glaciers that adds new water and raises sea level.',
    scientificContext: 'Archimedes’ principle: A floating body displaces a volume of fluid with weight equal to the mass of the body. Thermal expansion and land ice melting cause sea level rise, not sea ice melting.',
    options: [
      { id: 'opt-myth', text: '🧊 MYTH', isCorrect: true, explanation: 'Correct! Floating sea ice already displaces its mass. Only land-based glaciers and ice sheets add new water volume.' },
      { id: 'opt-fact', text: '✅ FACT', isCorrect: false, explanation: 'Incorrect! Sea ice floats in ocean water, so melting it does not raise sea level, though it affects planetary albedo.' }
    ],
    badgeRewardId: 'badge-cryo-master',
    provenance: {
      sourceOrganization: 'IPCC Working Group I: The Physical Science Basis',
      sourceOrgShort: 'IPCC',
      originalSourceUrl: 'https://www.ipcc.ch/',
      license: 'Public Domain',
      accessStatus: 'Open Access',
      attribution: 'IPCC Sixth Assessment Report (AR6), Chapter 9: Ocean, Cryosphere and Sea Level Change.',
      isVerified: true
    }
  },

  // 2. Quick MCQ Questions
  {
    id: 'quiz-indian-polar-science',
    type: 'quick-mcq',
    topic: 'Indian Polar Programme',
    region: 'Antarctic',
    difficulty: 'Beginner',
    question: 'Which was India’s first permanent research station built in Antarctica in 1983?',
    options: [
      { id: 'o1', text: 'Maitri', isCorrect: false, explanation: 'Maitri was India’s second permanent station, built in 1988–1989 in the Schirmacher Oasis.' },
      { id: 'o2', text: 'Dakshin Gangotri', isCorrect: true, explanation: 'Correct! Dakshin Gangotri was constructed on the ice shelf during the 3rd Indian Antarctic Expedition in 1983–84.' },
      { id: 'o3', text: 'Bharati', isCorrect: false, explanation: 'Bharati is India’s third station, commissioned in 2012 in the Larsemann Hills.' },
      { id: 'o4', text: 'Himadri', isCorrect: false, explanation: 'Himadri is India’s Arctic station, located in Ny-Ålesund, Svalbard.' }
    ],
    whyExplanation: 'Dakshin Gangotri was constructed in 1983 on the ice shelf. In 1989, as it became buried under deep snow drifts, Maitri was constructed on rocky ice-free ground to replace it.',
    scientificContext: 'Operated by NCPOR under the Ministry of Earth Sciences, Govt. of India.',
    badgeRewardId: 'badge-maitri-pioneer',
    provenance: {
      sourceOrganization: 'National Centre for Polar and Ocean Research (NCPOR)',
      sourceOrgShort: 'NCPOR',
      originalSourceUrl: 'https://ncpor.res.in/',
      license: 'Government Open Data License',
      accessStatus: 'Open Access',
      attribution: 'NCPOR Indian Antarctic Programme Records.',
      isVerified: true
    }
  },
  {
    id: 'quiz-sea-ice-dynamics',
    type: 'quick-mcq',
    topic: 'Cryosphere',
    region: 'Arctic',
    difficulty: 'Intermediate',
    question: 'Why is the Arctic warming nearly 3 to 4 times faster than the rest of the planet (a phenomenon known as Arctic Amplification)?',
    options: [
      { id: 'o1', text: 'More volcanoes are erupting in the Arctic Ocean.', isCorrect: false, explanation: 'Submarine volcanism does not drive regional surface warming.' },
      { id: 'o2', text: 'The ice-albedo feedback: melting white sea ice reveals dark ocean, which absorbs significantly more solar heat.', isCorrect: true, explanation: 'Correct! White ice reflects 85% of solar radiation; dark open ocean absorbs 94%, accelerating local heating.' },
      { id: 'o3', text: 'The Earth is tilted closer to the Sun at the North Pole.', isCorrect: false, explanation: 'Earth’s orbital tilt affects seasons symmetrically, not long-term Arctic amplification.' },
      { id: 'o4', text: 'Heavy boat traffic is heating up the water.', isCorrect: false, explanation: 'Anthropogenic vessel emissions are negligible compared to radiative feedback.' }
    ],
    whyExplanation: 'When highly reflective sea ice melts into dark open water, the surface albedo drops from ~0.85 to ~0.06, turning the Arctic Ocean into a giant solar heat collector.',
    scientificContext: 'Documented in IPCC AR6 Chapter 7 & 9, and verified by NASA/NSIDC satellite radiation budget sensors (CERES).',
    badgeRewardId: 'badge-albedo-sleuth',
    provenance: {
      sourceOrganization: 'National Snow and Ice Data Center (NSIDC) & NASA',
      sourceOrgShort: 'NSIDC / NASA',
      originalSourceUrl: 'https://nsidc.org/learn/parts-cryosphere/sea-ice/albedo',
      license: 'Open Access',
      accessStatus: 'Open Access',
      attribution: 'NSIDC Cryospheric Processes Reference.',
      isVerified: true
    }
  },
  {
    id: 'quiz-ozone-hole-science',
    type: 'quick-mcq',
    topic: 'Atmosphere',
    region: 'Antarctic',
    difficulty: 'Intermediate',
    question: 'What is the scientifically defined threshold value below which the total atmospheric ozone column is officially classified as an "Ozone Hole"?',
    options: [
      { id: 'o1', text: '500 Dobson Units (DU)', isCorrect: false, explanation: '500 DU represents unusually high ozone levels.' },
      { id: 'o2', text: '220 Dobson Units (DU)', isCorrect: true, explanation: 'Correct! Historical pre-1979 springtime ozone over Antarctica was never observed below 220 DU. Values under 220 DU define the hole.' },
      { id: 'o3', text: '50 Dobson Units (DU)', isCorrect: false, explanation: '50 DU has never been reached; historical minimum was ~73 DU.' },
      { id: 'o4', text: '0 Dobson Units (DU)', isCorrect: false, explanation: 'Total ozone depletion across the entire column never reaches absolute zero.' }
    ],
    whyExplanation: 'Before the human release of CFCs, natural ozone levels over Antarctica never dropped below 220 Dobson Units. The scientific community established 220 DU as the boundary line of the Antarctic ozone hole.',
    scientificContext: 'Established by NASA Ozone Watch and British Antarctic Survey historical baseline datasets.',
    badgeRewardId: 'badge-ozone-guardian',
    provenance: {
      sourceOrganization: 'NASA Goddard Space Flight Center Ozone Watch',
      sourceOrgShort: 'NASA',
      originalSourceUrl: 'https://ozonewatch.gsfc.nasa.gov/',
      license: 'Public Domain',
      accessStatus: 'Open Access',
      attribution: 'NASA GSFC Atmospheric Chemistry and Dynamics Laboratory.',
      isVerified: true
    }
  },

  // 3. Guess The Answer (Visual / Chart Interpretation)
  {
    id: 'quiz-guess-chart-antarctic-sea-ice',
    type: 'guess-the-chart',
    topic: 'Cryosphere',
    region: 'Antarctic',
    difficulty: 'Intermediate',
    question: 'Look at this satellite sea ice record. Which landmark event took place in the year 2023 in the Antarctic Southern Ocean?',
    visualType: 'chart',
    visualCaption: 'Antarctic Sea Ice Maximum Winter Extent (1979-2024, NSIDC)',
    chartConfigKey: 'sea_ice_extent',
    options: [
      { id: 'o1', text: 'Antarctic winter sea ice hit an unprecedented all-time record LOW of 16.96 million km² (>5 standard deviations below average).', isCorrect: true, explanation: 'Correct! In winter 2023, Antarctic sea ice fell 2.5 million km² below normal, breaking all previous satellite records.' },
      { id: 'o2', text: 'Antarctica became completely ice-free in winter.', isCorrect: false, explanation: 'Antarctica still had over 16 million km² of winter sea ice.' },
      { id: 'o3', text: 'Antarctic sea ice set an all-time record MAXIMUM.', isCorrect: false, explanation: 'The record maximum occurred in 2014, not 2023.' },
      { id: 'o4', text: 'Satellite sensors failed completely for the entire year.', isCorrect: false, explanation: 'Sensors were fully operational across multiple international constellations.' }
    ],
    whyExplanation: 'In September 2023, Antarctic sea ice reached a winter peak of only 16.96 million km²—the lowest maximum ever observed in the 45-year satellite era.',
    scientificContext: 'Purich et al. (2023), Communications Earth & Environment, DOI: 10.1038/s43247-023-00961-9.',
    badgeRewardId: 'badge-data-analyst',
    provenance: {
      sourceOrganization: 'National Snow and Ice Data Center (NSIDC)',
      sourceOrgShort: 'NSIDC',
      originalSourceUrl: 'https://nsidc.org/data/g02135',
      license: 'CC-BY 4.0',
      accessStatus: 'Open Access',
      attribution: 'NSIDC Sea Ice Index Version 3.',
      isVerified: true
    }
  },

  // 4. Scenario Challenge (What Would You Choose?)
  {
    id: 'quiz-scenario-indarc-sensor',
    type: 'scenario-challenge',
    topic: 'Ocean',
    region: 'Arctic',
    difficulty: 'Advanced',
    question: 'What Would You Choose? You are leading an Indian polar expedition to Kongsfjorden, Svalbard. You must measure subsurface seawater temperature, salinity, and Atlantic Water intrusion at 192 meters depth continuously for 365 days, even when the fjord surface freezes with thick pack ice. What scientific observing platform should you deploy?',
    options: [
      { id: 'o1', text: 'Fly an aerial drone with an infrared camera once every week.', isCorrect: false, explanation: 'Infrared drone cameras only measure the skin temperature of surface ice, not properties at 192 m depth.' },
      { id: 'o2', text: 'A subsurface taut-wire moored observatory (like IndARC) anchored to the seabed with acoustic releases, CTD sensors, and ADCP current profilers.', isCorrect: true, explanation: 'Correct! This is exactly how India’s IndARC observatory operates beneath the ice without being crushed by surface floes.' },
      { id: 'o3', text: 'Place a solar-powered floating buoy directly on the surface water.', isCorrect: false, explanation: 'Surface buoys get crushed or carried away by drifting winter sea ice and lose solar power during the 4-month polar night.' },
      { id: 'o4', text: 'Send human scuba divers with thermometers every day during the polar night.', isCorrect: false, explanation: 'Human diving to 192 meters in sub-zero polar winter is physically impossible and life-threatening.' }
    ],
    whyExplanation: 'Subsurface moorings like IndARC sit completely submerged below the draft of keel icebergs, logging data autonomously and powered by long-life lithium batteries throughout the dark Arctic winter.',
    scientificContext: 'NCPOR IndARC Mooring Deployment Architecture, Kongsfjorden, Svalbard.',
    badgeRewardId: 'badge-polar-engineer',
    provenance: {
      sourceOrganization: 'National Centre for Polar and Ocean Research (NCPOR)',
      sourceOrgShort: 'NCPOR',
      originalSourceUrl: 'https://ncpor.res.in/arctic/indarc',
      license: 'Government Open Data License',
      accessStatus: 'Open Access',
      attribution: 'NCPOR Ocean Sciences Mooring Protocols.',
      isVerified: true
    }
  }
];

export const POLAR_BADGES = [
  { id: 'badge-myth-buster', title: 'Polar Mythbuster', description: 'Separated fact from fiction across polar biology and geography.', icon: '🧊', category: 'Explorer' },
  { id: 'badge-climate-detective', title: 'Climate Detective', description: 'Mastered the meteorological definition of polar desert climates.', icon: '🌡️', category: 'Scientist' },
  { id: 'badge-cryo-master', title: 'Cryo Master', description: 'Understood Archimedes’ displacement and sea ice vs land ice physics.', icon: '🌊', category: 'Data Master' },
  { id: 'badge-maitri-pioneer', title: 'Maitri Pioneer', description: 'Mastered the history and science of the Indian Antarctic Programme.', icon: '🇮🇳', category: 'Indian Polar Ace' },
  { id: 'badge-albedo-sleuth', title: 'Albedo Sleuth', description: 'Unraveled the positive radiative feedback loop of Arctic amplification.', icon: '☀️', category: 'Scientist' },
  { id: 'badge-ozone-guardian', title: 'Ozone Guardian', description: 'Mastered stratospheric chemistry and the Montreal Protocol recovery.', icon: '🛡️', category: 'Scientist' },
  { id: 'badge-data-analyst', title: 'Polar Data Analyst', description: 'Interpreted real satellite time series and statistical anomalies.', icon: '📊', category: 'Data Master' },
  { id: 'badge-polar-engineer', title: 'Deep Polar Engineer', description: 'Selected the correct oceanographic instruments for extreme icy environments.', icon: '⚓', category: 'Explorer' }
];
