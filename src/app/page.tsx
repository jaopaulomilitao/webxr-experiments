'use client';

import HitModel from "@/components/HitModel";
import InfoBoard from "@/components/InfoBoard";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useCallback, useState } from "react";
import ButtonModel from "@/components/ButtonModel";

export default function Home() {
  // Tipando o estado corretamente para aceitar um nó HTMLElement ou null
  const [overlayContent, setOverlayContent] = useState<HTMLElement | null>(null);

  const [currentModel, setCurrentModel] = useState<"Model1" | "Model2" | "Model3">("Model1");

  const handleModelChange = (model: "Model1" | "Model2" | "Model3") => {
    setCurrentModel(model);
    // alert(`Modelo selecionado: ${model}`);
  };


  // Tipando o callback para aceitar um HTMLElement ou null
  const interfaceRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setOverlayContent(node);
    }
  }, []); // Correção: adicionado array vazio de dependências

  return (
    <>
      {/* Contêiner para posicionar o ARButton */}

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
          <HitModel currentModelName={currentModel} />
        </XR>
      </Canvas>
      {/* A interface de sobreposição (overlay) */}
      <div ref={interfaceRef} className="absolute inset-0 z-30 bottom-12 text-white p-10">
        {/* A interface de sobreposição (overlay) */}
        <InfoBoard className="mb-8" />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 w-full transition-all flex flex-row justify-center gap-2 p-4 px-12">
          <ButtonModel label="Coração" onClick={() => handleModelChange("Model1")} />
          <ButtonModel label="Membrana Celular" onClick={() => handleModelChange("Model2")} />
          <ButtonModel label="Propulsor Eletromagnético" onClick={() => handleModelChange("Model3")} />
        </div>
      </div>
    </>
  );
}