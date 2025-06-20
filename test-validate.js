// 验证 OpenRouter API Key
console.log('🔍 验证 OpenRouter API Key...\n');

const apiKey = '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';

async function validateApiKey() {
  console.log('🔧 API Key 信息:');
  console.log('长度:', apiKey.length);
  console.log('格式:', apiKey.substring(0, 15) + '...');
  console.log('');
  
  try {
    console.log('📤 检查 API Key 有效性...');
    
    // 使用 OpenRouter 推荐的验证端点
    const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📊 验证响应状态:', response.status, response.statusText);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Key 有效！');
      console.log('📋 Key 信息:', JSON.stringify(data, null, 2));
    } else {
      const errorData = await response.json();
      console.log('❌ API Key 无效！');
      console.log('错误详情:', JSON.stringify(errorData, null, 2));
    }
    
  } catch (error) {
    console.log('❌ 验证失败:', error.message);
  }
  
  console.log('\n' + '='.repeat(50));
  
  try {
    console.log('📤 尝试获取可用模型列表...');
    
    const modelsResponse = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📊 模型列表响应状态:', modelsResponse.status, modelsResponse.statusText);
    
    if (modelsResponse.ok) {
      const modelsData = await modelsResponse.json();
      console.log('✅ 成功获取模型列表！');
      console.log('可用模型数量:', modelsData.data?.length || 0);
      if (modelsData.data && modelsData.data.length > 0) {
        console.log('前3个模型:', modelsData.data.slice(0, 3).map(m => m.id));
      }
    } else {
      const errorData = await modelsResponse.json();
      console.log('❌ 获取模型列表失败！');
      console.log('错误详情:', JSON.stringify(errorData, null, 2));
    }
    
  } catch (error) {
    console.log('❌ 获取模型列表异常:', error.message);
  }
  
  console.log('\n' + '='.repeat(50));
  
  try {
    console.log('📤 尝试获取账户余额...');
    
    const creditsResponse = await fetch('https://openrouter.ai/api/v1/auth/key', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'API-Hub-Chatbot',
      },
    });
    
    console.log('📊 余额查询响应状态:', creditsResponse.status, creditsResponse.statusText);
    
    if (creditsResponse.ok) {
      const creditsData = await creditsResponse.json();
      console.log('✅ 成功获取账户信息！');
      console.log('账户信息:', JSON.stringify(creditsData, null, 2));
    } else {
      const errorData = await creditsResponse.json();
      console.log('❌ 获取账户信息失败！');
      console.log('错误详情:', JSON.stringify(errorData, null, 2));
    }
    
  } catch (error) {
    console.log('❌ 获取账户信息异常:', error.message);
  }
}

validateApiKey().catch(console.error); 