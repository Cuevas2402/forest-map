import { TableRow, TableHead, TableHeader } from "@/components/ui/table";


export default function TableHeaderUser(){
	return (
		<>
			<TableHeader>
				<TableRow>
                    <TableHead>Mail</TableHead>

                    <TableHead>Name</TableHead>

                    <TableHead>Company</TableHead>

                    <TableHead className="hidden md:table-cell">
						Created at
                    </TableHead>

                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>

				</TableRow>
			</TableHeader>
		
		</>
	)
}