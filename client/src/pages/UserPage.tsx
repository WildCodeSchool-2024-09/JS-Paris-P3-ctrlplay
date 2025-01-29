import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import "./UserPage.css";

import type GameType from "../interface/GameType";
import type UserType from "../interface/UserType";

import GameCard from "../components/GameCard";
import GameRatings from "../components/GameComponents/GameRatings";
import Avatar from "../components/UserComponents/Avatar";
import Top3 from "../components/UserComponents/Top3";

import rezio from "../assets/images/avatar/avatarezio.png";
import scorpion from "../assets/images/avatar/avatarscorpion.png";
import spiderman from "../assets/images/avatar/avatarspider.png";

function UserPage() {
	const user = useLoaderData() as UserType;

	// TO DO : UPDATE WHEN CRITERIA FOR FEATURED GAMES DEFINED
	const gameFeaturedId = 33;

	const [gameFeatured, setGameFeatured] = useState<GameType>();
	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/games/${gameFeaturedId}`)
			.then((res) => res.json())
			.then((data) => setGameFeatured(data));
	}, []);

	function shortenDescription(description: string, maxChar: number) {
		if (description.length <= maxChar) return description;
		const shorten = description.slice(0, maxChar);
		return `${shorten.slice(0, shorten.lastIndexOf(" "))}...`;
	}

	let shortDescription = null;
	if (gameFeatured) {
		shortDescription = parse(
			DOMPurify.sanitize(shortenDescription(gameFeatured.description, 250), {
				USE_PROFILES: { html: true },
			}),
		);
	}

	const [gamesReco, setGamesReco] = useState<GameType[]>();
	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.id}/recommandation`)
			.then((res) => res.json())
			.then((data) => setGamesReco(data));
	});
	const [gamesRecoLength, setGamesRecoLength] = useState<number>(20);

	return (
		<main id="user-main">
			<aside id="user-aside">
				<section className="content-box" id="user-welcome-box">
					<div id="user-welcome">
						<Avatar avatar={user.avatar} />
						<h2>Welcome {user.pseudo}!</h2>
					</div>
					{user.topGames ? <Top3 topGames={user.topGames} /> : <></>}
				</section>
				<div>
					<h3>Featured game</h3>
					{gameFeatured ? (
						<section className="content-box" id="user-featured-game">
							<img
								id="user-game-banner"
								src={gameFeatured.image}
								alt={gameFeatured.title}
							/>
							<div id="user-game-details">
								<div>
									<h4>{gameFeatured?.title}</h4>
									<GameRatings note={gameFeatured.note} />
								</div>
								{shortDescription ? <p>{shortDescription}</p> : <></>}
								<Link
									to={`/game/${gameFeaturedId}`}
									className="beautiful-button user-beautiful-button"
								>
									Check this game
								</Link>
							</div>
						</section>
					) : (
						<></>
					)}
				</div>
			</aside>
			<section className="content-box" id="user-main-box">
				<h3>Search a game</h3>
				<p>Insérer ici le search bar d'Emilie</p>
				<div id="user-buttons">
					<button type="button" className="user-buttons" id="user-button-1">
						<img src={spiderman} alt="favorites" className="user-buttons-img" />
						Favorites
					</button>
					<button type="button" className="user-buttons" id="user-button-2">
						<img src={rezio} alt="to-do-list" className="user-buttons-img" />
						To do list
					</button>
					<button type="button" className="user-buttons" id="user-button-3">
						<img
							src={scorpion}
							alt="all-my-games"
							className="user-buttons-img"
						/>
						All my games
					</button>
				</div>
				<article>
					<h3 id="user-recommandation-title">Recommandations</h3>
					{gamesReco ? (
						<div id="user-game-list">
							{gamesReco.slice(0, gamesRecoLength - 1).map((game: GameType) => (
								<GameCard game={game} key={game.id} />
							))}
						</div>
					) : (
						<></>
					)}
					<button
						type="button"
						className="beautiful-button user-beautiful-button"
						onClick={() => setGamesRecoLength(gamesRecoLength + 10)}
					>
						More...
					</button>
				</article>
			</section>
		</main>
	);
}

export default UserPage;
