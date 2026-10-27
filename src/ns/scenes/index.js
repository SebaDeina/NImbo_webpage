import { Agentes, AGENTES } from './Agentes'
import { Automatizacion, AUTOMATIZACION } from './Automatizacion'
import { Datos, DATOS } from './Datos'
import { Encuentro, ENCUENTRO } from './Encuentro'
import { Mascot, MASCOT } from './Mascot'
import { Software, SOFTWARE } from './Software'

export const FIGS = {
  agentes: { C: Agentes, meta: AGENTES },
  automatizacion: { C: Automatizacion, meta: AUTOMATIZACION },
  datos: { C: Datos, meta: DATOS },
  software: { C: Software, meta: SOFTWARE },
  encuentro: { C: Encuentro, meta: ENCUENTRO },
  mascota: { C: Mascot, meta: MASCOT, w: MASCOT.width, h: MASCOT.height },
}
