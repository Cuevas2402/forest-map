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
import Company from "@/interfaces/company";
interface TableBodyUserProps {
	data : Company[]
}

const TableBodyUser : React.FC<TableBodyUserProps> = ({data}) => {
	return(
		<>
			<TableBody>
				{data.map((company) => (
                    <TableRow className="my-2" key={company.Cid}>

						<TableCell className="font-medium">
							{company.Name}
						</TableCell>

						<TableCell>
							{company.Date.split("T")[0]}
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

