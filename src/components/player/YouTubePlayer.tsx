"use client";

import React, { useEffect, useRef, useState } from "react";

interface YouTubePlayerProps {
  videoId: string;
  onEstado?: (estado: number, posicaoS: number) => void;
  onPlayerPronto?: (playerApi: YouTubePlayerInstance) => void;
}

export interface YouTubePlayerInstance {
  getCurrentTime: () => number;
  seekTo: (segundos: number, permitirSeek: boolean) => void;
  playVideo: () => void;
  pauseVideo: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

function carregarApiYouTube(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return;
    if (window.YT && window.YT.Player) {
      return resolve();
    }

    const scriptExistente = document.getElementById("yt-iframe-api");
    if (!scriptExistente) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      const primeiroScript = document.getElementsByTagName("script")[0];
      if (primeiroScript && primeiroScript.parentNode) {
        primeiroScript.parentNode.insertBefore(tag, primeiroScript);
      } else {
        document.head.appendChild(tag);
      }
    }

    const anterior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (anterior) anterior();
      resolve();
    };

    // Timeout de segurança para resolver caso a API já esteja em memória
    setTimeout(() => {
      if (window.YT && window.YT.Player) {
        resolve();
      }
    }, 1500);
  });
}

export function YouTubePlayer({
  videoId,
  onEstado,
  onPlayerPronto,
}: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [usandoFallbackIframe, setUsandoFallbackIframe] = useState(false);

  useEffect(() => {
    let ativo = true;

    carregarApiYouTube().then(() => {
      if (!ativo || !containerRef.current) return;

      if (!window.YT?.Player) {
        // Se a API externa do YouTube demorar, ativa o embed direto oficial
        setUsandoFallbackIframe(true);
        return;
      }

      try {
        if (playerRef.current?.destroy) {
          playerRef.current.destroy();
        }
      } catch {
        // ignore
      }

      const elementoAlvo = document.createElement("div");
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(elementoAlvo);

      try {
        playerRef.current = new window.YT.Player(elementoAlvo, {
          videoId,
          width: "100%",
          height: "100%",
          host: "https://www.youtube-nocookie.com", // Modo privacidade avançada do YouTube
          playerVars: {
            autoplay: 0,
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
          },
          events: {
            onReady: () => {
              if (onPlayerPronto && playerRef.current) {
                onPlayerPronto(playerRef.current);
              }
            },
            onStateChange: (evento: { data: number }) => {
              const pos = playerRef.current?.getCurrentTime?.() ?? 0;
              if (onEstado) {
                onEstado(evento.data, pos);
              }
            },
            onError: () => {
              setUsandoFallbackIframe(true);
            },
          },
        });
      } catch (err) {
        console.warn("Falha ao inicializar player via JS API, usando iframe direto", err);
        setUsandoFallbackIframe(true);
      }
    });

    return () => {
      ativo = false;
      try {
        playerRef.current?.destroy?.();
      } catch {
        // ignore
      }
    };
  }, [videoId]);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-xl border border-slate-800">
      {usandoFallbackIframe ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=0&playsinline=1&rel=0`}
          title="YouTube Video Player"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div ref={containerRef} className="w-full h-full" />
      )}
    </div>
  );
}
