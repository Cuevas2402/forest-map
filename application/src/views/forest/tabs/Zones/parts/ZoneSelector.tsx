import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useZone from "@/hooks/useZone";

export default function ZoneSelector() {
    const {currZone, handlePrevious, handleNext} = useZone();
    const ids = Array.from({ length: 200 }, (_, index) => index + 1);
    return (


    <div className="w-full h-full grid grid-cols-2 grid-rows-5 gap-4">

        <div className="flex items-end" >
            <Button className="w-1/2" onClick={()=> handlePrevious()}>Previous</Button>
        </div>

        <div className="flex items-end justify-end" >
            <Button className="w-1/2" onClick={()=>handleNext()}>Next</Button>
        </div>

        <div className="col-span-2 row-span-4">
            <Card className="w-full h-full">
                <CardContent>
                    <div className="flex justify-center items-center mt-24 h-full">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={`Zone ${currZone}`} />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Zones list</SelectLabel>
                                {
                                    ids.map((id) => (
                                        <SelectItem key={id} value={id.toString()}>
                                            Zone {id}
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

        </div>
    </div>

    );
}
