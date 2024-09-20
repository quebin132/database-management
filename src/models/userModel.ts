import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

import bcrypt from "bcrypt";

@Table({
  timestamps: true, // Enable timestamps
  createdAt: "created_at", // Map Sequelize's createdAt to created_at
  updatedAt: false, // Disable the updatedAt column
})
export default class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  user_id!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  pass!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  correo!: string;

  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  telefono!: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  peso?: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW, allowNull: true })
  created_at?: Date;

  // Static method to compare passwords
  static async comparePassword(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}
