import { forwardRef, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const InfoBoard = forwardRef<HTMLDivElement, any>((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 text-white p-4 rounded-lg w-full max-w-lg shadow-lg transition-all ${isOpen ? "h-64" : "h-12"
                }`}
            ref={ref}
            {...props}
        >
            {/* Botão retrátil */}
            <button
                onClick={toggleOpen}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
                {isOpen ? <FaChevronDown /> : <FaChevronUp />}
            </button>

            {/* Texto, mostrado apenas quando está aberto */}
            {isOpen && (
                <p className="text-sm leading-relaxed bg-black/30 backdrop-blur-md p-4 rounded-3xl font-semibold text-left mt-8">
                    <strong>O coração</strong> é essencial para a circulação do sangue. Possui quatro cavidades: <strong>átrios</strong> (recebem o sangue) e <strong>ventrículos</strong> (bombeiam o sangue). O sangue desoxigenado vai aos pulmões e o oxigenado é distribuído ao corpo, garantindo nutrientes e oxigênio.
                </p>

            )}
        </div>
    );
});

InfoBoard.displayName = "InfoBoard";

export default InfoBoard;
