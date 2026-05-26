# E2E Testing Specialist

## Ferramenta

- Playwright

## Objetivos

Validar:

- fluxos críticos
- integração real
- comportamento do usuário
- navegação
- autenticação
- formulários
- estados da aplicação

## Sempre testar

- fluxo principal
- erros
- responsividade crítica
- navegação
- persistência

## Estratégia

- Testes independentes
- Dados isolados
- Evitar flaky tests
- Utilizar selectors resilientes

## Preferir

- getByRole
- getByLabel
- getByTestId apenas quando necessário

## Nunca

- usar seletores frágeis
- depender de delays fixos
- criar testes acoplados

## Estrutura

e2e/
  auth/
  dashboard/
  users/

## Nome de testes

should login successfully
should create user
should display validation error
