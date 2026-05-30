import postgres from 'postgres'

let _sql: ReturnType<typeof postgres> | null = null

export function getDb() {
  if (_sql) return _sql
  const config = useRuntimeConfig()
  _sql = postgres(config.databaseUrl as string, { max: 10 })
  return _sql
}

export async function initDb() {
  const sql = getDb()

  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      num TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      tags JSONB NOT NULL DEFAULT '[]',
      "priceLabel" TEXT NOT NULL DEFAULT 'Starting from',
      price TEXT NOT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY,
      key TEXT NOT NULL UNIQUE,
      url TEXT NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      caption TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      size BIGINT NOT NULL DEFAULT 0,
      "uploadedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      service TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  const [{ count }] = await sql`SELECT COUNT(*) as count FROM services`
  if (Number(count) === 0) {
    await sql`
      INSERT INTO services (num, title, description, tags, "priceLabel", price) VALUES
      ('01', 'Wedding Films', 'Full-day coverage with cinematic storytelling. From morning prep to the last dance — captured with two operators, color-graded for screen and print.', ${JSON.stringify(['Cinematic highlight reel', 'Full ceremony & reception', 'Drone footage', 'Color graded edit'])}, 'Starting from', 'PKR 80,000'),
      ('02', 'Corporate & Brand Films', 'Visual narratives that elevate brand identity. From concept to final grade — stills and motion produced together, end-to-end.', ${JSON.stringify(['Concept development', 'Multiple revisions', 'Branded delivery', 'Usage rights'])}, 'Starting from', 'PKR 50,000'),
      ('03', 'Photography — Weddings & Events', 'Full-day photo coverage for weddings, nikkah ceremonies, and events. Quiet, considered direction — delivered as a curated online gallery.', ${JSON.stringify(['Full-day coverage', '200+ edited images', 'Online gallery', 'Print-ready files'])}, 'Starting from', 'PKR 25,000'),
      ('04', 'Commercial Photography', 'Product, lifestyle and editorial stills for brands. Studio or on-location — concept through delivery with full commercial license.', ${JSON.stringify(['Product & lifestyle', 'Studio & on-location', 'Commercial license', 'Edited deliverables'])}, 'Starting from', 'PKR 35,000'),
      ('05', 'Aerial / Drone Coverage', 'Licensed drone operator delivering cinematic 4K aerials for weddings, events, and brand productions. Available standalone or as an add-on.', ${JSON.stringify(['Licensed operator', '4K footage', 'Cinematic grading', 'Standalone or add-on'])}, 'Starting from', 'PKR 20,000')
    `
  }
}
