export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export class ApiResponse<T> {
  statusCode: string;
  message: string;
  errors?: string[];
  data?: T;

  constructor(
    statusCode: string,
    message: string,
    data?: T,
    errors?: string[],
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }

  static success<T>(data: T, message = 'Success'): ApiResponse<T> {
    return new ApiResponse('200', message, data);
  }

  static error(message: string, errors?: string[]): ApiResponse<null> {
    return new ApiResponse('400', message, null, errors);
  }
}
