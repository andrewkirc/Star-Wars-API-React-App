import API from '../API';
const api = new API();

describe('Star Wars API Class', () => {
    it('Should retrieve all Star Wars characters (getAllPages)', () => {
        api.getAllPages(
            "https://swapi.co/api/people/?format=json", 10,
            (err, results) => {
                expect(200).toEqual(400)
                expect(results.status).toEqual(400)
                expect(results[0].name).toEqual(500);
                done();
            }
        );
    });

    it('Should retrieve all Star Wars characters (getAllPagesWait)', () => {
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