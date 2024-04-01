import { assert } from "chai";
import { lighthouseService } from "./lighthouse-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    lighthouseService.clearAuth();
    await lighthouseService.createUser(maggie);
    await lighthouseService.authenticate(maggieCredentials);
    await lighthouseService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await lighthouseService.createUser(maggie);
    const response = await lighthouseService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await lighthouseService.createUser(maggie);
    const response = await lighthouseService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    lighthouseService.clearAuth();
    try {
      await lighthouseService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});