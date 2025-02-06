import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";

const QuizButton = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/quiz");
    };

    return (
        <Button
            colorScheme="green"
            size="lg"
            onClick={handleNavigation}
        >
            Daily quiz
        </Button>
    );
};

export default QuizButton;