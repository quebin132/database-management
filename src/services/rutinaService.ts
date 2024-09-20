import { Optional } from "sequelize";
import Rutina from "../models/rutinaModel";

export const createRutina = async (
  userData: Optional<
    Rutina,
    | "rutina_id"
    | "id_ejercicio_1"
    | "id_ejercicio_2"
    | "id_ejercicio_3"
    | "id_ejercicio_4"
    | "id_ejercicio_5"
    | "id_ejercicio_6"
  >
) => {
  console.log("entering services");
  const user = await Rutina.create(userData);
  return user;
};

export const getRutina = async () => {
  return await Rutina.findAll();
};
