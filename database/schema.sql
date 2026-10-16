CREATE DATABASE IF NOT EXISTS pedidos_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE pedidos_db;

-- Segunda entidad: Cliente
CREATE TABLE IF NOT EXISTS clientes (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE
);

-- Entidad principal: Pedido
CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido     INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente    INT NOT NULL,
  cliente       VARCHAR(100) NOT NULL,
  email_cliente VARCHAR(150) NOT NULL,
  fecha_pedido  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total         DECIMAL(10,2) NOT NULL,
  estado        VARCHAR(30) NOT NULL DEFAULT 'pendiente',

  CONSTRAINT chk_total_positivo CHECK (total > 0),

  CONSTRAINT fk_pedido_cliente FOREIGN KEY (id_cliente)
    REFERENCES clientes(id_cliente)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);