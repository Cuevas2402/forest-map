import { ReactNode } from "react";
import InfoCard from "./InfoCard";
import { Fence } from "lucide-react";

interface InfoCardProps {
    title: string;
    value: string;
    description: string;
    children?: ReactNode; // Se hace opcional porque no se está usando actualmente
}

const ForestStats = () => {
    const infoCardProps: InfoCardProps[] = [
        {
            title: "Health",
            value: "70%",
            description: "+180.1% from last month",
            children : <Fence className="h-5 w-5" />	
        },
        {
            title: "Trees",
            value: "80%",
            description: "+180.1% from last month",
            children: <Fence className="h-5 w-5" />	
        },
        {
            title: "Zones",
            value: "60%",
            description: "+180.1% from last month",
            children: <Fence className="h-5 w-5" />	
        },
        {
            title: "Progress",
            value: "50%",
            description: "+180.1% from last month",
            children: <Fence className="h-5 w-5" />	
        },
    ];

    return (

        <>
                {infoCardProps.map((infoCardProp, index) => (

                    <InfoCard key={index} {...infoCardProp} />
                ))}
        </>


    );
};

export default ForestStats;
