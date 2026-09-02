import { pool } from '../src/lib/db';
import { PRODUCTS, LEADS, CAMPAIGNS, AUTOMATIONS, EMAILS, BLOGS, NEWS, QUOTES } from '../src/app/admin/_lib/mockData';


async function initDB() {
  console.log('Connecting to PostgreSQL...');
  try {
    // Create Tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        published BOOLEAN DEFAULT FALSE,
        problem TEXT,
        target TEXT,
        description TEXT,
        features JSONB,
        benefits JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(50) PRIMARY KEY,
        company VARCHAR(255) NOT NULL,
        website VARCHAR(255),
        industry VARCHAR(100),
        location VARCHAR(255),
        contact_name VARCHAR(255),
        email VARCHAR(255),
        product_id VARCHAR(50) REFERENCES products(id),
        status VARCHAR(50) DEFAULT 'new',
        discovered JSONB,
        problem TEXT,
        reasoning TEXT,
        last_contact VARCHAR(100),
        pitch_approved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS campaigns (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        product_id VARCHAR(50) REFERENCES products(id),
        target TEXT,
        status VARCHAR(50),
        found INT DEFAULT 0,
        contacted INT DEFAULT 0,
        responded INT DEFAULT 0,
        interested INT DEFAULT 0,
        meetings INT DEFAULT 0,
        customers INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS automations (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        status VARCHAR(50),
        last_run VARCHAR(100),
        result TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS emails (
        id VARCHAR(50) PRIMARY KEY,
        lead_name VARCHAR(255),
        product_name VARCHAR(100),
        status VARCHAR(50),
        subject VARCHAR(255),
        body TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS content (
        id VARCHAR(50) PRIMARY KEY,
        type VARCHAR(50),
        title VARCHAR(255),
        status VARCHAR(50),
        date VARCHAR(100),
        excerpt TEXT,
        image_url TEXT,
        tag VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tables created successfully.');

    // Seed Data
    console.log('Seeding products...');
    for (const p of PRODUCTS) {
      await pool.query(
        'INSERT INTO products (id, name, published, problem, target, description, features, benefits) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO NOTHING',
        [p.id, p.name, p.published, p.problem, p.target, p.description, JSON.stringify(p.features), JSON.stringify(p.benefits)]
      );
    }

    console.log('Seeding leads...');
    for (const l of LEADS) {
      await pool.query(
        'INSERT INTO leads (id, company, website, industry, location, contact_name, email, product_id, status, discovered, problem, reasoning, last_contact, pitch_approved) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) ON CONFLICT (id) DO NOTHING',
        [l.id, l.company, l.website, l.industry, l.location, l.contact, l.email, l.product, l.status, JSON.stringify(l.discovered), l.problem, l.reasoning, l.lastContact, l.pitchApproved]
      );
    }

    console.log('Seeding campaigns...');
    for (const c of CAMPAIGNS) {
      await pool.query(
        'INSERT INTO campaigns (id, name, product_id, target, status, found, contacted, responded, interested, meetings, customers) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT (id) DO NOTHING',
        [c.id, c.name, c.product, c.target, c.status, c.found, c.contacted, c.responded, c.interested, c.meetings, c.customers]
      );
    }

    console.log('Seeding automations...');
    for (const a of AUTOMATIONS) {
      await pool.query(
        'INSERT INTO automations (id, name, status, last_run, result) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING',
        [a.id, a.name, a.status, a.lastRun, a.result]
      );
    }

    console.log('Seeding emails...');
    for (const e of EMAILS) {
      await pool.query(
        'INSERT INTO emails (id, lead_name, product_name, status, subject, body) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING',
        [e.id, e.lead, e.product, e.status, e.subject, e.body]
      );
    }

    console.log('Seeding content (Admin)...');
    for (const b of BLOGS) {
      await pool.query('INSERT INTO content (id, type, title, status, date) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING', [b.id, 'blog', b.title, b.status, b.date]);
    }
    for (const q of QUOTES) {
      await pool.query('INSERT INTO content (id, type, title, status, date) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING', [q.id, 'quote', q.title, q.status, q.date]);
    }
    for (const n of NEWS) {
      // Avoid inserting admin news if it conflicts with marketing news IDs, though they differ ('N1' vs 'n1')
      await pool.query('INSERT INTO content (id, type, title, status, date) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING', [n.id, 'news', n.title, n.status, n.date]);
    }



    console.log('Database initialization and seeding completed!');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await pool.end();
  }
}

initDB();
