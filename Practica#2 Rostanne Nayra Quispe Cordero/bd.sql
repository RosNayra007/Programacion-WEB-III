CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255), 
    createdAt DATETIME NOT NULL DEFAULT current_timestamp(), 
    updatedAt DATETIME NOT NULL DEFAULT current_timestamp()
);
INSERT INTO categorias (nombre, descripcion) VALUES 
(
    'Electrónica','Dispositivos electrónicos y gadgets'), ('Oficina', 'Material y accesorios deoficina'
);
