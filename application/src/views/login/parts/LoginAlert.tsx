import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailWarning } from "lucide-react";

interface LoginAlertProps{
	message : string;
}

const LoginAlert : React.FC<LoginAlertProps> = ({message}) => {


	return(
		<>

			<Alert>
				<MailWarning className="h-4 w-4" />
				<AlertTitle>Ups!</AlertTitle>
				<AlertDescription>
					{message}
				</AlertDescription>
			</Alert>
			
		</>
	)
}

export default LoginAlert;