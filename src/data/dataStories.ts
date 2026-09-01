import { DataStory } from '../types/polar';

export const DATA_STORIES: DataStory[] = [
  {
    id: 'story-sea-ice-dynamics',
    slug: 'sea-ice-dynamics-two-poles',
    title: 'The Tale of Two Poles: What Is Happening to Polar Sea Ice?',
    subtitle: 'From Arctic decline to Antarctic volatility: Explore 45 years of satellite sea ice measurements.',
    topic: 'Cryosphere',
    region: 'Antarctic',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    whatAreWeMeasuring: 'We are measuring Sea Ice Extent—the total square kilometers of ocean where at least 15% of the surface is covered by floating sea ice. Data is continuously gathered by NASA, NOAA, and DMSP satellite passive microwave radiometers since 1979.',
    datasetId: 'nsidc-sea-ice-index',
    timeSeriesKey: 'sea_ice_extent',
    steps: [
      {
        stepNumber: 1,
        phaseTitle: 'The Metric',
        headline: 'What Are We Measuring?',
        content: 'Every single day since October 1979, satellites orbiting 800 kilometers above Earth have beamed microwave pulses down to the poles to calculate the exact surface area of frozen ocean ice. Because sea ice emits higher microwave brightness temperature than open water, satellites can map ice cover through darkness and clouds.',
        scientificInsight: 'Passive microwave radiometry (at 19 GHz and 37 GHz channels) allows year-round continuous observation independent of polar night or cloud cover.'
      },
      {
        stepNumber: 2,
        phaseTitle: 'The Real Dataset',
        headline: '45 Years of Satellite Observations',
        content: 'Take a look at the verified time series recorded by NSIDC. Notice the contrasting behaviors between the Arctic (North Pole) and the Antarctic (South Pole).',
        scientificInsight: 'In the Arctic, September sea ice extent has declined by over 12% per decade since 1979, losing roughly 80,000 km² of ice per year.'
      },
      {
        stepNumber: 3,
        phaseTitle: 'Visualizing the Trends',
        headline: 'Interactive Time-Series Exploration',
        content: 'Observe the historic lows: In 2012, Arctic sea ice shrank to a record minimum of 3.39 million km². In contrast, Antarctic sea ice reached record winter highs around 2014, before suddenly plunging to unprecedented record lows in 2022, 2023, and 2024.',
        chartHighlightKey: 'sea_ice_extent',
        scientificInsight: 'The sudden regime shift in Antarctic sea ice since 2016 represents a fundamental transition from atmosphere-driven expansion to subsurface ocean heat domination.'
      },
      {
        stepNumber: 4,
        phaseTitle: 'What Do You Notice?',
        headline: 'Look Closely at the Antarctic Data After 2016',
        content: 'Why did Antarctic sea ice behave stably for 35 years and then suddenly collapse to record lows after 2016?',
        promptQuestion: 'What is the primary physical mechanism that scientists discovered behind the post-2016 Antarctic sea ice collapse?',
        interactiveOptions: [
          {
            id: 'opt1',
            text: 'Direct air temperature warming melted the ice surface entirely.',
            isCorrectReason: 'Incorrect. While air temperatures played a role, surface air alone cannot explain the massive winter deficit.'
          },
          {
            id: 'opt2',
            text: 'Subsurface warming of the upper 200m of the Southern Ocean prevented surface water from freezing during winter.',
            isCorrectReason: 'Correct! Peer-reviewed oceanographic measurements from Argo floats revealed that deep warm water breached the surface pycnocline barrier.'
          },
          {
            id: 'opt3',
            text: 'Penguins disrupted the ice crystal formation.',
            isCorrectReason: 'Incorrect. Biological activity does not drive macro-scale sea ice extent.'
          }
        ],
        scientificInsight: 'The stratification of the Southern Ocean weakened, allowing stored subsurface heat from Circumpolar Deep Water to ventilate upward.'
      },
      {
        stepNumber: 5,
        phaseTitle: 'The Science Behind It',
        headline: 'The Ice-Albedo Feedback Loop',
        content: 'When white sea ice melts, it exposes dark blue seawater. Pure sea ice reflects up to 85% of incoming solar radiation back into space. Open seawater absorbs 94% of solar energy as heat. This heat warms the ocean further, melting even more ice.',
        scientificInsight: 'This positive feedback mechanism is called Polar Amplification and explains why high-latitude regions are warming 3 to 4 times faster than the global average.'
      },
      {
        stepNumber: 6,
        phaseTitle: 'Peer-Reviewed Research',
        headline: 'What the Latest Science Concludes',
        content: 'A landmark 2023 paper in Communications Earth & Environment (Purich et al., 2023) demonstrated that Antarctic sea ice has entered an unprecedented "low state" driven by Southern Ocean heat uptake.',
        scientificInsight: 'DOI: 10.1038/s43247-023-00961-9 — Record low Antarctic sea ice cover linked to subsurface ocean warming.'
      },
      {
        stepNumber: 7,
        phaseTitle: 'Quick Knowledge Check',
        headline: 'Test What You Just Learned',
        content: 'Answer the question below to solidify your understanding of polar cryosphere physics.',
        scientificInsight: 'Complete the interactive quiz check to earn topic mastery points.'
      },
      {
        stepNumber: 8,
        phaseTitle: 'Original Source & Provenance',
        headline: 'Verify with the Authoritative Source',
        content: 'This entire data story is powered by open scientific data from the National Snow and Ice Data Center (NSIDC) Sea Ice Index (Version 3) and NASA Earthdata.',
        scientificInsight: 'All source datasets are verified under Open Access licenses at https://nsidc.org/data/g02135.'
      }
    ],
    concludingResearchId: 'paper-nsidc-sea-ice-trends-2023',
    relatedQuizId: 'quiz-sea-ice-dynamics',
    provenance: {
      sourceOrganization: 'National Snow and Ice Data Center (NSIDC) / NOAA / NASA',
      sourceOrgShort: 'NSIDC / NASA',
      originalSourceUrl: 'https://nsidc.org/data/g02135',
      doi: '10.7265/N5K072F8',
      license: 'Creative Commons CC-BY 4.0',
      accessStatus: 'Open Access',
      attribution: 'Grounded in NSIDC G02135 Version 3 & NASA Goddard Earth Sciences.',
      isVerified: true
    }
  },
  {
    id: 'story-ozone-hole-recovery',
    slug: 'healing-the-antarctic-ozone-hole',
    title: 'Healing the Sky: The Antarctic Ozone Hole & The Montreal Protocol',
    subtitle: 'From a catastrophic 80% loss of stratospheric protection to a projected 2066 full recovery.',
    topic: 'Atmosphere',
    region: 'Antarctic',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    whatAreWeMeasuring: 'We are measuring Total Column Ozone in Dobson Units (DU) over Antarctica during the austral spring (September–October). Any measurement below 220 DU represents the defined threshold of an "Ozone Hole".',
    datasetId: 'bas-halley-ozone-column',
    timeSeriesKey: 'ozone_hole',
    steps: [
      {
        stepNumber: 1,
        phaseTitle: 'The Metric',
        headline: 'What is a Dobson Unit?',
        content: 'A Dobson Unit (DU) measures how thick the ozone layer would be if all ozone molecules over a spot on Earth were compressed to standard sea-level temperature and pressure. 300 DU equals a pure ozone layer just 3 millimeters thick—as thin as two stacked pennies!',
        scientificInsight: 'Natural global ozone levels hover between 260 and 400 DU. 1 DU = 2.69 × 10¹⁶ ozone molecules per cm².'
      },
      {
        stepNumber: 2,
        phaseTitle: 'The Real Dataset',
        headline: 'Tracking the Plummet from 1979 to Present',
        content: 'In 1979, spring ozone levels over Halley Station averaged 220 DU. By 1994, levels dropped to an alarming minimum of 86 DU—a loss of over two-thirds of the stratospheric shield.',
        scientificInsight: 'The lowest daily ozone ever measured was 73 DU on September 30, 1994 by the TOMS satellite instrument.'
      },
      {
        stepNumber: 3,
        phaseTitle: 'Visualizing the Curve',
        headline: 'The V-Shaped Path to Recovery',
        content: 'Examine the chart below. Notice how the curve stabilized after the year 2000 following the global ban on CFC emissions, and has started its gradual upward climb toward historical levels.',
        chartHighlightKey: 'ozone_hole',
        scientificInsight: 'Because CFCs have atmospheric lifetimes of 50 to 100 years, atmospheric chlorine levels take decades to decline.'
      },
      {
        stepNumber: 4,
        phaseTitle: 'What Do You Notice?',
        headline: 'Why Did 2019 Show a Sudden Spike in Ozone?',
        content: 'In 2019, the ozone hole was unusually small (164 DU minimum instead of ~100 DU). Why?',
        promptQuestion: 'What caused the small ozone hole in 2019?',
        interactiveOptions: [
          {
            id: 'opt1',
            text: 'All CFCs instantly vanished from Earth.',
            isCorrectReason: 'Incorrect. CFCs degrade slowly over many decades.'
          },
          {
            id: 'opt2',
            text: 'A rare Sudden Stratospheric Warming (SSW) event warmed the polar vortex, preventing polar stratospheric cloud formation.',
            isCorrectReason: 'Correct! Strong planetary waves in the southern stratosphere disturbed and warmed the vortex, preventing the icy clouds needed for ozone destruction.'
          },
          {
            id: 'opt3',
            text: 'Heavy rain in Antarctica washed the chemicals away.',
            isCorrectReason: 'Incorrect. Antarctica receives very little precipitation, and rain does not occur in the stratosphere.'
          }
        ],
        scientificInsight: 'Stratospheric meteorology can cause substantial year-to-year variability on top of the underlying chemical recovery trend.'
      },
      {
        stepNumber: 5,
        phaseTitle: 'The Science Behind It',
        headline: 'The Chemistry of Chlorine on Ice',
        content: 'During the polar winter, extreme cold (-85°C) forms Polar Stratospheric Clouds made of nitric acid and water ice. Inactive chlorine reservoir molecules (HCl and ClONO₂) react on these cloud surfaces to produce molecular chlorine (Cl₂). When the spring sun rises in September, sunlight splits Cl₂ into free chlorine atoms, triggering a catalytic cycle that destroys thousands of ozone molecules per second.',
        scientificInsight: 'The reaction Cl + O₃ → ClO + O₂ followed by ClO + ClO dimer catalytic destruction causes up to 99% ozone loss in the 14–21 km altitude layer.'
      },
      {
        stepNumber: 6,
        phaseTitle: 'Peer-Reviewed Research',
        headline: 'The Paper That Alerted the World',
        content: 'Farman, Gardiner, and Shanklin published their baseline measurements in Nature in 1985 (DOI: 10.1038/315207a0), triggering international negotiations that culminated in the 1987 Montreal Protocol.',
        scientificInsight: 'The Montreal Protocol has phased out 99% of controlled ozone-depleting substances worldwide.'
      },
      {
        stepNumber: 7,
        phaseTitle: 'Knowledge Check',
        headline: 'Test Your Ozone Knowledge',
        content: 'Verify your understanding of polar atmospheric chemistry and international policy.',
        scientificInsight: 'Complete the quiz check to earn the "Atmospheric Guardian" badge.'
      },
      {
        stepNumber: 8,
        phaseTitle: 'Original Source & Provenance',
        headline: 'Verify with NASA Ozone Watch & BAS',
        content: 'Data provided by NASA Ozone Watch (Goddard Space Flight Center) and the British Antarctic Survey Dobson Spectrophotometer Archive.',
        scientificInsight: 'Official source: https://ozonewatch.gsfc.nasa.gov/'
      }
    ],
    concludingResearchId: 'paper-halley-ozone-discovery-1985',
    relatedQuizId: 'quiz-ozone-hole-science',
    provenance: {
      sourceOrganization: 'British Antarctic Survey (BAS) & NASA Goddard Space Flight Center',
      sourceOrgShort: 'BAS / NASA',
      originalSourceUrl: 'https://ozonewatch.gsfc.nasa.gov/',
      doi: '10.5285/BAS-OZONE-HALLEY-V2',
      license: 'Public Domain / Open Access',
      accessStatus: 'Open Access',
      attribution: 'NASA GSFC Ozone Watch & British Antarctic Survey Atmospheric Chemistry Programme.',
      isVerified: true
    }
  }
];
