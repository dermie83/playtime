import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testGroups, testLighthouses, lighthouse1, group1 } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Lighthouse Model tests", () => {
  let groupList = null;

  setup(async () => {
    db.init("json");
    await db.groupStore.deleteAllGroups();
    await db.lighthouseStore.deleteAllLighthouses();
    groupList = await db.groupStore.addGroup(group1);
    for (let i = 0; i < testLighthouses.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLighthouses[i] = await db.lighthouseStore.addLighthouse(groupList._id, testLighthouses[i]);
    }
  });

  test("create single lighthouse", async () => {
    const group1List = await db.groupStore.addGroup(group1);
    const lighthouse = await db.lighthouseStore.addLighthouse(group1List._id, lighthouse1);
    assert.isNotNull(lighthouse._id);
    assertSubset(lighthouse1, lighthouse);
  });

  // test("create multiple groupsApi", async () => {
  //   const groups = await db.groupStore.getGroupById(groupList._id);
  //   assert.equal(groups.length, testGroups.length);
  // });

  test("delete all lighthouseApi", async () => {
    const lighthouses = await db.lighthouseStore.getAllLighthouses();
    assert.equal(testLighthouses.length, lighthouses.length);
    await db.lighthouseStore.deleteAllLighthouses();
    const newLighthouses = await db.lighthouseStore.getAllLighthouses();
    assert.equal(0, newLighthouses.length);
  });

  test("get a lighthouse - success", async () => {
    const group = await db.groupStore.addGroup(group1);
    const lighthouse = await db.lighthouseStore.addLighthouse(group._id, lighthouse1);
    const newLighthouse = await db.lighthouseStore.getLighthouseById(lighthouse._id);
    assertSubset(lighthouse1, newLighthouse);
  });

  test("delete One lighthouse - success", async () => {
    await db.lighthouseStore.deleteLighthouse(testLighthouses[0]._id);
    const lighthouses = await db.lighthouseStore.getAllLighthouses();
    assert.equal(lighthouses.length, testLighthouses.length - 1);
    const deletedlighthouse = await db.lighthouseStore.getLighthouseById(testLighthouses[0]._id);
    assert.isNull(deletedlighthouse);
  });

  test("get a lighthouse - bad params", async () => {
    assert.isNull(await db.lighthouseStore.getLighthouseById(""));
    assert.isNull(await db.lighthouseStore.getLighthouseById());
  });

  test("delete one lighthouse - fail", async () => {
    await db.lighthouseStore.deleteLighthouse("bad-id");
    const lighthouses = await db.lighthouseStore.getAllLighthouses();
    assert.equal(lighthouses.length, testLighthouses.length);
  });
});