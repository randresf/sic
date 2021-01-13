import { Box, Select } from "@chakra-ui/react"
import React, { useContext } from "react"
import { Context } from "../context/LangWrapper"

const LangDropDown = (props: any) => {
  const context = useContext(Context)
  return (
    <Box className="LangDropDown">
      <Select
        value={context.locale}
        variant="unstled"
        onChange={context.selectLanguage}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </Select>
    </Box>
  )
}
export default LangDropDown
