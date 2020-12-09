import React from 'react'
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { IconButton, useColorMode } from "@chakra-ui/react"
import { NAVABAR_LIST } from '../ui/formIds'

const Toggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="toggleDarkMode"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      id={NAVABAR_LIST.darkMode}
    />
  )
}

export default Toggle
