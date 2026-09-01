export interface ProvenanceInfo {
  sourceOrganization: string;
  sourceOrgShort: string;
  originalSourceUrl: string;
  datasetUrl?: string;
  doi?: string;
  license: string;
  accessStatus: 'Open Access' | 'Public Domain' | 'Scientific Use Only' | 'Restricted' | 'Registration Required';
  dateRetrieved?: string;
  attribution: string;
  geographicContext?: string;
  isVerified: boolean;
}

export interface AuthoritativeSource {
  id: string;
  name: string;
  shortName: string;
  country: string;
  website: string;
  dataPortalUrl: string;
  description: string;
  primaryFocus: 'Antarctic' | 'Arctic' | 'Bipolar' | 'Oceanographic' | 'Earth Observation' | 'Biodiversity';
  establishedYear: number;
  openDataAccess: boolean;
  logoText: string;
}
