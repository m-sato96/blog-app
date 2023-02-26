import React, { useState } from "react";
import { Box, Button, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postsText, setPostsText] = useState("");
  const navigate = useNavigate();
  const createPost = async () => {
    await addDoc(collection(db, "posts"), {
      title,
      postsText,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    navigate("/");
  };
  return (
    <Box maxW="1000px" m="auto" p="16px">
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
        投稿内容
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
      <Button colorScheme="teal" variant="solid" m="40px auto" display="block" onClick={createPost}>
        投稿する
      </Button>
    </Box>
  );
};
