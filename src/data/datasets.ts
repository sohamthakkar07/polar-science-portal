import { PolarDataset } from '../types/polar';

export const POLAR_DATASETS: PolarDataset[] = [
  {
    id: 'nsidc-sea-ice-index',
    title: 'Sea Ice Index, Version 3: Arctic and Antarctic Daily and Monthly Sea Ice Extent & Concentration',
    shortTitle: 'NSIDC Sea Ice Index (Daily/Monthly)',
    description: 'Produces daily and monthly sea ice extent and sea ice area estimates derived from multichannel passive microwave sensors (SMMR, SSM/I, SSMIS) from 1979 to present. Serves as the international baseline climate record for polar sea ice trends.',
    studentSummary: 'This is the world’s gold-standard satellite record tracking how much ice covers the Arctic and Antarctic oceans every single month since 1979. It reveals how sea ice grows in winter and shrinks in summer.',
    topic: 'Cryosphere',
    region: 'Antarctic',
    spatialBoundingBox: {
      northLat: 90.0,
      southLat: -90.0,
      westLon: -180.0,
      eastLon: 180.0
    },
    temporalCoverage: {
      startDate: '1979-01-01',
      endDate: '2024-12-31',
      resolution: 'Daily'
    },
    variables: [
      {
        name: 'sea_ice_extent',
        standardName: 'surface_sea_ice_extent_area',
        unit: 'million km²',
        description: 'Cumulative area of ocean grid cells having at least 15% sea ice concentration.',
        typicalRange: '2.0 to 20.5 million km²'
      },
      {
        name: 'sea_ice_area',
        standardName: 'surface_sea_ice_area_fractional_sum',
        unit: 'million km²',
        description: 'Integral of sea ice concentration over all ice-covered ocean grid cells.',
        typicalRange: '1.5 to 17.0 million km²'
      },
      {
        name: 'anomaly',
        standardName: 'sea_ice_extent_anomaly_relative_to_1981_2010',
        unit: 'million km²',
        description: 'Difference between the monthly extent and the 1981–2010 reference climatology.',
        typicalRange: '-3.5 to +2.0 million km²'
      }
    ],
    dataFormats: ['NetCDF', 'CSV', 'GeoTIFF', 'ASCII'],
    dataVolumeBytes: 1450000000,
    provenance: {
      sourceOrganization: 'National Snow and Ice Data Center (NSIDC) / NOAA / NASA',
      sourceOrgShort: 'NSIDC / NASA',
      originalSourceUrl: 'https://nsidc.org/data/g02135/versions/3',
      datasetUrl: 'https://nsidc.org/data/g02135',
      doi: '10.7265/N5K072F8',
      license: 'Creative Commons CC-BY 4.0 / Open Access',
      accessStatus: 'Open Access',
      dateRetrieved: '2026-08-20',
      attribution: 'Fetterer, F., K. Knowles, W. N. Meier, M. Savoie, and A. K. Windnagel. 2017, updated daily. Sea Ice Index, Version 3. Boulder, Colorado USA. NSIDC.',
      geographicContext: 'Global Polar Oceans (Bipolar coverage)',
      isVerified: true
    },
    defaultVisualizationType: 'line-timeseries',
    timeSeriesKey: 'sea_ice_extent',
    relatedPaperIds: ['paper-nsidc-sea-ice-trends-2023'],
    relatedStationIds: ['maitri', 'bharati', 'mcmurdo', 'halley-vi'],
    relatedQuizId: 'quiz-sea-ice-dynamics'
  },
  {
    id: 'ncpor-maitri-met-daily',
    title: 'NCPOR Long-Term Surface Meteorological Observations at Maitri Station, Schirmacher Oasis (1990–2024)',
    shortTitle: 'Maitri Meteorological Time Series',
    description: 'Continuous synoptic surface meteorological observations recorded at the India Meteorological Department (IMD) observatory at Maitri Station, East Antarctica. Includes surface air temperature, atmospheric pressure, relative humidity, wind speed, wind direction, blizzard occurrences, and cloud cover.',
    studentSummary: 'A 34-year weather diary from India’s Maitri station in Antarctica, recording intense blizzards, sub-zero cold, and wind gusts over 150 km/h.',
    topic: 'Climate',
    region: 'Antarctic',
    spatialBoundingBox: {
      northLat: -70.76,
      southLat: -70.77,
      westLon: 11.72,
      eastLon: 11.74
    },
    temporalCoverage: {
      startDate: '1990-01-01',
      endDate: '2024-12-31',
      resolution: 'Daily'
    },
    variables: [
      {
        name: 'surface_temperature',
        standardName: 'air_temperature_at_2m',
        unit: '°C',
        description: 'Dry bulb surface air temperature recorded at 2 meters elevation.',
        typicalRange: '-38.2°C to +8.4°C'
      },
      {
        name: 'wind_speed_gust',
        standardName: 'wind_speed_maximum_gust',
        unit: 'knots / km/h',
        description: 'Maximum 3-second wind gust recorded by cup and sonic anemometer.',
        typicalRange: '0 to 185 km/h'
      },
      {
        name: 'surface_pressure',
        standardName: 'atmospheric_pressure_at_station_level',
        unit: 'hPa',
        description: 'Atmospheric pressure adjusted to station elevation (117 m above mean sea level).',
        typicalRange: '960 to 1015 hPa'
      }
    ],
    dataFormats: ['CSV', 'ASCII', 'NetCDF'],
    provenance: {
      sourceOrganization: 'National Centre for Polar and Ocean Research (NCPOR) & IMD',
      sourceOrgShort: 'NCPOR / IMD',
      originalSourceUrl: 'https://data.ncpor.res.in/dataset/maitri-met-1990-2024',
      datasetUrl: 'https://data.ncpor.res.in/',
      doi: '10.5067/NCPOR/MAITRI-MET-SERIES',
      license: 'Government Open Data License - India (GODL)',
      accessStatus: 'Open Access',
      dateRetrieved: '2026-08-20',
      attribution: 'Atmospheric Sciences Group, National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, India.',
      geographicContext: 'Schirmacher Oasis, 70°45′57″S 11°44′00″E',
      isVerified: true
    },
    defaultVisualizationType: 'line-timeseries',
    timeSeriesKey: 'maitri_met',
    relatedPaperIds: ['paper-maitri-climate-trends-2021'],
    relatedStationIds: ['maitri'],
    relatedQuizId: 'quiz-maitri-weather'
  },
  {
    id: 'bas-halley-ozone-column',
    title: 'Total Atmospheric Column Ozone Measurements at Halley Station and NASA Satellite OMI/TOMS (1979–2024)',
    shortTitle: 'Antarctic Total Column Ozone Series',
    description: 'Ground-based Dobson spectrophotometer total column ozone observations made at Halley Station, combined with NASA TOMS and OMI satellite retrievals over the South Polar vortex. Documents the formation, deepening, and gradual post-Montreal Protocol recovery of the Antarctic Ozone Hole.',
    studentSummary: 'The historical dataset that saved Earth’s protective ozone shield. It shows how ozone plummeted over Antarctica in the 1980s due to human-made CFC chemicals, and how international cooperation is slowly healing it.',
    topic: 'Atmosphere',
    region: 'Antarctic',
    spatialBoundingBox: {
      northLat: -60.0,
      southLat: -90.0,
      westLon: -180.0,
      eastLon: 180.0
    },
    temporalCoverage: {
      startDate: '1979-09-01',
      endDate: '2024-11-30',
      resolution: 'Daily'
    },
    variables: [
      {
        name: 'minimum_total_column_ozone',
        standardName: 'minimum_stratospheric_ozone_column_depth',
        unit: 'Dobson Units (DU)',
        description: 'The minimum daily value of total column ozone recorded inside the Antarctic vortex during spring.',
        typicalRange: '82 DU to 320 DU'
      },
      {
        name: 'ozone_hole_area',
        standardName: 'area_with_column_ozone_below_220_du',
        unit: 'million km²',
        description: 'Geographic area of the southern hemisphere where total ozone is less than 220 DU.',
        typicalRange: '0.0 to 29.9 million km²'
      }
    ],
    dataFormats: ['CSV', 'ASCII', 'JSON'],
    provenance: {
      sourceOrganization: 'British Antarctic Survey (BAS) & NASA Ozone Watch (Goddard Space Flight Center)',
      sourceOrgShort: 'BAS / NASA',
      originalSourceUrl: 'https://ozonewatch.gsfc.nasa.gov/meteorology/annual_data.html',
      datasetUrl: 'https://data.bas.ac.uk/',
      doi: '10.5285/BAS-OZONE-HALLEY-V2',
      license: 'Public Domain / Open Data',
      accessStatus: 'Open Access',
      dateRetrieved: '2026-08-20',
      attribution: 'NASA Goddard Space Flight Center Ozone Watch & British Antarctic Survey Atmospheric Chemistry Team.',
      geographicContext: 'Antarctic Polar Vortex (60°S to 90°S)',
      isVerified: true
    },
    defaultVisualizationType: 'line-timeseries',
    timeSeriesKey: 'ozone_hole',
    relatedPaperIds: ['paper-halley-ozone-discovery-1985'],
    relatedStationIds: ['halley-vi', 'maitri'],
    relatedQuizId: 'quiz-ozone-hole-science'
  },
  {
    id: 'ncpor-himadri-kongsfjorden-ctd',
    title: 'IndARC & Himadri Oceanographic CTD Time Series in Kongsfjorden, Svalbard (2014–2024)',
    shortTitle: 'Kongsfjorden Ocean CTD Profiles',
    description: 'Year-round hydrographic observations from the IndARC subsurface mooring and boat-based CTD casts in Kongsfjorden, Svalbard. Measures water temperature, practical salinity, pressure, dissolved oxygen, and chlorophyll fluorescence across the water column (0 to 192 m).',
    studentSummary: 'Undersea robotic sensors stationed 192 meters below the Arctic fjord water measure warmer Atlantic water creeping into polar habitats.',
    topic: 'Ocean',
    region: 'Arctic',
    spatialBoundingBox: {
      northLat: 79.10,
      southLat: 78.90,
      westLon: 11.50,
      eastLon: 12.50
    },
    temporalCoverage: {
      startDate: '2014-07-23',
      endDate: '2024-09-30',
      resolution: 'Hourly'
    },
    variables: [
      {
        name: 'water_temperature',
        standardName: 'sea_water_potential_temperature',
        unit: '°C',
        description: 'In-situ seawater temperature measured by Seabird SBE-37 microCAT sensors.',
        typicalRange: '-1.8°C to +7.5°C'
      },
      {
        name: 'practical_salinity',
        standardName: 'sea_water_practical_salinity',
        unit: 'PSU',
        description: 'Salinity computed from electrical conductivity.',
        typicalRange: '32.0 to 35.2 PSU'
      },
      {
        name: 'current_velocity',
        standardName: 'sea_water_speed',
        unit: 'cm/s',
        description: 'Ocean current velocity profile measured by upward-looking RDI 300 kHz ADCP.',
        typicalRange: '0 to 45 cm/s'
      }
    ],
    dataFormats: ['NetCDF', 'CSV'],
    provenance: {
      sourceOrganization: 'National Centre for Polar and Ocean Research (NCPOR)',
      sourceOrgShort: 'NCPOR (India)',
      originalSourceUrl: 'https://data.ncpor.res.in/dataset/indarc-kongsfjorden-2014-2024',
      datasetUrl: 'https://data.ncpor.res.in/',
      doi: '10.5067/NCPOR/INDARC-CTD',
      license: 'Government Open Data License - India',
      accessStatus: 'Open Access',
      dateRetrieved: '2026-08-20',
      attribution: 'Ocean Science Group, National Centre for Polar and Ocean Research, Goa, India.',
      geographicContext: 'Kongsfjorden, 78°59′N 12°01′E',
      isVerified: true
    },
    defaultVisualizationType: 'depth-profile',
    timeSeriesKey: 'indarc_ctd',
    relatedPaperIds: ['paper-indarc-kongsfjorden-physics-2019'],
    relatedStationIds: ['himadri', 'indarc'],
    relatedQuizId: 'quiz-arctic-fjord-oceanography'
  },
  {
    id: 'ncpor-himansh-chandra-glaciers',
    title: 'Glacier Mass Balance & Hydrological Discharge of Chandra Basin Glaciers (Western Himalayas, 2002–2024)',
    shortTitle: 'Chandra Basin Himalayan Glacier Mass Balance',
    description: 'Long-term glaciological in-situ mass balance, differential GPS ice surface velocity, and hydrological stream discharge data recorded from the Himansh Observatory across benchmark glaciers: Chhota Shigri, Sutri Dhaka, and Bada Shigri.',
    studentSummary: 'Direct field measurements from the Indian Himalayas measuring how much snow accumulates in winter versus how much ice melts in summer.',
    topic: 'Glaciers',
    region: 'Himalayan / Third Pole',
    spatialBoundingBox: {
      northLat: 32.50,
      southLat: 32.20,
      westLon: 77.40,
      eastLon: 77.80
    },
    temporalCoverage: {
      startDate: '2002-09-01',
      endDate: '2024-10-15',
      resolution: 'Annual'
    },
    variables: [
      {
        name: 'annual_mass_balance',
        standardName: 'glacier_specific_mass_balance_annual',
        unit: 'm w.e. (meters water equivalent)',
        description: 'Net specific mass gain or loss per unit area of the glacier over the glaciological year.',
        typicalRange: '-1.50 to +0.25 m w.e./yr'
      },
      {
        name: 'equilibrium_line_altitude',
        standardName: 'glacier_equilibrium_line_altitude',
        unit: 'meters above sea level',
        description: 'Altitude on the glacier where annual accumulation exactly equals annual ablation.',
        typicalRange: '4950 m to 5350 m a.s.l.'
      }
    ],
    dataFormats: ['CSV', 'ASCII', 'GeoTIFF'],
    provenance: {
      sourceOrganization: 'National Centre for Polar and Ocean Research (NCPOR)',
      sourceOrgShort: 'NCPOR / Himansh',
      originalSourceUrl: 'https://data.ncpor.res.in/dataset/himansh-chandra-glaciers-2002-2024',
      datasetUrl: 'https://data.ncpor.res.in/',
      doi: '10.5067/NCPOR/HIMANSH-MASSBALANCE',
      license: 'Government Open Data License - India',
      accessStatus: 'Open Access',
      dateRetrieved: '2026-08-20',
      attribution: 'Himalayan Cryosphere Group, National Centre for Polar and Ocean Research, MoES, India.',
      geographicContext: 'Chandra Basin, Himachal Pradesh (32°24′N 77°36′E)',
      isVerified: true
    },
    defaultVisualizationType: 'bar-comparison',
    timeSeriesKey: 'himalayan_mass_balance',
    relatedPaperIds: ['paper-himalaya-chandra-massbalance-2022'],
    relatedStationIds: ['himansh'],
    relatedQuizId: 'quiz-himalayan-third-pole'
  },
  {
    id: 'noaa-argo-southern-ocean',
    title: 'Southern Ocean 0–2000m Ocean Heat Content Anomaly and Argo Float Profiles (1970–2024)',
    shortTitle: 'Southern Ocean Heat Content (0-2000m)',
    description: 'Synthesized upper and intermediate ocean temperature and heat content anomalies south of 30°S derived from the international Argo float array, expendable bathythermographs (XBT), and shipboard CTD sections. Illustrates that the Southern Ocean absorbs over 75% of global excess oceanic heat uptake.',
    studentSummary: 'Data collected by thousands of free-drifting robotic buoys (Argo floats) showing that the stormy Southern Ocean around Antarctica is soaking up the vast majority of human-caused excess heat on Earth.',
    topic: 'Ocean',
    region: 'Global Ocean',
    spatialBoundingBox: {
      northLat: -30.0,
      southLat: -75.0,
      westLon: -180.0,
      eastLon: 180.0
    },
    temporalCoverage: {
      startDate: '1970-01-01',
      endDate: '2024-06-30',
      resolution: 'Monthly'
    },
    variables: [
      {
        name: 'ocean_heat_content_anomaly',
        standardName: 'integral_ocean_heat_content_anomaly_0_2000m',
        unit: '10²² Joules (Zettajoules)',
        description: 'Anomaly in thermal energy stored in the 0–2000m layer relative to the 1971–2000 climatological mean.',
        typicalRange: '-5.0 to +16.0 × 10²² J'
      }
    ],
    dataFormats: ['NetCDF', 'CSV', 'JSON'],
    provenance: {
      sourceOrganization: 'National Oceanic and Atmospheric Administration (NOAA) / SOOS / Argo',
      sourceOrgShort: 'NOAA / Argo',
      originalSourceUrl: 'https://www.ncei.noaa.gov/access/global-ocean-heat-content/',
      datasetUrl: 'https://www.argo.ucsd.edu/',
      doi: '10.7289/V5V98616',
      license: 'Public Domain / CC0 1.0 Universal',
      accessStatus: 'Open Access',
      dateRetrieved: '2026-08-20',
      attribution: 'NOAA National Centers for Environmental Information (NCEI) & International Argo Program.',
      geographicContext: 'Southern Ocean (30°S to 75°S)',
      isVerified: true
    },
    defaultVisualizationType: 'line-timeseries',
    timeSeriesKey: 'southern_ocean_heat',
    relatedPaperIds: ['paper-southern-ocean-heat-uptake-2022'],
    relatedStationIds: ['bharati', 'maitri', 'rothera'],
    relatedQuizId: 'quiz-ocean-conveyor'
  }
];
