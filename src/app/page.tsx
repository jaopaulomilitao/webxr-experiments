'use client';

import HitModel from "@/components/HitModel";
import InfoBoard from "@/components/InfoBoard";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useCallback, useState } from "react";

export default function Home() {
  // Tipando o estado corretamente para aceitar um nó HTMLElement ou null
  const [overlayContent, setOverlayContent] = useState<HTMLElement | null>(null);

  // Tipando o callback para aceitar um HTMLElement ou null
  const interfaceRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setOverlayContent(node);
    }
  }, []); // Correção: adicionado array vazio de dependências

  return (
    <>
      {/* ARButton precisa ter o domOverlay com a referência correta */}
      {overlayContent && (
        <ARButton
          sessionInit={{
            requiredFeatures: ["hit-test"],
            optionalFeatures: ["dom-overlay"],
            domOverlay: { root: overlayContent },
          }}
        />
      )}

      <Canvas>
        {/* Os controles de órbita podem ser descomentados se forem necessários */}
        {/* <OrbitControls /> */}

        <XR>
          {/* A luz ambiente pode ser descomentada se necessária */}
          {/* <ambientLight intensity={0.5} /> */}
          <HitModel />
        </XR>
      </Canvas>
      {/* A interface de sobreposição (overlay) */}
      <InfoBoard ref={interfaceRef} />
    </>
  );
}
