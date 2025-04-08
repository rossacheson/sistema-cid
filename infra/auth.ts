export const userPool = new sst.aws.CognitoUserPool("UserPool", {
    usernames: ["email"]
});

export const userPoolClient = userPool.addClient("UserPoolClient");

export const adminsGroup = new aws.cognito.UserGroup("Admins", {
    userPoolId: userPool.id,
    description: 'Administradores de la sistema',
    name: "admins",
    precedence: 0,
});

export const coordinadoresGroup = new aws.cognito.UserGroup("Coordinadores", {
    userPoolId: userPool.id,
    description: 'Miembros actuales del consejo de coordinadores',
    name: "coordinadores",
    precedence: 1,
});

export const responsablesMayoresGroup = new aws.cognito.UserGroup("Responsables Mayores", {
    userPoolId: userPool.id,
    description: 'Responsables Mayores',
    name: "responsablesMayores",
    precedence: 2,
});

export const responsablesGroup = new aws.cognito.UserGroup("Responsables Pastorales", {
    userPoolId: userPool.id,
    description: 'Responsables Pastorales',
    name: "responsablesPastorales",
    precedence: 3,
});

export const finanzasGroup = new aws.cognito.UserGroup("Finanzas", {
    userPoolId: userPool.id,
    description: 'Finanzas',
    name: "finanzas",
    precedence: 4,
});