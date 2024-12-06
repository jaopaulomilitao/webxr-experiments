import React, { createContext, useContext, useState } from 'react';

interface InfoContextType {
    currentInformation: string;
    setCurrentInformation: (info: string) => void;
}

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export const InfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentInformation, setCurrentInformation] = useState<string>('Clique em alguma informação no modelo para visualizar!');
    return (
        <InfoContext.Provider value={{ currentInformation, setCurrentInformation }}>
            {children}
        </InfoContext.Provider>
    );
};

export const useInfo = () => {
    const context = useContext(InfoContext);
    if (!context) {
        throw new Error('useInfo must be used within an InfoProvider');
    }
    return context;
};
