/**
 * Converte duração ISO 8601 (ex: PT1H2M3S, PT45M, PT30S, P1DT2H) para segundos.
 * Documentado na Seção 11.2 do documento de arquitetura.
 */
export function duracaoIsoParaSegundos(iso: string): number {
  if (!iso || typeof iso !== "string") return 0;

  const match = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso.trim());
  if (!match) return 0;

  const [, d = "0", h = "0", min = "0", s = "0"] = match;
  return (
    Number(d) * 86400 +
    Number(h) * 3600 +
    Number(min) * 60 +
    Number(s)
  );
}

/**
 * Converte segundos para minutos arredondando para cima (teto).
 * Essencial para que frações de minuto reservem o tempo necessário na fila.
 */
export function segundosParaMinutosCeil(segundos: number): number {
  if (segundos <= 0) return 0;
  return Math.ceil(segundos / 60);
}

/**
 * Formata segundos no formato legível mm:ss ou hh:mm:ss
 */
export function formatarSegundos(segundos: number): string {
  const total = Math.max(0, Math.floor(segundos));
  const horas = Math.floor(total / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segs = total % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (horas > 0) {
    return `${horas}:${pad(minutos)}:${pad(segs)}`;
  }
  return `${pad(minutos)}:${pad(segs)}`;
}

