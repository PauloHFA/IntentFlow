import { describe, it, expect } from "vitest";
import { CATALOGO_DISCIPLINAS, buscarVideosCatalogo } from "../catalogo";

describe("Catálogo de Disciplinas e Playlists Dinâmicas", () => {
  it("contém disciplinas essenciais incluindo Geografia, Inglês, Física, etc.", () => {
    const ids = CATALOGO_DISCIPLINAS.map((d) => d.id);
    expect(ids).toContain("geografia");
    expect(ids).toContain("ingles");
    expect(ids).toContain("fisica");
    expect(ids).toContain("biologia");
    expect(ids).toContain("historia");
    expect(ids).toContain("tecnologia");
  });

  it("retorna vídeos de Geografia ao pesquisar por 'geografia' ou 'placas tectônicas'", () => {
    const resultado = buscarVideosCatalogo("geografia");
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado[0].titulo.toLowerCase()).toContain("geografia");
  });

  it("retorna vídeos de Física ao pesquisar por 'leis de newton'", () => {
    const resultado = buscarVideosCatalogo("newton física");
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado[0].titulo.toLowerCase()).toContain("newton");
  });

  it("retorna vídeos de Inglês ao pesquisar por 'conversação em inglês'", () => {
    const resultado = buscarVideosCatalogo("inglês conversação");
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado[0].tags).toContain("ingles");
  });
});

