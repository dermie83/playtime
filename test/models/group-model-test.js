import { EventEmitter } from "events";
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";
import { testGroups, group1 } from "../fixtures.js";


EventEmitter.setMaxListeners(25);

suite("Group Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.groupStore.deleteAllGroups();
    for (let i = 0; i < testGroups.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testGroups[i] = await db.groupStore.addGroup(testGroups[i]);
    }
  });

  test("create a Group", async () => {
    const group = await db.groupStore.addGroup(group1);
    assertSubset(group1, group);
    assert.isDefined(group._id);
  });

  test("delete all groups", async () => {
    let returnedGroups = await db.groupStore.getAllGroups();
    assert.equal(returnedGroups.length, 3);
    await db.groupStore.deleteAllGroups();
    returnedGroups = await db.groupStore.getAllGroups();
    assert.equal(returnedGroups.length, 0);
  });

  test("get a group - success", async () => {
    const group = await db.groupStore.addGroup(group1);
    const returnedGroup = await db.groupStore.getGroupById(group._id);
    assertSubset(group1, group);
  });

  test("delete One Group - success", async () => {
    const id = testGroups[0]._id;
    await db.groupStore.deleteGroupById(id);
    const returnedGroups = await db.groupStore.getAllGroups();
    assert.equal(returnedGroups.length, testGroups.length - 1);
    const deletedGroup = await db.groupStore.getGroupById(id);
    assert.isNull(deletedGroup);
  });

  test("get a Group - bad params", async () => {
    assert.isNull(await db.groupStore.getGroupById(""));
    assert.isNull(await db.groupStore.getGroupById());
  });

  test("delete One Group - fail", async () => {
    await db.groupStore.deleteGroupById("bad-id");
    const allGroups = await db.groupStore.getAllGroups();
    assert.equal(testGroups.length, allGroups.length);
  });
});