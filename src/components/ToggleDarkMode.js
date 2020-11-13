import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { IconButton, useColorMode } from "@chakra-ui/react"

const Toggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      onClick={toggleColorMode}
      arial-label="toggleDarkMode"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
    />
  )
}

export default Toggle
