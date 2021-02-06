import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, Flex, Stack, Text } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import { Link } from "react-router-dom"
import { NAVABAR_LIST } from "../ui/formIds"
import Account from "./Account"
import LangDropDown from "./LangDropDown"
import Logo from "./Logo"
import ToggleDarkMode from "./ToggleDarkMode"

type MenuItemProps = {
  children?: ReactNode
  isLast?: boolean
}

const MenuItems = (props: MenuItemProps) => {
  const { children, isLast, ...rest } = props
  return (
    <Text
      mb={{ base: isLast ? 0 : 3, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 3 }}
      display="block"
      {...rest}
    >
      {children}
    </Text>
  )
}

const NavBar = (props: any) => {
  const [show, setShow] = React.useState(false)
  const toggleMenu = () => setShow(!show)
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      borderBottom="1px solid rgb(62, 70, 133)"
      w="100%"
      mb={8}
      p={5}
      {...props}
    >
      <Flex align="flex-start">
        <Box display={{ base: "flex", md: "none" }} onClick={toggleMenu}>
          {show ? <CloseIcon /> : <HamburgerIcon />}
        </Box>
        <Box w={["30px", "30px", "50px"]} ml={["1rem"]}>
          <Link to="/" id={NAVABAR_LIST.logo}>
            <Logo />
          </Link>
        </Box>
      </Flex>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="flex-start"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <Box display={{ base: show ? "block" : "none", md: "none" }}>
            <MenuItems>
              <Account />
            </MenuItems>
          </Box>
          <MenuItems>
            <Link to="/meetings">Eventos</Link>{" "}
          </MenuItems>
          <MenuItems isLast={!show}>
            <Link to="/reservation">Reservas</Link>
          </MenuItems>
          <Box display={{ base: show ? "block" : "none", md: "none" }}>
            <MenuItems isLast={show}>
              <LangDropDown />
            </MenuItems>
          </Box>
        </Flex>
      </Box>
      <Flex>
        <Flex
          display={["none", "none", "flex"]}
          align={"center"}
          justify={"flex-end"}
          direction={"row"}
          pt={[4, 4, 0, 0]}
          mr="1rem"
        >
          <Stack spacing="1rem" direction="row">
            <Account />
            <LangDropDown />
          </Stack>
        </Flex>
        {show ? null : <ToggleDarkMode />}
      </Flex>
    </Flex>
  )
}

export default NavBar
