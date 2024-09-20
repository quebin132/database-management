import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
} from "sequelize-typescript";
import User from "./userModel";

@Table
export default class Rutina extends Model<Rutina> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  rutina_id?: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false })
  usuario!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  nombre_rutina!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  id_ejercicio_1?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  id_ejercicio_2?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  id_ejercicio_3?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  id_ejercicio_4?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  id_ejercicio_5?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  id_ejercicio_6?: string;
}
