import React, { createContext, useContext, useState, ReactNode, useEffect, use } from 'react';

interface CurrencyContextType {
    currency: string;
    setCurrency: (currency: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const useCurrencyContext = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrencyContext must be used within a CurrencyProvider');
    }
    return context;
};

const CurrencyProvider = ({ children }: { children: ReactNode }) => {

    const [currency, setCurrency] = useState<string>('USD'); // Default to 'USD' initially
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCurrency = localStorage.getItem('currency');
            if (savedCurrency) {
                setCurrency(savedCurrency);
            }
            setIsHydrated(true);
        }
    }, []);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('currency', currency);
        }
    }, [currency, isHydrated]);

    if (!isHydrated) {
        return null; // Render nothing until hydration is complete
    }

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );

};

export { CurrencyProvider, useCurrencyContext };