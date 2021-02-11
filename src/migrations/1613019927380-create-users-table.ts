import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsersTable1613019927380 implements MigrationInterface {
    name = 'createUsersTable1613019927380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `email` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, INDEX `IDX_450a05c0c4de5b75ac8d34835b` (`password`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_450a05c0c4de5b75ac8d34835b` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
