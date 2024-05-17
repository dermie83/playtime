import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Hapi, { Server } from "@hapi/hapi";
// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import HapiSwagger from "hapi-swagger";
import jwt from "hapi-auth-jwt2";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { accountsController } from "./controllers/accounts-controller.js";
import { webRoutes } from "./web-routes.js";
import { connectDb, db } from "./models/db.js";
import { apiRoutes } from "./api-routes.js";
import { validate } from "./api/jwt-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const swaggerOptions = {
  info: {
    title: "Irish Lighthouses API",
    version: "0.1",
  },
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    }
  },
  security: [{ jwt: [] }]
};


function importEnvs() {
  const result = dotenv.config();
  if (result.error) {
    console.log(result.error.message);
    process.exit(1);
  }
}

async function initPlugins(server: Server) {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(jwt);
  server.validator(Joi);

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
}

function initSecurityStrategies(server: Server) {
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session");

  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });
}

async function init() {
  importEnvs();
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    routes: { cors: true },
  });
  await initPlugins(server);
  initSecurityStrategies(server);
  connectDb("mongo");
  server.route(webRoutes);

  server.route(apiRoutes);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

await init();

