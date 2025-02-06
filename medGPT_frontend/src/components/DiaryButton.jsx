import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";

const DiaryButton = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/diary");
    };

    return (
        <Button
            colorScheme="blue"
            size="lg"
            onClick={handleNavigation}
        >
            Diary
        </Button>
    );
};

export default DiaryButton;