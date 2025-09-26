# SL Benfica Info - Site Oficial

🦅 Site completo com informações do Sport Lisboa e Benfica

## 🌐 Acesso ao Site

**URL de Produção:** https://project1-dhowzjjrn-joao-carvalhos-projects-b6a3b9ad.vercel.app

## ✨ Funcionalidades

- **Próximos Jogos** - Visualize os próximos 5 jogos do Benfica
- **Escalações** - Veja o 11 inicial e suplentes do último jogo
- **Resultados Recentes** - Confira os últimos 5 resultados
- **Informações do Clube** - Dados sobre o estádio e história

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Estilização moderna
- **API-Sports** - Dados em tempo real
- **Vercel** - Deploy e hosting

## 🔧 Instalação Local

```bash
# Clonar repositório
git clone https://github.com/Joak81/project1.git
cd project1

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com sua API key

# Executar em desenvolvimento
npm run dev
```

## 📝 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm start` - Iniciar servidor de produção
- `npm test` - Executar testes
- `npm run test:coverage` - Testes com cobertura

## 📁 Estrutura do Projeto

```
src/
├── app/           # App Router pages
├── components/    # React components
├── lib/           # API integration
└── __tests__/     # Unit tests
```

## 🅰️ API-Sports

Este projeto usa a API-Sports para dados em tempo real. Para usar:

1. Crie uma conta em [api-sports.io](https://api-sports.io/)
2. Obtenha sua API key
3. Configure em `.env.local`:
```
API_SPORTS_KEY=sua_chave_aqui
```

## 🧑‍💻 Desenvolvimento

### Metodologia TDD
Todo o desenvolvimento segue Test-Driven Development:
1. Escrever testes primeiro
2. Implementar funcionalidade
3. Refatorar código

### Commits Semânticos
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `test:` Adição de testes
- `docs:` Documentação
- `refactor:` Refatoração

## 🚀 Deploy

Deploy automático via Vercel:
```bash
vercel --prod
```

## 📊 Status do Projeto

Ver [PROJECT_STATUS.md](./PROJECT_STATUS.md) para informações detalhadas.

## 📝 Licença

MIT

## 👨‍💻 Autor

Desenvolvido por João Carvalho

---

**E Pluribus Unum - Rumo ao 39º! 🦅❤️**