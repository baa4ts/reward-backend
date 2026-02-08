import { drizzle } from 'drizzle-orm/libsql/web';
import { Context } from 'hono';
import { env } from 'hono/adapter';
import { Env } from '../type/env';

/**
 * Crea una instancia de la base de datos usando Drizzle ORM y Turso.
 * @param c - Contexto de Hono
 * @returns Instancia de Drizzle ORM
 */
export const getInstanceDB = (c: Context) => {
    const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = env<Env>(c);

    return drizzle({
        connection: {
            url: TURSO_DATABASE_URL,
            authToken: TURSO_AUTH_TOKEN,
        },
    });
};
