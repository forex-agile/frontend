import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CurrencyContextType {
    currency: string;
    setCurrency: (currency: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrencyContext = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrencyContext must be used within a CurrencyProvider');
    }
    return context;
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState<string>('USD'); // SETTING: Default currency

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};