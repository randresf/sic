import { Box, Container, Flex, Link, Stack } from "@chakra-ui/react"
import React from "react"
import Logo from "../../components/Logo"
import { Link as ScrollLink } from "react-scroll"
import LangDropDown from "../../components/LangDropDown"
import ToggleDarkMode from "../../components/ToggleDarkMode"
import { useIntl } from "react-intl"
import DisplayText from "../../components/formElements/DisplayMessage"

const NavBarLanding = () => {
  const { formatMessage } = useIntl()

  const styles = {
    headerBtn: {
      cursor: "pointer",
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
        cursor: "pointer",
        fontFamily: "Lato",
        textDecoration: "none",
        fontSize: "20px",
        color: "#000",
        fontWeight: 900,
        margin: "0 20px 0 0",
        transition: "500ms",
        ":last-child": {
          mr: "0",
        },
        "&:hover, &.active": {
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          height: "3px",
          backgroundColor: "#000",
          opacity: 0,
          " -webkit-transform": "translateY(8px)",
          transitionProperty: "-webkit-transform, opacity",
          transitionDuration: ".3s",
        },
        "&:hover, &:before": {
          "-webkit-transform": "translateY(0)",
          opacity: 1,
        },
      },
    },
  }

  const menuItems = [
    {
      path: "banner",
      label: formatMessage({ id: "landing.navbar.home" }),
    },
    {
      path: "services",
      label: formatMessage({ id: "landing.navbar.services" }),
    },
    {
      path: "customers",
      label: formatMessage({ id: "landing.navbar.custumer" }),
    },
    {
      path: "PQR",
      label: formatMessage({ id: "landing.navbar.pqr" }),
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
        <Link path="/" ml={2} sx={styles.headerBtn} variant="buttons.primary">
          <DisplayText id="landing.navbar.btn" defaultMessage="Login" />
        </Link>
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
