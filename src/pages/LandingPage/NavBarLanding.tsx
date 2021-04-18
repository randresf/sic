import { Box, Container, Flex, Link, Stack } from "@chakra-ui/react"
import React from "react"
import Logo from "../../components/Logo"
import { Link as ScrollLink } from "react-scroll"
import LangDropDown from "../../components/LangDropDown"
import ToggleDarkMode from "../../components/ToggleDarkMode"

const NavBarLanding = () => {
  const styles = {
    headerBtn: {
      backgroundColor: "black",
      fontSize: "16px",
      fontWeight: "bold",
      letterSpacing: "-0.16px",
      borderRadius: "5px",
      color: "#ffffff",
      padding: "6.5px 24px",
      display: ["none", null, null, null, "inline-block"],
      ml: ["0", null, null, "auto", "0"],
      mr: ["0", null, null, "20px", "0"],
      "&:hover": {
        color: "#fff",
      },
    },
    header: {
      color: "text_white",
      fontWeight: "normal",
      py: "25px",
      width: "100%",
      top: 0,
      left: 0,
      backgroundColor: "transparent",
      transition: "all 0.4s ease",
      "&.sticky": {
        backgroundColor: "background",
        color: "text",
        py: "15px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
      },
    },
    container: {
      display: "flex",
      alignItems: "center",
      width: [null, null, null, null, null, null, "1390px"],
      "@media screen and (max-width: 960px)": {
        justifyContent: "space-between",
      },
    },
    nav: {
      mx: "auto",
      "@media screen and (max-width: 960px)": {
        display: "none",
      },
      navLink: {
        fontSize: "16px",
        color: "#02073E",
        fontWeight: 400,
        cursor: "pointer",
        lineHeight: "1.2",
        mr: "48px",
        transition: "500ms",
        ":last-child": {
          mr: "0",
        },
        "&:hover, &.active": {
          color: "primary",
        },
      },
    },
  }

  const menuItems = [
    {
      path: "banner",
      label: "Home",
    },
    {
      path: "services",
      label: "Services",
    },
    {
      path: "pricing",
      label: "Pricing",
    },
    {
      path: "testimonials",
      label: "Testimonials",
    },
    {
      path: "news",
      label: "News",
    },
  ]

  return (
    <Flex as="header" sx={styles.header}>
      <Box w="100px">
        <Logo />
      </Box>
      <Container sx={styles.container}>
        <Flex as="nav" sx={styles.nav}>
          {menuItems.map(({ path, label }, i) => (
            <ScrollLink
              activeClass="active"
              to={`${path}`}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              style={{ ...styles.nav.navLink }}
              key={i}
            >
              {label}
            </ScrollLink>
          ))}
        </Flex>
        <Link
          path="/"
          ml={2}
          label="Purchase Now"
          sx={styles.headerBtn}
          variant="buttons.primary"
        />
      </Container>
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
            <LangDropDown />
            <ToggleDarkMode />
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NavBarLanding
