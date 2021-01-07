const chai = require("chai");
const chaiHttp = require("chai-http")
const app = require("../app");

const { API_VERSION, IP_SERVER} = require("../config");

chai.use(chaiHttp);
chai.should();

const assert = chai.assert;
const expect = chai.expect;

describe("Healt Check test",
        () => {
            it("Check the response with status 200",
            (done) => {
                chai.request(app)
                    .get(`/api/${API_VERSION}/`)
                    .end(function(_req, res){
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            })
        }
    );

describe("Items search list test",
        () => {
            it("Check the response with status 200 and with results",
            (done) => {
                chai.request(app)
                    .get(`/api/${API_VERSION}/items`)
                    .query({
                        search: "iphone"
                    })
                    .end(function(_req, res){
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        expect(res.body.results).not.to.be.undefined;
                        done();
                    });
            });

            it("Check the response with status 400 when the criteria is not sent",
            (done) => {
                chai.request(app)
                    .get(`/api/${API_VERSION}/items`)
                    .end(function(_req, res){
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        assert(res.body.message, "bad_request");
                        assert(res.body.error, "The search criteria is mandatory");
                        done();
                    });
            });
        }
    );

describe("Items detail test",
    () => {
        const itemId = "MLA850382509";
        it("Check the response with status 200 and with the detail",
        (done) => {
            chai.request(app)
                .get(`/api/${API_VERSION}/items/${itemId}`)
                .end(function(_req, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body.description).not.to.be.undefined;
                    expect(res.body.thumbnail).not.to.be.undefined;
                    assert(res.body.id, itemId);
                    done();
                });
        });

        it("Check the response with status 404 when the id doesn't exist",
        (done) => {
            chai.request(app)
                .get(`/api/${API_VERSION}/items/${itemId}-1`)
                .end(function(_req, res){
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    assert(res.body.error, "resource not found");
                    done();
                });
        });
    }
);