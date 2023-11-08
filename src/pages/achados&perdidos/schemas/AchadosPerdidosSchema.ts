import * as yup from "yup"
import { a_p } from "../../../model/Achados&Perdidos"

export const AchadosPerdidosSchema = yup
  .object<a_p>({
    material: yup.string().required("Este campo é obrigatório"),
    local: yup.string().required("Este campo é obrigatório"),
    campus: yup.string().required("Este campo é obrigatório"),
  })
  .required()