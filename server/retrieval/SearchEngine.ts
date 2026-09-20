import { DataProvider } from '../providers/DataProvider';

export class SearchEngine {
  private dataProvider: DataProvider;

  constructor() {
    this.dataProvider = new DataProvider();
  }

  // Basic normalization and extraction
  private extractKeywords(query: string): string[] {
    const stopWords = ['what', 'is', 'the', 'tell', 'me', 'about', 'how', 'why', 'where', 'show', 'difference', 'between', 'and', 'in', 'of', 'for', 'to', 'a', 'an'];
    return query.toLowerCase().split(/\W+/).filter(word => word.length > 2 && !stopWords.includes(word));
  }

  public retrieveContext(query: string) {
    const keywords = this.extractKeywords(query);
    const searchString = keywords.join(' ') || query;

    // Search across entities
    const searchResults = this.dataProvider.searchEntities(searchString);

    let allEntities: any[] = [];
    const sourcesMap = new Map();
    const related = {
      topics: new Set(),
      stations: new Set(),
      datasets: new Set(),
      papers: new Set(),
    };

    // Helper to process entity and its relationships
    const processEntity = (entity: any, type: string) => {
      if (!entity) return;
      if (allEntities.find(e => e.id === entity.id)) return; // Avoid duplicates

      allEntities.push({ ...entity, _type: type });

      if (entity.provenance) {
        sourcesMap.set(entity.provenance.originalSourceUrl, {
          name: entity.provenance.sourceOrganization,
          org: entity.provenance.sourceOrgShort,
          url: entity.provenance.originalSourceUrl,
          doi: entity.provenance.doi,
          type: type
        });
      } else if (entity.doi) {
        sourcesMap.set(entity.doi, {
          name: entity.journal || 'Research Publication',
          org: entity.authors?.[0] || 'Unknown Author',
          url: entity.doiUrl || `https://doi.org/${entity.doi}`,
          doi: entity.doi,
          type: type
        })
      }

      // Expansion
      const relations = this.dataProvider.getRelatedEntities(entity);
      relations.topics.forEach((r: any) => related.topics.add(r));
      relations.stations.forEach((r: any) => related.stations.add(r));
      relations.datasets.forEach((r: any) => related.datasets.add(r));
      relations.papers.forEach((r: any) => related.papers.add(r));
    };

    // 1. Exact or keyword match entities
    searchResults.topics.slice(0, 2).forEach(e => processEntity(e, 'topic'));
    searchResults.stations.slice(0, 2).forEach(e => processEntity(e, 'station'));
    searchResults.datasets.slice(0, 3).forEach(e => processEntity(e, 'dataset'));
    searchResults.papers.slice(0, 3).forEach(e => processEntity(e, 'paper'));
    searchResults.species.slice(0, 2).forEach(e => processEntity(e, 'species'));
    searchResults.expeditions.slice(0, 1).forEach(e => processEntity(e, 'expedition'));

    // If query is specifically about a station, we might want to prioritize it
    // But this basic strategy works well enough for the demo

    const sources = Array.from(sourcesMap.values());

    // Assemble text context for AI
    let contextStr = 'POLARVERSE KNOWLEDGE CONTEXT:\n\n';

    if (allEntities.length === 0) {
      contextStr += "No verified information found in the database.\n";
    }

    allEntities.forEach(e => {
      contextStr += `[Entity Type: ${e._type.toUpperCase()}]\n`;
      contextStr += `Title/Name: ${e.title || e.name || e.commonName}\n`;
      if (e.overview) contextStr += `Overview: ${e.overview}\n`;
      if (e.description) contextStr += `Description: ${e.description}\n`;
      if (e.scientificExplanation) contextStr += `Science: ${e.scientificExplanation}\n`;
      if (e.abstract) contextStr += `Abstract: ${e.abstract}\n`;
      if (e.studentSummary) contextStr += `Student Summary: ${e.studentSummary}\n`;
      if (e.researchHighlights) contextStr += `Highlights: ${e.researchHighlights.join('; ')}\n`;
      if (e.provenance) contextStr += `Source: ${e.provenance.sourceOrganization}\n`;
      contextStr += `\n`;
    });

    return {
      context: contextStr,
      entities: allEntities,
      sources,
      related: {
        topics: Array.from(related.topics).map((t: any) => ({ label: t.title, id: t.id })),
        stations: Array.from(related.stations).map((s: any) => ({ label: s.name, id: s.id })),
        datasets: Array.from(related.datasets).map((d: any) => ({ label: d.title, id: d.id })),
        papers: Array.from(related.papers).map((p: any) => ({ label: p.title, id: p.id }))
      }
    };
  }

  public getSource(id: string) {
    // Basic stub, normally we'd search through everything to find the provenance by some ID
    return null;
  }
}
