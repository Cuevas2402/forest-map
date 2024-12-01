import useSWR from 'swr';
import useClient from "@/hooks/useClient";
import { ForestProviderProps } from "@/interfaces/props";
import { createContext, useState } from "react";
import Spinner from '@/components/Spinner';
import useForest from '@/hooks/useForest';

const ZoneContext = createContext<any>(undefined);

const ZoneProvider: React.FC<ForestProviderProps> = ({ children }) => {


    const [currZone, setCurrZone] = useState<number>(1);


    const client = useClient();
    const { forest } = useForest();

    const fetcherZone = async (url: string, Name: string, Zid: number) => {
        const response = await client.post(url, { Name: Name, Zid: Zid.toString() });
        return response.data;
    };

    const { data: zoneData, error: zoneError, isLoading: zoneLoading } = useSWR(
        ['/forest/zone', forest[0]?.Name, currZone],
        ([url, Name, Zid]) => fetcherZone(url, Name, Zid)
    );

    const handleNext = () => {
        setCurrZone((prev) => Math.min(prev + 1, 200));
    };

    const handlePrevious = () => {
        setCurrZone((prev) => Math.max(prev - 1, 1));
    };

    if (zoneError) return <div>Error al cargar los datos</div>;

    if (zoneLoading) return <Spinner />;

    return (
        <ZoneContext.Provider value={{ currZone, zoneData, handleNext, handlePrevious }}>
            {children}
        </ZoneContext.Provider>
    );
};

export { ZoneProvider };
export default ZoneContext;
