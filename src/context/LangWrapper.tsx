import React, { useState } from "react"
import { IntlProvider } from "react-intl"
import Spanish from "../lang/es.json"
import English from "../lang/en.json"

export const Context = React.createContext({
  locale: "es",
  selectLanguage: (e: any) => null,
})
const languages: any = {
  es: Spanish,
  en: English,
}
const local = navigator.language

let lang = local === "en" ? English : Spanish

const LangWrapper = (props: any) => {
  const [state, setState] = useState({ locale: local, messages: lang })

  function selectLanguage(e: any) {
    const newLocale = e.target.value
    setState({ locale: newLocale, messages: languages[newLocale] || Spanish })
    return null
  }

  return (
    <Context.Provider value={{ locale: state.locale, selectLanguage }}>
      <IntlProvider {...state}>{props.children}</IntlProvider>
    </Context.Provider>
  )
}

export default LangWrapper
