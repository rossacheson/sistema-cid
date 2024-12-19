import { NivelDeCompromiso } from "./nivel-de-compromiso";

export interface Compromiso {
    fecha: string;
    nivel: NivelDeCompromiso;
    nota?: string;
}