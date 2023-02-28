import React, { useEffect, useState } from "react";
import { Card, CardBody, Text, Box, Heading, Button, Stack, StackDivider } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const Home = () => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      setPostList(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getPosts();
  }, []);
  return (
    <Box p={4} maxW="1000px" m=" 40px auto">
      {postList.map((post) => {
        return (
          <Card m="0 0 40px" key={post.id}>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {post.title}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {post.postsText}
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
                    @{post.author.username}
                  </Text>
                  <Button colorScheme="orange" variant="ghost" size="sm">
                    削除
                  </Button>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        );
      })}
    </Box>
  );
};
