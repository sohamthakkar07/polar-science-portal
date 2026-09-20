import { RESEARCH_STATIONS } from '../../src/data/stations';
import { POLAR_DATASETS } from '../../src/data/datasets';
import { RESEARCH_PAPERS } from '../../src/data/researchPapers';
import { POLAR_SPECIES } from '../../src/data/biodiversity';
import { POLAR_EXPEDITIONS } from '../../src/data/expeditions';
import { LEARNING_MODULES } from '../../src/data/learningModules';

export class DataProvider {
  public searchEntities(query: string) {
    const q = query.toLowerCase().trim();

    // Keyword search across collections
    const topics = LEARNING_MODULES.filter(m =>
      m.title?.toLowerCase().includes(q) ||
      m.description?.toLowerCase().includes(q)
    );

    const stations = RESEARCH_STATIONS.filter(s =>
      s.name?.toLowerCase().includes(q) ||
      s.overview?.toLowerCase().includes(q) ||
      (s.nativeName && s.nativeName.toLowerCase().includes(q))
    );

    const datasets = POLAR_DATASETS.filter(d =>
      d.title?.toLowerCase().includes(q) ||
      d.description?.toLowerCase().includes(q)
    );

    const papers = RESEARCH_PAPERS.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.abstract?.toLowerCase().includes(q)
    );

    const species = POLAR_SPECIES.filter(s =>
      s.commonName?.toLowerCase().includes(q) ||
      s.scientificName?.toLowerCase().includes(q) ||
      s.overview?.toLowerCase().includes(q)
    );

    const expeditions = POLAR_EXPEDITIONS.filter(e =>
      e.name?.toLowerCase().includes(q) ||
      e.overview?.toLowerCase().includes(q)
    );

    return {
      topics,
      stations,
      datasets,
      papers,
      species,
      expeditions
    };
  }

  public getEntityById(type: string, id: string) {
    switch (type) {
      case 'station': return RESEARCH_STATIONS.find(s => s.id === id);
      case 'dataset': return POLAR_DATASETS.find(d => d.id === id);
      case 'paper': return RESEARCH_PAPERS.find(p => p.id === id);
      case 'species': return POLAR_SPECIES.find(s => s.id === id);
      case 'expedition': return POLAR_EXPEDITIONS.find(e => e.id === id);
      case 'topic': return LEARNING_MODULES.find(m => m.id === id);
      default: return null;
    }
  }

  // Gets relationships for an entity
  public getRelatedEntities(entity: any) {
    const related = {
      topics: [],
      stations: [],
      datasets: [],
      papers: [],
      species: [],
    };

    if (!entity) return related;

    // Resolve connected IDs if they exist
    if (entity.connectedDatasetIds) {
      related.datasets = entity.connectedDatasetIds
        .map((id: string) => this.getEntityById('dataset', id))
        .filter(Boolean) as never[];
    }

    if (entity.connectedPaperIds) {
      related.papers = entity.connectedPaperIds
        .map((id: string) => this.getEntityById('paper', id))
        .filter(Boolean) as never[];
    }

    if (entity.connectedStationIds) {
      related.stations = entity.connectedStationIds
        .map((id: string) => this.getEntityById('station', id))
        .filter(Boolean) as never[];
    }

    return related;
  }
}
