import { MigrationInterface, QueryRunner } from "typeorm";

export class Category1705425122253 implements MigrationInterface {
    name = 'Category1705425122253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`parent\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`parent\` int NULL`);
    }

}
