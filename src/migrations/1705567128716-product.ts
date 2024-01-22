import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1705567128716 implements MigrationInterface {
    name = 'Product1705567128716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`status\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`status\` json NOT NULL`);
    }

}
