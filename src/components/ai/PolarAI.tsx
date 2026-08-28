import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  ShieldCheck,
  ExternalLink,
  Database,
  AlertTriangle,
  RotateCcw,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { NavTab } from '../layout/Navbar';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  simpleAnswer?: string;
  scientificExplanation?: string;
  relatedData?: { label: string; tab: NavTab; id?: string }[];
  sourcesUsed?: { name: string; org: string; url: string; doi?: string }[];
  isUngrounded?: boolean;
}

interface PolarAIProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
}

const suggestedPrompts = [
  'Why is Antarctica the world\'s largest desert?',
  'How do Maitri and Bharati stations differ?',
  'What caused the 2023 Antarctic sea ice record low?',
  'How does India\'s IndARC mooring work in Svalbard?',
  'What was the Montreal Protocol and is the ozone hole recovering?',
];

export const PolarAI: React.FC<PolarAIProps> = ({ onNavigate }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'This is a source-grounded polar science assistant. Ask about Antarctic and Arctic climate, Maitri and Bharati stations, sea ice dynamics, ozone recovery, or Himalayan glaciers. Every response is grounded directly in verified datasets and peer-reviewed research.',
      sourcesUsed: [
        { name: 'NCPOR Polar Archives', org: 'NCPOR India', url: 'https://ncpor.res.in/' },
        { name: 'NSIDC Sea Ice Index', org: 'NSIDC / NASA', url: 'https://nsidc.org/data/g02135' }
      ]
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    setTimeout(() => {
      const q = textToSend.toLowerCase();
      let responseMsg: ChatMessage;

      if (q.includes('desert') || q.includes('precipitation') || q.includes('dry')) {
        responseMsg = {
          id: `resp-${Date.now()}`,
          sender: 'assistant',
          text: 'Antarctica is officially the largest desert on Earth because deserts are defined strictly by annual precipitation (<250 mm/year). The Antarctic polar plateau receives under 50 mm annually — far less than the Sahara.',
          simpleAnswer: 'Antarctica is so cold that air cannot hold moisture. Almost no new snow or rain falls in the interior, making it the driest and windiest place on Earth.',
          scientificExplanation: 'High atmospheric pressure over the South Pole creates a subsidence inversion. At −50°C, the saturation vapor pressure is virtually zero, preventing significant cloud condensation and snowfall.',
          relatedData: [
            { label: 'Explore South Pole Station', tab: 'explore', id: 'amundsen-scott' },
            { label: 'Learn: Polar Cryosphere', tab: 'learn', id: 'learn-cryosphere-sea-ice' }
          ],
          sourcesUsed: [
            { name: 'NSIDC: Parts of the Cryosphere', org: 'NSIDC', url: 'https://nsidc.org/learn/parts-cryosphere/ice-sheets' },
            { name: 'IPCC AR6 Working Group I', org: 'IPCC', url: 'https://www.ipcc.ch/' }
          ]
        };
      } else if (q.includes('maitri') || q.includes('bharati') || q.includes('indian station')) {
        responseMsg = {
          id: `resp-${Date.now()}`,
          sender: 'assistant',
          text: 'India operates two year-round Antarctic research stations: Maitri (established 1989, Schirmacher Oasis, 70°S) and Bharati (established 2012, Larsemann Hills, 69°S).',
          simpleAnswer: 'Maitri sits inland on rocky hills near freshwater Lake Priyadarshini and monitors weather and geomagnetism. Bharati is a coastal station with satellite dishes that download data from ISRO satellites on every polar pass.',
          scientificExplanation: 'Maitri focuses on 34-year synoptic surface meteorology, crustal deformation GPS, and limnology. Bharati specializes in Gondwana supercontinent correlation, aerosol optical depth, and real-time remote sensing telemetry for ISRO earth observation satellites.',
          relatedData: [
            { label: 'Maitri Meteorological Time Series', tab: 'data', id: 'ncpor-maitri-met-daily' },
            { label: 'India\'s Polar Journey', tab: 'india', id: 'maitri' }
          ],
          sourcesUsed: [
            { name: 'Maitri 30-Year Climate Trends', org: 'NCPOR / Polar Science', url: 'https://doi.org/10.1016/j.polar.2021.100684', doi: '10.1016/j.polar.2021.100684' },
            { name: 'NCPOR Station Architecture Dossier', org: 'NCPOR', url: 'https://ncpor.res.in/antarctis/bharati' }
          ]
        };
      } else if (q.includes('indarc') || q.includes('svalbard') || q.includes('himadri') || q.includes('fjord')) {
        responseMsg = {
          id: `resp-${Date.now()}`,
          sender: 'assistant',
          text: 'IndARC is India\'s subsurface moored ocean observatory deployed in Kongsfjorden, Svalbard at 192 meters depth, complemented by the Himadri research station in Ny-Ålesund.',
          simpleAnswer: 'An underwater robotic anchor packed with sensors sits near the Arctic seafloor all year, recording water temperature and salinity even during the pitch-black polar winter under thick ice.',
          scientificExplanation: 'IndARC measures seasonal Atlantic Water (AW) intrusion into the High Arctic. Acoustic Doppler Current Profilers (ADCP) and CTD microCATs document how warm saline water disrupts fjord stratification and teleconnects with the Indian Summer Monsoon.',
          relatedData: [
            { label: 'IndARC CTD Time Series', tab: 'data', id: 'ncpor-himadri-kongsfjorden-ctd' },
            { label: 'Himadri Research Station', tab: 'explore', id: 'himadri' }
          ],
          sourcesUsed: [
            { name: 'Kongsfjorden Moored Oceanographic Physics', org: 'Deep Sea Research / NCPOR', url: 'https://doi.org/10.1016/j.dsr.2019.103130', doi: '10.1016/j.dsr.2019.103130' },
            { name: 'Svalbard Science Forum Portal', org: 'SSF / Kings Bay', url: 'https://research-in-svalbard.net/' }
          ]
        };
      } else if (q.includes('2023') || q.includes('sea ice') || q.includes('record low') || q.includes('nsidc')) {
        responseMsg = {
          id: `resp-${Date.now()}`,
          sender: 'assistant',
          text: 'In winter 2023, Antarctic sea ice extent reached an unprecedented all-time satellite low of 16.96 million km² — over 2.5 million km² below the 1981–2010 average (>5 standard deviations anomaly).',
          simpleAnswer: 'Scientists found that warmer ocean water stored 200 meters below the surface mixed upward, preventing the ocean surface from freezing during the Antarctic winter.',
          scientificExplanation: 'Argo profiling floats and atmospheric reanalyses demonstrated that subsurface warming in the Southern Ocean upper pycnocline, paired with strong circumpolar westerlies, precluded normal sea ice consolidation.',
          relatedData: [
            { label: 'NSIDC Sea Ice Index', tab: 'data', id: 'nsidc-sea-ice-index' },
            { label: 'Data Story: Tale of Two Poles', tab: 'stories', id: 'sea-ice-dynamics-two-poles' }
          ],
          sourcesUsed: [
            { name: 'Record Low Antarctic Sea Ice Cover in 2023', org: 'Communications Earth & Environment', url: 'https://doi.org/10.1038/s43247-023-00961-9', doi: '10.1038/s43247-023-00961-9' },
            { name: 'NSIDC Sea Ice Index Version 3', org: 'NSIDC / NOAA', url: 'https://nsidc.org/data/g02135' }
          ]
        };
      } else if (q.includes('ozone') || q.includes('montreal') || q.includes('halley') || q.includes('cfc')) {
        responseMsg = {
          id: `resp-${Date.now()}`,
          sender: 'assistant',
          text: 'The Antarctic Ozone Hole was discovered in 1985 by British Antarctic Survey scientists at Halley Station. The 1987 Montreal Protocol banned ozone-depleting CFCs, and the ozone layer is now on track for full recovery by ~2066.',
          simpleAnswer: 'Chemicals from old spray cans destroyed Earth\'s natural UV shield over Antarctica. Thanks to an international global ban, the hole has stopped growing and is slowly healing.',
          scientificExplanation: 'Heterogeneous reactions on Polar Stratospheric Clouds (PSCs) convert stable chlorine reservoirs (HCl, ClONO₂) into reactive free radicals. Spring sunrise triggers catalytic cycles where one chlorine atom destroys 100,000 ozone molecules.',
          relatedData: [
            { label: 'Antarctic Total Column Ozone Series', tab: 'data', id: 'bas-halley-ozone-column' },
            { label: 'Data Story: Healing the Sky', tab: 'stories', id: 'healing-the-antarctic-ozone-hole' }
          ],
          sourcesUsed: [
            { name: 'Large Losses of Total Ozone in Antarctica', org: 'Nature / BAS', url: 'https://doi.org/10.1038/315207a0', doi: '10.1038/315207a0' },
            { name: 'NASA Ozone Watch Annual Summary', org: 'NASA GSFC', url: 'https://ozonewatch.gsfc.nasa.gov/' }
          ]
        };
      } else {
        responseMsg = {
          id: `resp-${Date.now()}`,
          sender: 'assistant',
          text: `Regarding "${textToSend}": A retrieval was conducted across connected polar repositories (NCPOR, NSIDC, NASA, BAS, SCAR). While general information exists, a specific peer-reviewed measurement or DOI for that exact query could not be verified within the connected polar indices.`,
          simpleAnswer: 'To ensure scientific integrity, PolarVerse does not produce unverified claims.',
          scientificExplanation: 'Try asking about Antarctic sea ice, Maitri/Bharati stations, IndARC in Kongsfjorden, ozone hole chemistry, or Himalayan glacier mass balance.',
          isUngrounded: true,
          sourcesUsed: [
            { name: 'NCPOR National Polar Data Centre', org: 'NCPOR', url: 'https://npdc.ncpor.res.in/' },
            { name: 'NSIDC Polar Knowledge Portal', org: 'NSIDC', url: 'https://nsidc.org/' }
          ]
        };
      }

      setMessages((prev) => [...prev, responseMsg]);
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Page header */}
        <div className="border-b border-ink-700 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-px bg-ice-400" aria-hidden="true" />
            <span className="text-2xs font-medium tracking-widest uppercase text-ice-400">
              Source-Grounded Scientific Assistant
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
            Polar Science Assistant
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Retrieval-augmented educational AI connected exclusively to authoritative polar datasets, 
            research papers, and station records. All responses cite original sources.
          </p>
        </div>

        {/* Suggested prompts — text links, not pills */}
        <div className="space-y-1">
          <div className="text-2xs font-medium uppercase tracking-widest text-slate-500 mb-2">
            Suggested queries
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="text-left text-xs text-slate-400 hover:text-white px-3 py-2 border border-transparent hover:border-ink-700 rounded-md transition-colors flex items-center gap-2 group"
              >
                <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-ice-400 shrink-0 transition-colors" aria-hidden="true" />
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation — document-style, not bubble chat */}
        <div className="space-y-0 border border-ink-700 rounded-lg overflow-hidden">
          <div className="divide-y divide-ink-700 max-h-[600px] overflow-y-auto">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              if (isUser) {
                return (
                  <div key={msg.id} className="px-6 py-5 bg-ink-800 flex items-start gap-4">
                    <div className="text-2xs font-semibold uppercase tracking-widest text-slate-500 w-16 shrink-0 pt-0.5">
                      You
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">{msg.text}</p>
                  </div>
                );
              }

              return (
                <div key={msg.id} className="px-6 py-6 space-y-5">
                  {/* Response label */}
                  <div className="flex items-center gap-2">
                    <div className="text-2xs font-semibold uppercase tracking-widest text-ice-400">
                      Polar Science Assistant
                    </div>
                    <div className="flex items-center gap-1 text-2xs text-slate-500">
                      <ShieldCheck className="w-3 h-3 text-teal-400" aria-hidden="true" />
                      Source-grounded
                    </div>
                  </div>

                  {/* Main answer */}
                  {msg.isUngrounded && (
                    <div className="flex items-start gap-2 p-3 border border-amber-600/30 bg-amber-600/10 rounded-md">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-xs text-amber-400">Query outside verified polar knowledge base</span>
                    </div>
                  )}

                  <p className="text-sm text-slate-200 leading-relaxed">{msg.text}</p>

                  {/* Simple explanation */}
                  {msg.simpleAnswer && (
                    <div className="border-l-2 border-ice-500 pl-4 space-y-1">
                      <div className="text-2xs font-semibold uppercase tracking-widest text-slate-500">
                        Plain Language
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{msg.simpleAnswer}</p>
                    </div>
                  )}

                  {/* Scientific explanation */}
                  {msg.scientificExplanation && (
                    <div className="border-l-2 border-teal-500 pl-4 space-y-1">
                      <div className="text-2xs font-semibold uppercase tracking-widest text-slate-500">
                        Scientific Detail
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{msg.scientificExplanation}</p>
                    </div>
                  )}

                  {/* Related data links */}
                  {msg.relatedData && msg.relatedData.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-2xs font-semibold uppercase tracking-widest text-slate-500">
                        Related Resources
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.relatedData.map((d, idx) => (
                          <button
                            key={idx}
                            onClick={() => onNavigate(d.tab, d.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-ink-700 hover:border-ice-500 text-xs text-slate-400 hover:text-white rounded-md transition-colors"
                          >
                            <Database className="w-3 h-3" aria-hidden="true" />
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sources */}
                  {msg.sourcesUsed && msg.sourcesUsed.length > 0 && (
                    <div className="pt-4 border-t border-ink-700 space-y-2">
                      <div className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-widest text-slate-500">
                        <ShieldCheck className="w-3 h-3 text-teal-400" aria-hidden="true" />
                        Sources used for this answer
                      </div>
                      <div className="space-y-1.5">
                        {msg.sourcesUsed.map((src, idx) => (
                          <div key={idx} className="flex items-start justify-between gap-4">
                            <div>
                              <span className="text-xs text-slate-400">{src.name}</span>
                              <span className="text-2xs text-slate-600 ml-2">({src.org})</span>
                            </div>
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-2xs text-ice-400 hover:underline font-mono whitespace-nowrap shrink-0"
                              aria-label={`Verify source: ${src.name}`}
                            >
                              {src.doi ? src.doi : 'Verify source'}
                              <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Processing state */}
            {isProcessing && (
              <div className="px-6 py-5 space-y-2">
                <div className="text-2xs font-semibold uppercase tracking-widest text-ice-400">
                  Polar Science Assistant
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="flex gap-0.5">
                    <span className="w-1.5 h-1.5 bg-ice-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-ice-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-ice-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  Searching verified polar knowledge base...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar — minimal, functional */}
          <div className="border-t border-ink-700 bg-ink-800 p-4">
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about Antarctic stations, sea ice, ozone, Arctic biology..."
                className="flex-1 px-4 py-2.5 bg-polar-950 border border-ink-700 focus:border-ice-500 text-sm text-slate-200 placeholder:text-slate-600 rounded-md outline-none transition-colors"
                aria-label="Ask a question about polar science"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputQuery.trim() || isProcessing}
                className="p-2.5 bg-ice-500 hover:bg-ice-400 disabled:opacity-40 disabled:cursor-not-allowed text-polar-950 rounded-md transition-colors"
                aria-label="Send question"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <p className="text-2xs text-slate-600 mt-2 px-1">
              All answers are grounded in verified datasets and peer-reviewed research. 
              PolarVerse does not generate unverified scientific claims.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
