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
import User from "@/interfaces/user";
interface TableBodyUserProps {
	data : User[]
}

const TableBodyUser : React.FC<TableBodyUserProps> = ({data}) => {
	return(
		<>
			<TableBody>
				{data.map((user) => (
                    <TableRow className="my-2" key={user.id}>

						<TableCell className="font-medium">
							{user.email}
						</TableCell>

						<TableCell>
							{user.firstName + " " + user.lastName }
						</TableCell>

						<TableCell>Company</TableCell>


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

