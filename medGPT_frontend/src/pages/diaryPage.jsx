import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    HStack,
    VStack,
    Button,
    Select,
    Grid,
    GridItem,
    useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { fetchDiaryEntries } from "../utils/api";
import { useQuizStore } from "../utils/quizStore";

const DiaryPage = () => {
    const navigate = useNavigate();
    const bgColor = useColorModeValue("gray.100", "gray.800");
    const cardBg = useColorModeValue("white", "gray.700");
    const textColor = useColorModeValue("gray.800", "white");

    const { users, fetchUsers } = useQuizStore();
    const [selectedUser, setSelectedUser] = useState("");
    const [entries, setEntries] = useState([]);
    const [sortOrder, setSortOrder] = useState("latest");

    const loadEntries = async (userId) => {
        try {
            const data = await fetchDiaryEntries(userId);
            console.log("Loaded diary entries:", data);
            setEntries(data);
        } catch (error) {
            console.error("Failed to fetch diary entries:", error);
        }
    };

    const handleUserChange = (e) => {
        const userId = e.target.value;
        setSelectedUser(userId);
        if (userId) loadEntries(userId);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortedEntries = [...entries].sort((a, b) => {
        if (sortOrder === "latest") {
            return new Date(b.date) - new Date(a.date);
        } else {
            return new Date(a.date) - new Date(b.date);
        }
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Box bg={bgColor} minH="100vh" p={8}>
            {/* Header */}
            <HStack justifyContent="space-between" alignItems="center" mb={6}>
                <VStack align="flex-start" spacing={1}>
                    <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                        Diary
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                        Review the details below of your recent projects.
                    </Text>
                </VStack>
                <Button colorScheme="purple" size="md" onClick={() => navigate("/diary/create")}>
                    Create
                </Button>
            </HStack>

            <HStack spacing={4} mb={6}>
                <Select placeholder="Select User" onChange={handleUserChange}>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username} (Age: {user.age})
                        </option>
                    ))}
                </Select>
                <Select placeholder="Sort by" size="md" onChange={handleSortChange}>
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                </Select>
            </HStack>

            <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
                {entries.map((entry, index) => (
                    <GridItem key={index} bg={cardBg} p={4} borderRadius="md" shadow="md">
                        <Text fontWeight="bold" mb={2}>
                            {entry.date}
                        </Text>
                        <Text mb={2}>{entry.text}</Text>
                        <Text fontSize="sm" color="gray.500">
                            Mood: {entry.mood}, Symptom Level: {entry.symptom_level}, Trend: {entry.feel_trend}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            Medication Adherence: {entry.medication_adherence}, Side Effects: {entry.side_effects}
                        </Text>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
};

export default DiaryPage;
