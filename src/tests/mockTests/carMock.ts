import { Types } from 'mongoose';

const getAllCars = [
  {
    _id: new Types.ObjectId(),
    model: 'Honda',
    year: 2013,
    color: 'black',
    // status: false,
    buyValue: 30000,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    _id: new Types.ObjectId(),
    model: 'Fusca',
    year: 1970,
    color: 'white',
    // status: false,
    buyValue: 3000,
    doorsQty: 2,
    seatsQty: 5,
  },
  {
    _id: new Types.ObjectId(),
    model: 'Palio',
    year: 2008,
    color: 'red',
    // status: true,
    buyValue: 15000,
    doorsQty: 2,
    seatsQty: 5,
  }
];

export default getAllCars;