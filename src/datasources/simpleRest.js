// external packages
const { RESTDataSource } = require('apollo-datasource-rest');

// config
const {
    API_END_POINT,
    API_PROPERTIES_PATH,
    API_USER_NAME,
    API_PASSWORD,
} = require('../config/simplyRETS');

class SimpleRESTAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = API_END_POINT;
    }

    willSendRequest(request) {
        request.headers.set(
            'Authorization',
            'Basic ' + Buffer.from(API_USER_NAME + ':' + API_PASSWORD).toString('base64')
        );
    }

    async getProperties(city) {
        const queryParams = city ? `?q=${city}` : '';

        const response = await this.get(`${API_PROPERTIES_PATH}${queryParams}`);

        return Array.isArray(response) ? response : [];
    }
}

module.exports = SimpleRESTAPI;
