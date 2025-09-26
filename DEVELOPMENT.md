# GUIA DE DESENVOLVIMENTO

## 🎯 Metodologia: TDD (Test-Driven Development)

### WORKFLOW COMPLETO
```
DISCOVERY → TDD → BUILD → DEPLOY → VALIDAR
```

## 📊 FASE 0: DISCOVERY
Antes de iniciar qualquer desenvolvimento:
1. Mapear requisitos
2. Identificar tecnologias necessárias
3. Definir arquitetura
4. Criar/atualizar PROJECT_STATUS.md

## 🧪 FASE 1: TDD
### Ciclo Red-Green-Refactor
1. **RED:** Escrever teste que falha
2. **GREEN:** Implementar código mínimo para passar
3. **REFACTOR:** Melhorar código mantendo testes passando

### Checklist TDD
- [ ] Escrever testes unitários
- [ ] Executar testes (devem falhar)
- [ ] Implementar código mínimo
- [ ] Testes passam
- [ ] Refatorar código
- [ ] Commit com mensagem adequada

## 🏗️ FASE 2: BUILD
1. Build de desenvolvimento
2. Testes de integração
3. Lint e type-check
4. Build de produção

## 🚀 FASE 3: DEPLOY
### Staging
1. Deploy em ambiente de teste
2. Testes E2E com Playwright
3. Validação de funcionalidades

### Produção
1. Deploy no Vercel
2. Smoke tests
3. Monitoramento
4. Atualizar documentação

## 📝 PADRÕES DE COMMIT
```
feat: nova funcionalidade
fix: correção de bug
test: adição/modificação de testes
docs: atualização de documentação
refactor: refatoração de código
style: formatação, sem mudança de lógica
perf: melhorias de performance
chore: tarefas de manutenção
```

## 🛠️ FERRAMENTAS

### MCP Tools Configurados
- **Playwright:** Testes E2E e validação de URLs
- **GitHub:** Controle de versão e CI/CD
- **Vercel:** Deploy e hosting
- **Context7:** Documentação e contexto

### Comandos Úteis
```powershell
# Testes
npm test
npm run test:all
npm run lint

# Build
npm run build
npm run build:prod

# Deploy
vercel --prod
vercel --preview

# Git
git status
git add .
git commit -m "type: description"
git push origin main
```

## 📊 MÉTRICAS
Manter sempre atualizado em PROJECT_STATUS.md:
- Progresso de implementação (%)
- Cobertura de testes (%)
- Status do deploy
- Bloqueios identificados

## 🔒 SEGURANÇA
- NUNCA commitar credenciais
- Usar variáveis de ambiente
- Validar todas as entradas
- Implementar autenticação quando necessário

## 📚 DOCUMENTAÇÃO
Toda funcionalidade deve ter:
1. Documentação técnica em `/docs`
2. Testes documentados
3. README atualizado
4. PROJECT_STATUS.md atualizado
5. Comentários no código quando necessário

## ⚠️ IMPORTANTE
- Nunca pular fase de testes
- Sempre validar em produção
- Documentar todas as decisões
- Manter PROJECT_STATUS.md sempre atualizado