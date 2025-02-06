import React from "react";
import {
    Box,
    Text,
    VStack,
    HStack,
    Container,
    Badge,
    Button,
    useColorModeValue,
} from "@chakra-ui/react";
import AIHealthPredictions from "../components/AIHealthPredictions";
import GetStartedButton from "../components/getStartedButtonMain.jsx";
import DiaryButton from "../components/DiaryButton.jsx";
import QuizButton from "../components/QuizButton.jsx";
import {useAuthStore} from "../utils/authStore.js";

const MainPage = () => {

    const bgColor = useColorModeValue("gray.100", "gray.900");
    const cardBgColor = useColorModeValue("white", "gray.700");
    const textColor = useColorModeValue("gray.800", "white");
    const subTextColor = useColorModeValue("gray.500", "gray.400");


    const handleDailyQuiz = () => {
        console.log("Navigate to Daily Quiz");
    };

    const username = useAuthStore((state) => state.user?.username || "Guest");

    const handleJournal = () => {
        console.log("Navigate to Journal");
    };

    return (
        <Box bg={bgColor} minH="100vh" p={8}>
            <Container maxW="6xl">
                <HStack justifyContent="space-between" alignItems="center" mb={6}>
                    <VStack align="flex-start">
                        <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                            Good morning, {username}
                        </Text>
                        <Text fontSize="md" color={subTextColor}>
                            How are you feeling today?
                        </Text>
                    </VStack>
                    <HStack spacing={4}>
                        <Badge colorScheme="blue">🔔</Badge>
                        <Box
                            boxSize="40px"
                            bg="gray.300"
                            borderRadius="full"
                            overflow="hidden"
                        >
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User Avatar"
                            />
                        </Box>
                    </HStack>
                </HStack>

                <Box
                    bg={cardBgColor}
                    borderRadius="full"
                    p={6}
                    shadow="md"
                    mb={6}
                >
                    <Text fontSize="lg" fontWeight="bold" mb={4} color={textColor}>
                        Daily Actions
                    </Text>
                    <HStack spacing={4}>
                        <QuizButton />

                        <DiaryButton />
                    </HStack>
                </Box>

                <Box
                    bg={cardBgColor}
                    borderRadius="full"
                    p={6}
                    shadow="md"
                    mb={6}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <VStack align="flex-start">
                        <Text fontSize="lg" fontWeight="bold" color={textColor}>
                            Current Status
                        </Text>
                        <Text fontSize="sm" color={subTextColor}>
                            Last updated: Today, 9:00 AM
                        </Text>
                    </VStack>
                    <HStack>
                        <Text fontSize="xl" fontWeight="bold" color="blue.500">
                            Mood Level 75%
                        </Text>
                        <Text fontSize="xl" fontWeight="bold" color="red.500">
                            Stress Level 25%
                        </Text>
                    </HStack>
                </Box>

                <Box
                    bg={cardBgColor}
                    borderRadius="full"
                    p={6}
                    shadow="md"
                    mb={6}
                    height="200px"
                >
                    <Text fontSize="lg" fontWeight="bold" mb={4} color={textColor}>
                        Weekly Mood Trends
                    </Text>
                    <Box bg="gray.200" height="100%" borderRadius="md"></Box>
                </Box>

                <AIHealthPredictions />

                <Box bg={cardBgColor} borderRadius="full" p={6} shadow="md" mt={6}>
                    <Text fontSize="lg" fontWeight="bold" mb={4} color={textColor}>
                        Recent Updates
                    </Text>
                    <VStack align="flex-start" spacing={4}>
                        <HStack justifyContent="space-between" width="100%">
                            <Text color={textColor}>Daily mood check completed</Text>
                            <Text fontSize="sm" color={subTextColor}>
                                2 hours ago
                            </Text>
                        </HStack>
                        <HStack justifyContent="space-between" width="100%">
                            <Text color={textColor}>New meditation session available</Text>
                            <Text fontSize="sm" color={subTextColor}>
                                5 hours ago
                            </Text>
                        </HStack>
                        <HStack justifyContent="space-between" width="100%">
                            <Text color={textColor}>Weekly report ready</Text>
                            <Text fontSize="sm" color={subTextColor}>
                                1 day ago
                            </Text>
                        </HStack>
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
};

export default MainPage;

