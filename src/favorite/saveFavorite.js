module.exports = async function saveFavorite(mlsId, { dbClient }) {
    try {
        return await dbClient.saveFavorite(mlsId);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
