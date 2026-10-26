"use client";

import React, { useEffect, useRef } from "react";

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
  });
}

export function YouTubePlayer({
  videoId,
  onEstado,
  onPlayerPronto,
}: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    let ativo = true;

    carregarApiYouTube().then(() => {
      if (!ativo || !containerRef.current) return;

      // Limpa player anterior se houver
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
      }

      const elementoAlvo = document.createElement("div");
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(elementoAlvo);

      playerRef.current = new window.YT.Player(elementoAlvo, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0, // Sem autoplay conforme políticas
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
        },
      });
    });

    return () => {
      ativo = false;
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, [videoId]);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-md">
      {/* Container oficial do Iframe - sem sobreposições sobre os controles ou tela */}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}

