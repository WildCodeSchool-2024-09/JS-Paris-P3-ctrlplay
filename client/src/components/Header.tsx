import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
	const navigate = useNavigate();

	const handleFooter = () => {
		const footerPortal = document.getElementById("footer-portal");
		if (footerPortal) {
			footerPortal.scrollIntoView({ behavior: "smooth" });
		}
	};

	const handleLogin = () => {
		navigate("/login");
	};

	const handleSignUp = () => {
		navigate("/signup");
	};

	return (
		<header className="header">
			<div className="logo-icon">
				<button
					type="button"
					className="logo-button"
					onClick={() => navigate("/")}
				/>
			</div>
			<div className="buttons">
				<button
					type="button"
					className="top-portal-button"
					onClick={handleFooter}
				/>
				<button type="button" className="login-button" onClick={handleLogin}>
					<span>Login</span>
				</button>
				<button type="button" className="signup-button" onClick={handleSignUp}>
					<span>Sign Up</span>
				</button>
			</div>
		</header>
	);
}

export default Header;
