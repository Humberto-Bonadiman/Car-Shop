import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarsController from '../../../controllers/CarsController';
// import CarService from '../../../services/CarsService';
import getAllCars from '../../mockTests/carMock';
import { Response, Request } from 'express';
// import CarModel, { CarDocument } from '../../../models/CarsModel';
import { RequestWithBody, ResponseError } from '../../../controllers';
import { Car } from '../../../interfaces/CarInterface';
import { ServiceError } from '../../../services';

chai.use(chaiHttp);

const { expect } = chai;
const carTestController = new CarsController();
const payload = {
  model: 'Honda',
  year: 2013,
  color: 'black',
  status: false,
  buyValue: 30000,
  doorsQty: 4,
  seatsQty: 5,
};
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
const payloadUpdate = {
  model: 'Honda',
  year: 2013,
  color: 'white',
  status: false,
  buyValue: 20000,
  doorsQty: 4,
  seatsQty: 5,
};
const updateAddCar = {
  _id: '6255e257bf956413e5d5200b',
  model: 'Honda',
  year: 2013,
  color: 'white',
  status: false,
  buyValue: 20000,
  doorsQty: 4,
  seatsQty: 5,
};

// const notFound = { error: this.errors.notFound };

describe('Ao chamar o controller de create', () => {
  const request = {} as RequestWithBody<Car>;
  const response = {} as Response;

  describe('quando é inserido com sucesso', () => {
    before(async () => {
      request.body = payload;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();

      sinon.stub(carTestController.service, 'create').resolves(addCar);
    });

    after(() => {
      sinon.restore();
    });
  
    it('retorna um objeto com os dados corretos', async () => {
      await carTestController.create(request, response);

      expect((response.json as sinon.SinonStub).calledWith(addCar)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.be.an('object');
    });

    it('retorna um objeto com as propriedades corretas', async () => {
      await carTestController.create(request, response);

      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('_id');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('model');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('year');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('color');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('status');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('buyValue');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('doorsQty');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('seatsQty');
    });

    it('retorna um código de status 201', async () => {
      await carTestController.create(request, response);

      expect((response.status as sinon.SinonStub).calledWith(201)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller de read', () => {
  const request = {} as Request;
  const response = {} as Response;

  describe('quando é inserido com sucesso', () => {
    before(async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();

      sinon.stub(carTestController.service, 'read').resolves(getAllCars);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna um array de objetos com os dados corretos', async () => {
      await carTestController.read(request, response);

      expect((response.json as sinon.SinonStub).calledWith(getAllCars)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).not.to.be.empty;
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.be.an('array');
    });

    it('retorna um código de status 200', async () => {
      await carTestController.read(request, response);

      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller de readOne', () => {
  const request = {} as Request<{ id: string; }>;
  const response = {} as Response<Car | ResponseError>;

  describe('quando retorna com sucesso', () => {
    before(async () => {
      request.params = { id: addCar._id };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();

      sinon.stub(carTestController.service, 'readOne').resolves(addCar);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna um objeto com os dados corretos', async () => {
      await carTestController.readOne(request, response);

      expect((response.json as sinon.SinonStub).calledWith(addCar)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.be.an('object');
    });

    it('retorna um objeto com as propriedades corretas', async () => {
      await carTestController.readOne(request, response);

      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('_id');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('model');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('year');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('color');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('status');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('buyValue');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('doorsQty');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('seatsQty');
    });
  });

/*   describe('quando não retorna com sucesso', () => {
    before(async () => {
      request.params = { id: '6255e257bf956413e5d5200a' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();

      sinon.stub(carTestController.service, 'readOne').resolves();
    });

    after(() => {
      sinon.restore();
    });

    it('retorna um código de status 404', async () => {
      await carTestController.readOne(request, response);

      expect((response.status as sinon.SinonStub).calledWith(404)).to.be.equal(true);
    });
  }); */
});

describe('Ao chamar o Controller de update', () => {
  const request = {} as Request<{ id: string; }>;
  const response = {} as Response<Car | ResponseError>;

  describe('quando retorna com sucesso', () => {
    before(async () => {
      request.params = { id: addCar._id };
      request.body = payloadUpdate;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();

      sinon.stub(carTestController.service, 'update').resolves(updateAddCar);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna um objeto com os dados corretos', async () => {
      await carTestController.update(request, response);

      expect((response.json as sinon.SinonStub).calledWith(updateAddCar)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.be.an('object');
    });

    it('retorna um objeto com as propriedades corretas', async () => {
      await carTestController.update(request, response);

      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('_id');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('model');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('year');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('color');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('status');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('buyValue');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('doorsQty');
      expect((response.json as sinon.SinonStub).getCall(0).args[0]).to.have.a.property('seatsQty');
    });
  });
});

describe('Ao chamar o Controller de delete', () => {
  const request = {} as Request<{ id: string; }>;
  const response = {} as Response<Car | null | ResponseError>;

  describe('quando retorna com sucesso', () => {
    before(async () => {
      request.params = { id: addCar._id };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();

      sinon.stub(carTestController.service, 'delete').resolves(addCar as never);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna um código de status 204', async () => {
      await carTestController.delete(request, response);

      expect((response.status as sinon.SinonStub).calledWith(204)).to.be.equal(true);
    });
  });
});