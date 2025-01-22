require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const createPGTables = async () => {
    const schemaPath = path.join(__dirname, "../db/schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    let client;

    try {
        client = await pool.connect();
        console.log('PG pool connected!');
        await client.query(schemaSql);
        console.log('PostgreSQL Bins and Requests tables created!');
      } catch (error) {
        console.error('Error creating PostgreSQL tables', error?.message);
        throw error;
      } finally {
        client.release();
      }
};

const pgQueries = {
    async getAllRequests(random_id) {
        const query = `SELECT r.id, r.method, r.headers, r.path, r.date, r.time
                      FROM requests AS r
                      JOIN bins AS b ON b.id = r.bin_id 
                      WHERE b.random_id = $1
                      ORDER BY r.date DESC, r.time DESC`;
                      // `SELECT * FROM requests AS r 
                      //  JOIN bins AS b ON b.id = r.bin_id 
                      //  WHERE b.random_id = $1`;
        try {
            const result = await pool.query(query, [random_id]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching requests from PostgreSQL: ', error?.message);
            throw error;
        }
    },

    async getAllBins() {
        const query = `SELECT random_id FROM bins`;
        try {
            const result = await pool.query(query);
            console.log('bins retrieved: ', result.rows.length, ' bins');
            return result.rows;
        } catch (error) {
            console.error('Error fetching bins: ', error?.message);
            throw error;
        }
    },

    async getBin(random_id) {
        const query = `SELECT * FROM bins WHERE random_id = $1`;
        try {
            const result = await pool.query(query, [random_id]);
            console.log('bin retrieved: ', result.rows[0]);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching bin: ', error?.message);
            throw error;
        }
    },

    async addBin(random_id) {
        const query = `INSERT INTO bins (random_id) VALUES ($1) RETURNING *`;
        try {
            const result = await pool.query(query, [random_id]);
            console.log('bin created: ', result.rows[0]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating bin: ', error?.message);
            throw error;
        }
    },

    async deleteBin(random_id) {
        const query = `DELETE FROM bins WHERE random_id = $1 RETURNING id`;
        try {
            const result = await pool.query(query, [random_id]);
            if (result.rowCount === 0) {
                console.log('No bin found with random_id: ', random_id);
                return false;
            }
            console.log('bin deleted: ', result.rows[0]);
            return true;
        } catch (error) {
            console.error('Error deleting bin: ', error?.message);
            throw error;
        }
    },

    async addRequest(random_id, method, headers, path, date, time) {
        const query = `INSERT INTO requests (bin_id, method, headers, path, date, time) 
                       SELECT id, $2, $3, $4, $5, $6
                       FROM bins WHERE random_id = $1
                       RETURNING *`;
        try {
            const result = await pool.query(query, [
                random_id, 
                method, 
                headers,
                path, 
                date, 
                time
            ]);
            if (result.rowCount === 0) {
                throw new Error('Bin does not exist with random_id: ', random_id)
            }
            console.log('request created: ', result.rows[0]);
            return result.rows[0];
        } catch (error) {
            console.error('Error adding request: ', error?.message);
            throw error;
        }
    }
}

module.exports = {
    createPGTables,
    pgQueries
};