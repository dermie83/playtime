// import { assert } from "chai";
// import { assertSubset } from "../test-utils.js";
// import { playtimeService } from "./playtime-service.js";
// import { maggie, mozart, testPlaylists, testTracks, concerto } from "../fixtures.js";
// import { db } from "../../src/models/db.js";

// suite("Track API tests", () => {
//   let user = null;
//   let beethovenSonatas = null;

//   setup(async () => {
//     db.init("json");
//     await playtimeService.deleteAllPlaylists();
//     await playtimeService.deleteAllUsers();
//     await playtimeService.deleteAllTracks();
//     user = await playtimeService.createUser(maggie);
//     mozart.userid = user._id;
//     beethovenSonatas = await playtimeService.createPlaylist(mozart);
//   });

//   teardown(async () => {});

//   test("create track", async () => {
//     const returnedTrack = await playtimeService.createTrack(beethovenSonatas._id, concerto);
//     assert.isNotNull(returnedTrack);
//     assertSubset(concerto, returnedTrack);
//   });

//   test("create Multiple trackApi", async () => {
//   });

//   test("Delete Track", async () => {
//   });

//   test("test denormalised playlist", async () => {
//   });
// });