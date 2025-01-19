require('dotenv').config();
const { Pool } = require('pg');
const fs = require("fs");
const path = require("path");

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: 'postgres',
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const createPGDatabase = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT 1 FROM pg_database WHERE datname = $1';
        const result = await client.query(query, [process.env.PG_DATABASE]);
        console.log('Database exists')
    } catch (error) {
        console.log('Database not found. Creating...')
        await client.query(`CREATE DATABASE ${process.env.PG_DATABASE}`);
    }
}

const createPGTables = async () => {
    const schemaPath = path.join(__dirname, "../db/schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");

    try {
        const client = await pool.connect();
        console.log('PG pool connected!');
        await client.query(schemaSql);
        client.release();
        console.log('PostgreSQL Bins and Requests tables created!');
      } catch (error) {
        console.error('Error creating PostgreSQL tables', error?.message);
        throw error;
      }
};

const pgQueries = {
    async getRequests(bin_id) {
        const query = `SELECT * FROM requests AS r 
                       JOIN bins AS b ON b.id = r.bin_id 
                       WHERE b.uuid = $1`;
        try {
            const result = await pool.query(query, [bin_id]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching requests from PostgreSQL: ', error?.message);
            throw error;
        }
    },

    async getBin(bin_id) {
        const query = `SELECT * FROM bins WHERE uuid = $1`;
        try {
            const result = await pool.query(query, [bin_id]);
            console.log('bin retrieved: ', result.rows[0]);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching bin: ', error?.message);
            throw error;
        }
    },

    async addBin(bin_id) {
        const query = `INSERT INTO bins (uuid) VALUES ($1) RETURNING *`;
        try {
            const result = await pool.query(query, [bin_id]);
            console.log('bin created: ', result.rows[0]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating bin: ', error?.message);
            throw error;
        }
    },

    async deleteBin(bin_id) {
        const query = `DELETE FROM bins WHERE uuid = $1 RETURNING id`;
        try {
            const result = await pool.query(query, [bin_id]);
            if (result.rowCount === 0) {
                console.log('No bin found with uuid: ', bin_id);
                return false;
            }
            console.log('bin deleted: ', result.rows[0]);
            return true;
        } catch (error) {
            console.error('Error deleting bin: ', error?.message);
            throw error;
        }
    },

    async addRequest(bin_id, method, headers, date, time) {
        const query = `INSERT INTO requests (bin_id, method, headers, date, time) 
                       SELECT id, $2, $3, $4, $5
                       FROM bins WHERE uuid = $1
                       RETURNING *`;
        try {
            const result = await pool.query(query, [bin_id, method, headers, date, time]);
            if (result.rowCount === 0) {
                throw new Error('Bin does not exist with uuid: ', bin_id)
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
    createPGDatabase,
    createPGTables,
    pgQueries
};