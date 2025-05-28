import { ModoDePago } from "./modo-de-pago";

export interface IAportacion {
  id?: string;
  personaId: string;
  personaNombre?: string; // redundant data to prevent having to join on the persona table
  concepto: string;
  fecha: string;
  monto: number;
  modoDePago: ModoDePago;
  
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}