import axios from 'axios';

export const API = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
    withCredentials: false,
});

const API_BASE_URL = "http://127.0.0.1:5000/api";


export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(
            "http://127.0.0.1:5000/api/signup",
            { username, email, password },
            { withCredentials: true }
        );
        console.log(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
};

export const loginUser = async (username, email, password) => {
    try {

        const response = await axios.post(
            "http://127.0.0.1:5000/api/signin",
            { username, email, password },
            { withCredentials: true }
        );

        console.log("Response Data:", response.data);

        const { user_id, username: responseUsername, email: userEmail } = response.data;

        if (!user_id || !responseUsername || !userEmail) {
            throw new Error("Unexpected response format - missing required fields");
        }


        localStorage.setItem("user_id", user_id);


        return response.data;
    } catch (error) {

        if (error.response) {
            console.error("Login error (response):", error.response.data);
        } else {

            console.error("Login error:", error.message);
        }


        throw new Error(
            error.response?.data?.message || "An error occurred during login"
        );
    }
};

export const logoutUser = async () => {
    try {
        const response = await API.post("/logout");
        return response.data;
    } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
        throw error;
    }
};

export const analyzeData = async (data) => {
    try {
        const response = await API.post("/analysis", data);
        return response.data;
    } catch (error) {
        console.error("Error analyzing data:", error.response?.data || error.message);
        throw error;
    }
};
export const getUsers = async () => {
    return API.get("/users");
};

export const getUserData = async (userId) => {
    return API.get(`/user/${userId}`);
};

export const saveQuizEntry = async (quizData) => {
    try {
        const response = await API.post("/quiz", quizData);
        return response.data;
    } catch (error) {
        console.error("Error saving quiz data:", error.response?.data || error.message);
        throw error;
    }
};
export const getAnalysisData = async (userId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/analysis`, {
            user_id: userId,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching analysis data:", error.response?.data || error.message);
        throw error;
    }
};

export const saveDiaryEntry = async (diaryData) => {
    try {
        const response = await API.post("/diary/create", diaryData);
        return response.data;
    } catch (error) {
        console.error("Error saving diary entry:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchDiaryEntries = async (userId) => {
    try {
        const response = await API.get(`/diary?user_id=${userId}`);
        console.log("API response:", response.data);


        return response.data.texts.map((entry) => ({
            text: entry.text,
            date: entry.date,
            mood: entry.mood || "N/A",
            symptom_level: entry.symptom_level || "N/A",
            feel_trend: entry.feel_trend || "N/A",
            medication_adherence: entry.medication_adherence || "N/A",
            side_effects: entry.side_effects || "N/A",
        }));
    } catch (error) {
        console.error("Error fetching diary entries:", error.response?.data || error.message);
        throw error;
    }
};

export const analyzeDiaryEntry = async (diaryData) => {
    try {
        const response = await API.post("/diary/analyze", diaryData);
        return response.data;
    } catch (error) {
        console.error("Error analyzing diary entry:", error.response?.data || error.message);
        throw error;
    }
};
