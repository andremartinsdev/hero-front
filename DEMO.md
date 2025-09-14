# Demonstração da Aplicação CRUD de Heróis

## 🚀 Aplicação Funcionando!

A aplicação está rodando em: **http://localhost:5173**

## 📋 Funcionalidades Implementadas

### ✅ CRUD Completo
- **Criar**: Adicionar novos heróis com todos os campos
- **Ler**: Visualizar lista de heróis em tabela
- **Atualizar**: Editar heróis existentes
- **Deletar**: Remover heróis com confirmação

### 🎨 Interface Moderna
- **Vuetify 3**: Framework UI Material Design
- **Responsiva**: Funciona em desktop e mobile
- **Validação**: Campos obrigatórios e limites validados
- **Confirmação**: Dialog de confirmação para exclusão

### 📊 Campos dos Heróis
- **Nome**: Nome do herói (obrigatório)
- **Descrição**: História e características (obrigatório)
- **Altura**: Altura em centímetros (obrigatório, 50-300cm)
- **Peso**: Peso em quilogramas (obrigatório, 10-500kg)
- **Data de Nascimento**: Data de nascimento (obrigatório)

## 🎯 Como Testar

1. **Acesse a aplicação**: http://localhost:5173
2. **Navegue para "Heróis"** usando o menu superior
3. **Teste as operações**:
   - Clique em "Novo Herói" para criar
   - Clique no ícone de lápis para editar
   - Clique no ícone de lixeira para excluir
   - Use a tabela para visualizar todos os heróis

## 🏗️ Arquitetura

- **Vue 3**: Framework JavaScript reativo
- **Pinia**: Gerenciamento de estado
- **Vue Router**: Navegação entre páginas
- **Vuetify**: Componentes UI Material Design
- **Vite**: Build tool rápido

## 📁 Estrutura do Projeto

```
hero-front/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── views/         # Páginas (Home, Heroes)
│   ├── stores/        # Store Pinia (heroes.js)
│   ├── router/        # Configuração de rotas
│   ├── plugins/       # Plugin Vuetify
│   └── main.js        # Arquivo principal
├── index.html         # HTML base
├── vite.config.js     # Configuração Vite
└── package.json       # Dependências
```

## 🎉 Dados de Exemplo

A aplicação já vem com 3 heróis de exemplo:

### Superman
- **Nome**: Superman
- **Descrição**: O último filho de Krypton, dotado de poderes sobre-humanos
- **Altura**: 191 cm
- **Peso**: 107 kg
- **Nascimento**: 18/04/1938

### Batman
- **Nome**: Batman
- **Descrição**: O cavaleiro das trevas, vigilante de Gotham City
- **Altura**: 188 cm
- **Peso**: 95 kg
- **Nascimento**: 01/05/1939

### Mulher Maravilha
- **Nome**: Mulher Maravilha
- **Descrição**: Princesa das Amazonas, defensora da justiça
- **Altura**: 183 cm
- **Peso**: 74 kg
- **Nascimento**: 01/12/1941

## 🔧 Comandos Úteis

```bash
# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Visualizar build
npm run preview
```

## ✨ Validações Implementadas

- **Nome**: Campo obrigatório
- **Descrição**: Campo obrigatório
- **Altura**: Obrigatório, entre 50cm e 300cm
- **Peso**: Obrigatório, entre 10kg e 500kg
- **Data de Nascimento**: Campo obrigatório

## 🚀 Próximos Passos

Para expandir a aplicação, você pode:
- Adicionar upload de imagens
- Implementar busca e filtros
- Conectar com API backend
- Adicionar mais campos (origem, equipe, etc.)
- Implementar autenticação
- Adicionar gráficos de estatísticas físicas
