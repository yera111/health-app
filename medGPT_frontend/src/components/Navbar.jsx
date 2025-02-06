import {
	Box,
	Button,
	Container,
	Flex,
	Text,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container maxW={"900px"}>
			<Box
				px={4}
				my={4}
				borderRadius="full"
				bg={useColorModeValue("gray.200", "gray.700")}
			>
				<Flex h="16" alignItems={"center"} justifyContent={"space-between"}>
					<Text
						fontSize="3xl"
						p={3}
						fontWeight="bold"
						as={Link}
						to="/"
						borderRadius="full"
						_hover={{ textDecoration: "none", color: "blue.500" }}
					>
						MedGPT
					</Text>

					<Flex gap={3} alignItems={"center"}>
						<Button onClick={toggleColorMode}>
							{colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
						</Button>
						<Button as={Link} to="/main" variant="link">
							Main
						</Button>
						<Button as={Link} to="/analysis" variant="link">
							Analysis
						</Button>
						<Button as={Link} to="/diary" variant="link">
							Diary
						</Button>
						<Button as={Link} to="/quiz" variant="link">
							Quiz
						</Button>
					</Flex>
				</Flex>
			</Box>
		</Container>
	);
};

export default Navbar;
