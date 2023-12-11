const request = require('supertest');
const expect = require('chai').expect;

describe('email', () => {
    it('should verify email', (done) => {
        request('http://localhost:8080')
            .get('/api/email/verifyEmail')
            .query({ email: 'daniel@mail.com' })
            .set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function (err, res) {
				
                expect(res.statusCode).to.be.equal(200);
				expect(res.body.msg).to.be.equal('email verified');
				expect(res.body.email).to.be.equal('daniel@mail.com');

                done();
			});
    })
})