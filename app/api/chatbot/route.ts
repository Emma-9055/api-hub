import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { POST as handleFlightsApi } from '@/app/api/flights/route';

async function searchFlights({ from, to, date }: { from: string; to: string; date: string }) {
  const request = new NextRequest('http://localhost/api/flights', {
    method: 'POST',
    body: JSON.stringify({ from, to, date }),
    headers: { 'Content-Type': 'application/json' },
  });
  const response = await handleFlightsApi(request);
  return response.json();
}

async function bookFlight({ flightNo, name, contact }: { flightNo: string; name: string; contact: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/flight-booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ flightNo, name, contact }),
  });
  const data = await res.json();
  return data;
}

const tools = [
  {
    type: 'function' as const,
    function: {
      name: 'searchFlights',
      description: 'Search for available flights based on departure, destination, and date',
      parameters: {
        type: 'object',
        properties: {
          from: { type: 'string', description: 'Departure city' },
          to: { type: 'string', description: 'Destination city' },
          date: { type: 'string', description: 'Departure date, format YYYY-MM-DD' },
        },
        required: ['from', 'to', 'date'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'bookFlight',
      description: 'Book a flight with flight number, name, and contact',
      parameters: {
        type: 'object',
        properties: {
          flightNo: { type: 'string', description: 'Flight number' },
          name: { type: 'string', description: 'Passenger name' },
          contact: { type: 'string', description: 'Contact info' },
        },
        required: ['flightNo', 'name', 'contact'],
      },
    },
  },
];

const TOOL_MAPPING = {
  searchFlights,
  bookFlight,
};

const apiKey = process.env.OPENROUTER_API_KEY || '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';

console.log('API Key available:', apiKey ? 'Yes' : 'No');
console.log('API Key starts with:', apiKey?.substring(0, 10));

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: apiKey,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'API-Hub-Chatbot',
  },
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    console.log('Making OpenAI request with model: google/gemini-2.5-flash-preview');
    
    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.5-flash-preview',
      messages: messages,
      tools,
    });
    
    const choice = response.choices[0];
    const toolCalls = choice.message.tool_calls;
    
    if (toolCalls && toolCalls.length > 0) {
      // 添加 assistant 消息
      const updatedMessages = [...messages, choice.message];
      
      // 执行工具调用
      for (const call of toolCalls) {
        const { name, arguments: argsStr } = call.function;
        const args = JSON.parse(argsStr);
        if (name in TOOL_MAPPING) {
          const toolResult = await TOOL_MAPPING[name as keyof typeof TOOL_MAPPING](args);
          updatedMessages.push({
            tool_call_id: call.id,
            role: 'tool',
            name,
            content: JSON.stringify(toolResult),
          });
        }
      }
      
      // 再次调用 LLM 生成最终回复
      const finalResponse = await openai.chat.completions.create({
        model: 'google/gemini-2.5-flash-preview',
        messages: updatedMessages,
      });
      
      const reply = finalResponse.choices[0]?.message?.content || '';
      return NextResponse.json({ reply });
    }
    
    // 没有工具调用，直接返回回复
    const reply = choice.message?.content || '';
    return NextResponse.json({ reply });
  } catch (e: any) {
    console.error('Chatbot API Error:', e);
    return NextResponse.json({ 
      reply: 'AI 服务异常，请稍后重试。', 
      error: e?.message,
      details: e?.response?.data || e?.stack 
    }, { status: 500 });
  }
} 