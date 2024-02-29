declare module NodeJS {
  export interface ProcessEnv {
    MYSQL_DB_HOST: string;
    MYSQL_DB_USERNAME: string;
    MYSQL_DB_PASSWORD: string;
    MYSQL_DB_PORT: string;
    MYSQL_DB_NAME: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
  }
}
