import { describe, it, expect } from "vitest";
import { proximaRevisao, VALORES_INICIAIS_SM2, type CartaoRevisao } from "../sm2";

describe("proximaRevisao (SM-2 Spaced Repetition)", () => {
  const dataBase = new Date("2026-10-25T12:00:00Z");

  const criarCartaoBase = (): CartaoRevisao => ({
    id: "card-1",
    notaId: "note-1",
    facilidade: VALORES_INICIAIS_SM2.facilidade,
    intervaloDias: VALORES_INICIAIS_SM2.intervaloDias,
    repeticoes: VALORES_INICIAIS_SM2.repeticoes,
    proximaEm: dataBase,
  });

  it("primeira revisão com sucesso (qualidade >= 3) define intervalo de 1 dia e 1 repetição", () => {
    const c0 = criarCartaoBase();
    const c1 = proximaRevisao(c0, 4, dataBase);

    expect(c1.repeticoes).toBe(1);
    expect(c1.intervaloDias).toBe(1);
    expect(c1.facilidade).toBe(2.5); // para qualidade 4: 2.5 + 0.1 - (1)*(0.08 + 0.02) = 2.5
    expect(c1.proximaEm.toISOString().slice(0, 10)).toBe("2026-10-26");
  });

  it("segunda revisão com sucesso avança para intervalo de 6 dias", () => {
    const c0 = criarCartaoBase();
    const c1 = proximaRevisao(c0, 5, dataBase);
    const c2 = proximaRevisao(c1, 5, c1.proximaEm);

    expect(c2.repeticoes).toBe(2);
    expect(c2.intervaloDias).toBe(6);
  });

  it("terceira revisão multiplica pelo fator de facilidade", () => {
    const c0 = criarCartaoBase();
    const c1 = proximaRevisao(c0, 4, dataBase);
    const c2 = proximaRevisao(c1, 4, c1.proximaEm);
    const c3 = proximaRevisao(c2, 4, c2.proximaEm);

    expect(c3.repeticoes).toBe(3);
    // 6 * 2.5 = 15 dias
    expect(c3.intervaloDias).toBe(15);
  });

  it("qualidade < 3 (erro/esquecimento) reseta repetições para 0 e intervalo para 1 dia", () => {
    const c0 = criarCartaoBase();
    const c1 = proximaRevisao(c0, 5, dataBase);
    const c2 = proximaRevisao(c1, 5, c1.proximaEm);
    expect(c2.repeticoes).toBe(2);

    // Usuário esqueceu na 3ª revisão
    const c3 = proximaRevisao(c2, 1, c2.proximaEm);
    expect(c3.repeticoes).toBe(0);
    expect(c3.intervaloDias).toBe(1);
  });

  it("nunca permite que o fator de facilidade fique menor que 1.3", () => {
    let card = criarCartaoBase();
    // Vários erros repetidos com qualidade 0
    for (let i = 0; i < 10; i++) {
      card = proximaRevisao(card, 0, dataBase);
    }
    expect(card.facilidade).toBeGreaterThanOrEqual(1.3);
  });
});

