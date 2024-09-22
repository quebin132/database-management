interface userAttributes {
  user_id: string;
  username: string;
  pass: string;
  correo: string;
  telefono: number;
  peso?: number;
  created_at: Date;
}

// QUE CAMPOS SE OMITEN DEL MODELO "USER"

export type PublicUserData = Omit<
  userAttributes,
  "user_id" | "pass" | "telefono" | "created_at" | "correo"
>;

// QUE CAMPOS SON PUBLICOS
export const publicUserAttibutes = ["username"] as const;

export interface loginData {
  email: string;
  password: string;
}

export interface loginResponse {
  user: PublicUserData;
  token: string;
}

export interface registerData {
  username: string;
  pass: string;
  correo: string;
  telefono: number;
  peso?: number;
}

// ESTA WEA TOMA EL USER Y LE QUITA TODAS LAS KEYS QUE NO SON PUBLICAS
export function makePublicUserData<T extends object, K extends keyof T>(
  user: T,
  publicKeys: readonly K[]
): Pick<T, K> {
  const publicUser = {} as Pick<T, K>;

  publicKeys.forEach((key) => {
    if (key in user) {
      // Since we're sure the key exists, we can assert that it's not undefined
      publicUser[key] = user[key];
    }
  });

  return publicUser;
}
