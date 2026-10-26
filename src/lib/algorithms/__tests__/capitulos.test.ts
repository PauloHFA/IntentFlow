import { describe, it, expect } from "vitest";
import { extrairCapitulos } from "../capitulos";

describe("extrairCapitulos", () => {
  it("extrai capítulos válidos com timestamps no início da linha", () => {
    const descricao = `
Neste vídeo vamos aprender Next.js do zero:
0:00 Introdução e Visão Geral
03:15 Configuração do Projeto
15:40 Rotas e App Router
1:02:10 Deploy e Considerações Finais

Links úteis abaixo:
https://github.com/exemplo
`;

    const capitulos = extrairCapitulos(descricao);
    expect(capitulos).toHaveLength(4);
    expect(capitulos[0]).toEqual({
      tempoSegundos: 0,
      tempoFormatado: "0:00",
      titulo: "Introdução e Visão Geral",
    });
    expect(capitulos[1].tempoSegundos).toBe(195);
    expect(capitulos[3].tempoSegundos).toBe(3730);
  });

  it("retorna lista vazia se houver menos de 3 capítulos", () => {
    const descricao = `
0:00 Intro
05:00 Desenvolvimento
`;
    expect(extrairCapitulos(descricao)).toEqual([]);
  });

  it("retorna lista vazia se o primeiro capítulo não iniciar em 0:00", () => {
    const descricao = `
01:00 Intro
05:00 Desenvolvimento
10:00 Conclusão
`;
    expect(extrairCapitulos(descricao)).toEqual([]);
  });

  it("trata descrições sem capítulos retornando array vazio", () => {
    expect(extrairCapitulos("Apenas texto sem nenhum carimbo de tempo")).toEqual([]);
    expect(extrairCapitulos("")).toEqual([]);
  });
});

