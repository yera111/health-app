import React, { useEffect, useState } from "react";
import {
    Box,
    Heading,
    VStack,
    Spinner,
    Text,
    Select,
    Button,
    Flex,
    SimpleGrid,
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { API } from "../utils/api";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AnalysisPage = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userData, setUserData] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [risk, setRisk] = useState(null);
    const [error, setError] = useState(null);
    const [showForecastForm, setShowForecastForm] = useState(false);

    const features = [
        { label: "Steps", value: "steps" },
        { label: "Sleep Hours", value: "sleep_hours" },
        { label: "Mood", value: "mood" },
        { label: "Symptom Level", value: "symptom_level" },
        { label: "Medication Adherence", value: "medication_adherence" },
        { label: "Side Effects", value: "side_effects" },
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await API.get("/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const fetchUserData = async (userId) => {
        setLoading(true);
        try {
            const response = await API.get(`/user/${userId}`);
            setUserData(response.data.data || []);
            setShowForecastForm(false);
            setPredictions([]);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to fetch user data.");
        } finally {
            setLoading(false);
        }
    };

    const handleUserChange = (e) => {
        const userId = e.target.value;
        setSelectedUser(userId);
        fetchUserData(userId);
    };

    const fetchForecast = async () => {
        setLoading(true);
        try {
            const response = await API.post("/analysis", {
                user_id: selectedUser,
            });

            setPredictions(response.data.daily_predictions || []);
            setRisk(response.data.overall_risk);
            setShowForecastForm(true);
        } catch (error) {
            console.error("Error fetching forecast:", error);
            setError("Failed to fetch forecast.");
        } finally {
            setLoading(false);
        }
    };

    const renderChartForFeature = (feature) => {
        const chartData = {
            labels: [
                ...userData.map((day) => day.date),
                ...predictions.map((pred) => pred.date),
            ],
            datasets: [
                {
                    label: feature.label,
                    data: [
                        ...userData.map((day) => day[feature.value]),
                        ...predictions.map((pred) => pred[feature.value]),
                    ],
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: "rgba(75,192,192,0.2)",
                },
            ],
        };

        return (
            <Box key={feature.value} borderWidth="1px" borderRadius="lg" p={4}>
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "top",
                            },
                            title: {
                                display: true,
                                text: `${feature.label} Over Time`,
                            },
                        },
                    }}
                />
            </Box>
        );
    };

    if (loading) {
        return (
            <Box textAlign="center" p={8}>
                <Spinner size="xl" />
                <Text mt={4}>Loading...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" p={8}>
                <Text color="red.500">{error}</Text>
            </Box>
        );
    }

    return (
        <Box p={8}>
            <Heading mb={6} textAlign="center">
                User Data Analysis
            </Heading>
            <VStack spacing={4} align="stretch">
                <Select placeholder="Select a user" onChange={handleUserChange}>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username} (Age: {user.age})
                        </option>
                    ))}
                </Select>

                {selectedUser && userData.length > 0 && (
                    <Flex justifyContent="center" mt={4}>
                        <Button colorScheme="blue" onClick={fetchForecast}>
                            Generate Forecast
                        </Button>
                    </Flex>
                )}

                {showForecastForm && (
                    <Box mt={6}>
                        <Heading size="md" mb={4} textAlign="center">
                            Forecast Analysis
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            {features.map(renderChartForFeature)}
                        </SimpleGrid>
                        <Text mt={4} textAlign="center">
                            Overall Risk Score: <strong>{risk?.toFixed(2)}</strong>
                        </Text>
                    </Box>
                )}
            </VStack>
        </Box>
    );
};

export default AnalysisPage;
