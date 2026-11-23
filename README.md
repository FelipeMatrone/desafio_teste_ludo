# Desafio de Teste — Ludo para dois jogadores

Casos de teste em JavaScript para uma partida de Ludo com dois jogadores e quatro peças por jogador. O desafio pede a validação de uma partida; por isso, este repositório fornece um modelo pequeno, sem interface gráfica, para tornar as regras observáveis e automatizáveis.

## Colaborador

| Nome | Participação |
| --- | --- |
| Felipe de Almeida Matrone | Implementação do modelo, cenários de teste e documentação. |

## Como executar

O projeto utiliza apenas o executor nativo do Node (`node:test` e `node:assert/strict`), sem dependências externas. É necessário Node.js 18 ou superior.

```bash
npm test
```

Resultado esperado: **12 testes aprovados** e nenhuma falha.

## Escopo e decisões do modelo

O enunciado não especifica todas as regras do Ludo. As regras abaixo são as decisões efetivamente implementadas e testadas neste projeto:

| Elemento | Regra adotada |
| --- | --- |
| Jogadores | Dois jogadores, identificados por `0` e `1`. O jogador `0` inicia. |
| Peças | Cada jogador possui quatro peças. |
| Base | A posição `-1` representa uma peça fora do percurso. |
| Entrada no jogo | A peça só sai da base ao receber o dado `6`; nesse caso, ela vai para a posição `0`. |
| Movimento | Fora da base, a peça avança exatamente o valor do dado. |
| Chegada | A posição `56` representa a chegada. Não é permitido ultrapassá-la. |
| Captura | Ao parar em posição comum entre `0` e `51`, uma peça adversária na mesma posição volta à base. |
| Área final | Posições `52` a `56` não provocam captura, pois são tratadas como área final protegida. |
| Turno | Jogada normal passa a vez; jogar `6` mantém a vez do mesmo jogador. |
| Vitória | Vence quem leva as quatro peças à posição `56`. |

Ficam fora do escopo regras que não foram solicitadas nem implementadas, como bloqueios, três resultados `6` consecutivos, quatro jogadores, tabuleiro visual e escolha automática de estratégia.

## Modelo testado

O arquivo [`src/ludo.js`](src/ludo.js) exporta a classe `PartidaLudo`.

| Membro | Responsabilidade |
| --- | --- |
| `new PartidaLudo()` | Cria duas mãos com quatro peças na base e define a vez inicial. |
| `lancar(dado)` | Recebe um valor inteiro entre 1 e 6 e o mantém para a próxima jogada. |
| `mover(indice)` | Move a peça do jogador da vez, aplica captura, vitória e atualização de turno. |
| `pecas` | Estado público das posições das peças, usado pelos testes para montar cenários controlados. |
| `vez` | Jogador que deve realizar a próxima jogada. |
| `vencedor` | Permanece `null` até que um dos jogadores complete a chegada. |

O dado é informado explicitamente por `lancar`, em vez de ser sorteado dentro da classe. Essa escolha permite repetir qualquer cenário de teste sem aleatoriedade.

## Organização e cobertura dos testes

| Arquivo | Casos | O que é verificado |
| --- | ---: | --- |
| [`test/ludo.test.js`](test/ludo.test.js) | 7 | estado inicial, dado válido, saída da base, movimento, turno, captura, chegada e vitória |
| [`test/turnos-e-limites.test.js`](test/turnos-e-limites.test.js) | 5 | pré-condição do dado, índice inválido, consumo do dado, proteção da área final e preservação do turno em erro |
| **Total** | **12** | regras centrais, limites e transições de estado |

### Exemplos de cenários cobertos

- Um dado diferente de `6` não retira a peça da base.
- Um dado `6` move a peça para a entrada e mantém a vez do jogador.
- Uma tentativa de movimentar antes de lançar o dado é recusada.
- Uma tentativa de ultrapassar a posição `56` é recusada e não transfere a vez.
- Uma captura devolve somente a peça adversária na área comum; peças na área final não são capturadas.
- Após uma jogada, o dado é consumido; é necessário lançar novamente para mover outra peça.
- A partida encerrada recusa novos lançamentos e movimentos.

## Critérios de qualidade dos casos

Os testes observam retorno, estado e efeitos colaterais. Nos cenários inválidos, a suíte não verifica apenas a exceção: também confirma que a vez e as posições não foram modificadas. Isso evita que uma operação recusada deixe a partida em estado inconsistente.

## Estrutura

```text
desafio_teste_ludo/
├── src/
│   └── ludo.js
├── test/
│   ├── ludo.test.js
│   └── turnos-e-limites.test.js
├── package.json
└── README.md
```
