import * as sinon from 'sinon';
import { expect } from 'chai';
import CarService from '../../../services/CarsService';
import CarModel, { CarDocument } from '../../../models/CarsModel';
import getAllCars from '../../mockTests/carMock';

const carTestService = new CarService();
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

  describe('quando é inserido com sucesso através do Service', () => {
    it('retorna um objeto com os dados corretos', async () => {
      const response = await carTestService.create(payload);

      expect(response).to.be.an('object');
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
      const response = await carTestService.read();

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
  it('retorna um objeto contendo as seguintes propriedades', async () => {
    const response = await carTestService.readOne('6255e257bf956413e5d5200b');

    expect(response).to.be.an('object');
    expect(response).to.include.all.keys(
      '_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty'
    );
  });
});

describe('Atualiza um produto no banco de dados através do id', () => {
  const updateCar = {
    _id: '6255e257bf956413e5d5200b',
    model: 'Honda',
    year: 2013,
    color: 'white',
    status: false,
    buyValue: 29000,
    doorsQty: 4,
    seatsQty: 5,
  };
  before(async () => {
    sinon.stub(carTest.model, 'findByIdAndUpdate').resolves(addCar as (CarDocument & {_id: string }));
  });

  after(async () => {
    (carTest.model.findByIdAndUpdate as sinon.SinonStub).restore();
  });

  it('retorna um objeto', async () => {
    const response = await carTestService.update('6255e257bf956413e5d5200b', updateCar);

    expect(response).to.be.an('object');
    expect(response).to.include.all.keys(
      '_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty'
    );
  });
});

describe('Deleta um item no banco de dados através do id', () => {
  describe('quando o item existe no banco de dados', () => {
    before(async () => {
      sinon.stub(carTest.model, 'findOneAndDelete').resolves(addCar as (CarDocument & {_id: string }));
    });

    after(async () => {
      (carTest.model.findOneAndDelete as sinon.SinonStub).restore();
    });

    it('retorna um objeto', async () => {
      const response = await carTestService.delete('6255e257bf956413e5d5200b');
  
      expect(response).to.be.an('object');
      expect(response).to.include.all.keys(
        '_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty'
      );
    });
  })
});