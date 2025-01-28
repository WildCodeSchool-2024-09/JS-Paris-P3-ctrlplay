import { useEffect, useState } from "react";
import type GameType from "../interface/GameType";
import GameCard from "./GameCard";
import "./GameList.css";

function GameList() {
	const [recentReleases, setRecentReleases] = useState<GameType[]>([]);
	const [allTimeFavorites, setAllTimeFavorites] = useState<GameType[]>([]);
	const [currentIndexReleases, setCurrentIndexReleases] = useState(0);
	const [currentIndexFavorites, setCurrentIndexFavorites] = useState(0);
	const gamesToShow = 5;

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const response = await fetch("http://localhost:3310/games");
				const games: GameType[] = await response.json();

				const sortedByYear = [...games]
					.filter((game) => game.year)
					.sort((a, b) => (b.year || 0) - (a.year || 0));
				setRecentReleases(sortedByYear);

				const sortedByNote = [...games]
					.filter((game) => game.note)
					.sort((a, b) => (b.note || 0) - (a.note || 0));
				setAllTimeFavorites(sortedByNote);
			} catch (error) {
				console.error("Error fetching games:", error);
			}
		};

		fetchGames();
	}, []);

	const handleSlideReleases = () => {
		setCurrentIndexReleases((prevIndex) =>
			prevIndex + 1 < recentReleases.length - gamesToShow + 1
				? prevIndex + 1
				: 0,
		);
	};

	const handleSlideFavorites = () => {
		setCurrentIndexFavorites((prevIndex) =>
			prevIndex + 1 < allTimeFavorites.length - gamesToShow + 1
				? prevIndex + 1
				: 0,
		);
	};

	return (
		<div className="main-content" id="box-principal">
			<h2 className="mainh2">Recent Releases</h2>

			<section className="recent-releases">
				<div className="recent-releases-list">
					{recentReleases
						?.slice(currentIndexReleases, currentIndexReleases + gamesToShow)
						.map((game) => (
							<GameCard key={game.id} game={game} />
						))}
				</div>
				{recentReleases.length > gamesToShow && (
					<button
						type="button"
						className="beautiful-buttonadd"
						id="more-btn"
						onClick={handleSlideReleases}
					>
						See More
					</button>
				)}
			</section>
			<h2 className="mainh2">All-Time Favorites</h2>
			<section className="all-time-favorites">
				<div className="all-time-favorites-list">
					{allTimeFavorites
						?.slice(currentIndexFavorites, currentIndexFavorites + gamesToShow)
						.map((game) => (
							<GameCard key={game.id} game={game} />
						))}
				</div>
				{allTimeFavorites.length > gamesToShow && (
					<button
						type="button"
						className="beautiful-buttonadd"
						id="more-btn2"
						onClick={handleSlideFavorites}
					>
						See More
					</button>
				)}
			</section>
		</div>
	);
}

export default GameList;
