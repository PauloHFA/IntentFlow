import { describe, it, expect } from "vitest";
import {
  calcularStreak,
  avaliarGamificacao,
  XP_VALORES,
} from "../engine";

describe("Sistema de Gamificação e Aprendizado Deliberado", () => {
  it("calcula corretamente os pontos de experiência (XP)", () => {
    const sessoesMock: any[] = [
      {
        id: "s1",
        status: "concluida",
        inicio: "2026-10-26T10:00:00Z",
        objetivo: "Aprender inglês",
        reflexao: "Excelente sessão!",
        itens: [
          { videoId: "v1", segundosAssistidos: 600 }, // 10 min
          { videoId: "v2", segundosAssistidos: 600 }, // 10 min
        ],
      },
    ];

    const notasMock: any[] = [
      { id: "n1", tempoS: 120, texto: "Nota 1" },
      { id: "n2", tempoS: 300, texto: "Nota 2" },
    ];

    const revisoesMock: any[] = [
      { id: "r1", qualidade: 5 },
    ];

    const perfil = avaliarGamificacao({
      sessoes: sessoesMock,
      notas: notasMock,
      revisoes: revisoesMock,
    });

    // 20 min * 10 XP = 200
    // 1 sessao concluida = 50
    // 2 notas * 20 = 40
    // 1 revisao * 15 = 15
    // 1 reflexao = 75
    // Total = 380 XP
    expect(perfil.xpTotal).toBe(380);
    expect(perfil.nivelAtual).toBe(2); // Nível 2 começa em 250 XP
    expect(perfil.nivelTitulo).toBe("Explorador Focado");
  });

  it("desbloqueia os emblemas correspondentes ao atingir as metas", () => {
    const sessoesMock: any[] = [
      {
        id: "s1",
        status: "concluida",
        inicio: "2026-10-26T10:00:00Z",
        objetivo: "Inglês para viagens",
        reflexao: "Reflexão 1",
        itens: [{ videoId: "v1", segundosAssistidos: 3600 }], // 60 min
      },
      {
        id: "s2",
        status: "concluida",
        inicio: "2026-10-26T14:00:00Z",
        objetivo: "Inglês profissional",
        reflexao: "Reflexão 2",
        itens: [{ videoId: "v2", segundosAssistidos: 600 }],
      },
    ];

    const perfil = avaliarGamificacao({
      sessoes: sessoesMock,
      notas: [],
      revisoes: [],
    });

    const badgeHoraOuro = perfil.conquistas.find((c) => c.id === "hora_ouro");
    const badgePrimeira = perfil.conquistas.find((c) => c.id === "primeira_sessao");
    const badgePoliglota = perfil.conquistas.find((c) => c.id === "poliglota");
    const badgeFilosofo = perfil.conquistas.find((c) => c.id === "filosofo");

    expect(badgeHoraOuro?.desbloqueada).toBe(true);
    expect(badgePrimeira?.desbloqueada).toBe(true);
    expect(badgePoliglota?.desbloqueada).toBe(true);
    expect(badgeFilosofo?.desbloqueada).toBe(true);
  });

  it("calcula streak diário consecutivo de estudo", () => {
    const sessoesConcluidas: any[] = [
      { id: "s1", status: "concluida", inicio: "2026-10-26T10:00:00Z", itens: [] },
      { id: "s2", status: "concluida", inicio: "2026-10-25T10:00:00Z", itens: [] },
      { id: "s3", status: "concluida", inicio: "2026-10-24T10:00:00Z", itens: [] },
    ];

    const streak = calcularStreak(sessoesConcluidas);
    expect(streak).toBe(3);
  });
});

