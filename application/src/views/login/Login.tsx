import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login(){
	return (
		<>
			<form action="">

				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
						Enter your username below to login to your account
						</p>
					</div>
					<div className="grid gap-4">
						<div className="grid gap-2">
						<Label htmlFor="email">Username</Label>
						<Input
							id="username"
							type="username"
							placeholder=""
							required
						/>
						</div>
						<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<a
							href="/forgot-password"
							className="ml-auto inline-block text-sm underline"
							>
							Forgot your password?
							</a>
						</div>
						<Input id="password" type="password" required />
						</div>
						<Button type="submit" className="w-full">
						Login
						</Button>
						<Button variant="outline" className="w-full">
						Login with Google
						</Button>
					</div>


				</div>
			</form>

		
		</>
	)
}