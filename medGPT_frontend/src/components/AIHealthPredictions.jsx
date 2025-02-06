import React from "react";
import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
    useColorModeValue,
    Badge,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { FiTrendingUp } from "react-icons/fi";

const AIHealthPredictions = () => {
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const cardBgColor = useColorModeValue("teal.500", "teal.400");
    const cardTextColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.800", "white");

    return (
        <Box bg={bgColor} p={6} borderRadius="full" shadow="md" mt={6}>
            <Heading as="h3" size="md" mb={4} color={textColor}>
                AI Health Predictions
            </Heading>

            <Box
                bg={cardBgColor}
                color={cardTextColor}
                p={4}
                borderRadius="full"
                mb={6}
                display="flex"
                alignItems="center"
            >
                <CheckCircleIcon boxSize={5} mr={3} />
                <Text>No immediate health risks detected</Text>
            </Box>

            <Heading as="h4" size="sm" mb={4} color={textColor}>
                Recent Insights
            </Heading>
            <VStack align="start" spacing={4}>
                <HStack align="center" spacing={3}>
                    <Icon as={FiTrendingUp} color="blue.500" />
                    <Text fontSize="sm" color={textColor}>
                        Your sleep quality has improved by 15% this week
                    </Text>
                </HStack>

                <HStack align="center" spacing={3}>
                    <WarningIcon color="yellow.500" />
                    <Text fontSize="sm" color={textColor}>
                        Screen time has increased - consider taking more breaks
                    </Text>
                </HStack>
            </VStack>
        </Box>
    );
};

export default AIHealthPredictions;
