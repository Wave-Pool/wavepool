import React, { useContext } from "react";
import LoginButton from "./LoginButton";
import { Flex, Spacer, chakra, useColorMode, Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { UserContext } from "../../contexts/UserContext";

import Search from "./Search/Search";

function Nav(props: any) {
  const {colorMode, toggleColorMode} = useColorMode();
  const { isLoggedIn }: any = useContext(UserContext);
  return (
    <Flex>
            <chakra.h1
    fontSize="4xl"
    m={4}
    >Wavepool 🌊 </chakra.h1>
    <Spacer/>
    <Button 
    m={4}
    variant='ghost'
    onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon/> : <SunIcon/>}
      </Button>
      {!isLoggedIn ? (
          <LoginButton />
      ) : (
          <Search />
      )}

    </Flex>
  );
}

export default Nav;
