import CarsController from './controllers/CarsController';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/Router';
import App from './app';
import MotorcycleController from './controllers/MotorcycleController';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carsController = new CarsController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carsController);

server.addRouter(carRouter.router);

const motorcycleController = new MotorcycleController();

const motorcycleRouter = new CustomRouter<Motorcycle>();
motorcycleRouter.addRoute(motorcycleController);

server.addRouter(motorcycleRouter.router);

export default server;
