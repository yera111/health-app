import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/api";
import { useAuthStore } from "../utils/authStore";

const LogoutButton = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        try {
            await logoutUser();
            logout();
            toast({
                title: "Вы вышли из системы.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/signin");
        } catch (error) {
            toast({
                title: "Ошибка выхода.",
                description: error.response?.data?.message || "Не удалось выйти из системы.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Button colorScheme="red" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
