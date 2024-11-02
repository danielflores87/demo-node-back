import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface IUserTask {
  id: number;
  userId: number;
  dateOfExecution: Date;
  description: string;
  userModify?: string;
  dateModify?: Date;
  userCreate?: string;
  dateCreate?: Date;
}

@Entity('TAU_TAREAS_USUARIO')
export class UserTask implements IUserTask {
  @PrimaryGeneratedColumn({ name: 'TAU_CODIGO' })
  id: number;

  @Column({ name: 'TAU_CODUSR_USUARIO' })
  userId: number;

  @Column({ name: 'TAU_FECHA_EJECUCION', type: 'timestamp' })
  dateOfExecution: Date;

  @Column({ name: 'TAU_DESCRIPCION', length: 100 })
  description: string;

  @Column({ name: 'TAU_USUARIO_MODIFICO', nullable: true, length: 20 })
  userModify: string;

  @Column({ name: 'TAU_FECHA_MODIFICO', type: 'timestamp', nullable: true })
  dateModify: Date;

  @Column({ name: 'TAU_USUARIO_CREO', length: 20 })
  userCreate: string;

  @Column({ name: 'TAU_FECHA_CREO', type: 'timestamp' })
  dateCreate: Date;
}
