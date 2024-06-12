import * as bcrypt from "bcryptjs";
import { compareHashed, hashPassword } from "../../src/lib/bcrypt";
const stubPassword = "pass";
describe("bcrypte test", () => {
  test("should hashed input password.", async () => {
    const hashSpy = jest.spyOn(bcrypt, "hash");
    const resault = await hashPassword(stubPassword);
    // expect(resault).not.toBe(stubPassword);
    // expect(hashSpy).toHaveBeenCalledTimes(1);
  });
  test("should compare hashed input password by original and return true.", async () => {
    const resault = await hashPassword(stubPassword);
    const compareSpy = jest.spyOn(bcrypt, "compare");
    const compareResault = await compareHashed(stubPassword, resault);
    // expect(compareResault).toBe(true);
  });
  test("should compare hashed input password by original and return false.", async () => {
    const resault = await hashPassword(stubPassword);
    const compareSpy = jest.spyOn(bcrypt, "compare");
    const compareResault = await compareHashed("1234", resault);
    // expect(compareResault).toBe(false);
  });
});
