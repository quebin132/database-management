import { Op, Optional } from "sequelize";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  loginData,
  loginResponse,
  publicUserAttibutes,
  makePublicUserData,
  registerData,
  registerResponse,
} from "../Types/userInterface";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

// FALTA COMPROBAR QUE LA CONTRASEÑA SEA SEGURA
export const register = async (
  userData: Optional<User, "peso">
): Promise<registerResponse> => {
  console.log("entering services");
  console.log(userData);
  try {
    await doesUserAlreadyExists(userData);

    const hashedPassword = await bcrypt.hash(userData.pass, 10);
    const newUserData = { ...userData, pass: hashedPassword };
    await User.create(newUserData);
    console.log("register completed");
    return { success: true, message: "Register completed" };
  } catch (e) {
    if (e instanceof Error) {
      return {
        success: false,
        message: "Error during registration",
        error: e.message,
      };
    } else {
      return { success: false, message: "Unknown error ocurred", error: "idk" };
    }
  }
};

// const checkPasswordSecurity = (password: string) => {
//   // HAY QUE BUSCAR QUE HACE SEGURA A UNA PASSWORD
// };

// Chequea si existe el nombre de usuario, correo o telefono

const doesUserAlreadyExists = async (user: registerData) => {
  try {
    const foundUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: user.username },
          { correo: user.correo },
          { telefono: user.telefono },
        ],
      },
    });

    if (foundUser) {
      const foundNumber = Number(foundUser.telefono);
      if (foundUser.username === user.username)
        throw new Error("Username already exists");
      if (foundUser.correo === user.correo)
        throw new Error("E-mail already in use");
      if (foundNumber === user.telefono)
        throw new Error("That phone number is already registered");
    }

    return false;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Problem checking user existence:", error);
      throw new Error(error.message);
    } else {
      console.log("idk");
      return "idk";
    }
  }
};

/// LOGIN LOGIC
// AL TENER LOGINDATA COMO TIPO PARA LOS ARGUMENTOS SOLO SE TOMARAN
// LOS CAMPOS CON LOS NOMBRES ESPECIFICADOS EN LA INTERFAZ LOGINDATA
// AUNQUE HAYAN ARGUMENTOS DE MAS LO IMPORTANTE ES MANTENER LOS NOMBRES DE LA INTERFAZ
export const login = async ({
  email,
  password,
}: loginData): Promise<loginResponse | string> => {
  // PUBLICUSERDATA DELIMITA LO QUE PUEDE RETORNAR ESTA FUNCION
  try {
    const user = await User.findOne({ where: { correo: email } });
    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(password, user.pass);
    if (!isValid) throw new Error("Invalid password");

    // Generate JWT
    if (!secret) throw new Error("No secret provided for JWT");
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.correo },
      secret,
      { expiresIn: "15m" }
    );
    // aqui se extraen los campos que estan en publicUserAttributes de user
    const publicUser = makePublicUserData(user, publicUserAttibutes);

    return { user: publicUser, token };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Problem while login user, cause:", error);
      return `Problem while login user, cause:, ${error.message}`;
    }
    return "Problem while login user";
  }
};

export const getUsers = async () => {
  return await User.findAll();
};
