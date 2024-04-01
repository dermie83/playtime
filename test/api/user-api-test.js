import { assert } from "chai";
import { lighthouseService } from "./lighthouse-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers, maggieCredentials } from "../fixtures.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    lighthouseService.clearAuth();
    await lighthouseService.createUser(maggie);
    await lighthouseService.authenticate(maggieCredentials);
    await lighthouseService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
    users[i] = await lighthouseService.createUser(testUsers[i]);
    };
    await lighthouseService.createUser(maggie);
    await lighthouseService.authenticate(maggieCredentials);
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await lighthouseService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await lighthouseService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await lighthouseService.deleteAllUsers();
    await lighthouseService.createUser(maggie);
    await lighthouseService.authenticate(maggieCredentials);
    returnedUsers = await lighthouseService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await lighthouseService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await lighthouseService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await lighthouseService.deleteAllUsers();
    await lighthouseService.createUser(maggie);
    await lighthouseService.authenticate(maggieCredentials);
    try {
      const returnedUser = await lighthouseService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

});