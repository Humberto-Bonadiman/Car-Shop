import CarsController from './controllers/CarsController';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/Router';
import App from './app';

const server = new App();

const carsController = new CarsController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carsController);

server.addRouter(carRouter.router);

export default server;
