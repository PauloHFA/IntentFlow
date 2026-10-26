import { describe, it, expect, beforeEach } from "vitest";
import {
  YouTubeCacheStore,
  LIMITE_MAXIMO_RETENCAO_MS,
} from "../../cache/youtubeCache";

describe("Conformidade com Políticas do YouTube (RNF-01 e Limite de 30 Dias)", () => {
  let cache: YouTubeCacheStore;

  beforeEach(() => {
    cache = new YouTubeCacheStore();
  });

  it("não permite que o TTL ultrapasse o teto legal de 30 dias", () => {
    const agora = Date.now();
    // Tenta salvar com TTL absurdo de 100 dias (em segundos)
    const ttl100Dias = 100 * 24 * 60 * 60;
    cache.set("canal:teste", { title: "Canal Tech" }, ttl100Dias);

    const itens = cache.todasEntradas();
    expect(itens).toHaveLength(1);
    // Deve ser limitado a no máximo 30 dias a partir da criação
    expect(itens[0].expiraEm - itens[0].criadoEm).toBeLessThanOrEqual(
      LIMITE_MAXIMO_RETENCAO_MS
    );
  });

  it("recusa entregar e descarta dado se a idade do registro for superior a 30 dias", () => {
    const agora = Date.now();
    cache.set("video:123", { title: "Vídeo Antigo" }, 3600);

    // Simula passagem de 31 dias no futuro
    const trintaEUmDiasDepois = agora + 31 * 24 * 60 * 60 * 1000;

    const dado = cache.get("video:123", trintaEUmDiasDepois);
    expect(dado).toBeNull();
    // Deve ter sido apagado da memória
    expect(cache.tamanho()).toBe(0);
  });

  it("rotina de expurgo remove com sucesso entradas expiradas", () => {
    const agora = Date.now();
    // Item 1: expira em 1 hora
    cache.set("item1", { data: 1 }, 3600);
    // Item 2: expira em 2 horas
    cache.set("item2", { data: 2 }, 7200);

    // 1 hora e 1 segundo depois
    const umaHoraEDepois = agora + 3601 * 1000;
    const removidos = cache.executarExpurgo(umaHoraEDepois);

    expect(removidos).toBe(1);
    expect(cache.tamanho()).toBe(1);
    expect(cache.get("item2", umaHoraEDepois)).not.toBeNull();
  });

  it("auditoria: nenhuma entrada ativa no cache pode ter idade superior a 30 dias", () => {
    const agora = Date.now();
    const entradas = cache.todasEntradas();

    for (const item of entradas) {
      const idadeMs = agora - item.criadoEm;
      expect(idadeMs).toBeLessThanOrEqual(LIMITE_MAXIMO_RETENCAO_MS);
    }
  });
});

