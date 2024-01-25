import { db } from "../models/db.js";

export const playlistController = {
  index: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);
      const viewData = {
        title: "Playlist",
        playlist: playlist,
      };
      return h.view("playlist-view", viewData);
    },
  },

  addTrack: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);
      const newTrack = {
        trackTitle: request.payload.trackTitle,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };
      await db.trackStore.addTrack(playlist._id, newTrack);
      return h.redirect(`/playlist/${playlist._id}`);
    },
  },

  deleteTrack: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);
      // console.log(`Deleting Playlist -- ${playlist._id}`);
      await db.trackStore.deleteTrackById(request.params.trackid);
      return h.redirect(`/playlist/${playlist._id}`);
    },
  },
};