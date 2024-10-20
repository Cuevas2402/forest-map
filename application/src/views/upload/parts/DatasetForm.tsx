import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { createRef, useState } from "react";
import DangerAlert from "@/components/DangerAlert";
import { Button } from "@/components/ui/button";
import client from "@/config/axios";
import Swal from 'sweetalert2'


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

        
        const response = await client.post(`/upload/${url}`, form, {
            headers : {
                "Content-Type" : "multipart/form-data"
            },
            onUploadProgress : (progressEvent) => {
                if (progressEvent.total != undefined) { 
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

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

    return (
        <>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Dataset <Badge>?</Badge></CardTitle>
                    <CardDescription>
                        Manage your products and view their sales performance.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        errors.map((error, index) => (
                            <DangerAlert key={index} message={error.message} />
                        ))
                    }

                    <form onSubmit={handleSubmit}>
                        <div className="my-2">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" placeholder="zone name" ref={nameRef} required />
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
	