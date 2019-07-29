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
        try {
            await http.request("bad url");
        } catch (e) {
            expect(e.message).toEqual("Network request failed");
        }
    });
});