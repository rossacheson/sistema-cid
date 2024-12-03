import { Telefono } from "./telefono";
import { Idioma } from "./idioma";
import { Direccion } from "./direccion";
import { Escolaridad } from "./escolaridad";
import { NivelDeCompromiso } from "./nivel-de-compromiso";
import { Compromiso } from "./i-compromiso";
import { Sexo } from "./sexo";
import { EstadoCivil } from "./estado-civil";
import { TipoDeSangre } from "./tipo-de-sangre";
import { Afiliacion } from "./afiliacion";

export interface IIndividuo {
  id?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  afiliacion?: Afiliacion;
  compromisoActual?: NivelDeCompromiso;
  compromisos?: Compromiso[];
  correo?: string;
  hipocoristico?: string;
  direccion?: Direccion;
  curp?: string;
  rfc?: string;
  estadoCivil?: EstadoCivil;
  estatura?: number;
  peso?: number;
  calzado?: number;
  escolaridadLogrado?: Escolaridad;  
  escolaridadEnCurso?: Escolaridad;
  fechaDeNacimiento?: string;
  fotoFileName?: string;
  fotoUrl?: string;
  idiomas?: Idioma[];
  nacionalidad?: string;
  sexo: Sexo;
  tallaPlayera?: string;
  telefonos?: Telefono[];
  tipoDeSangre?: TipoDeSangre;
  
  createdAt?: string;
  updatedAt?: string;
}