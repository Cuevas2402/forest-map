import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ZoneSelector() {
    return (
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
    );
}
