const express = require("express");
const mysql = require("mysql2/promise");

const servidor = express();

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "basededatos"
});

servidor.get("/categorias", async (req, res) => {
    try {
        const consulta = "SELECT * FROM categorias";
        const [categorias] = await conexion.execute(consulta);

        res.status(200).json({
            cantidad: categorias.length,
            datos: categorias
        });

    } catch (err) {
        res.status(500).json({
            mensaje: "No se pudieron obtener las categorías",
            error: err.message
        });
    }
});

const puerto = 3001;

servidor.listen(puerto, () => {
    console.log(`Servidor iniciado en http://localhost:${puerto}/categorias`);
});