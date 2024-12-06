import React from "react";
import { FaHeart, FaAtom, FaRocket } from "react-icons/fa"; // Exemplo de ícones

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string; // Texto a ser exibido no botão
    className?: string; // Classes adicionais para personalização
    icon?: "heart" | "atom" | "rocket"; // Definindo ícones temáticos
}

const iconMap: { [key in "heart" | "atom" | "rocket"]: React.ReactNode } = {
    heart: <FaHeart />,
    atom: <FaAtom />,
    rocket: <FaRocket />,
};

const ButtonModel: React.FC<CustomButtonProps> = ({ label, className = "", icon, ...props }) => {
    return (
        <button
            className={`text-xs p-4 backdrop-blur-md bg-black/50 text-white rounded-xl hover:bg-black/70 border-0 hover:border-2 border-gray-300 transition ${className} max-w-36 flex items-center justify-center gap-2 flex-col`}
            {...props}
        >
            {icon && <span className="text-lg">{iconMap[icon]}</span>}
            {label}
        </button>
    );
};

export default ButtonModel;
