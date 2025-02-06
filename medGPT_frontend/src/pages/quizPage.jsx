import React, { useEffect, useState } from "react";
import {
    Box,
    Heading,
    Text,
    Button,
    Input,
    VStack,
    FormControl,
    FormLabel,
    Select,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    useToast,
} from "@chakra-ui/react";
import { useQuizStore } from "../utils/quizStore";
import { saveQuizEntry } from "../utils/api";

const QuizPage = () => {
    const { users, fetchUsers } = useQuizStore();
    const [selectedUser, setSelectedUser] = useState("");
    const [dailyData, setDailyData] = useState({
        mood: "",
        steps: "",
        sleep_hours: "",
        screen_time: "",
        symptom_level: "",
        feel_trend: "",
        medication_adherence: 0,
        side_effects: "",
        date: "",
    });
    const toast = useToast();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDailyData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSliderChange = (value) => {
        const normalizedValue = value / 5;
        setDailyData((prev) => ({
            ...prev,
            medication_adherence: normalizedValue,
        }));
    };

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const submitDailyData = async () => {
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
            await saveQuizEntry({
                user_id: parseInt(selectedUser),
                ...dailyData,
            });

            toast({
                title: "Success",
                description: "Daily data saved successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save daily data.",
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
        <Box p={6}>
            <Heading mb={6}>Daily Data Entry</Heading>
            <FormControl mb={4}>
                <FormLabel>Select User</FormLabel>
                <Select placeholder="Select a user" onChange={handleUserChange}>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username} (Age: {user.age})
                        </option>
                    ))}
                </Select>
            </FormControl>

            <VStack spacing={4} align="stretch">
                <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Input
                        type="date"
                        name="date"
                        value={dailyData.date}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Mood</FormLabel>
                    <Input
                        name="mood"
                        value={dailyData.mood}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Steps</FormLabel>
                    <Input
                        name="steps"
                        value={dailyData.steps}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Sleep Hours</FormLabel>
                    <Input
                        name="sleep_hours"
                        value={dailyData.sleep_hours}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Screen Time (hours)</FormLabel>
                    <Input
                        name="screen_time"
                        value={dailyData.screen_time}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Symptom Level</FormLabel>
                    <Input
                        name="symptom_level"
                        value={dailyData.symptom_level}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Feel Trend</FormLabel>
                    <Input
                        name="feel_trend"
                        value={dailyData.feel_trend}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Medication Adherence (0-5)</FormLabel>
                    <Slider
                        defaultValue={0}
                        min={0}
                        max={5}
                        step={1}
                        onChange={handleSliderChange}
                    >
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                    <Text>Value: {(dailyData.medication_adherence * 5).toFixed(1)}</Text>
                </FormControl>
                <FormControl>
                    <FormLabel>Side Effects</FormLabel>
                    <Input
                        name="side_effects"
                        value={dailyData.side_effects}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <Button colorScheme="blue" onClick={submitDailyData}>
                    Submit Data
                </Button>
            </VStack>
        </Box>
    );
};

export default QuizPage;
