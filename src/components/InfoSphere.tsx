import * as THREE from "three";
import { useInfo } from "@/context/InfoContext";
import { Interactive } from "@react-three/xr";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const InfoSphere: React.FC<{ position: THREE.Vector3; info: string }> = ({ position, info }) => {
    const { setCurrentInformation } = useInfo();
    const sphereRef = useRef<THREE.Mesh>(null);

    const handleClick = () => {
        setCurrentInformation(info);
    };

    // Animação de pulsação
    useFrame(() => {
        if (sphereRef.current) {
            const scale = 1 + Math.sin(Date.now() * 0.003) * 0.1;
            sphereRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <Interactive onSelect={handleClick}>
            <mesh ref={sphereRef} position={position} scale={0.05}>
                {/* Esfera principal */}
                <sphereGeometry args={[0.02, 32, 32]} />
                <meshStandardMaterial color="blue" transparent={true} opacity={0.7} />
                {/* Borda */}
                <mesh>
                    <sphereGeometry args={[0.03, 32, 32]} />
                    <meshStandardMaterial
                        color="white"
                        transparent={true}
                        opacity={0.4}
                        side={THREE.BackSide} // A borda é desenhada na parte externa
                    />
                </mesh>
            </mesh>
        </Interactive>
    );
};

export default InfoSphere;
