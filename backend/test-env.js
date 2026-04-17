require('dotenv/config');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('Type:', typeof process.env.DATABASE_URL);
console.log('Length:', process.env.DATABASE_URL?.length);
