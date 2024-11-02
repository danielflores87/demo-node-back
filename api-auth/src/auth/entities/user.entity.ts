import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export interface IUser {
  id: number;
  numberDocument: number;
  name: string;
  email: string;
  password?: string;
  userModify?: string;
  dateModify?: Date;
  userCreate?: string;
  dateCreate?: Date;

}

@Entity('USR_USUARIOS')
export class User implements IUser {
  @PrimaryGeneratedColumn({ name: 'USR_CODIGO' })
  id: number;

  @Column({ name: 'USR_NUMERO_DOCUMENTO' })
  numberDocument: number;

  @Column({ name: 'USR_NOMBRE', length: 100 })
  name: string;

  @Column({ name: 'USR_CORREO', length: 50  })
  email: string;

  @Column({ name: 'USR_CLAVE_ACCESO', length: 1000 /*select: false*/ })
  password: string;

  @Column({ name: 'USR_USUARIO_MODIFICO', length: 20, nullable: true })
  userModify: string;

  @Column({ name: 'USR_FECHA_MODIFICO', type: 'timestamp', nullable: true })
  dateModify: Date;

  @Column({ name: 'USR_USUARIO_CREO', length: 20 })
  userCreate: string;

  @Column({ name: 'USR_FECHA_CREO', type: 'timestamp' })
  dateCreate: Date;

}
