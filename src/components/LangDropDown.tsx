import { Box } from "@chakra-ui/react"
import React, { useContext } from "react"
import { Context } from "../context/LangWrapper"

const LangDropDown = (props: any) => {
  const context = useContext(Context)
  return (
    <Box className="LangDropDown">
      <select value={context.locale} onChange={context.selectLanguage}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </Box>
  )
}
export default LangDropDown
