import React, { useEffect, useState } from "react";
import { Card, CardBody, Text, Box, Heading, Button, Stack, StackDivider, Image } from "@chakra-ui/react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

export const Home = () => {
  const [postList, setPostList] = useState([]);
  const getPosts = async () => {
    const data = await getDocs(collection(db, "posts"));
    // dataから新しい配列を作成してソートした値をsetPostList()に渡す
    const sortedPostList = data.docs
      .map((doc) => ({
        ...doc.data(),
        created_at: new Date(Date.parse(doc.data().created_at)),
        id: doc.id,
      }))
      .sort((a, b) => b.created_at - a.created_at);
    setPostList(sortedPostList);
  };
  useEffect(() => {
    getPosts();
  }, []);
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    getPosts();
  };
  const dateFormat = (updateDate) => {
    const hours = updateDate.getHours().toString();
    const minutes = updateDate.getMinutes().toString().padStart(2, "0");

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const updateDateString = updateDate.toLocaleDateString("ja-JP", options);
    const todayDateString = today.toLocaleDateString("ja-JP", options);
    const yesterdayDateString = yesterday.toLocaleDateString("ja-JP", options);

    if (oneWeekAgo.getTime() < updateDate.getTime()) {
      if (updateDateString === todayDateString) {
        return `${hours}:${minutes}`;
      } else if (updateDateString === yesterdayDateString) {
        return "昨日";
      } else {
        const options = {
          weekday: "short",
        };
        return `${updateDate.toLocaleDateString("ja-JP", options)}曜日`;
      }
    } else {
      return updateDateString;
    }
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
                    {dateFormat(post.created_at)}
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
                    <Button colorScheme="orange" variant="ghost" size="sm" pr={0} onClick={() => deletePost(post.id)}>
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
