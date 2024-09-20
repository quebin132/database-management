import { Op, Optional } from "sequelize";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import {
  loginData,
  PublicUserData,
  publicUserAttibutes,
  makePublicUserData,
  registerData,
} from "../Types/userInterface";

// FALTA COMPROBAR QUE LA CONTRASEÑA SEA SEGURA
export const register = async (userData: Optional<User, "peso">) => {
  console.log("entering services");
  console.log(userData);
  const validation = await doesUserAlreadyExists(userData);
  if (validation) return validation;
  else {
    const hashedPassword = await bcrypt.hash(userData.pass, 10);
    const newUserData = { ...userData, pass: hashedPassword };
    await User.create(newUserData);
    return "Register completed";
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
        return "Username already exists";
      if (foundUser.correo === user.correo) return "E-mail already in use";
      if (foundNumber === user.telefono)
        return "That phone number is already registered";
    }

    return false;
  } catch (error) {
    console.error("Problem checking user existence:", error);
    return "An error occurred while checking for existing users.";
  }
};

/// LOGIN LOGIC
// AL TENER LOGINDATA COMO TIPO PARA LOS ARGUMENTOS SOLO SE TOMARAN
// LOS CAMPOS CON LOS NOMBRES ESPECIFICADOS EN LA INTERFAZ LOGINDATA
// AUNQUE HAYAN ARGUMENTOS DE MAS LO IMPORTANTE ES MANTENER LOS NOMBRES DE LA INTERFAZ
export const login = async ({
  email,
  password,
}: loginData): Promise<PublicUserData | string> => {
  // PUBLICUSERDATA DELIMITA LO QUE PUEDE RETORNAR ESTA FUNCION
  const user = await User.findOne({
    where: { correo: email },
  });
  if (!user) return "User not found";
  else {
    const isValid = await bcrypt.compare(password, user.pass);
    if (!isValid) return "Invalid password";
    else {
      // aqui se extraen los campos que estan en publicUserAttributes de user
      const publicUser = makePublicUserData(user, publicUserAttibutes);
      return publicUser;
    }
  }
};

export const getUsers = async () => {
  return await User.findAll();
};
