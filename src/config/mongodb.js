/**
 * This should came from environments variable or
 * secured secrets management services
 */
const DB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'properties';
const USER_COLLECTION = 'users';
const FAV_COLLECTION = 'favorites';

module.exports = { DB_URI, DB_NAME, USER_COLLECTION, FAV_COLLECTION };
