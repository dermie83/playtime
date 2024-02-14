import { Track } from "./track.js";

export const trackMongoStore = {
  async getAllTracks() {
    const tracks = await Track.find().lean();
    return tracks;
  },

  async getTracksByPlaylistId(id) {
    const tracks = await Track.find({ playlistid: id }).lean();
    return tracks;
  },

  async addTrack(playlistId, track) {
    // get the playlist id
    track.playlistid = playlistId;
    // create a new track object/array
    const newTrack = new Track(track);
    // save the new track object/array
    const trackObj = await newTrack.save();
    // return the new track object with new id of null
    return this.getTrackById(trackObj._id);
  },

  async getTrackById(id) {
    if (id) {
      const track = await Track.findOne({ _id: id }).lean();
      return track;
    }
    return null;
  },

  async deleteTrack(id) {
    try {
      await Track.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllTracks() {
    await Track.deleteMany({});
  },

  async updateTrack(track, updatedTrack) {
    const trackDoc = await Track.findOne({ _id: track._id });
    trackDoc.title = updatedTrack.title;
    trackDoc.artist = updatedTrack.artist;
    trackDoc.duration = updatedTrack.duration;
    await trackDoc.save();
  },

};