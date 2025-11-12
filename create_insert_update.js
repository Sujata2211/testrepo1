const express = require("express");
const dotenv = require("dotenv");
const { neon } = require("@neondatabase/serverless");

dotenv.config();

const app = express();
const sql = neon(process.env.DATABASE_URL);

// 🧩 Create 'users' table if it doesn't exist
async function vibhav() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS Record_table (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✅ Table 'Record_table' created successfully!");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
}

// 🧠 Insert dummy data
async function sujata() {
  try {
    await sql`
      INSERT INTO Record_table (name, email)
      VALUES
        ('Alice Johnson', 'alice@example.com'),
        ('Bob Smith', 'bob@example.com'),
        ('Charlie Brown', 'charlie@example.com'),
        ('Diana Prince', 'diana@example.com'),
        ('Ethan Hunt', 'ethan@example.com'),
        ('volt', 'volt22@example.com'),
        ('vplt', 'vplt22@example.com')
      ON CONFLICT (email) DO NOTHING;
    `;
    console.log("✅ Dummy Record_table inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting dummy users:", err);
  }
}

// 💣 Delete (drop) the entire 'users' table
/*async function deleteUsersTable() {
  try {
    await sql`
      DROP TABLE IF EXISTS users;
    `;
    console.log("💥 Table 'users' deleted successfully!");
  } catch (err) {
    console.error("❌ Error deleting table:", err);
  }
}*/

// 🏁 Run setup on startup
vibhav()
  .then(sujata)
 // .then(deleteUsersTable);

app.get("/", (req, res) => {
  res.send("Neon DB connected — table created, dummy data added, then deleted!");
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
