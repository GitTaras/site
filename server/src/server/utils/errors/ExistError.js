import ApplicationError from './ApplicationError';

class ExistError extends ApplicationError {
  constructor(message) {
    super(message || 'Opps, such item already exist!', 409);
  }
}

module.exports = ExistError;