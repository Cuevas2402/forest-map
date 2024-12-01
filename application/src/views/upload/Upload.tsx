import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatasetForm from "./parts/DatasetForm";
import ManualForm from "./parts/ManualForm";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export default function Upload(){

	const [progress, setProgress] : [number, React.Dispatch<React.SetStateAction<number>>] = useState<number>(0);
	return (

		<>
			<div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">

				<div className="flex flex-1 gap-4">	

					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
						Upload Zone
					</h1>

				</div>

				<Tabs defaultValue="dataset">

					<div className="flex items-center">

						<TabsList>
							<TabsTrigger value="dataset">Dataset</TabsTrigger>
							<TabsTrigger value="manual">Manual</TabsTrigger>
						</TabsList>

					</div>

					<div className="flex justify-center my-2">
						<Progress value={progress} />
					</div>



					<TabsContent value="dataset">

						<DatasetForm setProgress={setProgress}/>

					</TabsContent>

					<TabsContent value="manual">

						<ManualForm/>

					</TabsContent>

				</Tabs>


			</div>
		
		</>

	)
}