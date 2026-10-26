export interface RegistroCota {
  diaPt: string; // YYYY-MM-DD no fuso de Los Angeles (Pacific Time)
  metodo: string;
  unidades: number;
  timestamp: number;
}

export interface StatusCota {
  limiteDiario: number;
  consumoHoje: number;
  restante: number;
  porcentagemConsumida: number;
  tetoAlcancado: boolean;
  diaPt: string;
}

export class QuotaExceededError extends Error {
  constructor(message = "Teto de segurança de cota da YouTube API atingido.") {
    super(message);
    this.name = "QuotaExceededError";
  }
}

/**
 * Obtém a data corrente no fuso horário do Pacífico (PT - Pacific Time),
 * onde a cota da Google Cloud / YouTube API é renovada à meia-noite.
 */
export function obterDiaPacifico(data: Date = new Date()): string {
  // Fuso 'America/Los_Angeles'
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(data);
}

export class YouTubeQuotaManager {
  private registros: RegistroCota[] = [];
  private limiteDiario: number;
  private tetoSegurancaRatio: number; // ex: 0.80 para 80%

  constructor(
    limiteDiario = Number(process.env.YOUTUBE_QUOTA_DAILY_LIMIT ?? 10000),
    tetoSegurancaRatio = Number(process.env.YOUTUBE_QUOTA_SAFETY_THRESHOLD ?? 0.8)
  ) {
    this.limiteDiario = limiteDiario;
    this.tetoSegurancaRatio = tetoSegurancaRatio;
  }

  /**
   * Calcula o consumo acumulado no dia de referência (PT).
   */
  obterConsumoDia(diaPt: string = obterDiaPacifico()): number {
    return this.registros
      .filter((r) => r.diaPt === diaPt)
      .reduce((sum, r) => sum + r.unidades, 0);
  }

  /**
   * Retorna o status atualizado do consumo de cota.
   */
  obterStatus(diaPt: string = obterDiaPacifico()): StatusCota {
    const consumoHoje = this.obterConsumoDia(diaPt);
    const limiteSeguro = Math.floor(this.limiteDiario * this.tetoSegurancaRatio);
    const restante = Math.max(0, this.limiteDiario - consumoHoje);
    const porcentagemConsumida = Number(
      ((consumoHoje / this.limiteDiario) * 100).toFixed(1)
    );

    return {
      limiteDiario: this.limiteDiario,
      consumoHoje,
      restante,
      porcentagemConsumida,
      tetoAlcancado: consumoHoje >= limiteSeguro,
      diaPt,
    };
  }

  /**
   * Tenta reservar cota para uma requisição.
   * Lança QuotaExceededError se a chamada ultrapassar o teto interno de segurança.
   */
  async reservar(metodo: string, unidades: number): Promise<void> {
    const diaPt = obterDiaPacifico();
    const consumoHoje = this.obterConsumoDia(diaPt);
    const limiteSeguro = Math.floor(this.limiteDiario * this.tetoSegurancaRatio);

    if (consumoHoje + unidades > limiteSeguro) {
      throw new QuotaExceededError(
        `Operação cancelada: atingiria ${consumoHoje + unidades} unidades, excedendo o teto de segurança de ${limiteSeguro} unidades (${(this.tetoSegurancaRatio * 100)}% da cota diária).`
      );
    }

    this.registros.push({
      diaPt,
      metodo,
      unidades,
      timestamp: Date.now(),
    });
  }

  /**
   * Limpa registros antigos para economizar memória (mantém apenas os últimos 7 dias)
   */
  purgarRegistrosAntigos(diasParaManter = 7): void {
    const corte = Date.now() - diasParaManter * 24 * 60 * 60 * 1000;
    this.registros = this.registros.filter((r) => r.timestamp >= corte);
  }

  listarRegistros(): RegistroCota[] {
    return [...this.registros];
  }
}

export const youtubeQuotaManager = new YouTubeQuotaManager();

