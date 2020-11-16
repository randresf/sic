import MSGS from '../locale/es'

const isPersonalDataValid = ({
  cedula,
  nombre,
  apellido,
  telefono,
  correo,
  date,
}) => {
  const errors = {}
  //required field
  if (!cedula) {
    errors.cedula = MSGS.REQUIRED
  }
  if (!nombre) {
    errors.nombre = MSGS.REQUIRED
  }
  if (!apellido) {
    errors.apellido = MSGS.REQUIRED
  }
  if (!telefono) {
    errors.telefono = MSGS.REQUIRED
  }
  if (!correo) {
    errors.correo = MSGS.REQUIRED
  }
  if (!date) {
    errors.date = MSGS.REQUIRED
  } else if (date.substr(0, 4) >= 2017) {
    errors.date = "incorrect date"
  }

  //exceptions
  if (String(telefono).length !== 7 && String(telefono).length !== 10) {
    errors.telefono = "incorrect phone"
  }

  const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
  if (!regex.test(correo)) {
    errors.correo = "incorrect email"
  }

  return errors
}

export default isPersonalDataValid
