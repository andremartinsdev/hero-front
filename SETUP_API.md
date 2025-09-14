# Setup da Integração com API

## 🚀 Configuração da API

### 1. Configurar URL da API

Edite o arquivo `src/config/api.js` e ajuste a URL base:

```javascript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000', // ← Ajuste aqui
  TIMEOUT: 10000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json'
  }
}
```

### 2. Configurar CORS na API

Certifique-se de que sua API está configurada para aceitar requisições do frontend:

```csharp
// Exemplo para ASP.NET Core
services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
```

## 🧪 Testando a Integração

### 1. Teste Manual da API

Execute o script de teste:
```bash
node test-api.js
```

### 2. Teste via Frontend

1. Inicie a aplicação:
```bash
npm run dev
```

2. Acesse: http://localhost:5173

3. Navegue para "Heróis"

4. Teste as operações:
   - ✅ Listar heróis
   - ✅ Criar novo herói
   - ✅ Editar herói
   - ✅ Excluir herói

## 🔧 Troubleshooting

### Erro de Conexão
```
Não foi possível conectar ao servidor
```
**Soluções:**
- Verifique se a API está rodando
- Verifique a URL em `src/config/api.js`
- Verifique se a porta está correta

### Erro CORS
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Soluções:**
- Configure CORS na API
- Adicione o frontend às origens permitidas

### Erro 404
```
Recurso não encontrado
```
**Soluções:**
- Verifique se os endpoints existem na API
- Verifique se a URL base está correta

### Erro 500
```
Erro interno do servidor
```
**Soluções:**
- Verifique os logs da API
- Verifique se os dados estão no formato correto

## 📊 Endpoints Esperados

A API deve implementar os seguintes endpoints:

### Heróis
- `GET /heroes` - Lista todos os heróis
- `GET /heroes/{id}` - Busca herói por ID
- `POST /heroes` - Cria novo herói
- `PUT /heroes/{id}` - Atualiza herói
- `DELETE /heroes?id={id}` - Exclui herói

### Formato dos Dados

#### CreateHeroDto (POST/PUT)
```json
{
  "name": "string",
  "description": "string",
  "height": 0,
  "weight": 0,
  "dateOfBirth": "2023-01-01T00:00:00Z"
}
```

#### GetHeroesDto (GET)
```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "height": 0,
  "weight": 0,
  "dateOfBirth": "2023-01-01T00:00:00Z"
}
```

## 🎯 Funcionalidades Implementadas

### ✅ Integração Completa
- Requisições HTTP via Axios
- Tratamento de erros
- Estados de loading
- Feedback ao usuário

### ✅ Mapeamento de Dados
- Conversão automática de formatos
- Validação de dados
- Tratamento de campos opcionais

### ✅ UX Melhorada
- Indicadores de loading
- Mensagens de erro claras
- Desabilitação de botões durante operações
- Estados vazios informativos

## 🚀 Próximos Passos

1. **Implementar HeroPower**: Adicionar funcionalidades de poderes
2. **Cache**: Implementar cache de dados
3. **Paginação**: Adicionar paginação na listagem
4. **Busca**: Implementar busca e filtros
5. **Upload**: Adicionar upload de imagens
6. **Autenticação**: Implementar autenticação JWT

## 📝 Logs

A aplicação gera logs detalhados no console do navegador:
- 🚀 Requisições enviadas
- ✅ Respostas recebidas
- ❌ Erros de requisição/resposta

Abra o DevTools (F12) para ver os logs em tempo real.
