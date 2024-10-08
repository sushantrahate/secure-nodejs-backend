import express, { Request, Response } from 'express';
import { Router } from 'express';
import { getUser, createUser } from './controllers/user.controller';

const router = Router();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Route to get user details
router.get('/user', getUser);

// Route to create a new user
router.post('/user', createUser);

app.use('', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
