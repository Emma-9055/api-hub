const fetch = require('node-fetch');

async function testChatbot() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🚀 开始测试 Chatbot API...\n');
  
  // 测试数据
  const testMessages = [
    {
      role: 'user',
      content: 'Hello'
    }
  ];
  
  try {
    console.log('📤 发送请求到:', `${baseUrl}/api/chatbot`);
    console.log('📝 消息内容:', JSON.stringify(testMessages, null, 2));
    
    const response = await fetch(`${baseUrl}/api/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: testMessages }),
    });
    
    console.log('📊 响应状态:', response.status, response.statusText);
    
    const data = await response.json();
    console.log('📋 响应数据:', JSON.stringify(data, null, 2));
    
    if (response.ok && data.reply) {
      console.log('✅ 测试成功！AI 回复:', data.reply);
    } else {
      console.log('❌ 测试失败！');
      if (data.error) {
        console.log('🔍 错误信息:', data.error);
        if (data.details) {
          console.log('🔍 详细信息:', data.details);
        }
      }
    }
    
  } catch (error) {
    console.log('❌ 请求失败:', error.message);
    console.log('🔍 确保开发服务器正在运行: cd nextjs-app && npm run dev');
  }
}

// 测试环境变量
console.log('🔧 环境变量检查:');
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? '已设置' : '未设置');
console.log('');

// 运行测试
testChatbot(); 