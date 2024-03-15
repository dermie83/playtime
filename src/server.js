import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Hapi from "@hapi/hapi";
// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";
import Cookie from "@hapi/cookie";
import path from "path";
import dotenv from "dotenv";
import HapiSwagger from "hapi-swagger";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import { accountsController } from "./controllers/accounts-controller.js";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { apiRoutes } from "./api-routes.js";

const swaggerOptions = {
  info: {
    title: "Irish Lighthouses API",
    version: "0.1",
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });

  await server.register(Vision);
  await server.register(Cookie);
  await server.register(Inert);

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.validator(Joi);

  const result = dotenv.config();
  if (result.error) {
    console.log(result.error.message);
    process.exit(1);
  }

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

  db.init("json");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
