
import {config as dotenvConfig} from "dotenv";
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from "typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

dotenvConfig({path: ".env"});

const config:TypeOrmModuleOptions = {
    type: 'mysql',
    host: `${process.env.DATABASE_HOST}`,
    port: parseInt(`${process.env.DATABASE_PORT}`),
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: ['dist/**/entity/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
};


export default registerAs("typeorm" , () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);