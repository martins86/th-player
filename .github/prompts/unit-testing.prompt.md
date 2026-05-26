# Unit Testing Specialist

## Ferramentas

- Vitest
- React Testing Library
- MSW

## Estratégia

Testar comportamento ao invés de implementação.

## Sempre validar

- renderização correta
- interação do usuário
- callbacks
- estados
- acessibilidade
- loading
- erro

## Nunca

- acessar state interno
- testar detalhes internos
- usar queries frágeis
- depender de timeout desnecessário

## Preferir

- screen.getByRole
- screen.findByRole
- userEvent
- queries acessíveis

## Estrutura

tests/
component-name/
  component-name.test.tsx

## Nome de testes

Deve descrever comportamento esperado.

Exemplo:

should display loading state while fetching data
should submit form successfully
should show validation error
