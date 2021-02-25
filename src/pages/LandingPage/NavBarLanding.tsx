import { Box, Container, Flex, Link } from "@chakra-ui/react"
import React from "react"
import Logo from "../../components/Logo"

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
        fontWeight: "400",
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
      <Container sx={styles.container}>
        <Logo />

        <Box as="nav" sx={styles.nav}>
          {menuItems.map(({ path, label }, i) => (
            <Link
              activeClass="active"
              sx={styles.nav.navLink}
              to={path}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              key={i}
            >
              {label}
            </Link>
          ))}
        </Box>
        <Link
          path="/"
          ml={2}
          label="Purchase Now"
          sx={styles.headerBtn}
          variant="buttons.primary"
        />
      </Container>
    </Flex>
  )
}

export default NavBarLanding
