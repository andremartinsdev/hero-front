// Script para testar a API localmente
// Execute com: node test-api.js

const axios = require('axios');

const API_BASE = 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Testando integração com a API...\n');

  try {
    // Teste 1: Listar heróis
    console.log('1. Testando GET /heroes...');
    const heroesResponse = await axios.get(`${API_BASE}/heroes`);
    console.log('✅ Sucesso:', heroesResponse.data.length, 'heróis encontrados');
    console.log('📊 Dados:', heroesResponse.data);
    console.log('');

    // Teste 2: Criar herói
    console.log('2. Testando POST /heroes...');
    const newHero = {
      name: 'Teste API',
      description: 'Herói criado via teste de API',
      height: 180,
      weight: 80,
      dateOfBirth: new Date().toISOString()
    };
    
    const createResponse = await axios.post(`${API_BASE}/heroes`, newHero);
    console.log('✅ Herói criado:', createResponse.data);
    const heroId = createResponse.data.id;
    console.log('');

    // Teste 3: Buscar herói por ID
    console.log('3. Testando GET /heroes/{id}...');
    const getResponse = await axios.get(`${API_BASE}/heroes/${heroId}`);
    console.log('✅ Herói encontrado:', getResponse.data);
    console.log('');

    // Teste 4: Atualizar herói
    console.log('4. Testando PUT /heroes/{id}...');
    const updatedHero = {
      ...newHero,
      name: 'Teste API Atualizado',
      description: 'Herói atualizado via teste de API'
    };
    
    const updateResponse = await axios.put(`${API_BASE}/heroes/${heroId}`, updatedHero);
    console.log('✅ Herói atualizado:', updateResponse.data);
    console.log('');

    // Teste 5: Excluir herói
    console.log('5. Testando DELETE /heroes?id={id}...');
    await axios.delete(`${API_BASE}/heroes`, {
      params: { id: heroId }
    });
    console.log('✅ Herói excluído com sucesso');
    console.log('');

    console.log('🎉 Todos os testes passaram! A API está funcionando corretamente.');

  } catch (error) {
    console.error('❌ Erro no teste:', error.response?.data || error.message);
    console.log('\n💡 Dicas:');
    console.log('- Verifique se a API está rodando em http://localhost:5000');
    console.log('- Verifique se os endpoints estão corretos');
    console.log('- Verifique se o CORS está configurado na API');
  }
}

// Executar testes
testAPI();
