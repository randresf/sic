import { mode } from "@chakra-ui/theme-tools"
import { app_brand, TabSectionStyles, TabStyles } from "./general"

export const Tabs = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode(app_brand.titles, app_brand.darkFont)(props),
    bg: mode(app_brand.section, app_brand.darkActions)(props),
    ...TabStyles,
  }),
}

export const TabSection = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode(app_brand.secondIcon, app_brand.darkFont)(props),
    bg: mode(app_brand.actionsFont, app_brand.darkActions)(props),
    ...TabSectionStyles,
  }),
}
