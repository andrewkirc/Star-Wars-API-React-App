import API from '../API';
const api = new API();
jest.setTimeout(30000);

describe('Star Wars API Class', () => {
    it('Should retrieve all Star Wars characters (Method: getAllPages)', async () => {
        const response = await api.getAllPages(
            "https://swapi.co/api/people/?format=json", 10);
        expect(response[0].name).toEqual("Luke Skywalker");
    });

    it('Should retrieve all Star Wars characters (Method: getAllPagesWait)', async () => {
        const response = await api.getAllPagesWait("https://swapi.co/api/people/?format=json");
        expect(response[0].name).toEqual("Luke Skywalker");
    });
}, 15000);