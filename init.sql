
CREATE DATABASE IF NOT EXISTS test1;

use test1;


create table IF NOT EXISTS users(
user_id INT NOT NULL auto_increment,
username varchar(50) not null unique,
pass varchar(70) not null,
correo varchar(50) not null unique,
telefono char(10) not null unique,
peso decimal(5,2),
created_at timestamp default (now()),
primary key(user_id)
);


CREATE TABLE IF NOT EXISTS rutinas(
rutina_id int not null auto_increment,
usuario int not null,
nombre_rutina varchar(20) ,
id_ejercicio_1 varchar(30),
id_ejercicio_2 varchar(30),
id_ejercicio_3 varchar(30),
id_ejercicio_4 varchar(30),
id_ejercicio_5 varchar(30),
id_ejercicio_6 varchar(30),
primary key(rutina_id,usuario),
foreign key(usuario) references users(user_id)
);