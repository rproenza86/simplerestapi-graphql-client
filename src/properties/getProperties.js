
/**
 * Finds favorites count on internal db and add that information
 * to the corresponding properties.
 */
const getPropsWithFavs = async (properties, dbClient) => {
    const propsWithFavs = [];

    const favs = await dbClient.getFavorites(properties.map((property) => property.mlsId));

    properties.forEach((property) => {
        const fav = favs.find((fav) => property.mlsId === fav.mlsId);
        const favoriteCount = fav ? fav.amount : 0;

        propsWithFavs.push({ ...property, favoriteCount });
    });

    return propsWithFavs;
};

/**
 *
 * Fetch properties from the SimpleREST api
 * and adds the favoriteCount data querying it
 * from our internal db.
 *
 * @param {*} city Optional parameter
 * @returns
 */
module.exports = async function getProperties(city, { simpleRESTAPI, dbClient }) {
    try {
        const data = await simpleRESTAPI.getProperties(city);
        const propertiesWithFavs = await getPropsWithFavs(data, dbClient);
        return propertiesWithFavs;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
