import { forwardRef } from "react";

const InfoBoard = forwardRef<HTMLDivElement, any>((props, ref) => {
    return (
        <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 text-white p-4 rounded-lg"
            ref={ref}
            {...props}
        >
            <p className="text-sm leading-relaxed text-center">
                O coração bombeia sangue pelo corpo, dividido em quatro cavidades: dois átrios e dois ventrículos. Ele envia sangue desoxigenado aos pulmões e distribui sangue oxigenado ao corpo, com válvulas que evitam refluxo e garantem circulação eficiente. e etc...
            </p>
        </div>
    );
});

InfoBoard.displayName = "InfoBoard";

export default InfoBoard;
