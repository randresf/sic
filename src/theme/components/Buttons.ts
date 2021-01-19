import { mode } from "@chakra-ui/theme-tools"
import { btnProps } from "./general"

export const PrimaryButton = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode("brand.600", "brand.600")(props),
    bg: mode("brand.100", "brand.300")(props),
    fontWeight: 500,
    ...btnProps,
    _hover: {
      bg: mode("#183A66", "#008fff")(props),
    },
  }),
}

export const DefaultButton = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode("brand.600", "brand.600")(props),
    bg: mode("brand.200", "brand.200")(props),
    fontWeight: 500,
    ...btnProps,
    _hover: {
      bg: mode("#afb2b4", "#bebebe")(props),
    },
  }),
}