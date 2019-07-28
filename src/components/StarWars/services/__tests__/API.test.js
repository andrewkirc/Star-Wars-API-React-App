import API from '../API';
const api = new API();

describe('Star Wars API Class', () => {
    it('Should retrieve all Star Wars characters.', () => {
        api.getAllPages(
            "https://swapi.co/api/people/?format=json", 10,
            (err, results) => {
                console.log(results[0].name)
                expect(results[0].name).toEqual("Luke Skywalker");
            }
        );
    });
});