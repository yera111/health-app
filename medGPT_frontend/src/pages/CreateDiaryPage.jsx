import React, { useEffect, useState } from "react";
import {
    Box,
    Heading,
    Button,
    Input,
    VStack,
    FormControl,
    FormLabel,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { useQuizStore } from "../utils/quizStore";
import { saveDiaryEntry, analyzeDiaryEntry } from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreateDiaryPage = () => {
    const { users, fetchUsers } = useQuizStore();
    const [selectedUser, setSelectedUser] = useState("");
    const [dailyData, setDailyData] = useState({
        text: "",
        date: "",
    });
    const toast = useToast();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDailyData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const submitDiaryEntry = async () => {
        if (!selectedUser) {
            toast({
                title: "Error",
                description: "Please select a user.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const savedEntry = await saveDiaryEntry({
                user_id: parseInt(selectedUser),
                ...dailyData,
            });

            const analysisResult = await analyzeDiaryEntry({
                user_id: parseInt(selectedUser),
                text: dailyData.text,
                date: dailyData.date,
            });

            toast({
                title: "Success",
                description: "Diary entry saved and analyzed successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            console.log("Analysis Result:", analysisResult);

            navigate("/diary");
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save or analyze diary entry.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Box p={8}>
            <VStack spacing={6} maxW="600px" mx="auto" p={8} borderRadius="md" shadow="md">
                <Heading as="h1" size="lg">
                    Create New Diary Entry
                </Heading>
                <FormControl mb={4}>
                    <FormLabel>Select User</FormLabel>
                    <Input as="select" onChange={handleUserChange} placeholder="Select a user">
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username} (Age: {user.age})
                            </option>
                        ))}
                    </Input>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input
                        type="date"
                        name="date"
                        value={dailyData.date}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Content</FormLabel>
                    <Textarea
                        placeholder="Write your thoughts here..."
                        name="text"
                        value={dailyData.text}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <Button colorScheme="purple" size="lg" width="full" onClick={submitDiaryEntry}>
                    Save & Analyze Entry
                </Button>
            </VStack>
        </Box>
    );
};

export default CreateDiaryPage;
