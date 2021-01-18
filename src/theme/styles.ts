import { mode } from "@chakra-ui/theme-tools"
export default {
  global: (props: any) => ({
    body: {
      fontFamily: "'Lato', sans-serif;",
      color: mode("teal.900", "whiteAlpha.900")(props),
      bg: mode("white", "teal.900")(props),
    },

  }),
}
