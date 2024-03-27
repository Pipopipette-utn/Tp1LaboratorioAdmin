export interface Empresa{
    denominacion: string,
    telefono: string,
    horarioAtencion: string,
    quienesSomos: string,
    domicilio: string,
    email: string,
    latitud: number
}

export interface Noticia{
    titulo: string,
    resumen: string,
    imagen: string,
    fechaPublicacion: Date,
    contenidoHTML: string,
    publicada: string,
    empresa: Empresa
}