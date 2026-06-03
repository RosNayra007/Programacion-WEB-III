const express = require("express");
const mysql = require("mysql2/promise");

const servidor = express();
servidor.use(express.json());

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "basededatos"
});

servidor.post("/categorias", async (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
        return res.status(400).json({
            mensaje: "Debe ingresar el nombre de la categoría"
        });
    }

    try {
        const sql = "INSERT INTO categorias(nombre, descripcion) VALUES(?, ?)";
        const [datos] = await conexion.execute(sql, [nombre, descripcion]);

        res.status(201).json({
            mensaje: "Registro guardado correctamente",
            codigo: datos.insertId,
            nombre,
            descripcion
        });

    } catch (err) {
        res.status(500).json({
            mensaje: "Error al guardar la categoría",
            detalle: err.message
        });
    }
});

const PUERTO = 3001;

servidor.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PUERTO}`);
});