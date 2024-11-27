import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"

import { TreesChart } from "./TreesChart"
import { GlobalMapProps, TreesChartProps } from "@/interfaces/props"

const FormMenu : React.FC<GlobalMapProps>= ({forests, curr, setCurr, dist, currDist, setCurrDist}) => {

	const props : TreesChartProps = {
		dist : currDist,
	}

	const handleValueChange = (value : string) => {
		setCurr(forests[parseInt(value)])
		setCurrDist(dist[parseInt(value)])
	}

	return (
		<>
			<div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-white px-2 lg:col-span-2">

				<div className="grid-cols-1 grid-rows-2 w-full"> 
					<div className="mb-3">


						<Card>

							<fieldset className="grid gap-6 p-4">


								<div className="grid gap-3">

									<Label htmlFor="model">Zone</Label>

									<Select onValueChange={(e) => handleValueChange(e)}>
										<SelectTrigger
											id="model"
											className="items-start [&_[data-description]]:hidden"
										>
											<SelectValue placeholder={curr?.Name ? curr.Name : 'Backjson'} />
										</SelectTrigger>
										<SelectContent>
											{
												forests.map((forest, index) => (

													<SelectItem key={forest.Fid} value={index.toString()}>
														{forest.Name}
													</SelectItem>
												))
											}
										</SelectContent>
									</Select>

								</div>

								<div className="grid gap-3">
									<Label htmlFor="top-p">Location</Label>
									<Input id="top-p" type="text" placeholder={curr?.Location ? curr.Location : 'Sweden'} disabled/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="grid gap-3">
										<Label htmlFor="top-p">Latitud</Label>
										<Input id="top-p" type="text" placeholder={curr?.Latitud ? curr.Latitud : '50'} disabled/>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="top-k">Longitud</Label>
										<Input id="top-k" type="text" placeholder={curr?.Longitud ? curr.Longitud :'50'} disabled />
									</div>
								</div>

						</fieldset>


						</Card>

				</div>
				<div>

					<TreesChart {...props}/>

				</div>


			</div>


		</div>
		
		</>
	)
}


export default FormMenu;