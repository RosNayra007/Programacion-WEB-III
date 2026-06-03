const express = require("express");
const mysql = require("mysql2/promise");

const servidor = express();

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "basededatos"
});

servidor.get("/categorias/:id", async (req, res) => {
    const codigo = req.params.id;

    try {
        const sqlCategoria = "SELECT * FROM categorias WHERE id = ?";
        const [datosCategoria] = await conexion.execute(sqlCategoria, [codigo]);

        if (datosCategoria.length < 1) {
            return res.status(404).json({
                mensaje: "No existe la categoría solicitada"
            });
        }

        let listaProductos = [];

        try {
            const sqlProductos = "SELECT * FROM productos WHERE categoria_id = ?";
            const [datosProductos] = await conexion.execute(sqlProductos, [codigo]);

            listaProductos = datosProductos;
        } catch (e) {
            console.log("No se pudieron cargar los productos");
        }

        res.status(200).json({
            categoria: datosCategoria[0],
            productos: listaProductos
        });

    } catch (err) {
        res.status(500).json({
            mensaje: "Error interno del servidor",
            detalle: err.message
        });
    }
});

const PUERTO = 3001;

servidor.listen(PUERTO, () => {
    console.log(`Servidor activo en http://localhost:${PUERTO}/categorias`);
});