import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ZoneSelector() {
    return (


<div className="w-full h-full grid grid-cols-2 grid-rows-5 gap-4">
    <div className="flex items-end" >
    <Button className="w-1/2">Previous</Button>
    </div>
    <div className="flex items-end justify-end" >
    <Button className="w-1/2">Next</Button>
    </div>
    <div className="col-span-2 row-span-4">
        <Card className="w-full h-full">
        <CardContent>
            <div className="flex justify-center items-center mt-24 h-full">
            <Select>
                <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
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
