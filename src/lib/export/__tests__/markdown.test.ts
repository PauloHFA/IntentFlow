import { describe, it, expect } from "vitest";
import { gerarMarkdownExport } from "../markdown";

describe("Exportador de Notas em Markdown (RF-14)", () => {
  it("gera cabeçalho, sessões, notas com links e cartões SM-2 estruturados", () => {
    const dadosMock = {
      usuarioNome: "Maria Dev",
      dataExportacao: "2026-10-25T23:00:00Z",
      sessoes: [
        {
          id: "ses-1",
          usuarioId: "u1",
          objetivo: "Dominar Hooks do React",
          minutosPlanejados: 45,
          inicio: "2026-10-25T14:00:00Z",
          status: "concluida" as const,
          reflexao: "Aprendi que useEffect serve para sincronização e não para disparar ações de clique.",
          itens: [
            {
              id: "item-1",
              sessaoId: "ses-1",
              videoId: "react-vid-1",
              ordem: 1,
              status: "concluido" as const,
              segundosAssistidos: 1200,
              titulo: "Dominando useEffect",
              duracaoMin: 20,
              canalNome: "React Community",
            },
          ],
        },
      ],
      notas: [
        {
          id: "nota-1",
          usuarioId: "u1",
          videoId: "react-vid-1",
          tempoS: 240, // 4 minutos
          texto: "Dependências vazias [] significam que o efeito roda apenas na montagem.",
          etiquetas: ["react", "hooks"],
          criadoEm: "2026-10-25T14:04:00Z",
        },
      ],
      cartoes: [
        {
          id: "card-1",
          notaId: "nota-1",
          frente: "O que o array de dependências vazio [] indica no useEffect?",
          verso: "Que o efeito é executado apenas uma vez após a montagem inicial do componente.",
          facilidade: 2.5,
          intervaloDias: 6,
          repeticoes: 2,
          proximaEm: "2026-10-31T00:00:00Z",
        },
      ],
      canais: [
        {
          id: "cn-1",
          usuarioId: "u1",
          channelId: "UCreact123456789",
          titulo: "React Community",
          intencaoId: "int-1",
          prioridade: 5,
        },
      ],
    };

    const markdown = gerarMarkdownExport(dadosMock);

    expect(markdown).toContain("# IntentFlow — Exportação de Conhecimento e Notas");
    expect(markdown).toContain("Maria Dev");
    expect(markdown).toContain("Dominar Hooks do React");
    expect(markdown).toContain("https://www.youtube.com/watch?v=react-vid-1&t=240s");
    expect(markdown).toContain("04:00");
    expect(markdown).toContain("O que o array de dependências vazio [] indica no useEffect?");
    expect(markdown).toContain("Fator de Facilidade: 2.5");
  });
});

