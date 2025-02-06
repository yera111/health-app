import React from "react";
import {
    Box,
    Text,
    Heading,
    SimpleGrid,
    VStack,
    Icon,
    useColorModeValue,
} from "@chakra-ui/react";
import { FiActivity, FiAlertCircle, FiBarChart2 } from "react-icons/fi";

const CoreFeatures = () => {
    const textColor = useColorModeValue("gray.800", "white");
    const subTextColor = useColorModeValue("gray.500", "gray.400");

    return (
        <Box py={16} bg={useColorModeValue("gray.50", "gray.800")}>
            <Heading
                as="h2"
                size="lg"
                textAlign="center"
                mb={8}
                color={textColor}
            >
                Core Features
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW="6xl" mx="auto">
                <VStack spacing={4} align="center">
                    <Box
                        w={16}
                        h={16}
                        bg="purple.100"
                        color="purple.500"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Icon as={FiActivity} boxSize={8} />
                    </Box>
                    <Text fontWeight="bold" fontSize="lg" color={textColor}>
                        Daily Tracking
                    </Text>
                    <Text fontSize="sm" textAlign="center" color={subTextColor}>
                        Monitor symptoms, mood, steps & sleep
                    </Text>
                </VStack>

                <VStack spacing={4} align="center">
                    <Box
                        w={16}
                        h={16}
                        bg="cyan.100"
                        color="cyan.500"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Icon as={FiBarChart2} boxSize={8} />
                    </Box>
                    <Text fontWeight="bold" fontSize="lg" color={textColor}>
                        AI Insights
                    </Text>
                    <Text fontSize="sm" textAlign="center" color={subTextColor}>
                        Get personalized health recommendations
                    </Text>
                </VStack>

                <VStack spacing={4} align="center">
                    <Box
                        w={16}
                        h={16}
                        bg="orange.100"
                        color="orange.500"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Icon as={FiAlertCircle} boxSize={8} />
                    </Box>
                    <Text fontWeight="bold" fontSize="lg" color={textColor}>
                        Early Alerts
                    </Text>
                    <Text fontSize="sm" textAlign="center" color={subTextColor}>
                        Receive proactive health warnings
                    </Text>
                </VStack>
            </SimpleGrid>
        </Box>
    );
};

export default CoreFeatures;
