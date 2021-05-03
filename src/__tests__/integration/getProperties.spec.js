// test related packages
const { rest } = require('msw');
const { gql } = require('apollo-server');
const { setupServer } = require('msw/node');
const { createTestClient } = require('apollo-server-testing');

// internal libraries
const createApolloServer = require('../../utils/getApolloServer');
const { API_END_POINT } = require('../../config/simplyRETS');

// mocks
const { getPropsResponseMock } = require('../../__mocks__/testsAssertions');
const mockServer = setupServer(
    rest.get(API_END_POINT, (req, res, ctx) => res(ctx.json(getPropsResponseMock)))
);

const server = createApolloServer(true);

describe('GetProperties query', () => {
    beforeAll(() => mockServer.listen());
    afterEach(() => mockServer.resetHandlers());
    afterAll(() => mockServer.close());

    it('should fetch properties lists', async () => {
        const { query } = createTestClient(server);

        const { data } = await query({
            query: gql`
                {
                    properties {
                        favoriteCount
                        mlsId
                        address {
                            city
                        }
                    }
                }
            `,
        });

        expect(data).toEqual(getPropsResponseMock);
    });

    it('should fetch properties lists filtered by city', async () => {});
    it('should check if is valid user', async () => {});
    it('should handle invalid user request', async () => {});
    it('should handle empty responses', async () => {});
});
