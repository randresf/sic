import { mode } from "@chakra-ui/theme-tools"
import { app_brand } from "./general"

export const Link = {
    baseStyle: (props: Record<string, any>) => ({
        color: mode(app_brand.titles, app_brand.darkActions)(props),
        fontWeight: "600",
    }),
  }
  