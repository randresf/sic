import { mode } from "@chakra-ui/theme-tools"
// import { app_brand } from "./general"

export const Card = {
  baseStyle: (props: Record<string, any>) => ({
    bg: mode("white", "")(props),
    borderRadius: "5%",
    padding: "1rem",
    shadow: "md",
    borderWidth: "1px",
    margin: "0.6rem",
    width: "270px",
    height: "220px",
    flexDirection: "column",
    justifyContent: "space-between",
  }),
}
