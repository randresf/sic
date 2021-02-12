import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, Flex, Stack, Text, useStyleConfig } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import { Link } from "react-router-dom"
import Account from "../components/Account"
import LangDropDown from "../components/LangDropDown"
import Logo from "../components/Logo"
import ToggleDarkMode from "../components/ToggleDarkMode"
import { app_brand } from "../theme/components/general"
import { NAVABAR_LIST } from "../ui/formIds"

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
  const style = useStyleConfig("NavBarMode", props)
  const [show, setShow] = React.useState(false)
  const toggleMenu = () => setShow(!show)
  return (
    <Box background={app_brand.section} shadow="sm" sx={style}>
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        p="1rem"
        as="nav"
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
    </Box>
  )
}

export default NavBar
