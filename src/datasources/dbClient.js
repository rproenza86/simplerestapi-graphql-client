// external packages
const { MongoClient } = require('mongodb');

// config
const { DB_URI, DB_NAME, USER_COLLECTION, FAV_COLLECTION } = require('../config/mongodb');

/**
 * DB interactions abstraction.
 *
 * Some people like the MVP model to organize this logic or prefer think about it as services.
 *
 * Either way this is a reusable code the rest depends on the teams and organizations.
 */
class DBClient {
    constructor() {
        this._client = new MongoClient(DB_URI, { useUnifiedTopology: true });
    }

    async run(queryFunc, collectionName) {
        let result;

        try {
            await this._client.connect();

            const database = this._client.db(DB_NAME);
            const collection = database.collection(collectionName);

            result = await queryFunc(collection);
        } finally {
            // Ensures that the client will close when you finish/error
            // await this._client.close(); // FIXME: For some reason this line was making the solution throw error. Investigate, find root issue and fix it.
            return result;
        }
    }

    async getUser(query) {
        const getUserQuery = async (userCollection) => {
            const user = await userCollection.findOne(query);
            return user;
        };

        try {
            const user = await this.run(getUserQuery, USER_COLLECTION);
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserByEmail(email) {
        const query = { email };
        return await this.getUser(query);
    }

    async getUserByToken(token) {
        const query = { token };
        return await this.getUser(query);
    }

    /**
     *  Assuming the proper index are in place for proper performance
     *
     * @param {*} mlsIds Array of properties ids
     * @returns
     */
    async getFavorites(mlsIds) {
        const getFavoritesQuery = async (favsCollection) => {
            const query = { mlsId: { $in: mlsIds } };
            const favs = await favsCollection.find(query).toArray();
            return favs;
        };

        try {
            const favorites = await this.run(getFavoritesQuery, FAV_COLLECTION);
            return favorites;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async saveFavorite(mlsId) {
        let amount;
        const filter = { mlsId: mlsId };

        // lookup query
        const findFav = async (favsCollection) => {
            const fav = await favsCollection.findOne(filter);
            return fav;
        };

        // update or replace operation
        const createOrInsertFav = async (favsCollection) => {
            const options = { upsert: true }; // this option instructs the method to create a document if no documents match the filter
            const updateFav = {
                $set: { amount },
            };
            await favsCollection.updateOne(filter, updateFav, options);
        };

        try {
            const fav = await this.run(findFav, FAV_COLLECTION);
            amount = fav ? fav.amount + 1 : 1;

            await this.run(createOrInsertFav, FAV_COLLECTION);

            return { mlsId, amount };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports.dbClient = new DBClient();
