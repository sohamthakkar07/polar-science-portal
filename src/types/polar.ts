import { ProvenanceInfo } from './provenance';

export type PolarRegion = 'Antarctic' | 'Arctic' | 'Himalayan / Third Pole' | 'Global Ocean';

export type PolarTopic = 
  | 'Cryosphere' 
  | 'Climate' 
  | 'Ocean' 
  | 'Atmosphere' 
  | 'Polar Life' 
  | 'Remote Sensing' 
  | 'Glaciers' 
  | 'Research' 
  | 'Indian Polar Programme';

export interface ResearchStation {
  id: string;
  name: string;
  nativeName?: string;
  country: string;
  countryCode: string;
  operator: string;
  region: PolarRegion;
  subRegion: string;
  latitude: number;
  longitude: number;
  elevationMeters: number;
  establishedYear: number;
  status: 'Operational Year-Round' | 'Operational Summer-Only' | 'Decommissioned / Historical' | 'Automated Observatory';
  isIndianStation: boolean;
  crewCapacityWinter: number;
  crewCapacitySummer: number;
  scientificDisciplines: string[];
  climateSummary: {
    avgAnnualTempC: number;
    recordMinTempC: number;
    recordMaxTempC: number;
    avgWindSpeedKmh: number;
  };
  overview: string;
  researchHighlights: string[];
  historicalSignificance?: string;
  connectedDatasetIds: string[];
  connectedPaperIds: string[];
  connectedExpeditionIds: string[];
  imageUrl: string;
  imageCaption: string;
  imageAttribution: string;
  provenance: ProvenanceInfo;
}

export interface PolarDataset {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  studentSummary: string;
  topic: PolarTopic;
  region: PolarRegion;
  spatialBoundingBox?: {
    northLat: number;
    southLat: number;
    westLon: number;
    eastLon: number;
  };
  temporalCoverage: {
    startDate: string;
    endDate: string;
    resolution: 'Hourly' | 'Daily' | 'Monthly' | 'Annual' | 'Decadal' | 'Near Real-Time';
  };
  variables: {
    name: string;
    standardName: string;
    unit: string;
    description: string;
    typicalRange: string;
  }[];
  dataFormats: ('NetCDF' | 'GeoTIFF' | 'CSV' | 'HDF5' | 'ASCII' | 'JSON')[];
  dataVolumeBytes?: number;
  provenance: ProvenanceInfo;
  defaultVisualizationType: 'line-timeseries' | 'bar-comparison' | 'polar-map' | 'depth-profile' | 'anomaly-area';
  timeSeriesKey?: string;
  relatedPaperIds: string[];
  relatedStationIds: string[];
  relatedQuizId?: string;
}

export interface Expedition {
  id: string;
  name: string;
  leader: string;
  country: string;
  yearStart: number;
  yearEnd: number;
  region: PolarRegion;
  vesselOrTransport: string;
  objectives: string[];
  keyDiscoveries: string[];
  overview: string;
  isIndianExpedition: boolean;
  connectedStationIds: string[];
  connectedDatasetIds: string[];
  imageUrl: string;
  imageCaption: string;
  provenance: ProvenanceInfo;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  firstAuthorSurname: string;
  journal: string;
  year: number;
  doi: string;
  openAccessUrl?: string;
  abstract: string;
  studentKeyFinding: string;
  topic: PolarTopic;
  region: PolarRegion;
  citationsCount?: number;
  connectedDatasetIds: string[];
  connectedStationIds: string[];
  provenance: ProvenanceInfo;
}

export interface LearningModule {
  id: string;
  title: string;
  tagline: string;
  topic: PolarTopic;
  region: PolarRegion;
  readingTimeMinutes: number;
  coverImage: string;
  imageCaption: string;
  eli15: {
    analogy: string;
    simpleExplanation: string;
    keyTakeaway: string;
    funFact: string;
    didYouKnow: string;
  };
  goDeeper: {
    scientificPrinciples: string[];
    governingEquationsOrMechanisms: string;
    activeResearchFrontiers: string;
    instrumentsUsed: string[];
  };
  keyQuestionsAnswered: {
    question: string;
    answer: string;
  }[];
  connectedDatasetId?: string;
  connectedDatasetIds?: string[];
  connectedStationId?: string;
  connectedStationIds?: string[];
  connectedPaperId?: string;
  connectedPaperIds?: string[];
  relatedQuizIds: string[];
  provenance: ProvenanceInfo;
}

export interface DataStoryStep {
  stepNumber: number;
  phaseTitle: string;
  headline: string;
  content: string;
  promptQuestion?: string;
  interactiveOptions?: {
    id: string;
    text: string;
    isCorrectReason?: string;
  }[];
  scientificInsight: string;
  chartHighlightKey?: string;
}

export interface DataStory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  topic: PolarTopic;
  region: PolarRegion;
  heroImage: string;
  whatAreWeMeasuring: string;
  datasetId: string;
  timeSeriesKey: string;
  steps: DataStoryStep[];
  concludingResearchId: string;
  relatedQuizId: string;
  provenance: ProvenanceInfo;
}

export type QuizType = 'quick-mcq' | 'myth-fact' | 'guess-the-chart' | 'scenario-challenge';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  type: QuizType;
  topic: PolarTopic;
  region: PolarRegion;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  visualUrl?: string;
  visualType?: 'image' | 'chart' | 'map';
  visualCaption?: string;
  chartConfigKey?: string;
  options: QuizOption[];
  isMyth?: boolean; // For myth-fact mode
  mythFactStatement?: string;
  whyExplanation: string;
  scientificContext: string;
  badgeRewardId?: string;
  provenance: ProvenanceInfo;
  exploreTopicUrl?: string;
}

export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  group: 'Birds' | 'Mammals' | 'Fish' | 'Invertebrates' | 'Flora / Microorganisms';
  region: PolarRegion;
  conservationStatus: 'Least Concern' | 'Near Threatened' | 'Vulnerable' | 'Endangered' | 'Critically Endangered' | 'Data Deficient';
  estimatedPopulation?: string;
  habitat: string;
  diet: string;
  adaptations: string[];
  climateVulnerability: string;
  coordinatesDistribution: { lat: number; lon: number; name: string }[];
  overview: string;
  imageUrl: string;
  imageCredit: string;
  provenance: ProvenanceInfo;
}

export interface MediaItem {
  id: string;
  title: string;
  caption: string;
  category: 'Antarctica' | 'Arctic' | 'Research Stations' | 'Expeditions' | 'Wildlife' | 'Ice & Ocean' | 'Satellite Imagery';
  region: PolarRegion;
  imageUrl: string;
  credit: string;
  license: string;
  sourceUrl: string;
  dateTaken?: string;
  locationName: string;
  provenance: ProvenanceInfo;
}

export interface PolarBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Explorer' | 'Scientist' | 'Data Master' | 'Indian Polar Ace';
}
