import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec} from "../models/joi-schemas.js";
import { Request, ResponseToolkit } from "@hapi/hapi";


export const accountsController = {
  index: {
    auth: false,
    handler: function (request:Request, h:ResponseToolkit) {
      return h.view("main", { title: "Welcome Irish Lighthouses" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request:Request, h:ResponseToolkit) {
      return h.view("signup-view", { title: "Sign up for Irish Lighthouses" });
    },
  },
  
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request:Request, h:ResponseToolkit, error:any) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request:Request, h:ResponseToolkit) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request:Request, h:ResponseToolkit) {
      return h.view("login-view", { title: "Login to Irish Lighthouses" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request:Request, h:ResponseToolkit, error:any) {
        return h.view("login-view", { title: "Login error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request:Request, h:ResponseToolkit) {
      const { email, password } = request.payload as any;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    auth: false,
    handler: function (request:Request, h:ResponseToolkit) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
  async validate(request:Request, session:any) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};