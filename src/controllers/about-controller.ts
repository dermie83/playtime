/**
 * This class renders the about page
 *
 */
import { Request, ResponseToolkit } from "@hapi/hapi";

export const aboutController = {

    index: {
        handler: function (request:Request, h:ResponseToolkit) {
          return h.view("about-view", { title: "About Irish Lighthouses" });
        },
      },
  };