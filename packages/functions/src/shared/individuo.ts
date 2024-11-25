import { ulid } from "ulid";
import { Item } from "./item";
import { IIndividuo } from "../../../../types/i-individuo";

export class Individuo extends Item implements IIndividuo {
    id?: string;
    nombre!: string;
    apellidoPaterno!: string;
    apellidoMaterno?: string;
    sexo!: "Masculino" | "Femenino";
    createdAt?: string;
    updatedAt?: string;
    
    constructor(params: IIndividuo) {
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
    
    get pk(): string { return `INDIVIDUO#${this.id}`; }
    get sk(): string { return "METADATA"; }
    get gsi1pk(): string | undefined { return "INDIVIDUO"; }
    get gsi1sk(): string | undefined { return this.apellidoPaterno; }

    toItem(): Record<string, unknown> {
        return {
            ...this.keys(),
            id: this.id,
            nombre: this.nombre,
            apellidoPaterno: this.apellidoPaterno,
            apellidoMaterno: this.apellidoMaterno,
            sexo: this.sexo,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

}