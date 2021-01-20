import { mode } from "@chakra-ui/theme-tools"
import { app_brand } from "./components/general"
const Globals = {
  global: (props: any) => ({
    body: {
      color: mode(app_brand.font, app_brand.darkFont)(props),
      bg: mode(app_brand.bg, app_brand.darkBg)(props),
      h1: {
        color: app_brand.titles,
        fontWeight: "700",
        fontSize: "large",
        marginRight: "0px",
      },
      h2: {
        color: app_brand.font,
      },
      a: {
        color: app_brand.titles,
        fontWeight: "600",
      },
    },
  }),
}
export default Globals
