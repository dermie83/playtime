// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

// export const UserSpec = Joi.object()
//   .keys({
//     firstName: Joi.string().example("Homer").required(),
//     lastName: Joi.string().example("Simpson").required(),
//     email: Joi.string().email().example("homer@simpson.com").required(),
//     password: Joi.string().example("secret").required(),
//     _id: IdSpec,
//     __v: Joi.number(),
//   })
//   .label("UserDetails");

// export const UserArray = Joi.array().items(UserSpec).label("UserArray");

// export const UserCredentialsSpec = {
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
// };

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const LighthouseSpec = {
    title: Joi.string().required(),
    towerHeight: Joi.number().allow("").optional(),
    lightHeight: Joi.number().allow("").optional(),
    character: Joi.string().allow("").optional(),
    daymark: Joi.string().allow("").optional(),
    range: Joi.number().allow("").optional(),
    latitude: Joi.allow("").optional(),
    longitude: Joi.allow("").optional(),
    image: Joi.allow("").optional(),
  };
  
  export const GroupSpec = {
    title: Joi.string().required(),
  };
  