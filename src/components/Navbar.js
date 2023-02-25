import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useMediaQuery,
  VStack,
  StackDivider,
  HStack,
} from "@chakra-ui/react";
import { VscMenu, VscClose } from "react-icons/vsc";
import { CiHome, CiEdit, CiLogin } from "react-icons/ci";

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);
  return (
    <Box boxShadow="sm">
      <Flex align="center" justify="space-between" p="4" maxW="1000px" margin="auto">
        <Heading as="h1" size="md">
          Blog App
        </Heading>
        {isLargerThan768 ? (
          <HStack spacing={10}>
            <Box>
              <Link to="/" style={{ width: "100%" }}>
                <Flex alignItems="center">
                  <CiHome style={{ marginRight: "8px" }} size="20" />
                  ホーム
                </Flex>
              </Link>
            </Box>
            <Box>
              <Link to="/createpost">
                <Flex alignItems="center">
                  <CiEdit style={{ marginRight: "8px" }} size="20" />
                  記事投稿
                </Flex>
              </Link>
            </Box>
            <Box>
              <Link to="/login">
                <Flex alignItems="center">
                  <CiLogin style={{ marginRight: "8px" }} size="20" />
                  ログイン
                </Flex>
              </Link>
            </Box>
          </HStack>
        ) : (
          <>
            <IconButton icon={<VscMenu size="20" />} onClick={handleDrawerOpen} aria-label="menu" variant="ghost" />
            <Drawer placement="right" onClose={handleDrawerClose} isOpen={isDrawerOpen}>
              <DrawerOverlay>
                <DrawerContent>
                  <Box ml="auto" p={4}>
                    <IconButton icon={<VscClose size="25" />} onClick={handleDrawerClose} aria-label="menu" variant="ghost" />
                  </Box>

                  <DrawerBody>
                    <VStack
                      divider={<StackDivider borderColor="gray.200" />}
                      spacing={4}
                      align="stretch"
                      onClick={handleDrawerClose}
                    >
                      <Box>
                        <Link to="/" style={{ width: "100%" }}>
                          <Flex alignItems="center">
                            <CiHome style={{ marginRight: "8px" }} size="20" />
                            ホーム
                          </Flex>
                        </Link>
                      </Box>
                      <Box>
                        <Link to="/createpost">
                          <Flex alignItems="center">
                            <CiEdit style={{ marginRight: "8px" }} size="20" />
                            記事投稿
                          </Flex>
                        </Link>
                      </Box>
                      <Box>
                        <Link to="/login">
                          <Flex alignItems="center">
                            <CiLogin style={{ marginRight: "8px" }} size="20" />
                            ログイン
                          </Flex>
                        </Link>
                      </Box>
                    </VStack>
                    <Box textAlign="center" marginTop="80px">
                      Blog App
                    </Box>
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </>
        )}
      </Flex>
    </Box>
  );
};
