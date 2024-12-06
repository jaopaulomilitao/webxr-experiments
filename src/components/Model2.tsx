'use client';

import { useGLTF, useAnimations } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';


export default function Model2({ position }: any) {
    const { scene, animations } = useGLTF('models/membrana.glb');
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        if (animations.length > 0) {
            const firstAnimation = animations[0]; // Pega a primeira animação do array
            const action = actions[firstAnimation.name];
            if (action) {
                action.play();
                action.setLoop(THREE.LoopRepeat, Infinity); // Faz a animação rodar em loop
            }
        }
    }, [animations, actions]);

    return (
        <Suspense fallback={null}>
            <pointLight position={[2, 2, 2]} intensity={30} />
            <mesh castShadow receiveShadow position-y={0.7} position={position}>
                <primitive object={scene} scale={20} />
            </mesh>
        </Suspense>
    );
}
