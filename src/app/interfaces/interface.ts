
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

export interface productos{
    codigoProducto: string;
    nombreProducto: string;
    stockProducto: string;
    tamanioProducto: string;
    tallaProducto: string;
    createdAt: string;
    updatedAt: string;
}

export interface frontdesk{
    codigoPF: string;
    nombrePF: string;
    categoriaPF: string;
    minimoPersonas: string;
    maximoPersonas: string;
    descripcionPF: string;
    precioPF: string;
    createdAt: string;
    updatedAt: string;
}

export interface cafeteria{
    codigoPC:string;
    nombrePC: string;
    descripcionPC: string;
    precioPC: string;
    createdAt: string;
    updatedAt: string;
}
