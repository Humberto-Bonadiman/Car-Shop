import * as sinon from 'sinon';
import { expect } from 'chai';
import { Types } from 'mongoose';
import CarModel, { CarDocument } from '../../../models/CarsModel';
import getAllCars from '../../mockTests/carMock';

const carTest = new CarModel();
const addCar = {
  _id: '6255e257bf956413e5d5200b',
  model: 'Honda',
  year: 2013,
  color: 'black',
  status: false,
  buyValue: 30000,
  doorsQty: 4,
  seatsQty: 5,
};

describe('Insere um item no BD', () => {
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
    it('retorna um objeto com os dados corretos', async () => {
      const response = await carTest.create(payload);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('_id');
      expect(response).to.have.a.property('model');
      expect(response).to.have.a.property('year');
      expect(response).to.have.a.property('color');
      expect(response).to.have.a.property('status');
      expect(response).to.have.a.property('buyValue');
      expect(response).to.have.a.property('doorsQty');
      expect(response).to.have.a.property('seatsQty');
    });
  })
});

describe('Retorna todos os itens do banco de dados', () => {
  describe('quando existem itens no banco de dados', () => {
    before(async () => {
      sinon.stub(carTest.model, 'find').resolves(getAllCars as (CarDocument & {_id: string })[]);
    });

    after(async () => {
      (carTest.model.find as sinon.SinonStub).restore();
    });

    it('retorna um array não vazio, com um objeto contendo as seguintes propriedades', async () => {
      const response = await carTest.read();

      expect(response).to.be.an('array');
      expect(response).not.to.be.empty;
      response.forEach((product) => expect(product).to.include.all.keys(
        '_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty'
        ));
    });
  });
});

describe('Busca apenas um produto no BD por seu Id', () => {
  before(async () => {
    sinon.stub(carTest.model, 'findOne').resolves(addCar as (CarDocument & {_id: string }));
  });

  after(async () => {
    (carTest.model.findOne as sinon.SinonStub).restore();
  });
  it('retorna um objeto', async () => {
    const response = await carTest.readOne('6255e257bf956413e5d5200b');

    expect(response).to.be.an('object');
  });
});
