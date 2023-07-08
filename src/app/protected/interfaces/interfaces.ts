export interface usuario {
    id_empleado: string;
    nombre: string;
    paterno: string;
    materno: string;
    celular: string;
    email: string;
    fecha_nacimiento: string;
    departamento: string
    id_sucursal: string;
    activo:string;
    rol: string;
    created_at: string;
    updated_at: string;
}

export interface user{
    id_empleado: string;
    username: string;
    password: string;
    rol: string;
    activo: boolean;
    created_at: string;
    updated_at: string;
}

export interface compra {
    id_compra: string,
    folio_compra: string,
    cfdi: string,
    subtotal: string,
    iva: string,
    isr: string,
    ieps: string,
    monto_total: string,
    metodo_pago: string,
    fecha_factura: string,
    fecha_recepcion: string,
    fecha_comprobante: string;
    estado_pago: string,
    id_sucursal: string,
    id_proveedor: string,
    detalla_factura_compra: {
        id_producto: number,
        cantidad: number
    }[];
}

export interface compra_ {
    id_compra: string,
    monto_total: string,
}

export interface gasto_ {
    id_gasto: string,
    monto_total: string,
}


export interface gastos{
    id_gasto: string;
    folio_gasto: string,
    cfdi: string,
    subtotal: string,
    iva: string,
    isr: string,
    ieps: string,
    monto_total: string,
    metodo_pago: string,
    fecha_factura: string,
    fecha_comprobante: string;
    estado_pago: string,
    id_sucursal: string,
    detalla_factura_gasto: {
        id_servicio: number,
        concepto: string
    }[]
}

export interface complemento_compra{
    id_compra: string;
    id_complemento_compra: string;
    monto_pago: string;
    forma_pago: string;
    fecha_pago: string;
}

export interface complemento_gasto{
    id_gasto: string;
    id_complemento_gasto: string;
    monto_pago: string;
    forma_pago: string;
    fecha_pago: string;
}

export interface proveedores{
    id_proveedor: string;
    rfc: string;
    nombre: string;
    codigo_postal: string;
    regimen_fiscal: string;
    telefono_fijo: string;
    telefono_movil: string;
    banco: string;
    cuenta_bancaria: string;
    clave_interbancaria: string;
    constancia: string;
    created_at: string;
    updated_at: string;
}

export interface productos_activo{
    id_producto: string;
    codigo: string;
    tipo_egreso: string;
    tipo_producto: string;
    perecedero: string;
    created_at: string;
    updated_at: string;
    nombre: string;
}

export interface producto_insumo{
    id_producto: string;
    codigo: string;
    tipo_egreso: string;
    tipo_producto: string;
    perecedero: string;
    created_at: string;
    updated_at: string;
    nombre: string;
    unidad_medida: string;
    cantidad: string;
}

export interface producto_venta {
    id_producto: string;
    codigo: string;
    tipo_egreso: string;
    tipo_producto: string;
    perecedero: boolean;
    nombre: string;
    area: string;
    receta: boolean;
    talla: string;
    unidad_medida: string;
    precio: number;
    productos_receta: {
      id_producto: number;
      cantidades: number;
    }[];
}

export interface producto_venta_ {
    id_producto: string;
}

export interface productos{
    id_producto: string;
    nombre: string;
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

export interface servicios{
    id_servicio: string;
    nombre: string;
    tipo_egreso: string;
    createdAt: string;
    updatedAt: string;
}

export interface sucursal{
    id_sucursal: string;
    nombre: string;
    direccion: string;
    codigo_postal: string;
    telefono: string;
    created_at: string;
    updated_at: string;
}

export interface sucursal_ID_name{
    id_sucursal: string;
    nombre: string;
}

export interface entradas{
    id_entrada: string;
    id_producto: string;
    id_almacen: string;
    cantidad: string;
    merma: string;
    fecha_entrada: string;
    fecha_caducidad: string;
}

export interface almacenes{
    id_almacen: string;
    id_sucursal: string;
    nombre: string;
    activo: string;
    created_at: string;
    updated_at: string;
}

export interface inventario{
    id_almacen: string;
    id_producto: string;
    existencias: string;
}

export interface salidas{
    id_almacen: string;
    id_producto: string;
    cantidad: string;
    fecha_salida: string;
}

export interface cafeteria {
    id_paquete_cafeteria: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    precio: string;
    iva: string;
    isr: string;
    detalla_cafeteria_producto: {
        id_producto: number;
        cantidades: number;
      }[];
}