import { z } from "zod";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export const RegisterSchema = z
	.object({
		email: z
			.string()
			.min(1, "Email обязателен")
			.email("Некорректный формат email"),
		password: z
			.string()
			.min(8, "Пароль должен содержать минимум 8 символов")
			.regex(
				passwordRegex,
				"Пароль должен содержать буквы, цифры и спецсимволы",
			),
		confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
		name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"],
	});
export type RegisterFormTypes = z.infer<typeof RegisterSchema>;
