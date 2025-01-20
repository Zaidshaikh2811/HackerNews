import {defineConfig} from 'drizzle-kit'


export default defineConfig  ({
    dialect:"postgresql",
    schema: 'server/db/schemas/*',
    out: 'drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!
    },
})