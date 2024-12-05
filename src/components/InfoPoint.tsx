'use client';

import { Html } from '@react-three/drei';
import { useState } from 'react';

type InfoPointProps = {
    position: [number, number, number];
    onClick: () => void;
    label: string;
};

export default function InfoPoint({ position, onClick, label }: InfoPointProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <mesh position={position} onClick={onClick}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color={hovered ? 'gray' : 'white'} />

            {/* Texto sobreposto com HTML */}
            {hovered && (
                <Html
                    position={[0, 0, 0]} // A posição do texto na tela 3D
                    center // O centro do texto será sempre centralizado
                    distanceFactor={10} // Determina a distância do objeto da câmera
                    style={{ pointerEvents: 'none' }} // Evita interações com o texto
                >
                    <div
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: '4px',
                            fontSize: '16px',
                            maxWidth: '200px',
                            textAlign: 'center',
                        }}
                    >
                        {label}
                    </div>
                </Html>
            )}

            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[0.05, 12, 12]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </mesh>
    );
}
