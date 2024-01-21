import { db } from "../models/db.js";


export const playlistController = {
    index: {
        handler: async function (request, h) {
          const tracks = await db.trackStore.getTrackById();
          const playlist = await db.playlistStore.getPlaylistById();
          const viewData = {
            title: "Playlist",
            playlist: playlist,
            track: tracks,
          };
          return h.view("playlist-view", viewData);
        },
      },
};