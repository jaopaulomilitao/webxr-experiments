import React, { useState, useRef } from 'react';
import { useXREvent } from '@react-three/xr';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

type FuseCursorProps = {
    fuseTime?: number; // Tempo necessário para completar o fusor, em ms.
    onFuseComplete?: () => void; // Callback quando o fusor completa.
};

const FuseCursor: React.FC<FuseCursorProps> = ({ fuseTime = 2000, onFuseComplete }) => {
    const [progress, setProgress] = useState(0);
    const startTimeRef = useRef<number | null>(null);
    const meshRef = useRef<Mesh>(null);

    useXREvent('selectstart', () => {
        startTimeRef.current = performance.now();
    });

    useXREvent('selectend', () => {
        startTimeRef.current = null;
        setProgress(0);
    });

    useFrame(() => {
        if (startTimeRef.current !== null) {
            const elapsedTime = performance.now() - startTimeRef.current;
            const newProgress = Math.min(elapsedTime / fuseTime, 1); // Calcula o progresso.
            setProgress(newProgress);

            if (newProgress >= 1) {
                if (onFuseComplete) onFuseComplete();
                startTimeRef.current = null; // Reseta para evitar múltiplos callbacks.
                setProgress(0);
            }
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -0.5]}>
            <circleGeometry args={[0.05, 32]} />
            <meshBasicMaterial color="white" transparent opacity={0.5} />
            <mesh>
                <circleGeometry args={[0.05, 32, 0, Math.PI * 2 * progress]} />
                <meshBasicMaterial color="blue" />
            </mesh>
        </mesh>
    );
};

export default FuseCursor;
