export interface CacheItem<T = unknown> {
  chave: string;
  payload: T;
  criadoEm: number;  // timestamp ms
  expiraEm: number;  // timestamp ms
}

export const LIMITE_MAXIMO_RETENCAO_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias em ms

export class YouTubeCacheStore {
  private memoria = new Map<string, CacheItem>();

  /**
   * Salva dado no cache garantindo que o TTL nunca exceda 30 dias.
   */
  set<T>(chave: string, payload: T, ttlSegundos: number): void {
    const agora = Date.now();
    const ttlMs = Math.min(ttlSegundos * 1000, LIMITE_MAXIMO_RETENCAO_MS);

    this.memoria.set(chave, {
      chave,
      payload,
      criadoEm: agora,
      expiraEm: agora + ttlMs,
    });
  }

  /**
   * Obtém dado do cache se não estiver expirado e se tiver menos de 30 dias de criação.
   */
  get<T>(chave: string, agora: number = Date.now()): T | null {
    const item = this.memoria.get(chave);
    if (!item) return null;

    // Se passou do TTL ou violou o limite máximo de 30 dias, descarta imediatamente
    if (agora >= item.expiraEm || agora - item.criadoEm > LIMITE_MAXIMO_RETENCAO_MS) {
      this.memoria.delete(chave);
      return null;
    }

    return item.payload as T;
  }

  /**
   * Rotina de expurgo: varre o cache e remove entradas expiradas ou com mais de 30 dias.
   */
  executarExpurgo(agora: number = Date.now()): number {
    let removidos = 0;
    for (const [chave, item] of this.memoria.entries()) {
      if (agora >= item.expiraEm || agora - item.criadoEm > LIMITE_MAXIMO_RETENCAO_MS) {
        this.memoria.delete(chave);
        removidos++;
      }
    }
    return removidos;
  }

  /**
   * Retorna todas as entradas para auditoria e testes de conformidade.
   */
  todasEntradas(): CacheItem[] {
    return Array.from(this.memoria.values());
  }

  tamanho(): number {
    return this.memoria.size;
  }

  limpar(): void {
    this.memoria.clear();
  }
}

export const youtubeCache = new YouTubeCacheStore();

