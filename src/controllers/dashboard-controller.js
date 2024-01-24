import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const playlists = await db.playlistStore.getUserPlaylists(loggedInUser._id);
      // const playlists = await db.playlistStore.getAllPlaylists();
      const viewData = {
        title: "Playtime Dashboard",
        user: loggedInUser,
        playlists: playlists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlaylist: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlayList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.playlistStore.addPlaylist(newPlayList);
      return h.redirect("/dashboard");
    },
  },


  deletePlaylist: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);
      console.log(`Deleting Playlist -- ${playlist._id}`);
      await db.playlistStore.deletePlaylistById(playlist._id);
      h.redirect("/dashboard");
    },
  },
};

