export abstract class Item {
    abstract get pk(): string
    abstract get sk(): string
    abstract get gsi1pk(): string | undefined
    abstract get gsi1sk(): string | undefined

    public keys(): any {
        return {
            pk: this.pk,
            sk: this.sk,
            gsi1pk: this.gsi1pk,
            gsi1sk: this.gsi1sk
        }
    }

    abstract toItem(): Record<string, unknown>
}