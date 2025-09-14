# CRUD de Heróis

Uma aplicação Vue 3 com CRUD completo para gerenciar heróis, utilizando Vuetify como framework UI.

## Funcionalidades

- ✅ Listar heróis
- ✅ Criar novo herói
- ✅ Editar herói existente
- ✅ Excluir herói
- ✅ Interface responsiva com Vuetify
- ✅ Validação de formulários
- ✅ Confirmação de exclusão

## Campos dos Heróis

- **Nome**: Nome do herói (obrigatório)
- **Descrição**: História e características do herói (obrigatório)
- **Altura**: Altura em centímetros (obrigatório, 50-300cm)
- **Peso**: Peso em quilogramas (obrigatório, 10-500kg)
- **Data de Nascimento**: Data de nascimento do herói (obrigatório)

## Tecnologias Utilizadas

- Vue 3 (Composition API)
- Vuetify 3 (Framework UI)
- Pinia (Gerenciamento de estado)
- Vue Router 4 (Roteamento)
- Vite (Build tool)

## Como executar

1. Instale as dependências:
```bash
export NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/ZscalerRoot0.crt
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse a aplicação em: http://localhost:5173

## Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção

## Estrutura do projeto

```
src/
├── components/     # Componentes reutilizáveis
├── views/         # Páginas da aplicação
├── stores/        # Stores do Pinia
├── router/        # Configuração de rotas
├── plugins/       # Plugins (Vuetify)
└── main.js        # Arquivo principal
```

## Validações

- **Nome**: Campo obrigatório
- **Descrição**: Campo obrigatório
- **Altura**: Obrigatório, entre 50cm e 300cm
- **Peso**: Obrigatório, entre 10kg e 500kg
- **Data de Nascimento**: Campo obrigatório

## Dados de Exemplo

A aplicação inclui 3 heróis de exemplo:
- **Superman**: 191cm, 107kg, nascido em 18/04/1938
- **Batman**: 188cm, 95kg, nascido em 01/05/1939
- **Mulher Maravilha**: 183cm, 74kg, nascida em 01/12/1941
