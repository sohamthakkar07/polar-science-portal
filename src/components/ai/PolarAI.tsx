import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  ShieldCheck,
  ExternalLink,
  Database,
  AlertTriangle,
  RotateCcw,
  ChevronRight,
  BookOpen,
  Brain,
  Sparkles,
  Compass,
  MapPin,
  FileText,
  Flag,
  Trophy,
  ArrowRight,
  MessageSquare,
  X as XIcon
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { NavTab } from '../layout/Navbar';
import { useAudience } from '../../context/AudienceContext';


interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  simpleAnswer?: string;
  scientificExplanation?: string;
  relatedData?: { label: string; tab: NavTab; id?: string }[];
  sourcesUsed?: { name: string; org: string; url: string; doi?: string }[];
  isUngrounded?: boolean;
  chart?: any;
}

interface PolarAIProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
}

const suggestedPrompts = [
  'Tell me about penguins',
  'What is Himansh?',
  'Tell me about Dakshin Gangotri',
  'What is glacier mass balance?',
  'Tell me about Prydz Bay',
  'Why is Antarctica the world\'s largest desert?',
  'How do Maitri and Bharati stations differ?',
];

export const PolarAI: React.FC<PolarAIProps> = ({ onNavigate }) => {
  const { isStudent } = useAudience();
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Welcome to the Grounded Polar Science AI Assistant. Ask about Antarctic and Arctic climate dynamics, Maitri and Bharati stations, sea ice records, ozone layer chemistry, species, or Himalayan glaciology. Every answer is grounded directly in verified datasets and peer-reviewed research.',
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

  const handleSendMessage = async (queryText?: string) => {
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

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${baseUrl}/api/v1/polar-ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          mode: isStudent ? 'student' : 'researcher'
        })
      });

      const data = await response.json();

      let responseMsg: ChatMessage;

      if (data.success) {
        responseMsg = {
          id: `resp-${Date.now()}`,
          sender: 'assistant',
          text: data.answer,
          isUngrounded: data.isUngrounded,
          relatedData: [
            ...(data.relatedTopics || []).map((t: any) => ({ label: `Topic: ${t.label}`, tab: 'learn' as NavTab, id: t.id })),
            ...(data.relatedDatasets || []).map((d: any) => ({ label: `Dataset: ${d.label}`, tab: 'data' as NavTab, id: d.id })),
            ...(data.relatedStations || []).map((s: any) => ({ label: `Station: ${s.label}`, tab: 'explore' as NavTab, id: s.id })),
            ...(data.relatedPapers || []).map((p: any) => ({ label: `Paper: ${p.label}`, tab: 'research' as NavTab, id: p.id }))
          ],
          sourcesUsed: data.sources,
          chart: data.chart
        };
        
        // Map simplified/scientific explanations if the backend provides them, 
        // though our Gemini backend currently returns everything in `answer`.
        // The UI handles rendering `text` directly.
        if (isStudent && data.mode === 'student') {
            responseMsg.simpleAnswer = "Generated explanation from PolarVerse Knowledge Base.";
        } else if (!isStudent && data.mode === 'researcher') {
            responseMsg.scientificExplanation = "Detailed research explanation from PolarVerse Knowledge Base.";
        }

      } else {
        responseMsg = {
          id: `resp-${Date.now()}`,
          sender: 'assistant',
          text: data.answer || data.error || 'Polar AI is temporarily unavailable. Please try again.',
          isUngrounded: true
        };
      }

      setMessages((prev) => [...prev, responseMsg]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMsg: ChatMessage = {
          id: `resp-${Date.now()}`,
          sender: 'assistant',
          text: 'Polar AI is temporarily unavailable. Please make sure the backend server is running.',
          isUngrounded: true
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`mb-4 w-[380px] sm:w-[450px] bg-polar-950 border border-polar-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 h-[600px] max-h-[75vh]' : 'scale-95 opacity-0 h-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 bg-polar-900 border-b border-polar-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-ice-400" />
              <h2 className="text-sm font-bold text-white tracking-tight">Polar AI Assistant</h2>
            </div>
            <div className="text-3xs font-mono text-slate-400 mt-1 flex items-center gap-1.5">
              <span>{isStudent ? 'Student Mode 🎓' : 'Researcher Mode 🔬'}</span>
              <span>•</span>
              <span className="text-teal-400 flex items-center gap-0.5"><ShieldCheck className="w-3 h-3"/> Grounded</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-polar-800 rounded-lg text-slate-400 hover:text-white transition-colors">
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Suggested prompts */}
          <div className="space-y-2">
            <div className="text-3xs font-mono font-semibold uppercase tracking-widest text-slate-500">
              Suggested Research
            </div>
            <div className="flex flex-wrap gap-1.5">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2 py-1 rounded bg-polar-900/80 hover:bg-polar-850 border border-polar-800 hover:border-ice-500/40 text-3xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 sm:p-4 rounded-xl border transition-all ${
                  msg.sender === 'user'
                    ? 'bg-polar-850 border-ice-500/30 text-white ml-6'
                    : 'bg-polar-900/90 border-polar-800 text-slate-200'
                }`}
              >
              <div className="flex items-center justify-between border-b border-polar-800/80 pb-3 mb-4">
                <div className="flex items-center gap-2 font-mono text-xs">
                  {msg.sender === 'assistant' ? (
                    <>
                      <Sparkles className="w-4 h-4 text-ice-400" />
                      <span className="font-bold text-white">PolarVerse Science Assistant</span>
                      {msg.isUngrounded ? (
                        <span className="px-2 py-0.5 rounded text-3xs font-mono bg-rose-500/20 text-rose-300 border border-rose-400/30">
                          Unverified Query
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-3xs font-mono bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          Grounded Response
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="font-bold text-ice-300">You</span>
                  )}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-200 font-sans">{msg.text}</p>

              {/* AUDIENCE-AWARE PRESENTATION */}
              {msg.sender === 'assistant' && (
                <div className="mt-4 space-y-4">
                  {/* Student Mode 🎓 Emphasis */}
                  {isStudent && msg.simpleAnswer && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5 font-sans">
                      <div className="text-2xs font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                        <span>🎓 Student Summary & Analogy:</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{msg.simpleAnswer}</p>
                    </div>
                  )}

                  {/* Scientific Detail (Researcher Emphasis or Student Expandable) */}
                  {msg.scientificExplanation && (
                    <div className={`p-4 rounded-xl border font-mono text-xs space-y-1.5 ${
                      !isStudent
                        ? 'bg-teal-950/40 border-teal-500/30 text-teal-100'
                        : 'bg-polar-950 border-polar-800 text-slate-300'
                    }`}>
                      <div className="text-2xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                        <span>🔬 Quantitative Scientific Explanation:</span>
                      </div>
                      <p className="text-xs leading-relaxed">{msg.scientificExplanation}</p>
                    </div>
                  )}

                  {/* Student Mode Backup if simpleAnswer wasn't available */}
                  {!isStudent && msg.simpleAnswer && (
                    <div className="p-3 rounded-lg bg-polar-950 border border-polar-800 text-2xs font-mono text-slate-400">
                      <span className="font-bold text-slate-300">Plain Language Overview: </span>
                      {msg.simpleAnswer}
                    </div>
                  )}

                  {/* Chart Rendering Block */}
                  {msg.chart && (
                    <div className="p-4 rounded-xl border bg-polar-950/80 border-polar-800 mt-4 overflow-hidden">
                      <div className="text-xs font-bold text-white mb-4 text-center">{msg.chart.title}</div>
                      <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          {msg.chart.type === 'line' ? (
                            <LineChart data={msg.chart.data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                              <XAxis dataKey={msg.chart.xKey} stroke="#475569" fontSize={10} tickMargin={10} />
                              <YAxis stroke="#475569" fontSize={10} domain={['auto', 'auto']} />
                              <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', fontSize: '12px' }} />
                              <Legend wrapperStyle={{ fontSize: '10px' }} />
                              {msg.chart.series.map((s: any, idx: number) => (
                                <Line key={idx} type="monotone" dataKey={s.dataKey} name={s.label} stroke="#38bdf8" strokeWidth={2} dot={{ fill: '#38bdf8', r: 3 }} activeDot={{ r: 5 }} />
                              ))}
                            </LineChart>
                          ) : msg.chart.type === 'bar' ? (
                            <BarChart data={msg.chart.data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                              <XAxis dataKey={msg.chart.xKey} stroke="#475569" fontSize={10} tickMargin={10} />
                              <YAxis stroke="#475569" fontSize={10} domain={['auto', 'auto']} />
                              <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', fontSize: '12px' }} cursor={{fill: '#0f172a'}} />
                              <Legend wrapperStyle={{ fontSize: '10px' }} />
                              {msg.chart.series.map((s: any, idx: number) => (
                                <Bar key={idx} dataKey={s.dataKey} name={s.label} fill="#38bdf8" radius={[4, 4, 0, 0]} />
                              ))}
                            </BarChart>
                          ) : msg.chart.type === 'scatter' ? (
                            <ScatterChart margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                              <XAxis dataKey={msg.chart.xKey} type="number" stroke="#475569" fontSize={10} domain={['auto', 'auto']} tickFormatter={(v) => v.toFixed(1)} />
                              <YAxis dataKey={msg.chart.yKey} type="number" stroke="#475569" fontSize={10} domain={['auto', 'auto']} />
                              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', fontSize: '12px' }} />
                              <Legend wrapperStyle={{ fontSize: '10px' }} />
                              {msg.chart.series.map((s: any, idx: number) => (
                                <Scatter key={idx} name={s.label} data={msg.chart.data} fill="#38bdf8" />
                              ))}
                            </ScatterChart>
                          ) : <></>}
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* Entity Navigation Buttons */}
                  {msg.relatedData && msg.relatedData.length > 0 && (
                    <div className="pt-3 border-t border-polar-800 space-y-2">
                      <div className="text-3xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                        Related PolarVerse Knowledge:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.relatedData.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => onNavigate(item.tab, item.id)}
                            className="px-3.5 py-2 rounded-xl bg-ice-500 hover:bg-ice-400 active:scale-[0.98] text-polar-950 font-bold text-xs font-mono transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                          >
                            <span>{item.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sources & Provenance */}
                  {msg.sourcesUsed && msg.sourcesUsed.length > 0 && (
                    <div className="pt-3 border-t border-polar-800/60 space-y-2 font-mono text-2xs">
                      <div className="text-3xs uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-teal-400" />
                        <span>Sources & Grounded Provenance:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.sourcesUsed.map((src, idx) => (
                          <a
                            key={idx}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-polar-950 hover:bg-polar-850 border border-polar-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                          >
                            <span>{src.name} ({src.org})</span>
                            {src.doi && <span className="text-teal-400 text-3xs">DOI:{src.doi}</span>}
                            <ExternalLink className="w-3 h-3 text-ice-400" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isProcessing && (
            <div className="p-5 rounded-2xl bg-polar-900 border border-polar-800 flex items-center gap-3 text-xs font-mono text-ice-300">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Querying NCPOR, NSIDC, and SCAR grounded indices...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-polar-900 border-t border-polar-800 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a question..."
            className="flex-1 bg-polar-950 border border-polar-800 rounded-lg px-3 py-2 text-xs font-sans text-white placeholder:text-slate-500 focus:outline-none focus:border-ice-500/50"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isProcessing}
            className="p-2 bg-ice-500 hover:bg-ice-400 disabled:opacity-50 text-polar-950 font-bold rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-14 h-14 bg-ice-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:bg-ice-400 hover:scale-105 active:scale-95 transition-all text-polar-950 z-50 group"
      >
        {isOpen ? (
          <XIcon className="w-6 h-6" />
        ) : (
          <div className="relative">
             <Brain className="w-7 h-7" />
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full border-2 border-polar-950 animate-pulse"></div>
          </div>
        )}
      </button>
    </div>
  );
};
