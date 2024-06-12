"use server";
export const verifyToken = async (token: string) => {
  //edge problem.will be fixed soon...
  // return await verify(token, process.env.JWT_SECRET as string);
  return token.length > 1;
};
