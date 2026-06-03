const express = require("express");
const mysql = require("mysql2/promise");

const servidor = express();

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "basededatos"
});

servidor.delete("/categorias/:id", async (req, res) => {
    const codigo = req.params.id;

    try {
        // Eliminar productos relacionados
        try {
            await conexion.execute(
                "DELETE FROM productos WHERE categoria_id = ?",
                [codigo]
            );
        } catch (errorProductos) {
            console.log("No se encontraron productos asociados.");
        }
        const [resultado] = await conexion.execute(
            "DELETE FROM categorias WHERE id = ?",
            [codigo]
        );

        if (resultado.affectedRows < 1) {
            return res.status(404).json({
                mensaje: "No existe la categoría solicitada"
            });
        }

        res.status(200).json({
            mensaje: "Categoría eliminada correctamente",
            idEliminado: codigo
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar la categoría",
            detalle: error.message
        });
    }
});

const PUERTO = 3001;

servidor.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PUERTO}/categorias`);
});