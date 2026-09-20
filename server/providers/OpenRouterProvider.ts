import { AIResponse } from './AIProvider';

export class OpenRouterProvider {
  public async generate(query: string, context: string, mode: 'student' | 'researcher'): Promise<AIResponse> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
        console.warn("No OPENROUTER_API_KEY found, returning fallback.");
        return {
            answer: `[API KEY MISSING] You asked: "${query}". Based on the context provided, this is a simulated response. Please add your OpenRouter API key to the .env file. \n\nContext retrieved:\n${context.substring(0, 200)}...`,
            confidence: 'low'
        };
    }

    const systemInstruction = `You are Polar AI, a scientific assistant operating over the PolarVerse knowledge ecosystem.
Answer using the provided PolarVerse context.
Do not invent scientific sources, datasets, papers, DOI numbers, measurements or citations.
If the supplied context is insufficient, clearly state that the information could not be verified.
Distinguish retrieved facts from explanations or interpretation.
Always preserve source attribution.

You are currently in ${mode.toUpperCase()} mode.
${mode === 'student' ? 'Provide short explanations, use bullet points, simple terminology, analogies, and important facts.' : 'Provide detailed scientific explanations, mechanisms, variables, observations, datasets, station information, research papers, and DOI.'}`;

    const prompt = `Context:\n${context}\n\nUser Question:\n${query}\n\nPlease provide a response following the formatting guidelines for ${mode} mode. Do not include raw JSON, just the formatted text response. Use Markdown.`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash", // We can use Gemini 2.5 Flash via OpenRouter, or any other model
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: prompt }
          ],
          temperature: 0.1,
          max_tokens: 1000,
        })
      });

      if (!response.ok) {
         const errorText = await response.text();
         throw new Error(`OpenRouter API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();

      return {
        answer: data.choices[0].message.content || "No response generated.",
        confidence: 'high'
      };
    } catch (error) {
      console.error("OpenRouter API Error:", error);
      throw error;
    }
  }
}
