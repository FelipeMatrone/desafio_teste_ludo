# Desafio de Teste — Ludo

Partida de Ludo para dois jogadores, cada um com quatro peças. A implementação concentra-se nas regras de movimento que podem ser verificadas sem interface.

## Como executar

Requer Node.js 18 ou superior e não utiliza dependências externas.

```bash
npm test
```

## Especificação modelada

- As oito peças começam na base, representada por `-1`.
- Uma peça só sai da base com dado 6; esse resultado também mantém a vez do jogador.
- Movimentos normais alternam o turno, não podem ultrapassar a chegada (56) e consomem o dado lançado.
- A captura devolve à base somente peça adversária no percurso principal; a área final é protegida.
- A partida termina quando as quatro peças de um jogador chegam ao final.

## Organização da suíte

| Arquivo | Cenários verificados |
| --- | --- |
| `test/ludo.test.js` | base, dado, movimento, turnos, captura, chegada e vitória |
| `test/turnos-e-limites.test.js` | pré-condições, índices, consumo do dado, área final e atomicidade |

## Colaborador

- Felipe Matrone — implementação e casos de teste.
