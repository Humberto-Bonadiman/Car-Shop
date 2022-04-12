import * as sinon from 'sinon';
import { expect } from 'chai';
import { Types } from 'mongoose';
import CarModel from '../../../models/CarsModel';
// import { Car } from '../../../interfaces/CarInterface';

describe('Insere um item no BD', () => {
  const carTest = new CarModel();
  const addCar = {
    _id: new Types.ObjectId(),
    model: 'Honda',
    year: 2013,
    color: 'black',
    status: false,
    buyValue: 30000,
    doorsQty: 4,
    seatsQty: 5,
  };

  const payload = {
    model: 'Honda',
    year: 2013,
    color: 'black',
    status: false,
    buyValue: 30000,
    doorsQty: 4,
    seatsQty: 5,
  };

  before(async () => {
    sinon.stub(carTest.model, 'create').resolves(addCar);
  });

  after(async () => {
    (carTest.model.create as sinon.SinonStub).restore();
  });

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await carTest.create(payload);

      expect(response).to.be.a('object');
    });
  })
});
