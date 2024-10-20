import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface DangerAlertProps {
	message : string
}

const DangerAlert : React.FC<DangerAlertProps> = ({message}) => {

	return(
		<>
			<Alert className="my-2" variant="destructive">
      			<ExclamationTriangleIcon className="h-4 w-4" />
      			<AlertTitle>Error</AlertTitle>
      			<AlertDescription>
					{message}
      			</AlertDescription>
    		</Alert>
		
		</>
	)
}

export default DangerAlert;