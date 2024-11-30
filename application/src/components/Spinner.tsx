import { useEffect } from "react";
import * as spin from "spin.js";

export default function Spinner() { 
	useEffect(() => {
		const spinnerContainer = document.getElementById("spinner-container");
		if (spinnerContainer) {
			const spinner = new spin.Spinner({
				lines: 12, 
				length: 7,
				width: 4, 
				radius: 10, 
				color: "#000", 
				speed: 1, 
				shadow: true, 
				className: "spinner",
				zIndex: 2e9,
			}).spin(spinnerContainer);

			return () => {
				spinner.stop();
			};
		}

	}, []);

	return (
		<div className="flex justify-center items-center h-screen">
			<div id="spinner-container"></div>
		</div>
	);
}
