export interface Base{
    id: number,
    baja: boolean;
}

export interface Empresa extends Base{
    denominacion: string,
    telefono: string,
    horarioAtencion: string,
    quienesSomos: string,
    domicilio: string,
    email: string,
    latitud: number,
    longitud: number
}

export interface Noticia extends Base{
    titulo: string,
    resumen: string,
    imagen: string,
    fechaPublicacion: Date,
    contenidoHTML: string,
    publicada: string,
    empresa?:  Empresa
}