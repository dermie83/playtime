import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { groupController } from "./controllers/group-controller.js";


export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  // { method: "GET", path: "/profile", config: accountsController.showProfile},
  // { method: "POST", path: "/profile/update/{id}", config: accountsController.updateProfile},
  
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addgroup", config: dashboardController.addGroup },
  { method: "GET", path: "/dashboard/deletegroup/{id}", config: dashboardController.deleteGroup },

  { method: "GET", path: "/group/{id}", config: groupController.index },
  { method: "POST", path: "/group/{id}/addlighthouse", config: groupController.addLighthouse },
  { method: "GET", path: "/group/{id}/deletegroup/{lighthouseid}", config: groupController.deleteLighthouse },
  { method: "GET", path: "/group/{id}/editlighthouse/{lighthouseid}", config: groupController.editLighthouseView },
  { method: "POST", path: "/group/{id}/updatelighthouse/{lighthouseid}", config: groupController.updateLighthouse}

];