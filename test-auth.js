// 测试不同的认证方式
console.log('🔐 测试 OpenRouter 认证配置...\n');

const apiKey = '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';

async function testAuth() {
  const OpenAI = require('openai');
  
  console.log('🔧 API Key 信息:');
  console.log('长度:', apiKey.length);
  console.log('前缀:', apiKey.substring(0, 10));
  console.log('是否以 sk-or-v1 开头:', apiKey.startsWith('sk-or-v1'));
  console.log('');
  
  // 方法 1: 标准配置
  console.log('📝 方法 1: 标准 OpenAI 客户端配置');
  try {
    const openai1 = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
    });
    
    const response1 = await openai1.chat.completions.create({
      model: 'google/gemini-2.5-flash-preview',
      messages: [{ role: 'user', content: 'Say "test1"' }],
      max_tokens: 5,
    });
    
    console.log('✅ 方法 1 成功:', response1.choices[0]?.message?.content);
  } catch (error) {
    console.log('❌ 方法 1 失败:', error.message, 'Status:', error.status);
  }
  
  console.log('');
  
  // 方法 2: 添加自定义 headers
  console.log('📝 方法 2: 添加自定义 headers');
  try {
    const openai2 = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'API-Hub-Chatbot',
      },
    });
    
    const response2 = await openai2.chat.completions.create({
      model: 'google/gemini-2.5-flash-preview',
      messages: [{ role: 'user', content: 'Say "test2"' }],
      max_tokens: 5,
    });
    
    console.log('✅ 方法 2 成功:', response2.choices[0]?.message?.content);
  } catch (error) {
    console.log('❌ 方法 2 失败:', error.message, 'Status:', error.status);
  }
  
  console.log('');
  
  // 方法 3: 直接 fetch 请求
  console.log('📝 方法 3: 直接 fetch 请求');
  try {
    const response3 = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'API-Hub-Chatbot',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-preview',
        messages: [{ role: 'user', content: 'Say "test3"' }],
        max_tokens: 5,
      }),
    });
    
    if (response3.ok) {
      const data = await response3.json();
      console.log('✅ 方法 3 成功:', data.choices[0]?.message?.content);
    } else {
      const errorData = await response3.json();
      console.log('❌ 方法 3 失败:', response3.status, errorData);
    }
  } catch (error) {
    console.log('❌ 方法 3 异常:', error.message);
  }
  
  console.log('');
  
  // 方法 4: 测试不同模型
  console.log('📝 方法 4: 测试其他模型');
  try {
    const openai4 = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'API-Hub-Chatbot',
      },
    });
    
    const response4 = await openai4.chat.completions.create({
      model: 'google/gemini-pro-1.5',
      messages: [{ role: 'user', content: 'Say "test4"' }],
      max_tokens: 5,
    });
    
    console.log('✅ 方法 4 成功:', response4.choices[0]?.message?.content);
  } catch (error) {
    console.log('❌ 方法 4 失败:', error.message, 'Status:', error.status);
  }
}

testAuth().catch(console.error); 