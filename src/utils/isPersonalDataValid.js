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
    errors.cedula = "Required"
  }
  if (!nombre) {
    errors.nombre = "Required"
  }
  if (!apellido) {
    errors.apellido = "Required"
  }
  if (!telefono) {
    errors.telefono = "Required"
  }
  if (!correo) {
    errors.correo = "Required"
  }
  if (!date) {
    errors.date = "Required"
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
