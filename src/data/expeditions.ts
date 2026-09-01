import { Expedition } from '../types/polar';

export const POLAR_EXPEDITIONS: Expedition[] = [
  {
    id: 'iae-01-1981',
    name: 'First Indian Antarctic Expedition (Operation Gangotri)',
    leader: 'Dr. Syed Zahoor Qasim',
    country: 'India',
    yearStart: 1981,
    yearEnd: 1982,
    region: 'Antarctic',
    vesselOrTransport: 'MV Polar Circle (Chartered Norwegian Ice-strengthened vessel)',
    objectives: [
      'Initiate India’s formal scientific presence in Antarctica under Operation Gangotri',
      'Conduct geomagnetism, meteorology, biological sampling, and glaciological reconnaissance in Queen Maud Land',
      'Establish a semi-permanent unmanned refuge hut on the Antarctic ice shelf'
    ],
    keyDiscoveries: [
      'Successfully landed on the Princess Astrid Coast of Queen Maud Land on January 9, 1982',
      'Established "Dakshin Gangotri Station Point 1" refuge container hut',
      'Collected baseline marine biological samples across the Sub-Antarctic Convergence and Southern Ocean'
    ],
    overview: 'Flagged off from Marmagao Harbour, Goa on December 6, 1981, the 21-member team led by eminent marine biologist Dr. S. Z. Qasim marked India’s historic first landing in Antarctica. The expedition paved the way for India joining the Antarctic Treaty.',
    isIndianExpedition: true,
    connectedStationIds: ['maitri'],
    connectedDatasetIds: ['ncpor-maitri-met-daily'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'MV Polar Circle sailing through ice floes during the historic First Indian Antarctic Expedition in 1981',
    provenance: {
      sourceOrganization: 'National Centre for Polar and Ocean Research (NCPOR) / MoES',
      sourceOrgShort: 'NCPOR',
      originalSourceUrl: 'https://ncpor.res.in/antarctis/expeditions',
      license: 'Government Open Data License - India',
      accessStatus: 'Open Access',
      attribution: 'Expedition records archived by Ministry of Earth Sciences, Govt. of India.',
      isVerified: true
    }
  },
  {
    id: 'iae-03-1983',
    name: 'Third Indian Antarctic Expedition & Dakshin Gangotri Construction',
    leader: 'Dr. Harsh K. Gupta',
    country: 'India',
    yearStart: 1983,
    yearEnd: 1984,
    region: 'Antarctic',
    vesselOrTransport: 'MV Finnpolaris',
    objectives: [
      'Construct India’s first permanent year-round Antarctic research base: Dakshin Gangotri',
      'Assemble a multi-story double-walled wooden structure on the ice shelf within a single summer season (60 days)',
      'Prepare India’s first 12-member winter-over team to spend the dark polar winter of 1984'
    ],
    keyDiscoveries: [
      'Constructed the complete station in a record time of 8 weeks using prefabricated panels',
      'Lt. Col. S. S. Sharma led the first wintering team through the Antarctic winter',
      'Station operated until 1989 when it was gradually buried by accumulating snow and decommissioned'
    ],
    overview: 'The 3rd Expedition established Dakshin Gangotri on the ice shelf at 70°05′S, 12°00′E. This monumental engineering achievement cemented India’s status as a Consultative Party to the Antarctic Treaty in 1983.',
    isIndianExpedition: true,
    connectedStationIds: ['maitri'],
    connectedDatasetIds: ['ncpor-maitri-met-daily'],
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Dakshin Gangotri Station constructed on the ice shelf during the 3rd Indian Antarctic Expedition (1983-84)',
    provenance: {
      sourceOrganization: 'NCPOR / Ministry of Earth Sciences',
      sourceOrgShort: 'NCPOR',
      originalSourceUrl: 'https://ncpor.res.in/antarctis/expeditions',
      license: 'Government Open Data License - India',
      accessStatus: 'Open Access',
      attribution: 'Indian Antarctic Programme Historical Archives.',
      isVerified: true
    }
  },
  {
    id: 'iae-43-2023',
    name: '43rd Indian Antarctic Expedition',
    leader: 'Dr. Rahul Mohan / NCPOR Expedition Team',
    country: 'India',
    yearStart: 2023,
    yearEnd: 2024,
    region: 'Antarctic',
    vesselOrTransport: 'MV Vasiliy Golovnin (Ice-class chartered vessel)',
    objectives: [
      'Comprehensive maintenance, life-extension, and modernization of Maitri and Bharati stations',
      'Deep ice core drilling at Dronning Maud Land plateau targeting past 2,000-year climate records',
      'Geophysical and bathymetric surveys in Prydz Bay and Schirmacher Oasis lake systems'
    ],
    keyDiscoveries: [
      'Recovered high-resolution ice cores capturing volcanic eruptions and aerosol deposition signatures',
      'Upgraded satellite communication and green solar/wind power hybridization systems at Maitri',
      'Successfully rotated the 42nd wintering team with the 43rd wintering scientific team'
    ],
    overview: 'The 43rd Indian Scientific Expedition to Antarctica deployed over 80 researchers across multiple institutions (NCPOR, IMD, Geological Survey of India, NGRI, IIG, and Universities) to conduct high-latitude climate, geological, and space weather studies.',
    isIndianExpedition: true,
    connectedStationIds: ['maitri', 'bharati'],
    connectedDatasetIds: ['ncpor-maitri-met-daily', 'ncpor-bharati-met-series'],
    imageUrl: 'https://images.unsplash.com/photo-1548685913-fe6574346a23?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Cargo operations on fast ice during the 43rd Indian Scientific Expedition to Antarctica',
    provenance: {
      sourceOrganization: 'NCPOR / Ministry of Earth Sciences',
      sourceOrgShort: 'NCPOR',
      originalSourceUrl: 'https://ncpor.res.in/antarctis/expeditions',
      license: 'Government Open Data License - India',
      accessStatus: 'Open Access',
      attribution: '43rd IAE Scientific Summary Report, NCPOR.',
      isVerified: true
    }
  },
  {
    id: 'exp-amundsen-1911',
    name: 'Amundsen’s South Pole Expedition (1910–1912)',
    leader: 'Roald Amundsen',
    country: 'Norway',
    yearStart: 1910,
    yearEnd: 1912,
    region: 'Antarctic',
    vesselOrTransport: 'Fram (Legendary polar schooner)',
    objectives: [
      'First human expedition to reach the Geographic South Pole',
      'Pioneer a new route up the Axel Heiberg Glacier across the Transantarctic Mountains',
      'Utilize dog sledging and Inuit clothing techniques for extreme cold mobility'
    ],
    keyDiscoveries: [
      'Reached the South Pole on December 14, 1911 (Amundsen, Bjaaland, Helmer Hanssen, Hassel, and Wisting)',
      'Discovered the Queen Maud Mountains and established Framheim base in the Bay of Whales',
      'All 5 team members returned safely to base without loss of life'
    ],
    overview: 'Led with meticulous logistics by Norwegian explorer Roald Amundsen, this expedition achieved the first recorded conquest of the South Pole, proving the efficacy of skis and dog sledges in the polar interior.',
    isIndianExpedition: false,
    connectedStationIds: ['amundsen-scott'],
    connectedDatasetIds: [],
    imageUrl: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Historical polar explorer camp on the Antarctic ice plateau',
    provenance: {
      sourceOrganization: 'Fram Museum / Norwegian Polar Institute',
      sourceOrgShort: 'NPI / Fram Museum',
      originalSourceUrl: 'https://frammuseum.no/polar-history/expeditions/amundsens-south-pole-expedition-1910-1912/',
      license: 'Public Domain',
      accessStatus: 'Public Domain',
      attribution: 'Historical records preserved by Fram Museum, Oslo.',
      isVerified: true
    }
  },
  {
    id: 'exp-shackleton-1914',
    name: 'Imperial Trans-Antarctic Expedition (Endurance Expedition)',
    leader: 'Sir Ernest Shackleton',
    country: 'United Kingdom',
    yearStart: 1914,
    yearEnd: 1917,
    region: 'Antarctic',
    vesselOrTransport: 'Endurance (Barquentine) & James Caird (Lifeboat)',
    objectives: [
      'First overland crossing of the Antarctic continent from the Weddell Sea to the Ross Sea via the South Pole',
      'Oceanographic and hydrographic soundings in the uncharted Weddell Sea'
    ],
    keyDiscoveries: [
      'Vessel trapped and crushed by Weddell Sea pack ice in 1915',
      'Legendary 800-mile open-boat voyage in the 22-foot James Caird across the stormy Southern Ocean to South Georgia Island',
      'All 28 crew members survived through extraordinary leadership and fortitude'
    ],
    overview: 'Though the transcontinental crossing failed when Endurance was crushed by sea ice, Shackleton’s rescue of his entire 28-man crew from Elephant Island remains one of the greatest feats of survival in human history. The wreck of Endurance was located in 2022 at 3,008 m depth in pristine condition.',
    isIndianExpedition: false,
    connectedStationIds: ['halley-vi', 'rothera'],
    connectedDatasetIds: [],
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Pack ice in the stormy Weddell Sea where the Endurance was trapped in 1915',
    provenance: {
      sourceOrganization: 'Royal Geographical Society (RGS) / BAS',
      sourceOrgShort: 'RGS / BAS',
      originalSourceUrl: 'https://www.rgs.org/about-us/our-collections/collections-highlights/shackleton-and-the-endurance',
      license: 'Public Domain',
      accessStatus: 'Public Domain',
      attribution: 'Royal Geographical Society Expedition Archive.',
      isVerified: true
    }
  }
];
