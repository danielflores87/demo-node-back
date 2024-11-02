import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthMigration1730572477005 implements MigrationInterface {
    name = 'AuthMigration1730572477005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "USR_USUARIOS" ("USR_CODIGO" SERIAL NOT NULL, "USR_NUMERO_DOCUMENTO" integer NOT NULL, "USR_NOMBRE" character varying(100) NOT NULL, "USR_CORREO" character varying(50) NOT NULL, "USR_CLAVE_ACCESO" character varying(1000) NOT NULL, "USR_USUARIO_MODIFICO" character varying(20), "USR_FECHA_MODIFICO" TIMESTAMP, "USR_USUARIO_CREO" character varying(20) NOT NULL, "USR_FECHA_CREO" TIMESTAMP NOT NULL, CONSTRAINT "PK_b36ee360e75667fe45ae5c8f967" PRIMARY KEY ("USR_CODIGO"))`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" DROP COLUMN "USR_NOMBRE"`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" ADD "USR_NOMBRE" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" DROP COLUMN "USR_CORREO"`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" ADD "USR_CORREO" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" DROP COLUMN "USR_CLAVE_ACCESO"`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" ADD "USR_CLAVE_ACCESO" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" DROP COLUMN "USR_USUARIO_MODIFICO"`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" ADD "USR_USUARIO_MODIFICO" character varying`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" DROP COLUMN "USR_USUARIO_CREO"`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" ADD "USR_USUARIO_CREO" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" DROP COLUMN "USR_USUARIO_CREO"`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" ADD "USR_USUARIO_CREO" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" DROP COLUMN "USR_USUARIO_MODIFICO"`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" ADD "USR_USUARIO_MODIFICO" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" DROP COLUMN "USR_CLAVE_ACCESO"`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" ADD "USR_CLAVE_ACCESO" character varying(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" DROP COLUMN "USR_CORREO"`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" ADD "USR_CORREO" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" DROP COLUMN "USR_NOMBRE"`);
        await queryRunner.query(`ALTER TABLE "USR_USUARIOS" ADD "USR_NOMBRE" character varying(100) NOT NULL`);
        await queryRunner.query(`DROP TABLE "USR_USUARIOS"`);
    }

}
