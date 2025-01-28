import "./GameDevices.css";

import Nintendo from "../../assets/images/devices/Nintendo.png";
import Others from "../../assets/images/devices/Others.png";
import PC from "../../assets/images/devices/PC.png";
import PlayStation from "../../assets/images/devices/PlayStation.png";
import Xbox from "../../assets/images/devices/Xbox.png";

function GameDevices({
	devices,
}: { devices: Array<"PlayStation" | "Nintendo" | "PC" | "Xbox" | "Others"> }) {
	const devicesURL = {
		PC: PC,
		Nintendo: Nintendo,
		Xbox: Xbox,
		PlayStation: PlayStation,
		Others: Others,
	};

	return (
		<>
			{devices ? (
				devices.map((device) => (
					<img
						src={devicesURL[device]}
						alt={device}
						key={device}
						className="device-picto"
					/>
				))
			) : (
				<></>
			)}
		</>
	);
}

export default GameDevices;
