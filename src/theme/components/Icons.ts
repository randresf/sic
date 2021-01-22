import { mode } from "@chakra-ui/theme-tools"
import { app_brand, iconBtnProps } from "./general"

export const IconEdit = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode(app_brand.actionsFont, app_brand.darkFont)(props),
    bg: mode(app_brand.actions, app_brand.darkActions)(props),
    ...iconBtnProps,
  }),
}

export const IconDelete = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode(app_brand.actions, app_brand.darkActions)(props),
    border: `1px solid ${mode(
      app_brand.actions,
      app_brand.darkActions
    )(props)}`,
    ...iconBtnProps,
  }),
}

export const IconReservation = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode(app_brand.actionsFont, app_brand.darkFont)(props),
    bg: mode(app_brand.actions, app_brand.darkActions)(props),
    ...iconBtnProps,
  }),
}

export const IconPlus = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode(app_brand.actions, app_brand.darkActions)(props),
  }),
}