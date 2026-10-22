"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Para trocar o vídeo do hero, edite apenas este objeto
 * (arquivos em /public/assets/videos).
 */
export const heroMedia = {
  desktop: { mp4: "/assets/videos/hero-headset.mp4", webm: "/assets/videos/hero-headset.webm" },
  mobile: { mp4: "/assets/videos/hero-headset-mobile.mp4", webm: "/assets/videos/hero-headset-mobile.webm" },
  poster: "/assets/videos/hero-poster.webp",
  posterMobile: "/assets/videos/hero-poster-mobile.webp",
  alt: "Headset gamer em vista explodida, com as peças se separando e voltando ao lugar",
} as const;

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

export function HeroVideo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"desktop" | "mobile" | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const nav = navigator as NavigatorWithConnection;
    if (nav.connection?.saveData) return;
    setMode(window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop");
  }, [reduce]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !mode) return;
    v.muted = true;
    v.play().catch(() => setFailed(true));
    const onVis = () => {
      if (document.hidden) v.pause();
      else v.play().catch(() => undefined);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [mode]);

  const showVideo = mode && !failed;

  return (
    <div
      className={cn(
        "absolute overflow-hidden",
        // Mobile: vídeo 16:9 mais largo que a tela, fundido ao fundo escuro (sem cortar o produto).
        "left-1/2 top-[20svh] aspect-video w-[130%] -translate-x-1/2 [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_82%,transparent)]",
        // Desktop: preenche toda a área.
        "md:inset-0 md:left-0 md:top-0 md:aspect-auto md:w-full md:translate-x-0 md:[mask-image:none]",
      )}
      role="img"
      aria-label={heroMedia.alt}
    >
      <picture>
        <source media="(max-width: 767px)" srcSet={heroMedia.posterMobile} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroMedia.poster}
          alt=""
          width={1280}
          height={720}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {showVideo && (
        <video
          ref={ref}
          key={mode}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            playing ? "opacity-100" : "opacity-0",
          )}
          width={mode === "mobile" ? 854 : 1280}
          height={mode === "mobile" ? 480 : 720}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={mode === "mobile" ? heroMedia.posterMobile : heroMedia.poster}
          disablePictureInPicture
          tabIndex={-1}
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          onError={() => setFailed(true)}
        >
          <source src={heroMedia[mode!].webm} type="video/webm" />
          <source src={heroMedia[mode!].mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
