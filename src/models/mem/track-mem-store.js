import { v4 } from "uuid";

let tracks = [];

export const trackMemStore = {
  async getAllTracks() {
    return tracks;
  },

  async addTrack(playlistId, track) {
    track._id = v4();
    track.playlistId = playlistId; 
    tracks.push(track);
    console.log(`trackId ${  track._id}`);
    return track;
  },

  async getTrackById(id) {
    console.log(`TrackId ${  id}`);
    return tracks.find((track) => track._id === id);
  },
};