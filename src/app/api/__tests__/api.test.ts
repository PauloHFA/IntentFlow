import { describe, it, expect, beforeEach } from "vitest";
import { GET as getCota } from "../saude/cota/route";
import { GET as getCanais, POST as postCanais } from "../canais/route";
import { POST as postSessoes } from "../sessoes/route";
import { POST as postNotas } from "../notas/route";
import { GET as getRevisaoHoje } from "../revisao/hoje/route";
import { POST as postRevisaoCartao } from "../revisao/[cartaoId]/route";
import { db } from "@/lib/db/store";

describe("Rotas da API Interna do IntentFlow", () => {
  it("GET /api/saude/cota retorna estado de cota e cache", async () => {
    const res = await getCota();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.status).toBe("ok");
    expect(data.cota).toBeDefined();
    expect(data.cota.limiteDiario).toBeGreaterThan(0);
  });

  it("GET /api/canais retorna lista inicial de canais e intenções", async () => {
    const res = await getCanais();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.canais.length).toBeGreaterThan(0);
    expect(data.intencoes.length).toBeGreaterThan(0);
  });

  it("POST /api/sessoes cria uma sessão e monta a fila pela Mochila 0/1", async () => {
    const candidatos = [
      { videoId: "vid1", duracaoMin: 15, valor: 30, titulo: "Vídeo A" },
      { videoId: "vid2", duracaoMin: 20, valor: 50, titulo: "Vídeo B" },
      { videoId: "vid3", duracaoMin: 35, valor: 40, titulo: "Vídeo C" },
    ];

    const req = new Request("http://localhost/api/sessoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        objetivo: "Aprender TypeScript e React",
        minutosPlanejados: 35,
        candidatos,
      }),
    });

    const res = await postSessoes(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.sessao).toBeDefined();
    expect(data.sessao.status).toBe("em_andamento");
    // Com 35 minutos disponíveis: vid1(15m, 30) + vid2(20m, 50) = 35m, valor 80 (ótimo)
    expect(data.sessao.itens.length).toBe(2);
    expect(data.sessao.itens.map((i: any) => i.videoId)).toEqual(
      expect.arrayContaining(["vid1", "vid2"])
    );
  });

  it("POST /api/notas permite criar nota com cartão de revisão", async () => {
    const req = new Request("http://localhost/api/notas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videoId: "gd-vid-1",
        tempoS: 250,
        texto: "Largest Contentful Paint mede a percepção do usuário sobre o carregamento visual principal",
        criarCartao: true,
        frenteCartao: "O que o LCP mede?",
        versoCartao: "A velocidade em que o elemento de conteúdo principal da página fica visível",
      }),
    });

    const res = await postNotas(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.nota).toBeDefined();
    expect(data.nota.tempoS).toBe(250);
    expect(data.cartao).toBeDefined();
    expect(data.cartao.facilidade).toBe(2.5);
  });

  it("POST /api/revisao/[cartaoId] atualiza o cartão com o algoritmo SM-2", async () => {
    const cartao = db.cartoes[0];
    expect(cartao).toBeDefined();

    const req = new Request(`http://localhost/api/revisao/${cartao.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qualidade: 5 }),
    });

    const res = await postRevisaoCartao(req, {
      params: Promise.resolve({ cartaoId: cartao.id }),
    });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.cartao.repeticoes).toBe(1);
    expect(data.cartao.intervaloDias).toBe(1);
  });
});

