// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
}).label("JwtAuth");

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
}).label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const LighthouseSpec = Joi.object().keys({
    title: Joi.string().required().example("Poolbeg"),
    towerHeight: Joi.number().allow("").optional().example("23.3"),
    lightHeight: Joi.number().allow("").optional().example("33.3"),
    character: Joi.string().allow("").optional().example("FL(5) W3s"),
    daymark: Joi.string().allow("").optional().example("Painted Black and White"),
    range: Joi.number().allow("").optional().example("50.3"),
    latitude: Joi.allow("").optional().example("-7.222"),
    longitude: Joi.allow("").optional().example("53.333"),
    image: Joi.allow("").optional(),
    groupid: IdSpec,
}).label("LighthouseDetails");

export const LighthouseSpecPlus = LighthouseSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("LighthousePlus");

export const LighthouseArray = Joi.array().items(LighthouseSpecPlus).label("LighthouseArray");
  
export const GroupSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("My Custom Group"),
    userid: IdSpec,
    lighthouses: LighthouseArray,
}).label("Group");

export const GroupSpecPlus = GroupSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("GroupPlus");

export const GroupArray = Joi.array().items(GroupSpecPlus).label("GroupArray");
  