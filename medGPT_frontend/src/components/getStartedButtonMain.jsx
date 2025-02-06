import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const GetStartedButton = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/signup");
    };

    return (
        <Button colorScheme="purple" size="lg" onClick={handleNavigation}>
            Get Started
        </Button>
    );
};

export default GetStartedButton;
