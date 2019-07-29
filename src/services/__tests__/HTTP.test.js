import http from '../HTTP';
jest.setTimeout(15000);

const url = "https://swapi.co/api/people/?format=json";
describe('HTTP Class', () => {
    it('Should successfully make HTTP request.', async () => {
        const response = await http.request(url);
        expect(response.status).toEqual(200);
    });
    it('Should successfully parse JSON response.', async () => {
        const response = await http.request(url);
        expect(response.data.results[0].name).toEqual("Luke Skywalker");
    });
    it('Should handle connection error.', async () => {
        //Silence request polyfill console.error.
        const originalError = console.error;
        console.error = jest.fn();
        //Run test against known bad endpoint.
        try {
            await http.request("https://swapi.co_/api");
        } catch (e) {
            expect(e.message).toEqual("Network request failed");
        }
        console.error = originalError;
    });
});