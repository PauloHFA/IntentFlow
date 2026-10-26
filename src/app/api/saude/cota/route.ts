import { NextResponse } from "next/server";
import { youtubeQuotaManager } from "@/lib/youtube/quota";
import { youtubeCache } from "@/lib/cache/youtubeCache";

export async function GET() {
  const statusCota = youtubeQuotaManager.obterStatus();
  const tamanhoCache = youtubeCache.tamanho();

  return NextResponse.json({
    status: "ok",
    cota: statusCota,
    cache: {
      entradasAtivas: tamanhoCache,
    },
    modoOfflineMock: !process.env.YOUTUBE_API_KEY,
  });
}

