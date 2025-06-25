import { ulid } from "ulid";
import { Item } from "./item";
import { IPersona } from "../../../../types/i-persona";
import { NivelDeCompromiso } from "../../../../types/nivel-de-compromiso";
import { Afiliacion } from "../../../../types/afiliacion";
import { Compromiso } from "../../../../types/i-compromiso";
import { Direccion } from "../../../../types/direccion";
import { EstadoCivil } from "../../../../types/estado-civil";
import { Escolaridad } from "../../../../types/escolaridad";
import { Idioma } from "../../../../types/idioma";
import { Sexo } from "../../../../types/sexo";
import { Telefono } from "../../../../types/telefono";
import { TipoDeSangre } from "../../../../types/tipo-de-sangre";

export class Persona extends Item implements IPersona {
    id?: string;
    nombre!: string;
    apellidoPaterno!: string;
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
    sexo!: Sexo;
    tallaPlayera?: string;
    telefonos?: Telefono[];
    tipoDeSangre?: TipoDeSangre;

    createdAt?: string;
    updatedAt?: string;
    
    constructor(params: IPersona) {
        super();
        Object.assign(this, params);
        if(!this.id) {
            this.id = ulid();
            this.createdAt = new Date().toISOString();
            this.updatedAt = this.createdAt;
        } else {
            this.updatedAt = new Date().toISOString();
        }
    }
    
    get pk(): string { return `PERSONA#${this.id}`; }
    get sk(): string { return "METADATA"; }
    get gsi1pk(): string | undefined { return "PERSONA"; }
    get gsi1sk(): string | undefined { return this.apellidoPaterno; }

    toItem(): Record<string, unknown> {
        return Object.assign({}, this, this.keys());
    }

}