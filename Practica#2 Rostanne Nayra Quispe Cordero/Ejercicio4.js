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

servidor.patch("/categorias/:id", async (req, res) => {
    const codigo = req.params.id;
    const { nombre, descripcion } = req.body;

    try {
        const [categoria] = await conexion.execute(
            "SELECT * FROM categorias WHERE id = ?",
            [codigo]
        );

        if (categoria.length === 0) {
            return res.status(404).json({
                mensaje: "La categoría no existe"
            });
        }

        const datosActuales = categoria[0];

        const nombreFinal = nombre ? nombre : datosActuales.nombre;
        const descripcionFinal =
            descripcion != null ? descripcion : datosActuales.descripcion;

        await conexion.execute(
            "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?",
            [nombreFinal, descripcionFinal, codigo]
        );

        res.status(200).json({
            mensaje: "Datos modificados correctamente",
            id: codigo
        });

    } catch (err) {
        res.status(500).json({
            mensaje: "Ocurrió un error al actualizar",
            detalle: err.message
        });
    }
});

const puerto = 3001;

servidor.listen(puerto, () => {
    console.log(`Servidor iniciado en http://localhost:${puerto}/categorias`);
});