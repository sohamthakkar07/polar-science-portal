import { Request, Response } from 'express';
import { SearchEngine } from '../retrieval/SearchEngine';
import { OpenRouterProvider } from '../providers/OpenRouterProvider';

const searchEngine = new SearchEngine();
const aiProvider = new OpenRouterProvider();

export const chat = async (req: Request, res: Response) => {
  try {
    const { message, mode = 'student', conversationId } = req.body;
    
    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    // Proxy request to the Python local RAG engine running on port 3007
    const pythonResponse = await fetch('http://127.0.0.1:3007/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, mode })
    });

    if (!pythonResponse.ok) {
      throw new Error(`Python RAG Engine returned status ${pythonResponse.status}`);
    }

    const data = await pythonResponse.json();

    res.json({
      success: data.success,
      error: data.error,
      answer: data.answer,
      mode,
      intent: 'explanation',
      entities: [],
      sources: data.sources || [],
      chart: data.chart,
      relatedTopics: [],
      relatedDatasets: [],
      relatedPapers: [],
      relatedStations: [],
      confidence: 'high',
      isUngrounded: data.isUngrounded !== undefined ? data.isUngrounded : false
    });
  } catch (error) {
    console.error('Error proxying chat to Python engine:', error);
    res.status(500).json({ success: false, error: 'Polar AI local engine is temporarily unavailable. Make sure the Python server is running.' });
  }
};

export const explain = async (req: Request, res: Response) => {
  // Stub for specific explain logic
  res.json({ success: true, message: 'Explain endpoint not fully implemented yet' });
};

export const search = async (req: Request, res: Response) => {
  // Stub for structured search
  res.json({ success: true, message: 'Search endpoint not fully implemented yet' });
};

export const research = async (req: Request, res: Response) => {
  // Stub for focused research
  res.json({ success: true, message: 'Research endpoint not fully implemented yet' });
};

export const quiz = async (req: Request, res: Response) => {
  // Stub for quiz generation
  res.json({ success: true, message: 'Quiz endpoint not fully implemented yet' });
};

export const getSource = async (req: Request, res: Response) => {
  const { id } = req.params;
  const source = searchEngine.getSource(id);
  res.json({ success: !!source, source });
};

export const getRelated = async (req: Request, res: Response) => {
  const { entityType, id } = req.params;
  res.json({ success: true, message: `Get related ${entityType} for ${id} not fully implemented yet` });
};
