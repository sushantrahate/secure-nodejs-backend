import { Request, Response } from 'express';
import { SUCCESS, ERROR } from '../constants/messages';
import { createResponse } from '../utils/response.util';

export const getUser = (req: Request, res: Response) => {
  try {
    const user = { id: 1, name: 'John Doe', email: 'john@example.com' };

    const response = createResponse(true, 200, SUCCESS.USER_FOUND, user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    const response = createResponse(
      false,
      500,
      ERROR.INTERNAL_SERVER_ERROR,
      null
    );
    res.status(response.statusCode).json(response);
  }
};

export const createUser = (req: Request, res: Response): any => {
  const { name, email } = req.body;

  if (!name || !email) {
    const response = createResponse(false, 400, ERROR.INVALID_USER_DATA, null);
    return res.status(response.statusCode).json(response);
  }

  const newUser = { id: 2, name, email };
  const response = createResponse(
    true,
    201,
    SUCCESS.REGISTRATION_SUCCESSFUL,
    newUser
  );
  res.status(response.statusCode).json(response);
};
