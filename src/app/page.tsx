'use client';

import HitModel from "@/components/HitModel";
import InfoBoard from "@/components/InfoBoard";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useCallback, useState } from "react";
import ButtonModel from "@/components/ButtonModel";
import { InfoProvider } from "@/context/InfoContext";
import { OrbitControls } from "@react-three/drei";

export default function Home() {
  const [overlayContent, setOverlayContent] = useState<HTMLElement | null>(null);
  const [currentModel, setCurrentModel] = useState<"Model1" | "Model2" | "Model3">("Model1");


  const handleModelChange = (model: "Model1" | "Model2" | "Model3") => {
    setCurrentModel(model);
  };

  const interfaceRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) setOverlayContent(node);
  }, []);

  return (
    <InfoProvider>
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
        <OrbitControls />
        <XR>
          <HitModel currentModelName={currentModel} />
        </XR>
      </Canvas>

      <div ref={interfaceRef} className="absolute inset-0 z-30 bottom-12 text-white p-10">
        <InfoBoard className="mb-8" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 w-full transition-all flex flex-row justify-center gap-2 p-4 px-12">
          <ButtonModel label="Coração" onClick={() => handleModelChange("Model1")} />
          <ButtonModel label="Membrana Celular" onClick={() => handleModelChange("Model2")} />
          <ButtonModel label="Propulsor Eletromagnético" onClick={() => handleModelChange("Model3")} />
        </div>
      </div>
    </InfoProvider>
  );
}
