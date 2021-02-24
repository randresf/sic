import moment from "moment"
import { DATE_FORMAT } from "../constants"

moment.locale("es", {
  months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_de Diciembre".split(
    "_"
  ),
  monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split(
    "_"
  ),
  weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
  weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
  weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
})

export const formatDate = (strDate: string) =>
  moment(strDate).format(DATE_FORMAT)

export const formatAgeDate = (strDate: string) =>
  moment(strDate).format("YYYY-MM-DDTHH:MM")
