
export interface Ususario {
    idusuario: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    username: string;
    celular: string;
    email: string;
    estado: boolean
    fechaNacimiento: string;
    idrol: number;
    password_temporary: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface compra {
    foliocompra: string;
    proveedor: string;
    fechaCad: string;
    referencia: string; 
    usocfdi: string;
    fechafactura: string; 
    metodoPago: string;
    montoFactura: string;
    complementoPago: string;
}

export interface proveedores{
    idproveedor: string;
    rfcProveedor: string;
    nombreProveedor: string;
    cpProveedor: string;
    regimenFiscal: string;
    telefono1: string;
    telefono2: string;
    banco: string;
    cuentaBancaria: string;
    claveInter: string; 
}