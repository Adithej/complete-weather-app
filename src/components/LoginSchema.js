import { object, string, number, date, InferType, NumberSchema } from "yup";

export const LoginSchema = async () => {
  let userSchema = object({
    email: string().email(),
    password: NumberSchema().password(),
  });

  // parse and assert validity
  //   const user = await userSchema.validate(await fetchUser());
};
