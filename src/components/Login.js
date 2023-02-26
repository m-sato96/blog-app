import React from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { CiUser } from "react-icons/ci";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

export const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const logInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
      navigate("/");
    });
  };
  return (
    <Box textAlign="center" marginTop="80px">
      <Heading as="h2">Login</Heading>
      <Button marginTop="24px" leftIcon={<CiUser />} colorScheme="teal" variant="solid" size="sm" onClick={logInWithGoogle}>
        Googleでログイン
      </Button>
    </Box>
  );
};
