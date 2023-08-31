import jwt from "jsonwebtoken";
//สร้างtoken
export const createToken = (
  userId: string,
  username: string,
  tokenVersion: string
) => {
  const token = jwt.sign(
    { userId, username, tokenVersion },
    process.env.TOKEN_SECRET!,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

//ตรวจสอบToken
export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.TOKEN_SECRET!);
