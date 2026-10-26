import { describe, it, expect } from "vitest";
import { montarFila, type CandidatoVideo } from "../mochila";

describe("montarFila (Mochila 0/1 por Orçamento de Tempo)", () => {
  const candidatosExemplo: CandidatoVideo[] = [
    { videoId: "v1", duracaoMin: 10, valor: 5, titulo: "Vídeo 1" },
    { videoId: "v2", duracaoMin: 20, valor: 8, titulo: "Vídeo 2" },
    { videoId: "v3", duracaoMin: 15, valor: 7, titulo: "Vídeo 3" },
    { videoId: "v4", duracaoMin: 30, valor: 12, titulo: "Vídeo 4" },
  ];

  it("seleciona a combinação de maior valor que cabe no orçamento", () => {
    // Orçamento = 30 min
    // Opções:
    // v4 (30m) = valor 12
    // v2 + v1 (20+10 = 30m) = 8 + 5 = 13
    // v3 + v1 (15+10 = 25m) = 7 + 5 = 12
    // Melhor: v1 + v2 (valor 13)
    const fila = montarFila(candidatosExemplo, 30);
    const duracaoTotal = fila.reduce((acc, c) => acc + c.duracaoMin, 0);
    const valorTotal = fila.reduce((acc, c) => acc + c.valor, 0);

    expect(duracaoTotal).toBeLessThanOrEqual(30);
    expect(valorTotal).toBe(13);
    expect(fila.map((c) => c.videoId)).toEqual(expect.arrayContaining(["v1", "v2"]));
  });

  it("retorna lista vazia para orçamento zero ou negativo", () => {
    expect(montarFila(candidatosExemplo, 0)).toEqual([]);
    expect(montarFila(candidatosExemplo, -10)).toEqual([]);
  });

  it("retorna lista vazia se todos os vídeos excedem o orçamento", () => {
    const fila = montarFila(candidatosExemplo, 5); // menor vídeo tem 10m
    expect(fila).toEqual([]);
  });

  it("respeita o limite máximo de vídeos configurado", () => {
    const candidatosPequenos: CandidatoVideo[] = [
      { videoId: "p1", duracaoMin: 5, valor: 1 },
      { videoId: "p2", duracaoMin: 5, valor: 2 },
      { videoId: "p3", duracaoMin: 5, valor: 3 },
      { videoId: "p4", duracaoMin: 5, valor: 4 },
      { videoId: "p5", duracaoMin: 5, valor: 5 },
      { videoId: "p6", duracaoMin: 5, valor: 6 },
      { videoId: "p7", duracaoMin: 5, valor: 7 },
    ];

    const fila = montarFila(candidatosPequenos, 40, { maxVideos: 4 });
    expect(fila.length).toBeLessThanOrEqual(4);
    // Prioriza os de maior valor
    expect(fila[0].valor).toBeGreaterThanOrEqual(fila[fila.length - 1].valor);
  });

  it("lida com lista de candidatos vazia com segurança", () => {
    expect(montarFila([], 30)).toEqual([]);
  });
});

