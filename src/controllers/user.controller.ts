import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { userService } from '../services';
import { User } from '@prisma/client';

const createUser = catchAsync(async (req, res) => {
  const { email, password, name, role } = req.body;
  const user = await userService.createUser(email, password, name, role);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const user: User | undefined = req.user as User
  const user2 = await userService.getUserById(req.params.userId);
  if(!user2){
    throw new ApiError(httpStatus.NOT_FOUND,'Not found')
  }
  if (user.role == 'ADMIN' || user.id == req.params.userId || user2?.isPublic) {
    res.send(user2)
  }
  throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
});

const getUser = catchAsync(async (req, res) => {
  if (req.user) {
    res.send(req.user);
  }
  throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
});

const updateUser = catchAsync(async (req, res) => {
  const user: User | undefined = req.user as User
  if (user.id) {
    const updatedUser = await userService.updateUserById(user.id, req.body);
    res.send(updatedUser);
  }
});



export default {
  createUser,
  getUsers,
  getUser,
  updateUser
};
