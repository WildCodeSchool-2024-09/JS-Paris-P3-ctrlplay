import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomeBanner.css";

const Banner = () => {
	const [isVisible, setIsVisible] = useState(true);
	const navigate = useNavigate();

	if (!isVisible) return null;

	return (
		<div className="content-box" id="welcome-banner">
			<button
				type="button"
				className="content-boxclose"
				onClick={() => setIsVisible(false)}
			>
				×
			</button>
			<h2>Welcome to your ultimate game library!</h2>
			<p>
				Ctrl+Play is a digital platform for gamers to organize their game
				collection. Sign up for free and start building your dream Gameshelf!
			</p>
			<div className="gradient-buttons">
				<button
					type="button"
					onClick={() => navigate("/login")}
					className="btn-login"
				>
					Log in
				</button>
				<button
					type="button"
					onClick={() => navigate("/signup")}
					className="btn-signup"
				>
					Sign up
				</button>
			</div>
		</div>
	);
};

export default Banner;
