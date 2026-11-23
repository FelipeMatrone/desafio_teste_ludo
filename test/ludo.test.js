import test from 'node:test';import assert from 'node:assert/strict';import {PartidaLudo} from '../src/ludo.js';
test('inicia duas mãos com quatro peças na base',()=>{const p=new PartidaLudo();assert.deepEqual(p.pecas,[[-1,-1,-1,-1],[-1,-1,-1,-1]]);});
test('valida lançamento de dado',()=>{const p=new PartidaLudo();assert.equal(p.lancar(6),6);assert.throws(()=>p.lancar(0));assert.throws(()=>p.lancar(7));});
test('exige 6 para sair da base',()=>{const p=new PartidaLudo();p.lancar(5);assert.throws(()=>p.mover(0),/tirar 6/i);p.lancar(6);assert.equal(p.mover(0),0);});
test('avança peça e alterna a vez',()=>{const p=new PartidaLudo();p.lancar(6);p.mover(0);p.lancar(3);assert.equal(p.mover(0),3);assert.equal(p.vez,1);});
test('seis mantém a vez',()=>{const p=new PartidaLudo();p.lancar(6);p.mover(0);assert.equal(p.vez,0);});
test('captura adversário fora da chegada',()=>{const p=new PartidaLudo();p.pecas=[[4,-1,-1,-1],[7,-1,-1,-1]];p.lancar(3);p.mover(0);assert.equal(p.pecas[1][0],-1);});
test('recusa ultrapassar chegada e declara vencedor',()=>{const p=new PartidaLudo();p.pecas=[[54,56,56,56],[-1,-1,-1,-1]];p.lancar(3);assert.throws(()=>p.mover(0),/ultrapassa/i);p.lancar(2);p.mover(0);assert.equal(p.vencedor,0);assert.throws(()=>p.lancar(1),/inválido|encerrada/i);});
