import * as zod from "zod";
export const loginSchema = zod.object({
  userName: zod.string().min(1, "userName is required."),
  password: zod.string().min(1, "password is required."),
});

export const registerSchema = zod
  .object({
    userName: zod.string().min(1, "userName is required."),
    password: zod.string().min(1, "password is required."),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords are not match.",
    path: ["passwordConfirm"],
  });

export const taskSchema = zod.object({
  title: zod.string().min(1, "task should have title"),
  dueDate: zod.string().default(Date.now().toString()),
  category: zod.string().min(1, "category is required."),
});
