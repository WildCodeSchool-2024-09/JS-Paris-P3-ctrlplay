import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Header />
			<ToastContainer stacked autoClose={3000} />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
