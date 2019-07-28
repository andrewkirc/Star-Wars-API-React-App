import http from '../HTTP';

const url = "https://swapi.co/api/people/?format=json";
describe('HTTP Class', () => {
    it('Should retrieve all Star Wars characters.', async () => {
        const response = await http.request(url, 10000);
        expect(response).toEqual(200);
    });
});