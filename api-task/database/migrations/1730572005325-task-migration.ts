import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskMigration1730572005325 implements MigrationInterface {
    name = 'TaskMigration1730572005325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TAU_TAREAS_USUARIO" ("TAU_CODIGO" SERIAL NOT NULL, "TAU_CODUSR_USUARIO" integer NOT NULL, "TAU_FECHA_EJECUCION" TIMESTAMP NOT NULL, "TAU_DESCRIPCION" character varying(100) NOT NULL, "TAU_USUARIO_MODIFICO" character varying(20), "TAU_FECHA_MODIFICO" TIMESTAMP, "TAU_USUARIO_CREO" character varying(20) NOT NULL, "TAU_FECHA_CREO" TIMESTAMP NOT NULL, CONSTRAINT "PK_42b2d731bd516e52702f90390b2" PRIMARY KEY ("TAU_CODIGO"))`);
        await queryRunner.query(`ALTER TABLE "TAU_TAREAS_USUARIO" DROP COLUMN "TAU_DESCRIPCION"`);
        await queryRunner.query(`ALTER TABLE "TAU_TAREAS_USUARIO" ADD "TAU_DESCRIPCION" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TAU_TAREAS_USUARIO" DROP COLUMN "TAU_USUARIO_MODIFICO"`);
        await queryRunner.query(`ALTER TABLE "TAU_TAREAS_USUARIO" ADD "TAU_USUARIO_MODIFICO" character varying`);
        await queryRunner.query(`ALTER TABLE "TAU_TAREAS_USUARIO" DROP COLUMN "TAU_USUARIO_CREO"`);
        await queryRunner.query(`ALTER TABLE "TAU_TAREAS_USUARIO" ADD "TAU_USUARIO_CREO" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TAU_TAREAS_USUARIO" DROP COLUMN "TAU_USUARIO_CREO"`);
        await queryRunner.query(`ALTER TABLE "TAU_TAREAS_USUARIO" ADD "TAU_USUARIO_CREO" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TAU_TAREAS_USUARIO" DROP COLUMN "TAU_USUARIO_MODIFICO"`);
        await queryRunner.query(`ALTER TABLE "TAU_TAREAS_USUARIO" ADD "TAU_USUARIO_MODIFICO" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "TAU_TAREAS_USUARIO" DROP COLUMN "TAU_DESCRIPCION"`);
        await queryRunner.query(`ALTER TABLE "TAU_TAREAS_USUARIO" ADD "TAU_DESCRIPCION" character varying(100) NOT NULL`);
        await queryRunner.query(`DROP TABLE "TAU_TAREAS_USUARIO"`);
    }

}
