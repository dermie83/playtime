import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";
import { maggie, testUsers } from "../fixtures.js";

// assert.equal(2, 2);

suite("User Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.userStore.deleteAll();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await db.userStore.addUser(testUsers[i]);
    }
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    assertSubset(maggie, newUser);
  });

  // test("get a user - failures", async () => {
  //   const noUserWithId = await db.userStore.getUserById("123");
  //   console.log("Users id ",noUserWithId);
  //   assert.isNull(noUserWithId);
  //   const noUserWithEmail = await db.userStore.getUserByEmail("no@one.com");
  //   console.log("Users email ",noUserWithEmail);
  //   assert.isNull(noUserWithEmail);
  // });

  test("get a user - bad params", async () => {
    let nullUser = await db.userStore.getUserByEmail("");
    console.log("Bad email param ", nullUser);
    assert.isNull(nullUser);
    nullUser = await db.userStore.getUserById("");
    console.log("Bad userid 1 param ", nullUser);
    assert.isNull(nullUser);
    nullUser = await db.userStore.getUserById();
    console.log("Bad userid 2 param ", nullUser);
    assert.isNull(nullUser);
  });

  test("delete One User - fail", async () => {
    await db.userStore.deleteUserById("bad-id");
    const allUsers = await db.userStore.getAllUsers();
    console.log("delete One User - Fail ", allUsers);
    console.log("testuser count ", testUsers.length, "alluser count ", allUsers.length);
    assert.equal(testUsers.length, allUsers.length);
  });

  test("delete all users", async () => {
    let returnedUsers = await db.userStore.getAllUsers();
    console.log("Total Returned Users ",returnedUsers.length);
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const user = await db.userStore.addUser(maggie);
    console.log("Added User ",user);
    const returnedUser1 = await db.userStore.getUserById(user._id);
    console.log("Returned User ",returnedUser1);
    assert.deepEqual(user, returnedUser1);
    const returnedUser2 = await db.userStore.getUserByEmail(user.email);
    assert.deepEqual(user, returnedUser2);
  });

  test("delete One User - success", async () => {
    await db.userStore.deleteUserById(testUsers[0]._id);
    const returnedUsers = await db.userStore.getAllUsers();
    console.log("Returned Users ",returnedUsers);
    assert.equal(returnedUsers.length, testUsers.length - 1);
    const deletedUser = await db.userStore.getUserById(testUsers[0]._id);
    console.log("Deleted User Returned ",deletedUser);
    assert.isNull(deletedUser);
  });

});
