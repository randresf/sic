import { Box } from "@chakra-ui/react"
import React, { useContext } from "react"
import { Context } from "../context/LangWrapper"

const LangDropDown = (props: any) => {
  const { locale, selectLanguage } = useContext(Context)
  const otherOption = locale === "es" ? "en" : "es"
  return (
    <Box className="LangDropDown">
      <Box
        as="a"
        onClick={(e) => {
          selectLanguage({ target: { value: otherOption } })
        }}
        cursor="pointer"
      >
        Lang: {otherOption.toUpperCase()}
      </Box>
    </Box>
  )
}
export default LangDropDown
