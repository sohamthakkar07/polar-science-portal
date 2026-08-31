import React, { useState } from 'react';
import { AudienceProvider } from './context/AudienceContext';
import { QuizProvider } from './context/QuizContext';
import { AdminProvider } from './context/AdminContext';
import { Navbar, NavTab } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { UniversalSearchModal } from './components/search/UniversalSearchModal';

// Home Views
import { HeroSection } from './components/home/HeroSection';
import { PolarTopicGrid } from './components/home/PolarTopicGrid';
import { IndiaPolarBanner } from './components/home/IndiaPolarBanner';
import { InteroperabilitySection } from './components/home/InteroperabilitySection';
import { SourceEcosystem } from './components/home/SourceEcosystem';

// Feature Views
import { PolarExplorer } from './components/map/PolarExplorer';
import { DataDiscovery } from './components/data/DataDiscovery';
import { DataStories } from './components/data/DataStories';
import { LearnHub } from './components/learn/LearnHub';
import { QuizCenter } from './components/quiz/QuizCenter';
import { PolarAI } from './components/ai/PolarAI';
import { ResearchDiscovery } from './components/research/ResearchDiscovery';
import { IndiaPolarJourney } from './components/india/IndiaPolarJourney';
import { PolarLife } from './components/biodiversity/PolarLife';
import { MediaGallery } from './components/media/MediaGallery';
import { AdminCuration } from './components/admin/AdminCuration';
import { PolarTopic } from './types/polar';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [targetDetailId, setTargetDetailId] = useState<string | undefined>(undefined);
  const [targetTopicFilter, setTargetTopicFilter] = useState<PolarTopic | undefined>(undefined);

  const handleNavigate = (tab: NavTab, detailId?: string) => {
    setCurrentTab(tab);
    setTargetDetailId(detailId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopicFromHome = (topic: PolarTopic) => {
    setTargetTopicFilter(topic);
    setCurrentTab('data');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-polar-950 text-slate-200 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => handleNavigate(tab)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Routed Content */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && (
          <div>
            <HeroSection onSelectTab={handleNavigate} />
            <InteroperabilitySection />
            <PolarTopicGrid onSelectTopic={handleSelectTopicFromHome} onNavigate={handleNavigate} />
            <IndiaPolarBanner onNavigate={handleNavigate} />
            <SourceEcosystem />
          </div>
        )}

        {currentTab === 'explore' && (
          <PolarExplorer onNavigate={handleNavigate} initialStationId={targetDetailId} />
        )}

        {currentTab === 'data' && (
          <DataDiscovery
            onNavigate={handleNavigate}
            initialDatasetId={targetDetailId}
            initialTopicFilter={targetTopicFilter}
          />
        )}

        {currentTab === 'stories' && (
          <DataStories onNavigate={handleNavigate} initialStorySlug={targetDetailId} />
        )}

        {currentTab === 'learn' && (
          <LearnHub onNavigate={handleNavigate} initialModuleId={targetDetailId} />
        )}

        {currentTab === 'quiz' && (
          <QuizCenter onNavigate={handleNavigate} initialQuestionId={targetDetailId} />
        )}

        {currentTab === 'ai' && (
          <PolarAI onNavigate={handleNavigate} />
        )}

        {currentTab === 'research' && (
          <ResearchDiscovery onNavigate={handleNavigate} initialPaperId={targetDetailId} />
        )}

        {currentTab === 'india' && (
          <IndiaPolarJourney onNavigate={handleNavigate} initialStationId={targetDetailId} />
        )}

        {currentTab === 'biodiversity' && (
          <PolarLife onNavigate={handleNavigate} initialSpeciesId={targetDetailId} />
        )}

        {currentTab === 'media' && (
          <MediaGallery />
        )}

        {currentTab === 'admin' && (
          <AdminCuration />
        )}
      </main>

      {/* Global Universal Search Modal */}
      <UniversalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Provenance Guaranteed Footer */}
      <Footer onSelectTab={handleNavigate} />
    </div>
  );
};

export function App() {
  return (
    <AudienceProvider>
      <QuizProvider>
        <AdminProvider>
          <AppContent />
        </AdminProvider>
      </QuizProvider>
    </AudienceProvider>
  );
}

export default App;
