import { EventEmitter } from "events";
import { assert } from "chai";
import { lighthouseService } from "./lighthouse-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, group1, testGroups, maggieCredentials } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Group API tests", () => {
  let user = null;

  setup(async () => {
    lighthouseService.clearAuth();
    user = await lighthouseService.createUser(maggie);
    await lighthouseService.authenticate(maggieCredentials);
    await lighthouseService.deleteAllGroups();
    await lighthouseService.deleteAllUsers();
    user = await lighthouseService.createUser(maggie);
    await lighthouseService.authenticate(maggieCredentials);
    group1.userid = user._id;
  });

  teardown(async () => {});

  test("create group", async () => {
    const returnedGroup = await lighthouseService.createGroup(group1);
    assert.isNotNull(returnedGroup);
    assertSubset(group1, returnedGroup);
  });

  test("delete a group", async () => {
    const group = await lighthouseService.createGroup(group1);
    const response = await lighthouseService.deleteGroup(group._id);
    assert.equal(response.status, 204);
    try {
      const returnedGroup = await lighthouseService.getGroup(group.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Group with this id", "Incorrect Response Message");
    }
  });

  test("create multiple groups", async () => {
    for (let i = 0; i < testGroups.length; i += 1) {
      testGroups[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await lighthouseService.createGroup(testGroups[i]);
    }
    let returnedLists = await lighthouseService.getAllGroups();
    assert.equal(returnedLists.length, testGroups.length);
    await lighthouseService.deleteAllGroups();
    returnedLists = await lighthouseService.getAllGroups();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant group", async () => {
    try {
      const response = await lighthouseService.deleteGroup("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Group with this id", "Incorrect Response Message");
    }
  });
});