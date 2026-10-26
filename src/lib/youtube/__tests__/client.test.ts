import { describe, it, expect, beforeEach } from "vitest";
import { ytGet } from "../client";
import { youtubeCache } from "../../cache/youtubeCache";
import { youtubeQuotaManager, QuotaExceededError } from "../quota";

describe("YouTube Client (ytGet) e Gerenciador de Cota", () => {
  beforeEach(() => {
    youtubeCache.limpar();
    delete process.env.YOUTUBE_API_KEY;
  });

  it("retorna dados de canal mock com segurança quando sem chave configurada", async () => {
    const dados = await ytGet<any>(
      "channels",
      { forHandle: "@GoogleDevelopers", part: "snippet,contentDetails" },
      1
    );

    expect(dados).toBeDefined();
    expect(dados.items).toHaveLength(1);
    expect(dados.items[0].snippet.title).toBe("Google Developers");
  });

  it("utiliza cache para chamadas subsequentes com os mesmos parâmetros", async () => {
    const d1 = await ytGet<any>(
      "channels",
      { forHandle: "@react", part: "snippet,contentDetails" },
      1
    );
    expect(d1.items[0].snippet.title).toContain("React");

    // Segunda chamada deve vir do cache
    const d2 = await ytGet<any>(
      "channels",
      { forHandle: "@react", part: "snippet,contentDetails" },
      1
    );
    expect(d2).toEqual(d1);
  });

  it("interrompe chamadas e previne estouro quando atinge o teto de segurança da cota", async () => {
    const testQuota = new (youtubeQuotaManager.constructor as any)(100, 0.8); // 80 unidades de teto seguro
    await testQuota.reservar("channels", 50); // total: 50

    // Tentar gastar mais 40 (total seria 90 > 80)
    await expect(testQuota.reservar("channels", 40)).rejects.toThrow(
      QuotaExceededError
    );
  });
});

