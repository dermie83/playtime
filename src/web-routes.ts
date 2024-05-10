import { accountsController } from "./controllers/accounts-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { groupController } from "./controllers/group-controller.js";
import { lighthouseController } from "./controllers/lighthouse-controller.js";



export const webRoutes = [
  { method: "GET" as const, path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false as const } },

  { method: "GET" as const, path: "/", config: accountsController.index },
  { method: "GET" as const, path: "/signup", config: accountsController.showSignup },
  { method: "GET" as const, path: "/admin", config: adminController.index},
  { method: "GET" as const, path: "/deleteuser/{id}", config: adminController.deleteUser },
  { method: "GET" as const, path: "/admin/edituser/{id}", config: adminController.editUser},
  { method: "POST" as const, path: "/admin/updateuser/{id}", config: adminController.updateUser},
  
  { method: "GET" as const, path: "/login", config: accountsController.showLogin },
  { method: "GET" as const, path: "/logout", config: accountsController.logout },
  { method: "POST" as const, path: "/register", config: accountsController.signup },
  { method: "POST" as const, path: "/authenticate", config: accountsController.login },

  { method: "GET" as const, path: "/about", config: aboutController.index },

  { method: "GET" as const, path: "/dashboard", config: dashboardController.index },
  { method: "POST" as const, path: "/dashboard/addgroup", config: dashboardController.addGroup },
  { method: "GET" as const, path: "/dashboard/deletegroup/{id}", config: dashboardController.deleteGroup },

  { method: "GET" as const, path: "/group/{id}", config: groupController.index },
  { method: "POST" as const, path: "/group/{id}/addlighthouse", config: groupController.addLighthouse },
  { method: "GET" as const, path: "/group/{id}/deletegroup/{lighthouseid}", config: groupController.deleteLighthouse },
  { method: "POST" as const, path: "/group/{id}/uploadimage", config: groupController.uploadImage },

  { method: "GET" as const, path: "/group/{id}/editlighthouse/{lighthouseid}", config: lighthouseController.index },
  { method: "POST" as const, path: "/group/{id}/updatelighthouse/{lighthouseid}", config: lighthouseController.updateLighthouse}

];