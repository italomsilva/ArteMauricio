export class ErrorResponse {
  constructor(
    public statusCode: number,
    public message: string,
    public error: string,
    public backTo?: string
  ) {}
}