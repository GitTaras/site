import ApplicationError from './ApplicationError';

class NotEnoughMoney extends ApplicationError {
  constructor(message) {
    super(message || 'Opps, you don\'t have enough money on balance!', 400);
  }
}

module.exports = NotEnoughMoney;