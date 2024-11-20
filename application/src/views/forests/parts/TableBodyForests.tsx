import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import Forest from "@/interfaces/forest";
interface TableBodyUserProps {
	data : Forest[]
}

const TableBodyUser : React.FC<TableBodyUserProps> = ({data}) => {
	return(
		<>
			<TableBody>
				{data.map((forest) => (
                    <TableRow className="my-2" key={forest.Fid}>

						<TableCell className="font-medium">
							{forest.Fid}
						</TableCell>

						<TableCell>
							{forest.Name}
						</TableCell>

						<TableCell>
							{forest.Location}
						</TableCell>


						<TableCell>
							<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button aria-haspopup="true" size="icon" variant="ghost">
								<MoreHorizontal className="h-4 w-4" />
								<span className="sr-only">Toggle menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem>Edit</DropdownMenuItem>
								<DropdownMenuItem>Delete</DropdownMenuItem>
							</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
                    </TableRow>
				))}
			</TableBody>
		</>
	)

}

export default TableBodyUser;

