import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postsText, setPostsText] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    !isAuth && navigate("/login");
  }, []);
  useEffect(() => {
    postsText && setIsError(false);
  }, [postsText]);
  const createPost = async () => {
    if (!postsText) {
      setIsError(true);
      return;
    }
    const now = new Date();
    const hours = now.getHours().toString();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentDateString = `${now.toLocaleDateString("ja-JP")} ${hours}:${minutes}`;
    await addDoc(collection(db, "posts"), {
      title,
      postsText,
      created_at: currentDateString,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        img: auth.currentUser.photoURL,
      },
    });
    navigate("/");
  };
  return (
    <Box maxW="1000px" m="auto" p="80px 16px 16px">
      <Heading as="h2" size="md" m="20px auto 60px" textAlign="center">
        新規記事作成
      </Heading>
      <Text fontWeight="600">タイトル</Text>
      <Input
        variant="flushed"
        placeholder="記事タイトル入力"
        marginBottom="40px"
        focusBorderColor="teal.500"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Text fontWeight="600" mb="8px">
        記事内容
      </Text>
      <Textarea
        colorScheme="teal"
        placeholder="記事内容入力"
        size="sm"
        h="200px"
        focusBorderColor="teal.500"
        onChange={(e) => {
          setPostsText(e.target.value);
        }}
      />
      {isError && (
        <Text mt={1} color="red" fontSize="14px" position="absolute" bottom={110}>
          記事内容は必須です
        </Text>
      )}
      <Button colorScheme="teal" variant="solid" m="40px auto" display="block" onClick={createPost}>
        投稿する
      </Button>
    </Box>
  );
};
