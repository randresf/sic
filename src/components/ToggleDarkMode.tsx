import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { IconButton, useColorMode } from "@chakra-ui/react"

const Toggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="toggleDarkMode"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
    />
  )
}

export default Toggle
