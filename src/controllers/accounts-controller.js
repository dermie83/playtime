import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec} from "../models/joi-schemas.js";


export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome Irish Lighthouses" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Irish Lighthouses" });
    },
  },

  showProfile: {
    auth: false,
    handler: async function (request, h) {

      const user = await db.userStore.getGroupById(request.params.id)
      
      const loggedInUser = await db.userStore.getUserById(request.auth.credentials);
      console.log("loggedInUser", loggedInUser);
       const viewData = {
         title: "User Profile",
         loggedInUser: user,
       };
    return h.view("profile-view", viewData);
    },
  },

  updateProfile: {
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("edit-user-view", { title: "Edit user error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const userID = request.params.id;
      console.log("userid",userID)
      const updatedUser = request.payload;
      await db.userStore.updateUser(userID, updatedUser);
      return h.redirect("/profile");
    },
  },
  // updateProfile: {
  //   auth: false,
  //   validate: {
  //     payload: UserSpec,
  //     options: { abortEarly: false },
  //     failAction: function (request, h, error) {
  //       return h.view("profile-view", { title: "edit profile error", errors: error.details }).takeover().code(400);
  //     },
  //   },
  //   handler: async function (request, h) {
  //     let loggedInUser = await db.userStore.getUserById(request.params.id);
  //     console.log("loggedInUserID", loggedInUser)
  //     let updateUser = {
  //       firstName: request.payload.firstName,
  //       lastName: request.payload.lastName,
  //       password: request.payload.password,
  //       email: request.payload.email,
  //     };
  //     console.log("updateuser", updateUser)
  //     await db.userStore.updateUser(loggedInUser._id, updateUser);
  //     return h.redirect("dashboard-view");
  //   },
  // },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Irish Lighthouses" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Login error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
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
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};