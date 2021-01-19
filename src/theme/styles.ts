import { mode } from "@chakra-ui/theme-tools"
const Globals = {
  global: (props: any) => ({
    body: {
      color: mode("teal.900", "orange.50")(props),
      bg: mode("orange.50", "teal.900")(props),
    },
  }),
}
export default Globals
