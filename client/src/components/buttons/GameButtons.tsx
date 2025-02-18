import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import FavoriteButton from "../buttons/FavoriteButton";
import GameShelfButton from "../buttons/GameShelfButton";
import InfosButton from "../buttons/InfosButton";

import { useAuth } from "../../context/UserContext";

import type GameType from "../../interface/GameType";
import WishlistButton from "./WishlistButton";

import "./GameButtons.css";

interface GameCardProps {
	userId?: number;
	game: GameType;
}

function GameButtons({ game }: GameCardProps) {
	const { user } = useAuth();

	const [isFavorite, setIsFavorite] = useState<boolean>(false);
	const [isInLibrary, setIsInLibrary] = useState<boolean>(false);

	const location = useLocation();
	const hideInfoButton = location.pathname === `/game/${game.id}`;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (user) {
			if (!user.id || !game.id) {
				toast.error("UserId and GameId required", { theme: "dark" });
			}

			const checkLibrary = async () => {
				try {
					const response = await fetch(
						`http://localhost:3310/api/gameshelf/${user.id}/${game.id}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Authorization: `${user.token}`,
							},
						},
					);

					if (!response.ok) throw new Error("Failed to fetch game status");

					const { gameState } = await response.json();

					setIsInLibrary(Object.keys(gameState).length > 0);
					if (Object.keys(gameState).length > 0)
						setIsFavorite(gameState[0].favorite === 1);
					else setIsFavorite(false);
				} catch (err) {
					toast.error("Error: Unable to check game status.", { theme: "dark" });
				}
			};

			checkLibrary();
		}
	}, [game.id, user, isFavorite, isInLibrary, setIsInLibrary, setIsFavorite]);

	return (
		<div className="button-container">
			{!hideInfoButton && <InfosButton id={game.id} />}
			{user ? (
				<>
					<div id="game-shelf-button">
						<GameShelfButton
							userId={user.id}
							gameId={Number.parseInt(game.id)}
							setIsInLibrary={setIsInLibrary}
							isInLibrary={isInLibrary}
						/>
					</div>
					<FavoriteButton
						userId={user.id}
						gameId={Number.parseInt(game.id)}
						isFavorite={isFavorite}
						setIsFavorite={setIsFavorite}
						isInLibrary={isInLibrary}
					/>
					<WishlistButton gameId={Number.parseInt(game.id)} />
				</>
			) : (
				<></>
			)}
		</div>
	);
}

export default GameButtons;
