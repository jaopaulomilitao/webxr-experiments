import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { Fragment, useRef, useState } from "react";
import * as THREE from "three"; // Import necessário para tipos como Vector3, Quaternion e Object3D
import Model1 from "./Model1";
import Model3 from "./Model3";
import Model2 from "./Model2";

type ModelData = {
    position: THREE.Vector3;
    id: number;
};

interface HitModelProps {
    currentModelName?: "Model1" | "Model2" | "Model3";
}

const HitModel: React.FC<HitModelProps> = ({ currentModelName = "Model1" }) => {
    const reticleRef = useRef<THREE.Mesh>(null);
    const [models, setModels] = useState<ModelData[]>([]);

    const { isPresenting } = useXR();

    useThree(({ camera }) => {
        if (!isPresenting) {
            camera.position.z = 3;
        }
    });

    useHitTest((hitMatrix: THREE.Matrix4) => {
        if (!reticleRef.current) return;

        hitMatrix.decompose(
            reticleRef.current.position,
            reticleRef.current.quaternion,
            reticleRef.current.scale
        );

        reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    });

    const placeModel = (e: any) => {
        if (!e.intersection?.object) return;

        const position = e.intersection.object.position.clone();
        const id = Date.now();
        setModels((prevModels) => [...prevModels, { position, id }]);
    };

    return (
        <>
            <OrbitControls />
            <ambientLight />
            {isPresenting &&
                models.map(({ position, id }) => (
                    <Fragment key={id}>
                        {currentModelName === "Model1" && <Model1 key={id} position={position} />}
                        {currentModelName === "Model2" && <Model2 key={id} position={position} />}
                        {currentModelName === "Model3" && <Model3 key={id} position={position} />}
                    </Fragment>
                ))}
            {isPresenting && (
                <Interactive onSelect={placeModel}>
                    <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
                        <ringGeometry args={[0.05, 0.08, 32]} />
                        <meshStandardMaterial color="white" opacity={0.5} transparent={true} />
                    </mesh>
                </Interactive>
            )}
            {!isPresenting && currentModelName === "Model1" && <Model1 />}
            {!isPresenting && currentModelName === "Model2" && (
                <Model2 />
            )}
            {!isPresenting && currentModelName === "Model3" && <Model3 />}
        </>
    );
};

export default HitModel;
