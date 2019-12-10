export default class Publicacion {
    constructor(
        id = null,
        marca = null,
        modelo = null,
        precio = null,
        moneda = 'bob',
        descripcion = null,
        latitude = null,
        longitude = null,
        imagen = null,
        uid = null,
    ) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.moneda = moneda;
        this.descripcion = descripcion;
        this.latitude = latitude;
        this.longitude = longitude;
        this.imagen = imagen;
        this.uid = uid;
    }
}


