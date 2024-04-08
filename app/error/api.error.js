class ApiError extends Error {
  constructor(message, status) {
    super();
    this.status = status;
    this.message = message;
  }
}

class AuthError extends ApiError {
  constructor(message, status) {
    super(message, status);
    this.name = 'AuthError';
  }
}

export { ApiError, AuthError };
