import React from "react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { IconButton, useColorMode } from "@chakra-ui/react"
import { NAVABAR_LIST } from "../ui/formIds"
import { app_brand } from "../theme/components/general"

const Toggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="toggleDarkMode"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      id={NAVABAR_LIST.darkMode}
      color={colorMode === "dark" ? app_brand.darkActions : app_brand.actions}
      bg={colorMode === "dark" ? app_brand.actions : app_brand.darkActions}
    />
  )
}

export default Toggle
