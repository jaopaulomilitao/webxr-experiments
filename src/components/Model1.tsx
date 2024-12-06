'use client';

import { useGLTF, useAnimations } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import InfoSphere from './InfoSphere';


export default function Model1({ position }: any) {
    const { scene, animations } = useGLTF('models/heart_and_lungs.glb');
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
                <InfoSphere info='O coração é um órgão muscular que bombeia sangue rico em oxigênio pelo corpo e retorna sangue pobre em oxigênio aos pulmões, trabalhando em conjunto com os pulmões para oxigenar o sangue.' position={new THREE.Vector3(0, -0.3, 0.2)} />
                <InfoSphere info='O pulmão direito, assim como o esquerdo, absorve oxigênio e libera dióxido de carbono, trabalhando em conjunto com o pulmão esquerdo para garantir a oxigenação do sangue.' position={new THREE.Vector3(-0.3, -0.3, 0.2)} />
                <InfoSphere info='O pulmão esquerdo absorve oxigênio e libera dióxido de carbono do sangue, funcionando junto com o pulmão direito para oxigenar o sangue que o coração bombeia.' position={new THREE.Vector3(0.3, -0.3, 0.2)} />
                <InfoSphere info='A traqueia é o tubo que conduz o ar rico em oxigênio para os pulmões e expulsa o ar carregado de dióxido de carbono, facilitando a oxigenação do sangue que o coração irá bombear.' position={new THREE.Vector3(0, 0.7, 0.05)} />
                <primitive object={scene} scale={20} />
            </mesh>
        </Suspense>
    );
}
