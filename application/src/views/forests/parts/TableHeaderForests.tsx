import { TableRow, TableHead, TableHeader } from "@/components/ui/table";


export default function TableHeaderUser(){
	return (
		<>
			<TableHeader>
				<TableRow>

                    <TableHead>Id</TableHead>

                    <TableHead className="hidden md:table-cell">
						Name
                    </TableHead>

					<TableHead className="hidden md:table-cell">
						Location
                    </TableHead>

                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>

				</TableRow>
			</TableHeader>
		
		</>
	)
}