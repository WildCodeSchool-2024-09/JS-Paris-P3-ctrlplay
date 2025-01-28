import "./Footer.css";

function Footer() {
	const handleScrollToTop = () => {
		const header = document.querySelector(".header");
		if (header) {
			header.scrollIntoView({ behavior: "smooth" });
		}
	};
	return (
		<footer className="footer">
			<div className="footer-left">
				<a
					href="https://persona.atlus.com/p5r/?lang=en"
					className="footer-link"
					target="_blank"
					rel="noreferrer"
					aria-label="Visit Persona 5 Royal website"
				>
					<button type="button" className="footer-IM" />
				</a>
			</div>

			<div className="footer-center">
				<button
					id="footer-portal"
					type="button"
					className="footer-portal"
					onClick={handleScrollToTop}
				/>
			</div>

			<div className="footer-right">
				<p>
					<a
						className="about-us"
						href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
						target="_blank"
						rel="noreferrer"
					>
						{" "}
						About Us{" "}
					</a>{" "}
					| All Rights Reserved
				</p>
			</div>
		</footer>
	);
}

export default Footer;
