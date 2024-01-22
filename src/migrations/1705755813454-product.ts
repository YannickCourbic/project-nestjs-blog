import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1705755813454 implements MigrationInterface {
    name = 'Product1705755813454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`price\` float NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`price\` int NOT NULL`);
    }

}
