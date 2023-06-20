import { IterableDiffers } from "@angular/core";

export interface usuario {
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
    areaUser: string;
    sucursalUser: string;
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
    createdAt: string;
    updatedAt: string;
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
    constancia: string; 
    createdAt: string;
    updatedAt: string;
}

export interface productos{
    codigoProducto: string;
    nombreProducto: string;
    medidaProducto: string;
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

export interface aperturaCaja{
    area: string;
    caja: string;
    efectivo: string;
    referencias: string;
    createdAt: string;
    updatedAt: string;
}

export interface corteParcial{
    codigo: string;
    revision: string;
    fechaEmision: string;
    fechaRevision: string;
    cajero: string;
    fechaCorte: string;
    totalEfectivo: string;
    totalTarjeta: string;
    totalTransferencia: string;
    totalGeneral: string;
    referencias: string;
}

export interface gastos{
    folio_gasto: string;
    cdfi: string;
    fecha_factura: string;
    subtotal: string;
    IVA: string;
    ISR: string;
    IEPS: string;
    total: string;
    metodo_pago:string;
    sucursal: string;
    tipo_egreso: string;
    complemento_pago: string;
    fecha_pago: string;
    forma_pago: string;
    estado_pago: string;
    monto: string;
    saldo_insoluto: string;
    createdAt: string;
    updatedAt: string;
}

export interface servicios{
    nombre_servicio: string;
    tipo_egreso: string;
    createdAt: string;
    updatedAt: string;
}
