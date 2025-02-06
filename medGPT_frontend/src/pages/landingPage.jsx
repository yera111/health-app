import React from "react";
import {
    Box,
    Heading,
    Text,
} from "@chakra-ui/react";
import GetStartedButton from "../components/getStartedButtonMain.jsx";
import CoreFeatures from "../components/CoreFeatures.jsx";

const LandingPage = () => {
    return (
        <>
            <Box
                bgGradient="linear(to-b, blue.500, teal.400)"
                height="60vh"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
            >
                <Heading color="white" fontSize="4xl" mb={4}>
                    Stay Ahead of Your Health with AI
                </Heading>
                <Text color="white" fontSize="lg" mb={6}>
                    Monitor your well-being, uncover trends, and receive early alerts for
                    potential health risks.
                </Text>
                <GetStartedButton />
            </Box>

            <Box>
                <CoreFeatures />
            </Box>
        </>
    );
};

export default LandingPage;

