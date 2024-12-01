import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { createRef, useState } from "react";
import DangerAlert from "@/components/DangerAlert";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2'
import useClient from "@/hooks/useClient";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Forest from "@/interfaces/forest";
import useSWR from "swr";
import Spinner from "@/components/Spinner";


interface Errors {
    type: string;
    message: string;
}

interface DatasetProps {
    setProgress: React.Dispatch<React.SetStateAction<number>>;
  }
  

export default function Dataset( { setProgress } : DatasetProps) {
    const imagesRef = createRef<HTMLInputElement>();
    const csvRef = createRef<HTMLInputElement>();
    const nameRef = createRef<HTMLInputElement>();

    const [errors, setErrors] = useState<Errors[]>([]);

	const handleUpload = async (file : File, url : string, name : string ) => {

		const form = new FormData();
		form.append("file", file);
        form.append("name", name);

        const client = useClient();

        
        const response = await client.post(`/upload/${url}`, form, {
            onUploadProgress : (progressEvent) => {
                if (progressEvent.total != undefined) { 
                    //const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                }
            }
        })

        if (response.status == 200) {

            return true

        }else{

            return false

        }

	}

    const handleSubmit = async (e: any) => {
        setProgress(0);
       
        e.preventDefault();

        const imgs = imagesRef.current?.files;
        const csvs = csvRef.current?.files;

        if (!imgs || imgs.length === 0 || imgs[0].type !== 'application/zip') {
            setErrors(prevErrors => [...prevErrors, { type: 'img', message: 'Las imágenes deben estar en una carpeta ZIP.' }]);
            return;
        } else {
            setErrors(prevErrors => prevErrors.filter(err => err.type !== 'img'));
        }

        setProgress(prevProgress => prevProgress + 20);

        if (!csvs || csvs.length === 0 || csvs[0].type !== 'text/csv') {

            setErrors(prevErrors => [...prevErrors, { type: 'csv', message: 'Los datos deben estar en formato CSV.' }]);
            return;

        } else {

            setErrors(prevErrors => prevErrors.filter(err => err.type !== 'csv'));

        }

        setProgress(prevProgress => prevProgress + 20);

        const img = await handleUpload(imgs[0], "img", nameRef.current?.value || "test");

        if(img){

            setErrors(prevErrors => prevErrors.filter(err => err.type !== 'uimg'));
            setProgress(prevProgress => prevProgress + 20);

        } else {

            setErrors(prevErrors => [...prevErrors, { type: 'uimg', message: 'Error al cargar las imagenes' }]);
            return;

        }

        const csv = await handleUpload(csvs[0], "csv", nameRef.current?.value || "test");

        if(csv){

            setErrors(prevErrors => prevErrors.filter(err => err.type !== 'ucsv'));
            setProgress(prevProgress => prevProgress + 20);


        } else {

            setErrors(prevErrors => [...prevErrors, { type: 'ucsv', message: 'Error al cargar el csv' }]);
            return;

        }

        setProgress(prevProgress => prevProgress + 20);

        Swal.fire({
            title: "Good job!",
            text: "Youre data is saved",
            icon: "success"
          });
        setProgress(0);

        if (imagesRef.current) {
            imagesRef.current.value = '';
        }
        if (csvRef.current) {
            csvRef.current.value = '';
        }
        if (nameRef.current) {
            nameRef.current.value = '';
        }



    };

    const [date, setDate] = useState<Date>()

    const client = useClient();

    const fetcher = async () => {
        const response = await client.get("/forests")
        const forests : Forest[] = response.data.forests
        return forests || []
    }

    const {data, error, isLoading}  = useSWR("/api/forests", fetcher)

    if (error) { return <div>Error al cargar los datos</div>}
    if (isLoading) { return <Spinner/> }


    return (
        <>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Dataset <Badge>?</Badge></CardTitle>
                    <CardDescription>
                        Upload a analysis of a forest
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        errors.map((error, index) => (
                            <DangerAlert key={index} message={error.message} />
                        ))
                    }

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">

                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a forest" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Forests</SelectLabel>

                                {
                                    data?.map((forest : Forest) => (

                                        <SelectItem key={forest.Fid} value={forest.Fid.toString()}>{forest.Name}</SelectItem>

                                    ))
                                }
                                
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        </div>
                        <div className="mb-4">

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                />
                            </PopoverContent>
                            </Popover>

                        </div>

                        <div className="my-2">
                            <Label htmlFor="csv">CSV</Label>
                            <Input id="csv" type="file" ref={csvRef} required />
                        </div>

                        <div className="my-2">
                            <Label htmlFor="csv">CSV</Label>
                            <Input id="csv" type="file" ref={csvRef} required />
                        </div>

                        <div className="my-2">
                            <Label htmlFor="images">Images</Label>
                            <Input id="images" type="file" ref={imagesRef} required />
                        </div>

                        <Button type="submit" className="w-full">
                            Upload
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
	