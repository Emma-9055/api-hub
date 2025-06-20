const http = require('http');

function testChatbot() {
  console.log('🚀 开始测试 Chatbot API...\n');
  
  const postData = JSON.stringify({
    messages: [
      {
        role: 'user',
        content: 'Hello'
      }
    ]
  });
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/chatbot',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  console.log('📤 发送请求到: http://localhost:3000/api/chatbot');
  console.log('📝 消息内容:', postData);
  
  const req = http.request(options, (res) => {
    console.log('📊 响应状态:', res.statusCode, res.statusMessage);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        console.log('📋 响应数据:', JSON.stringify(jsonData, null, 2));
        
        if (res.statusCode === 200 && jsonData.reply) {
          console.log('✅ 测试成功！AI 回复:', jsonData.reply);
        } else {
          console.log('❌ 测试失败！');
          if (jsonData.error) {
            console.log('🔍 错误信息:', jsonData.error);
            if (jsonData.details) {
              console.log('🔍 详细信息:', JSON.stringify(jsonData.details, null, 2));
            }
          }
        }
      } catch (e) {
        console.log('❌ 解析响应失败:', e.message);
        console.log('原始响应:', data);
      }
    });
  });
  
  req.on('error', (e) => {
    console.log('❌ 请求失败:', e.message);
    console.log('🔍 确保开发服务器正在运行: npm run dev');
  });
  
  req.write(postData);
  req.end();
}

// 测试环境变量
console.log('🔧 环境变量检查:');
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? '已设置' : '未设置');
console.log('');

// 运行测试
testChatbot(); 