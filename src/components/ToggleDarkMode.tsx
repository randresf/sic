import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { IconButton, useColorMode } from "@chakra-ui/react"
import React from "react"
import { app_brand } from "../theme/components/general"
import { NAVABAR_LIST } from "../ui/formIds"

const Toggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="toggleDarkMode"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      id={NAVABAR_LIST.darkMode}
      color={colorMode === "dark" ? app_brand.darkActions : app_brand.actions}
      borderColor={
        colorMode === "dark" ? app_brand.darkActions : app_brand.actions
      }
      borderWidth="1px"
      h={["1.5rem", "2rem"]}
      minW={["1.5rem", "2rem"]}
    />
  )
}

export default Toggle
