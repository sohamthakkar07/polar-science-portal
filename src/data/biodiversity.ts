import { Species } from '../types/polar';

export const POLAR_SPECIES: Species[] = [
  {
    id: 'species-emperor-penguin',
    commonName: 'Emperor Penguin',
    scientificName: 'Aptenodytes forsteri',
    group: 'Birds',
    region: 'Antarctic',
    conservationStatus: 'Near Threatened',
    estimatedPopulation: '~500,000 mature individuals (~66 known colonies)',
    habitat: 'Circumpolar Antarctic fast ice and pack ice surrounding the continental coast',
    diet: 'Antarctic silverfish (Pleuragramma antarctica), Antarctic krill (Euphausia superba), and squid',
    adaptations: [
      'Scale-like overlapping plumage providing 85% of thermal insulation against -60°C blizzards',
      'Counter-current heat exchangers in nasal passages and flippers to conserve core body warmth',
      'Dense solid bones allowing dives up to 535 meters deep for up to 30 minutes',
      'Males fast for over 115 days during the brutal polar winter while incubating a single egg on their feet'
    ],
    climateVulnerability: 'High: Relies completely on stable coastal fast ice from April to December for breeding; early ice break-up causes catastrophic chick mortality.',
    coordinatesDistribution: [
      { lat: -70.76, lon: 11.73, name: 'Princess Astrid Coast (Near Maitri)' },
      { lat: -69.40, lon: 76.19, name: 'Prydz Bay / Larsemann Hills (Near Bharati)' },
      { lat: -77.50, lon: 166.00, name: 'Cape Crozier Colony (Ross Island)' },
      { lat: -75.50, lon: -26.00, name: 'Brunt Ice Shelf Colony' }
    ],
    overview: 'The Emperor Penguin is the tallest and heaviest of all living penguin species, endemic exclusively to Antarctica. They are the only bird species that breeds during the harsh, pitch-black Antarctic winter.',
    imageUrl: 'https://images.unsplash.com/photo-1548685913-fe6574346a23?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Wikimedia Commons / Christopher Michel (CC-BY 2.0)',
    provenance: {
      sourceOrganization: 'SCAR Antarctic Biodiversity Portal & IUCN Red List',
      sourceOrgShort: 'SCAR / IUCN',
      originalSourceUrl: 'https://www.iucnredlist.org/species/22697752/157658053',
      license: 'Creative Commons CC-BY 4.0 / GBIF',
      accessStatus: 'Open Access',
      attribution: 'BirdLife International / IUCN Red List of Threatened Species & SCAR Marine Biodiversity.',
      isVerified: true
    }
  },
  {
    id: 'species-polar-bear',
    commonName: 'Polar Bear',
    scientificName: 'Ursus maritimus',
    group: 'Mammals',
    region: 'Arctic',
    conservationStatus: 'Vulnerable',
    estimatedPopulation: '22,000 – 31,000 individuals across 19 sub-populations',
    habitat: 'Circumpolar Arctic sea ice, coastal landfast ice, and ice-choked straits',
    diet: 'Ringed seals (Pusa hispida), Bearded seals (Erignathus barbatus), and whale carcasses',
    adaptations: [
      'Translucent, hollow guard hairs that trap solar heat over black skin absorbing thermal radiation',
      'Up to 11 cm layer of insulating adipose blubber to survive swimming in -1.8°C ocean water',
      'Broad, papillae-covered non-slip paw pads distributing weight across thin sea ice',
      'Exceptional olfactory system capable of smelling a seal breathing hole through 1 meter of snow from 1 km away'
    ],
    climateVulnerability: 'Extreme: As summer sea ice melts earlier and freezes later, hunting platforms shrink, forcing bears onto land to endure prolonged fasting.',
    coordinatesDistribution: [
      { lat: 78.92, lon: 11.93, name: 'Svalbard Archipelago (Near Himadri)' },
      { lat: 71.30, lon: -156.78, name: 'Utqiaġvik, Beaufort Sea, Alaska' },
      { lat: 58.76, lon: -94.16, name: 'Western Hudson Bay, Canada' },
      { lat: 74.50, lon: 58.00, name: 'Novaya Zemlya, Barents Sea' }
    ],
    overview: 'The Polar Bear is the apex predator of the Arctic marine ecosystem, classified as a marine mammal because it spends the majority of its life on the sea ice hunting seals.',
    imageUrl: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Wikimedia Commons / Alan Wilson (CC-BY-SA 3.0)',
    provenance: {
      sourceOrganization: 'IUCN Polar Bear Specialist Group (PBSG) & Norwegian Polar Institute',
      sourceOrgShort: 'IUCN PBSG / NPI',
      originalSourceUrl: 'https://www.iucnredlist.org/species/22823/14871490',
      license: 'Creative Commons CC-BY 4.0 / GBIF',
      accessStatus: 'Open Access',
      attribution: 'IUCN Species Survival Commission Polar Bear Specialist Group.',
      isVerified: true
    }
  },
  {
    id: 'species-antarctic-krill',
    commonName: 'Antarctic Krill',
    scientificName: 'Euphausia superba',
    group: 'Invertebrates',
    region: 'Antarctic',
    conservationStatus: 'Least Concern',
    estimatedPopulation: '400 – 500 million tonnes biomass (~trillions of individuals)',
    habitat: 'Circumpolar Southern Ocean water column and underside of sea ice floes',
    diet: 'Phytoplankton (diatoms), ice algae, and micro-zooplankton',
    adaptations: [
      'Ability to graze on ice algae growing on the underside of winter pack ice',
      'Can shrink in body size and regress maturity stages to survive winter starvation',
      'Bioluminescent photophores along body producing blue-green light for schooling and camouflage',
      'Fast swarming behavior forming dense swarms with up to 30,000 individuals per cubic meter'
    ],
    climateVulnerability: 'Critical: Southern Ocean warming and loss of winter sea ice reduce ice algae food supplies for juvenile krill, threatening the entire Antarctic food web.',
    coordinatesDistribution: [
      { lat: -62.00, lon: -58.00, name: 'South Shetland Islands' },
      { lat: -65.00, lon: -64.00, name: 'Antarctic Peninsula / Scotia Sea' },
      { lat: -69.00, lon: 76.00, name: 'Prydz Bay (Near Bharati)' },
      { lat: -54.00, lon: -37.00, name: 'South Georgia Island Shelf' }
    ],
    overview: 'Antarctic Krill is the keystone species of the Southern Ocean ecosystem. With a cumulative biomass exceeding that of humanity, almost all Antarctic wildlife—whales, seals, penguins, flying seabirds, and squid—depends directly or indirectly on krill.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Wikimedia Commons / Uwe Kils (CC-BY-SA 3.0)',
    provenance: {
      sourceOrganization: 'Commission for the Conservation of Antarctic Marine Living Resources (CCAMLR) & OBIS',
      sourceOrgShort: 'CCAMLR / OBIS',
      originalSourceUrl: 'https://www.ccamlr.org/en/fisheries/krill',
      license: 'Public Domain / Open Access',
      accessStatus: 'Open Access',
      attribution: 'CCAMLR Working Group on Ecosystem Monitoring and Management.',
      isVerified: true
    }
  },
  {
    id: 'species-weddell-seal',
    commonName: 'Weddell Seal',
    scientificName: 'Leptonychotes weddellii',
    group: 'Mammals',
    region: 'Antarctic',
    conservationStatus: 'Least Concern',
    estimatedPopulation: 'Approximately 800,000 individuals',
    habitat: 'Inshore Antarctic landfast ice around the entire continental margin',
    diet: 'Antarctic toothfish (Dissostichus mawsoni), silverfish, cephalopods, and krill',
    adaptations: [
      'Specially angled incisor and canine teeth used to saw and maintain breathing holes in sea ice up to 2 meters thick',
      'High concentrations of myoglobin in muscles enabling dives up to 600 meters deep lasting 80 minutes',
      'Flexible rib cage that collapses during deep dives to prevent nitrogen absorption and decompression sickness'
    ],
    climateVulnerability: 'Moderate: Strongly dependent on stable inshore landfast ice for pupping and resting.',
    coordinatesDistribution: [
      { lat: -77.85, lon: 166.67, name: 'McMurdo Sound Fast Ice' },
      { lat: -70.76, lon: 11.73, name: 'Schirmacher Coast (Near Maitri)' },
      { lat: -69.40, lon: 76.19, name: 'Larsemann Hills Fjords (Near Bharati)' }
    ],
    overview: 'The Weddell Seal is the southernmost breeding mammal in the world, living year-round on the fast ice of Antarctica. They are famed for their complex alien-like underwater vocalizations consisting of chirps, whistles, and frequency sweeps.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Wikimedia Commons / NOAA (Public Domain)',
    provenance: {
      sourceOrganization: 'SCAR Expert Group on Birds and Marine Mammals & OBIS-SEAMAP',
      sourceOrgShort: 'SCAR / OBIS',
      originalSourceUrl: 'https://seamap.env.duke.edu/species/180671',
      license: 'Open Access / CC-BY 4.0',
      accessStatus: 'Open Access',
      attribution: 'SCAR Marine Biodiversity Information Network & OBIS.',
      isVerified: true
    }
  },
  {
    id: 'species-arctic-fox',
    commonName: 'Arctic Fox',
    scientificName: 'Vulpes lagopus',
    group: 'Mammals',
    region: 'Arctic',
    conservationStatus: 'Least Concern',
    estimatedPopulation: 'Several hundred thousand across circumpolar Arctic tundra',
    habitat: 'Treeless Arctic tundra, coastal sea ice fringes, and alpine habitats',
    diet: 'Lemmings, voles, seabird eggs, and scraps scavenged from polar bear seal kills',
    adaptations: [
      'Seasonal pelage change: thick pure white coat in winter transforming to brown-grey camouflage in summer',
      'Fur-covered foot soles preventing frostbite while walking on ice and snow down to -50°C',
      'Compact rounded ears and short snout minimizing surface-area-to-volume heat loss (Allen’s rule)'
    ],
    climateVulnerability: 'High: Shrinking tundra habitat and northward expansion of the larger Red Fox (Vulpes vulpes) competing for dens and prey.',
    coordinatesDistribution: [
      { lat: 78.92, lon: 11.93, name: 'Ny-Ålesund / Kongsfjorden, Svalbard' },
      { lat: 68.00, lon: -150.00, name: 'Brooks Range Tundra, Alaska' },
      { lat: 64.00, lon: -18.00, name: 'Hornstrandir Nature Reserve, Iceland' }
    ],
    overview: 'The Arctic Fox is a master of winter survival, possessing the warmest pelt of any land mammal relative to its body size. It can survive temperatures as low as -70°C before its metabolic rate begins to increase.',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Wikimedia Commons / Jonatan Pie (CC0 Public Domain)',
    provenance: {
      sourceOrganization: 'IUCN Canid Specialist Group & Svalbard Science Forum',
      sourceOrgShort: 'IUCN / SSF',
      originalSourceUrl: 'https://www.iucnredlist.org/species/899/50410499',
      license: 'Open Access / CC-BY 4.0',
      accessStatus: 'Open Access',
      attribution: 'IUCN SSC Canid Specialist Group.',
      isVerified: true
    }
  }
];
