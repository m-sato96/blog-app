import React from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { CiLogout } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const Logout = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      localStorage.clear();
      navigate("/login");
    });
  };
  return (
    <Box textAlign="center" marginTop="80px">
      <Heading as="h2">Logout</Heading>
      <Button marginTop="24px" leftIcon={<CiLogout />} colorScheme="teal" variant="solid" size="sm" onClick={logOut}>
        ログアウト
      </Button>
    </Box>
  );
};
