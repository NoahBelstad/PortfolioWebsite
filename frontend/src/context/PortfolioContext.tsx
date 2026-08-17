import { createContext, useContext, useEffect, useState } from 'react';
import { type ReactNode } from 'react';
import type { PortfolioData } from '../types/portfolio';
import { Result } from 'postcss';

const S3_JSON_URL = 'https://portfolio-storage-851725639779-eu-north-1-an.s3.eu-north-1.amazonaws.com/projects.json';

interface PortfolioContextType {
    data: PortfolioData | null;
    loading: boolean;
    error: string | null;
}

const PortfolioContext = createContext<PortfolioContextType>({
    data: null,
    loading: true,
    error: null,
});

export function PortfolioProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(S3_JSON_URL);
                if (!response.ok) {
                    throw new Error(`Failed to fetch S3 data (${response.status})`);
                }
                const result: PortfolioData = await response.json();
                setData(result);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
            console.log(data);
        };

        fetchData();
    }, []);

    return (
        <PortfolioContext.Provider value={{ data, loading, error }}>
            {children}
        </PortfolioContext.Provider>
    );
}

export function usePortfolio() {
    return useContext(PortfolioContext);
}