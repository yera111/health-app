import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Stack, Box, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./utils/authStore";


import MainPage from "./pages/mainpage.jsx";
import LandingPage from "./pages/landingPage.jsx";
import AnalysisPage from "./pages/analysisPage.jsx";
import DiaryPage from "./pages/diaryPage.jsx";
import CreateDiaryPage from "./pages/CreateDiaryPage.jsx";
import QuizPage from "./pages/quizPage.jsx";


export const BASE_URL = "http://127.0.0.1:5000/api";

function App() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	return (
		<Router>
			<Stack minH="100vh">
				<Navbar />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route
						path="/main"
						element={
								<MainPage />
						}
					/>
					<Route
						path="/diary"
						element={
								<DiaryPage />
						}
					/>
					<Route
						path="/diary/create"
						element={
								<CreateDiaryPage />
						}
					/>
					<Route path="/quiz" element={<QuizPage />} />
					<Route
						path="/analysis"
						element={
								<AnalysisPage />
						}
					/>
					<Route
						path="*"
						element={
							<Box textAlign="center" mt={20}>
								<Text fontSize="4xl" fontWeight="bold">
									404 - Page Not Found
								</Text>
							</Box>
						}
					/>
				</Routes>
			</Stack>
		</Router>
	);
}

export default App;


