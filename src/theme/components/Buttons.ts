import { mode } from "@chakra-ui/theme-tools"
import { app_brand, btnProps } from "./general"

export const PrimaryButton = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode(app_brand.actionsFont, app_brand.darkFont)(props),
    bg: mode(app_brand.actions, app_brand.darkActions)(props),
    ...btnProps,
    fontWeight: 600,
  }),
}

export const DefaultButton = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode(app_brand.actions, app_brand.darkActions)(props),
    border: `1px solid ${mode(
      app_brand.actions,
      app_brand.darkActions
    )(props)}`,
    ...btnProps,
  }),
}
