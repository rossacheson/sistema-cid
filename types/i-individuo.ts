import { Telefono } from "./telefono";
import { Idioma } from "./idioma";
import { Direccion } from "./direccion";
import { Escolaridad } from "./escolaridad";

export interface IIndividuo {
  id?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  afiliacion?: 'miembro' | 'voluntario' | 'beneficiario' | 'prospecto' | 'donador' | 'salido' | 'vencedor';
  compromiso?: 'invitado' | 'inicial' | 'en camino' | 'solemne';
  correo?: string;
  hipocoristico?: string;
  direccion?: Direccion;
  curp?: string;
  rfc?: string;
  estadoCivil?: 'Casado' | 'Divorciado' | 'Soltero';
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
  sexo: 'Masculino' | 'Femenino';
  tallaPlayera?: string;
  telefonos?: Telefono[];
  tipoDeSangre?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  
  createdAt?: string;
  updatedAt?: string;
}