import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";

const DiaryButton = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/diary/create");
    };

    return (
        <Button colorScheme="purple" size="md">
            Create
        </Button>
    );
};

export default DiaryButton;