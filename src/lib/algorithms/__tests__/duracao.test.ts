import { describe, it, expect } from "vitest";
import {
  duracaoIsoParaSegundos,
  segundosParaMinutosCeil,
  formatarSegundos,
} from "../duracao";

describe("duracaoIsoParaSegundos", () => {
  it("converte formatos comuns do YouTube ISO 8601 para segundos", () => {
    expect(duracaoIsoParaSegundos("PT1H2M3S")).toBe(3723);
    expect(duracaoIsoParaSegundos("PT45M")).toBe(2700);
    expect(duracaoIsoParaSegundos("PT30S")).toBe(30);
    expect(duracaoIsoParaSegundos("PT1H")).toBe(3600);
    expect(duracaoIsoParaSegundos("P1DT2H3M4S")).toBe(86400 + 7200 + 180 + 4);
  });

  it("trata entradas vazias ou inválidas retornando 0", () => {
    expect(duracaoIsoParaSegundos("")).toBe(0);
    expect(duracaoIsoParaSegundos("invalido")).toBe(0);
    expect(duracaoIsoParaSegundos(null as any)).toBe(0);
  });
});

describe("segundosParaMinutosCeil", () => {
  it("arredonda para cima para reservar orçamento de tempo completo", () => {
    expect(segundosParaMinutosCeil(0)).toBe(0);
    expect(segundosParaMinutosCeil(1)).toBe(1);
    expect(segundosParaMinutosCeil(59)).toBe(1);
    expect(segundosParaMinutosCeil(60)).toBe(1);
    expect(segundosParaMinutosCeil(61)).toBe(2);
    expect(segundosParaMinutosCeil(125)).toBe(3);
  });
});

describe("formatarSegundos", () => {
  it("formata mm:ss e hh:mm:ss", () => {
    expect(formatarSegundos(0)).toBe("00:00");
    expect(formatarSegundos(75)).toBe("01:15");
    expect(formatarSegundos(3665)).toBe("1:01:05");
  });
});

