"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface Props {
  mp4: string;
  webm: string;
  poster: string;
  label: string;
}

/** Vídeo de detalhe: só carrega perto da tela, toca ao entrar e pausa ao sair. */
export function DetailVideo({ mp4, webm, poster, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [load, setLoad] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          el.muted = true;
          el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: 0.3, rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!load || !el) return;
    el.load();
    el.muted = true;
    el.play().catch(() => undefined);
  }, [load]);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      width={960}
      height={540}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
    >
      {load && !failed && !reduce && (
        <>
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" onError={() => setFailed(true)} />
        </>
      )}
    </video>
  );
}
