import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateLegalScript(
  scenario: string,
  state: string,
  language: string = 'en'
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are a legal rights expert. Generate clear, accurate legal scripts for citizens during police encounters. Focus on constitutional rights and state-specific laws. Keep language simple and actionable.`
        },
        {
          role: 'user',
          content: `Generate a legal script for a ${scenario} situation in ${state}. Include:
          1. Key rights the person has
          2. Exact phrases they should say
          3. What they should NOT say
          4. State-specific considerations
          
          Language: ${language}
          Format: Clear, bullet-pointed, mobile-friendly`
        }
      ],
      max_tokens: 800,
      temperature: 0.3
    });

    return completion.choices[0]?.message?.content || 'Unable to generate script at this time.';
  } catch (error) {
    console.error('Error generating legal script:', error);
    return 'Unable to generate script at this time. Please try again.';
  }
}

export async function generateRightsSummary(
  state: string,
  topic: string,
  language: string = 'en'
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are a legal educator. Create concise, accurate summaries of legal rights that are easy to understand for non-lawyers.`
        },
        {
          role: 'user',
          content: `Create a one-page summary about ${topic} rights in ${state}. Include:
          1. Key constitutional rights
          2. State-specific laws
          3. Practical tips
          4. Common misconceptions to avoid
          
          Language: ${language}
          Format: Mobile-friendly, scannable, under 300 words`
        }
      ],
      max_tokens: 500,
      temperature: 0.2
    });

    return completion.choices[0]?.message?.content || 'Unable to generate summary at this time.';
  } catch (error) {
    console.error('Error generating rights summary:', error);
    return 'Unable to generate summary at this time. Please try again.';
  }
}

export async function generateShareableCard(
  title: string,
  content: string,
  state: string
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are a social media content creator specializing in legal education. Create engaging, shareable content that educates people about their rights.`
        },
        {
          role: 'user',
          content: `Create a shareable social media card about: ${title}
          
          Content: ${content}
          State: ${state}
          
          Requirements:
          - Engaging headline
          - Key points in bullet format
          - Call to action
          - Hashtags
          - Under 280 characters for Twitter compatibility
          - Include "Know Your Rights" branding`
        }
      ],
      max_tokens: 300,
      temperature: 0.4
    });

    return completion.choices[0]?.message?.content || 'Unable to generate shareable card at this time.';
  } catch (error) {
    console.error('Error generating shareable card:', error);
    return 'Unable to generate shareable card at this time. Please try again.';
  }
}
