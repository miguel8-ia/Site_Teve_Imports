"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/** Carrega o Three.js somente após o conteúdo principal e se o aparelho permitir. */
export function ParticlesLoader() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const onUnsupported = useCallback(() => setFailed(true), []);

  useEffect(() => {
    if (reduce) return;
    const nav = navigator as NavigatorWithConnection;
    if (nav.connection?.saveData) return;
    setMobile(window.matchMedia("(max-width: 767px)").matches);
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const id = idle ? idle(() => setReady(true)) : window.setTimeout(() => setReady(true), 1200);
    return () => {
      if (!idle) window.clearTimeout(id);
    };
  }, [reduce]);

  if (!ready || failed || reduce) return null;
  return <ParticleField count={mobile ? 220 : 650} maxPixelRatio={mobile ? 1 : 1.5} onUnsupported={onUnsupported} />;
}
