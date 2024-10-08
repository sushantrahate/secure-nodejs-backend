import { Request, Response } from 'express';
import { SUCCESS, ERROR } from '../constants/messages';
import { createResponse } from '../utils/response.util';

export const getUser = (req: Request, res: Response) => {
  try {
    const user = { id: 1, name: 'John Doe', email: 'john@example.com' };

    const response = createResponse(true, user, SUCCESS.USER_FOUND, 200);
    res.status(response.statusCode).json(response);
  } catch (error) {
    const response = createResponse(
      false,
      null,
      ERROR.INTERNAL_SERVER_ERROR,
      500
    );
    res.status(response.statusCode).json(response);
  }
};

export const createUser = (req: Request, res: Response): any => {
  const { name, email } = req.body;

  if (!name || !email) {
    const response = createResponse(false, null, ERROR.INVALID_USER_DATA, 400);
    return res.status(response.statusCode).json(response);
  }

  const newUser = { id: 2, name, email };
  const response = createResponse(
    true,
    newUser,
    SUCCESS.REGISTRATION_SUCCESSFUL,
    201
  );
  res.status(response.statusCode).json(response);
};
