/** Remove DynamoDB-specific key information that is not of importance to API consumers **/
export function removeKeys(item: any): any {
    const x = Object.assign({}, item);
    delete x.pk;
    delete x.sk;
    delete x.gsi1pk;
    delete x.gsi1sk;
    return x;
}