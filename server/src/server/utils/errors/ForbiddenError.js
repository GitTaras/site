import ApplicationError from './ApplicationError';

class ForbiddenError extends ApplicationError {
  constructor(message) {
    super(message || 'You do\'nt have permission!', 403);
  }
}

module.exports = ForbiddenError;
