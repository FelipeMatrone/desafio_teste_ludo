import test from 'node:test';
import assert from 'node:assert/strict';
import { PartidaLudo } from '../src/ludo.js';

test('exige lançar antes de movimentar', () => assert.throws(() => new PartidaLudo().mover(0), /lance/i));
test('recusa índice de peça inexistente', () => { const p = new PartidaLudo(); p.lancar(6); assert.throws(() => p.mover(4), /inexistente/i); });
test('consome o dado depois de uma jogada', () => { const p = new PartidaLudo(); p.lancar(6); p.mover(0); assert.equal(p.dado, undefined); });
test('captura não acontece na área final', () => { const p = new PartidaLudo(); p.pecas = [[54,-1,-1,-1],[54,-1,-1,-1]]; p.lancar(1); p.mover(0); assert.equal(p.pecas[1][0], 54); });
test('movimento inválido não troca a vez', () => { const p = new PartidaLudo(); p.lancar(2); assert.throws(() => p.mover(0)); assert.equal(p.vez, 0); });
