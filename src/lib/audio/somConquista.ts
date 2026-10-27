/**
 * Reproduz um som suave e harmônico de celebração/conquista
 * usando a Web Audio API nativa do navegador (sem arquivos externos).
 */
export function tocarSomVitoria(): void {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    // Acorde alegre de celebração: Dó Maior (C5, E5, G5, C6)
    const notas = [523.25, 659.25, 783.99, 1046.5];
    const agora = ctx.currentTime;

    notas.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, agora + index * 0.1);

      // Volume inicial suave com decaimento exponencial orgânico
      gain.gain.setValueAtTime(0.0001, agora + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.2, agora + index * 0.1 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, agora + index * 0.1 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(agora + index * 0.1);
      osc.stop(agora + index * 0.1 + 0.65);
    });
  } catch (err) {
    // Falhas de autoplay ou áudio desabilitado no navegador são silenciosamente ignoradas
    console.debug("Web Audio API indisponível ou bloqueada:", err);
  }
}
