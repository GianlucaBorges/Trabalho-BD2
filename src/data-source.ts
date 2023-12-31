import "reflect-metadata"
import { DataSource } from "typeorm"
import "dotenv/config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    synchronize: false,
    logging: (process.env.ENVIROMENT === 'dev') ? true : false,
    entities: ['src/entity/*.ts'],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
  .then(async () => {
      console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
