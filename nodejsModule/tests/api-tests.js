let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../index.js');

/**
 * Test the api landing page
 */
describe('landing-page', ()=>{
    it('should GET a simple greeting', (done)=>{
        chai.request(server)
        .get('/')
        .end(($err,$res)=>{
            ($res).should.have.status(200);
            ($res.body).should.be.a('object');
            done();
        });
    });
});

/**
 * Test CSV Listing endpoint
 */
describe('CSV files Listing', ()=>{
    it('should GET a listing of the CSV files in the rawCSV folder', (done)=>{
        chai.request(server)
        .get('/api/csv-files')
        .end(($err,$res)=>{
            ($res).should.have.status(200);
            ($res.body).should.be.a('array');
            done();
        });
    });
});