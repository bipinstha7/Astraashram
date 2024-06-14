'use server';

import { createClient } from '@libsql/client/web';

export default async function database() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
}
