export interface CapituloVideo {
  tempoSegundos: number;
  tempoFormatado: string;
  titulo: string;
}

/**
 * Converte string de timestamp como "0:00", "04:12" ou "1:02:03" para segundos.
 */
function timestampParaSegundos(ts: string): number {
  const partes = ts.split(":").map(Number);
  if (partes.length === 2) {
    const [min, seg] = partes;
    return min * 60 + seg;
  }
  if (partes.length === 3) {
    const [h, min, seg] = partes;
    return h * 3600 + min * 60 + seg;
  }
  return 0;
}

/**
 * Extrai capítulos da descrição de um vídeo do YouTube.
 * Regras da Seção 11.3:
 * - Procurar timestamps (0:00, 12:34, 1:02:03) no início da linha (ou precedidos de traço).
 * - Exigir ao menos 3 capítulos válidos.
 * - O primeiro capítulo deve iniciar em 0:00 (tempo 0).
 */
export function extrairCapitulos(descricao: string): CapituloVideo[] {
  if (!descricao || typeof descricao !== "string") {
    return [];
  }

  const linhas = descricao.split(/\r?\n/);
  const capitulos: CapituloVideo[] = [];

  // Regex para identificar timestamps como:
  // "0:00 Intro" ou "00:00 - Introdução" ou "[01:23] Tema"
  const regexTimestamp = /^(?:\[|\()?(\d{1,2}:\d{2}(?::\d{2})?)(?:\]|\))?\s*[-–—:]?\s*(.+)$/;

  for (const linha of linhas) {
    const linhaTrim = linha.trim();
    const match = regexTimestamp.exec(linhaTrim);
    if (match) {
      const [, timestampStr, tituloRaw] = match;
      const segundos = timestampParaSegundos(timestampStr);
      const titulo = tituloRaw.trim();

      if (titulo.length > 0) {
        capitulos.push({
          tempoSegundos: segundos,
          tempoFormatado: timestampStr,
          titulo,
        });
      }
    }
  }

  // Validação das regras do YouTube para capítulos:
  // 1. Ao menos 3 capítulos
  // 2. Primeiro capítulo em 0s (0:00)
  if (capitulos.length < 3) {
    return [];
  }

  if (capitulos[0].tempoSegundos !== 0) {
    return [];
  }

  // Garante que os capítulos estão em ordem estritamente crescente
  for (let i = 1; i < capitulos.length; i++) {
    if (capitulos[i].tempoSegundos <= capitulos[i - 1].tempoSegundos) {
      return [];
    }
  }

  return capitulos;
}

