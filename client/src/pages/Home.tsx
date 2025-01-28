import Featured from "../components/Featured";
import GameList from "../components/GameList";
import WelcomeBanner from "../components/WelcomeBanner";
import "./Home.css";

function Home() {
	return (
		<div>
			<header className="home-header" />
			<WelcomeBanner />
			<Featured />

			<div className="game-list">
				<GameList />
			</div>
		</div>
	);
}

export default Home;
