import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useRef, useState } from "react";
import * as THREE from "three"; // Import necessário para tipos como Vector3, Quaternion e Object3D
import Model from "./Model";

type ModelData = {
    position: THREE.Vector3;
    id: number;
};

const HitModel: React.FC = (ref: any) => {
    const reticleRef = useRef<THREE.Mesh>(null); // Definir o tipo de ref
    const [models, setModels] = useState<ModelData[]>([]); // Usar o tipo para model data

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
                    <Model key={id} position={position} ref={ref} />
                ))}
            {isPresenting && (
                <Interactive onSelect={placeModel}>
                    <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
                        <ringGeometry args={[0.1, 0.25, 32]} />
                        <meshStandardMaterial color={"white"} />
                    </mesh>
                </Interactive>
            )}

            {!isPresenting && <Model />}
        </>
    );
};

export default HitModel;
