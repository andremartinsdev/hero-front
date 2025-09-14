# Integração com API - CRUD de Heróis

## 🚀 Integração Implementada

A aplicação foi integrada com a API baseada na especificação OpenAPI fornecida.

## 📋 Endpoints Implementados

### Heróis
- **GET /heroes** - Lista todos os heróis
- **GET /heroes/{id}** - Busca herói por ID
- **POST /heroes** - Cria novo herói
- **PUT /heroes/{id}** - Atualiza herói existente
- **DELETE /heroes?id={id}** - Exclui herói

### HeroPower (Preparado para futuras implementações)
- **POST /api/HeroPower** - Cria associação herói-poder
- **GET /api/HeroPower/{heroId}** - Busca poderes de um herói
- **DELETE /api/HeroPower/{heroId}/{powerId}** - Remove associação

## 🏗️ Arquitetura da Integração

### Estrutura de Arquivos
```
src/
├── services/
│   ├── api.js              # Configuração base do Axios
│   └── heroesService.js    # Serviço específico para heróis
├── config/
│   └── api.js              # Configuração da API
└── stores/
    └── heroes.js           # Store Pinia com integração API
```

### Fluxo de Dados
1. **Componente** → Chama ação da store
2. **Store** → Chama serviço de heróis
3. **Serviço** → Faz requisição HTTP via Axios
4. **API** → Processa e retorna dados
5. **Serviço** → Formata dados para aplicação
6. **Store** → Atualiza estado
7. **Componente** → Reativo à mudanças

## 🔧 Configuração

### URL da API
A URL base da API está configurada em `src/config/api.js`:
```javascript
BASE_URL: 'http://localhost:5000'
```

### Timeout
Timeout padrão de 10 segundos para requisições.

### Headers
Headers padrão configurados:
```javascript
{
  'Content-Type': 'application/json'
}
```

## 📊 Mapeamento de Dados

### Formulário → API (CreateHeroDto)
```javascript
{
  name: string,
  description: string,
  height: number,
  weight: number,
  dateOfBirth: string (ISO format)
}
```

### API → Aplicação (GetHeroesDto)
```javascript
{
  id: number,
  name: string,
  description: string,
  height: number,
  weight: number,
  birthDate: string (YYYY-MM-DD)
}
```

## 🎯 Funcionalidades Implementadas

### ✅ CRUD Completo
- **Create**: Formulário → API → Store → UI
- **Read**: API → Store → Tabela
- **Update**: Formulário → API → Store → UI
- **Delete**: Confirmação → API → Store → UI

### ✅ Tratamento de Erros
- Erros de conexão
- Erros de servidor (500)
- Recursos não encontrados (404)
- Timeout de requisições
- Validação de dados

### ✅ Estados de Loading
- Indicadores visuais durante requisições
- Desabilitação de botões durante operações
- Spinners e progress bars

### ✅ Feedback ao Usuário
- Mensagens de erro claras
- Alertas dismissíveis
- Estados vazios informativos

## 🔄 Como Usar

### 1. Configurar API
Edite `src/config/api.js` para ajustar a URL da API:
```javascript
BASE_URL: 'http://sua-api.com'
```

### 2. Executar Aplicação
```bash
npm run dev
```

### 3. Testar Integração
- Acesse http://localhost:5173
- Navegue para "Heróis"
- Teste todas as operações CRUD

## 🐛 Troubleshooting

### Erro de Conexão
```
Não foi possível conectar ao servidor. Verifique se a API está rodando.
```
**Solução**: Verifique se a API está rodando na URL configurada.

### Erro 404
```
Recurso não encontrado
```
**Solução**: Verifique se o endpoint existe na API.

### Erro 500
```
Erro interno do servidor
```
**Solução**: Verifique os logs da API.

### Timeout
```
Timeout de requisição
```
**Solução**: Aumente o timeout em `src/config/api.js`.

## 📝 Logs

A aplicação gera logs detalhados no console:
- 🚀 Requisições enviadas
- ✅ Respostas recebidas
- ❌ Erros de requisição/resposta

## 🚀 Próximos Passos

1. **Implementar HeroPower**: Adicionar funcionalidades de poderes
2. **Cache**: Implementar cache de dados
3. **Paginação**: Adicionar paginação na listagem
4. **Busca**: Implementar busca e filtros
5. **Upload**: Adicionar upload de imagens
6. **Autenticação**: Implementar autenticação JWT

## 📚 Dependências

- **axios**: Cliente HTTP
- **pinia**: Gerenciamento de estado
- **vue**: Framework reativo

## 🔗 Links Úteis

- [Axios Documentation](https://axios-http.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue 3 Documentation](https://vuejs.org/)
