export default class Publicacion {
    constructor(
        id = null,
        marca = null,
        modelo = null,
        precio = null,
        moneda = 'bob',
        descripcion = null,
        imagen = null,
    ) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.moneda = moneda;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}


