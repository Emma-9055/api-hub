// 直接测试 chatbot API 逻辑
console.log('🧪 直接测试 Chatbot API 逻辑...\n');

// 模拟环境变量
process.env.OPENROUTER_API_KEY = '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';

// 测试 API Key 配置
console.log('🔧 环境变量检查:');
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? '已设置' : '未设置');
console.log('API Key 前缀:', process.env.OPENROUTER_API_KEY?.substring(0, 15) + '...');
console.log('');

// 测试 OpenAI 客户端配置
try {
  const OpenAI = require('openai');
  
  const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'API-Hub-Chatbot',
    },
  });
  
  console.log('✅ OpenAI 客户端配置成功');
  console.log('Base URL:', openai.baseURL);
  console.log('');
  
  // 模拟简单请求测试
  async function testAPI() {
    try {
      console.log('📤 测试简单 AI 请求...');
      
      const response = await openai.chat.completions.create({
        model: 'google/gemini-2.5-flash-preview',
        messages: [
          {
            role: 'user',
            content: 'Hello, just say "Hi" back'
          }
        ],
        max_tokens: 10,
      });
      
      console.log('✅ API 请求成功！');
      console.log('回复:', response.choices[0]?.message?.content);
      
    } catch (error) {
      console.log('❌ API 请求失败:');
      console.log('错误类型:', error.name);
      console.log('错误消息:', error.message);
      if (error.status) {
        console.log('HTTP 状态:', error.status);
      }
      if (error.error) {
        console.log('详细错误:', JSON.stringify(error.error, null, 2));
      }
    }
  }
  
  testAPI();
  
} catch (importError) {
  console.log('❌ 导入 OpenAI 失败:', importError.message);
  console.log('请运行: npm install openai');
} 