/**
 * This class renders the about page
 *
 */

export const aboutController = {

    index: {
        handler: function (request, h) {
          return h.view("about-view", { title: "About Irish Lighthouses" });
        },
      },
  };