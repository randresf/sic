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
  // console.log(String(telefono).length)
  // if (String(telefono).length !== 7 || String(telefono).length !== 10) {
  //   errors.telefono = "telefono incorrecto"
  // }
  if (!correo) {
    errors.correo = "Required"
  }
  if (!date) {
    errors.date = "Required"
  }

  return errors
}

export default isPersonalDataValid
