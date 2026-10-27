import { describe, it, expect } from "vitest";
import { CATALOGO_DISCIPLINAS, buscarVideosCatalogo } from "../catalogo";
import { montarFila } from "@/lib/algorithms/mochila";

describe("Catálogo de Disciplinas e Playlists Dinâmicas", () => {
  it("contém todas as 10 matérias essenciais (Matemática, Português, Física, Química, Biologia, Geografia, História, Inglês, Filosofia, Tecnologia)", () => {
    const ids = CATALOGO_DISCIPLINAS.map((d) => d.id);
    const materiasEsperadas = [
      "matematica",
      "portugues",
      "fisica",
      "quimica",
      "biologia",
      "geografia",
      "historia",
      "ingles",
      "filosofia",
      "tecnologia",
    ];

    for (const materia of materiasEsperadas) {
      expect(ids).toContain(materia);
    }
  });

  it("retorna vídeos de Geografia ao pesquisar por 'geografia' ou 'placas tectônicas'", () => {
    const resultado = buscarVideosCatalogo("geografia");
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado[0].disciplinaId).toBe("geografia");
    expect(resultado[0].tags).toContain("geografia");
  });

  it("garante que NENHUM vídeo no catálogo contém o ID do Despacito (kJQP7kiw5Fk)", () => {
    const todosVideos = CATALOGO_DISCIPLINAS.flatMap((d) => d.videos);
    for (const v of todosVideos) {
      expect(v.videoId).not.toBe("kJQP7kiw5Fk");
    }
  });

  it("retorna Introdução a Algoritmos (Gustavo Guanabara) e Fireship para Programação & Tech", () => {
    const videosTech = buscarVideosCatalogo("programação", "tecnologia");
    expect(videosTech.length).toBeGreaterThan(0);
    const ids = videosTech.map((v) => v.videoId);
    expect(ids).toContain("8mei6uVttho"); // Curso em Vídeo - Algoritmos
    expect(ids).toContain("Tn6-PIqc4UM"); // Fireship - React in 100s
  });

  it("garante isolamento estrito: nenhum vídeo de outra disciplina vaza na busca por Geografia", () => {
    const resultado = buscarVideosCatalogo("Geografia física, placas tectônicas e relevo", "geografia");
    expect(resultado.length).toBeGreaterThan(0);
    // Todos os vídeos retornados DEVEM ser estritamente de geografia
    for (const video of resultado) {
      expect(video.disciplinaId).toBe("geografia");
      expect(video.tags).not.toContain("ingles");
    }
  });

  it("evita contaminação de playlist mesmo com orçamento alto (80 min) para Geografia", () => {
    const videosGeo = buscarVideosCatalogo("geografia", "geografia");
    const candidatos = videosGeo.map((v) => ({
      id: v.videoId,
      videoId: v.videoId,
      titulo: v.titulo,
      canalNome: v.canalNome,
      miniaturaUrl: v.miniaturaUrl,
      duracaoMin: v.duracaoMin,
      valor: 100,
    }));

    // Simula a fila com 80 minutos
    const fila = montarFila(candidatos, 80, { maxVideos: 6 });
    expect(fila.length).toBeGreaterThan(0);

    // Garante que nenhum vídeo de inglês ou outra matéria está na fila
    for (const item of fila) {
      expect((item.canalNome || "").toLowerCase()).not.toContain("bbc");
      expect((item.canalNome || "").toLowerCase()).not.toContain("lucy");
      expect((item.titulo || "").toLowerCase()).not.toContain("phrasal verbs");
    }
  });

  it("retorna vídeos de Física ao pesquisar por 'gravidade física'", () => {
    const resultado = buscarVideosCatalogo("gravidade física");
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado[0].disciplinaId).toBe("fisica");
  });

  it("retorna vídeos de Inglês ao pesquisar por 'conversação em inglês'", () => {
    const resultado = buscarVideosCatalogo("inglês conversação");
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado[0].tags).toContain("ingles");
  });

  it("retorna vídeos de Matemática ao selecionar a disciplina 'matematica'", () => {
    const resultado = buscarVideosCatalogo("funções", "matematica");
    expect(resultado.length).toBeGreaterThan(0);
    for (const v of resultado) {
      expect(v.disciplinaId).toBe("matematica");
    }
  });
});


