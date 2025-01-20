require('dotenv').config();
const { createPGDatabase, createPGTables, pgQueries } = require('./config/postgresDB');

const testDatabase = async () => {
    try {
        // Test creating a bin
        // const newBin = await pgQueries.addBin('abcd126'); // Pass a test UUID
        // console.log('New bin added: ', newBin);

        // Test getting the bin
        const bin = await pgQueries.getBin('abcd128');
        console.log('Bin retrieved: ', bin);

        // Test adding a request to the bin
        const newRequest = await pgQueries.addRequest(
            'abcd128', // Use the same bin UUID
            'GET', // HTTP method
            { 'Content-Type': 'application/json' }, // Headers
            '2025-01-01', // Date
            '12:00:00' // Time
        );
        console.log('New request added: ', newRequest);

        const newRequest2 = await pgQueries.addRequest(
            'abcd128', // Use the same bin UUID
            'GET', // HTTP method
            { 'Content-Type': 'application/json' }, // Headers
            '2026-01-01', // Date
            '12:00:00' // Time
        );
        console.log('New request added: ', newRequest2);

        // Test getting the requests for the bin
        const requests = await pgQueries.getAllRequests('abcd128');
        console.log('Requests for bin: ', requests);

        // const newBin2 = await pgQueries.addBin('abcd128'); // Pass a test UUID
        // console.log('New bin added: ', newBin2);

        const bins = await pgQueries.getAllBins();
        console.log('All bins: ', bins);

        // Test deleting the bin
        const deleted = await pgQueries.deleteBin('abcd128');
        console.log('Bin deleted: ', deleted);
    } catch (error) {
        console.error('Error in database test: ', error?.message);
    }
};
const runTests = async () => {
    await createPGDatabase();
    await createPGTables();
    await testDatabase();
};

runTests();