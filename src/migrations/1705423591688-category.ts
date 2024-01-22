import { MigrationInterface, QueryRunner } from "typeorm";

export class Category1705423591688 implements MigrationInterface {
    name = 'Category1705423591688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` text NULL, \`logo\` varchar(255) NULL, \`visibility\` tinyint NOT NULL, \`parent\` int NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NULL, \`parentId\` int NULL, UNIQUE INDEX \`IDX_9f16dbbf263b0af0f03637fa7b\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_d5456fd7e4c4866fec8ada1fa10\` FOREIGN KEY (\`parentId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_d5456fd7e4c4866fec8ada1fa10\``);
        await queryRunner.query(`DROP INDEX \`IDX_9f16dbbf263b0af0f03637fa7b\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
