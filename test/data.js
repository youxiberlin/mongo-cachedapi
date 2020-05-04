const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const util = require('util');

const { expect } = chai;

chai.use(chaiHttp);

describe('Data', () => {
	describe('create data', () => {
		it('create a new data if there is no key in the db', (done) => {
			chai.request('http://localhost:3000')
				.get('/data/1')
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.have.all.keys('data', 'key');
					done();
				});
		});
	});
})