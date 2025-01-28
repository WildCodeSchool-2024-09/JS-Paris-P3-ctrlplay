import type GameType from "../interface/GameType";
import GameDevices from "./GameComponents/GameDevices";
import "./GameCard.css";
import { useEffect } from "react";

interface GameCardProps {
	game: GameType;
}

function GameCard({ game }: GameCardProps) {
	useEffect(() => console.log(game));

	return (
		<div className="card-game">
			{game.image && <img src={game.image} alt={`${game.title} cover`} />}

			<div className="details">
				<h3>{game.title}</h3>
				<div className="device-container">
					{game.devices && typeof game.devices === "string" ? (
						<GameDevices
							devices={(game.devices as string)
								.split(",")
								.map(
									(device: string) =>
										device.trim() as
											| "PlayStation"
											| "Nintendo"
											| "PC"
											| "Xbox"
											| "Others",
								)}
						/>
					) : game.devices && Array.isArray(game.devices) ? (
						<GameDevices devices={game.devices} />
					) : (
						<p>Devices: Unknown</p>
					)}
				</div>

				<p>{game.genres || "Unknown"}</p>
				<div className="button-container">
					<button id="" className="beautiful-buttonadd" type="button">
						i
					</button>
					<button className="beautiful-buttonadd" type="button">
						✔
					</button>
					<button className="beautiful-buttonadd" type="button">
						🤍
					</button>
					<button className="beautiful-buttonadd" type="button">
						+
					</button>
				</div>
			</div>
		</div>
	);
}

export default GameCard;
