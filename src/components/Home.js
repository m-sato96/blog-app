import React, { useEffect, useState } from "react";
import { Card, CardBody, Text, Box, Heading, Button, Stack, StackDivider, Image } from "@chakra-ui/react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

export const Home = () => {
  const [postList, setPostList] = useState([]);
  const getPosts = async () => {
    const data = await getDocs(collection(db, "posts"));
    setPostList(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };
  useEffect(() => {
    getPosts();
  }, []);
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    getPosts();
  };
  return (
    <Box p={4} pl={16} maxW="1000px" m="40px auto">
      {postList.map((post) => {
        return (
          <Card m="0 0 40px" key={post.id}>
            <CardBody>
              {post.author.img && (
                <Box
                  boxSize="40px"
                  position="absolute"
                  top="0px"
                  left="-51px"
                  border="1px solid"
                  borderColor="gray.100"
                  borderRadius="full"
                >
                  <Image src={post.author.img} alt="" borderRadius="full" />
                </Box>
              )}
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {post.title}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {post.postsText}
                  </Text>
                  <Text pt="2" fontSize="12px" color="gray" textAlign="right">
                    {post.date}
                  </Text>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Text
                    color="gray"
                    fontSize="sm"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "75%",
                    }}
                  >
                    {post.author.username}
                  </Text>
                  {auth.currentUser && post.author.id === auth.currentUser.uid && (
                    <Button colorScheme="orange" variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                      削除
                    </Button>
                  )}
                </Box>
              </Stack>
            </CardBody>
          </Card>
        );
      })}
    </Box>
  );
};
