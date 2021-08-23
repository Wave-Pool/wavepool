import React, {useContext, useState, useEffect} from 'react'
import {
    Flex,
    Box,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react"
import {UserContext }from "../../../contexts/UserContext"
import RecentlyPlayedList from './RecentlyPlayedList';
export const RecentlyPlayed = () => {
const [seeMore, setSeeMore] = useState<boolean>(false)
const {recentPlays, userObj, getRecentlyPlayed} = useContext(UserContext);
useEffect(() => {
  const interval = setInterval(() => {
    getRecentlyPlayed();
  }, 180000);
  return () => clearInterval(interval);
}, []);
return (
    <Flex
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("brand.100", "brand.800")}
        maxW="2xl"
      >

        <Box mt={2}>
          <Link
            fontSize="2xl"
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
            _hover={{
              color: useColorModeValue("gray.600", "gray.200"),
              textDecor: "underline",
            }}
          >
            Recently Played
          </Link>

          {recentPlays && <div>
          {seeMore ? <RecentlyPlayedList recentPlays={recentPlays.slice(0,5)}/> :
          <RecentlyPlayedList recentPlays={recentPlays.slice(0,2)}/>}</div>}
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link
            color={useColorModeValue("brand.600", "brand.400")}
            _hover={{ textDecor: "underline" }}
            onClick={() => {setSeeMore(!seeMore)}}
          >
            {seeMore ? <Text>See Less</Text>: <Text>See More</Text>}
          </Link>

          <Flex alignItems="center">
            <Link
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
            >
             {userObj.user_name}
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export default RecentlyPlayed