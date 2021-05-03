// internal libraries
const { API_END_POINT, API_PROPERTIES_PATH } = require('../../config/simplyRETS');

// code under test
const SimpleRESTAPI = require('../simpleRest');

// mocks
const { getPropsResponseMock } = require('../../__mocks__/testsAssertions');
const mockGet = jest.fn();
jest.mock('apollo-datasource-rest', () => {
    class MockRESTDataSource {
        constructor() {
            this.baseUrl = '';
            this.get = mockGet;
        }
    }
    return {
        RESTDataSource: MockRESTDataSource,
    };
});

describe('SimpleRESTAPI', () => {
    beforeEach(() => {
        mockGet.mockReset();
    });

    it('should fetch properties lists', async () => {
        const api = new SimpleRESTAPI();
        mockGet.mockResolvedValue(getPropsResponseMock.properties);

        const data = await api.getProperties();

        expect(data).toEqual(getPropsResponseMock.properties);
        expect(mockGet).toBeCalledWith(API_PROPERTIES_PATH);
    });

    it('should fetch properties lists filtered by city', async () => {
        const api = new SimpleRESTAPI();
        mockGet.mockResolvedValue(getPropsResponseMock.properties);

        const data = await api.getProperties('Oak Ridge');

        expect(data).toEqual(getPropsResponseMock.properties);
        expect(mockGet).toBeCalledWith('properties?q=Oak Ridge');
    });

    it('should buble up error', async () => {});
});
