import bcryptjs from "bcryptjs";
const saltRound = 15;
//encrypt
export const hasPassword = (plainPass) => {
  return bcryptjs.hashSync(plainPass, saltRound);
};

//compare
export const compairPassword = (plainPass, hashPass) => {
  return bcryptjs.compareSync(plainPass, hashPass);
};
