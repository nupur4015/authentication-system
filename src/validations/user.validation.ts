import { Role } from '@prisma/client';
import Joi from 'joi';
import { password } from './custom.validation';

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid(Role.USER, Role.ADMIN)
  })
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

const updateUser = {
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string().optional(),
      phone: Joi.string().optional(),
      photo: Joi.string().optional(),
      bio: Joi.string().optional(),
      password: Joi.string().optional()
    })
    .min(1)
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

const uploadPhoto = {
  body: Joi.object()
    .keys({
      photo: Joi.string()
    })
    .min(1)
};

const updateVisibility = {
  body: Joi.object()
    .keys({
      isPublic: Joi.boolean()
    })
    .min(1)
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadPhoto,
  updateVisibility
};
