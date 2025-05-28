import { ulid } from "ulid";
import { Item } from "./item";
import { IAportacion } from "../../../../types/i-aportacion";
import { ModoDePago } from "../../../../types/modo-de-pago";

export class Aportacion extends Item implements IAportacion {
    id?: string;
    personaId!: string;
    personaNombre?: string;
    fecha!: string;
    monto!: number;
    modoDePago!: ModoDePago;
    concepto!: string;

    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
    
    constructor(params: IAportacion) {
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
    
    get pk(): string { return `PERSONA#${this.personaId}`; }
    get sk(): string { return `APORTACION#${this.id}`; }
    get gsi1pk(): string | undefined { return "APORTACION"; }
    get gsi1sk(): string | undefined { return this.fecha; }

    toItem(): Record<string, unknown> {
        return Object.assign({}, this, this.keys());
    }

}