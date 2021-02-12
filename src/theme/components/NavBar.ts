import { mode } from "@chakra-ui/theme-tools"
import { app_brand, NavBarStyles, NavBarScrolled } from "./general"

export const NavBarMode = {
  baseStyle: (props: Record<string, any>) => ({
    bg: mode(app_brand.section, app_brand.darkSection)(props),
    ...NavBarStyles,
    ...NavBarScrolled,
  }),
}
