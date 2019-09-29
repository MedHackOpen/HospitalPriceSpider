// Import the dependencies for testing
let app = require('../index.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Institutions", () => {
    describe("GET average price by location", () => {
        // Test to get average price for hospital within a range
        it("should get average price for hospital within a range", (done) => {
            chai.request(app)
                .get('/averageprice/location?range=600&lon=-165.37812474&lat=64.49906305')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
describe("Procedures", () => {
    describe("GET cost using a phrase", () => {
        // Test to costliest procedure using a phrase
        it("should get costliest procedure using a phrase", (done) => {
            chai.request(app)
                .get('/costliestProcedure/containingPhrase?phrase=lib')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
    describe("GET cost using a phrase", () => {
        // Test to costliest procedure using a phrase
        it("should get costliest procedure using a phrase", (done) => {
            chai.request(app)
                .get('/costliestProcedure/containingPhrase?phrase=lib')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        // Test to cheapest procedure using a phrase
        it("should get cheapest procedure using a phrase", (done) => {
            chai.request(app)
                .get('/cheapestProcedure/containingPhrase?phrase=lib')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
});





