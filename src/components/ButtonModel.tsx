import React from "react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string; // Texto a ser exibido no botão
    className?: string; // Classes adicionais para personalização
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, className = "", ...props }) => {
    return (
        <button
            className={`text-xs p-4 backdrop-blur-md bg-black/50 text-white rounded-xl hover:bg-black/70 border-0 hover:border-2 border-gray-300 transition ${className} max-w-36`}
            {...props}
        >
            {label}
        </button>
    );
};

export default CustomButton;
