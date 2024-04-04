export interface Base{
    id?: number,
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

export const emptyEmpresa = {
    baja: false,
    denominacion: "",
    telefono: "",
    horarioAtencion: "",
    quienesSomos: "",
    domicilio: "",
    email: "",
    latitud: 0,
    longitud: 0
}

export const emptyNoticia = {
    baja: false,
    titulo: "",
    resumen: "",
    imagen: "",
    fechaPublicacion: new Date(),
    contenidoHTML: "",
    publicada: "",
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