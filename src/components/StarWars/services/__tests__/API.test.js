import API from '../API';
const api = new API();
jest.setTimeout(30000);

describe('Star Wars API Class', () => {
    it('Should retrieve all Star Wars characters (Method: getAllPages)', async () => {
        const response = await api.getAllPages(
            "https://swapi.co/api/people/?format=json", 10);
        expect(response[0].name).toEqual("Luke Skywalker");
    });

    it('Should retrieve all Star Wars characters (Method: getAllPagesWait)', () => {
        api.getAllPagesWait(
            "https://swapi.co/api/people/?format=json",
            (err, results) => {
                console.log(results[0].name)
                expect(results[0].name).toEqual("");
                done();
            }
        );
    });
}, 15000);