import { useRegisterMutation } from "@/features/auth/api/authApi";
import { useAppDispatch } from "@/app/store/store";
import { setCredentials } from "@/features/auth/model/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterFormTypes } from "@zod/formValidation";
import { Button, Input, Links } from "@/shared/ui";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [registerUser, { isLoading, error }] = useRegisterMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormTypes>({
		resolver: zodResolver(RegisterSchema),
		mode: "onTouched",
	});

	const onSubmit = async (data: RegisterFormTypes) => {
		try {
			const res = await registerUser(data).unwrap();
			localStorage.setItem("accessToken", res.accessToken);
			localStorage.setItem("refreshToken", res.refreshToken);
			dispatch(setCredentials(res));
			navigate("/chat");
		} catch (err) {
			console.error("Registration failed:", err);
		}
	};

	return (
		<section className='flex min-h-screen items-center justify-center bg-gray-900 p-6 text-white'>
			<div className='w-full max-w-md rounded-4xl bg-gray-600 p-8'>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<h1 className='text-center text-3xl'>Регистрация</h1>

					<Input
						label='Email'
						type='email'
						placeholder='Email@email.com'
						error={errors.email?.message}
						{...register("email")}
					/>

					<Input
						label='Имя'
						placeholder='Иван Иванов'
						error={errors.name?.message}
						{...register("name")}
					/>

					<Input
						label='Пароль'
						type='password'
						placeholder='****'
						error={errors.password?.message}
						{...register("password")}
					/>

					<Input
						label='Подтверждение пароля'
						type='password'
						placeholder='****'
						error={errors.confirmPassword?.message}
						{...register("confirmPassword")}
					/>

					{error && (
						<div className='text-center text-red-500'>
							{(error as any).data?.message || "Ошибка регистрации"}
						</div>
					)}

					<Button type='submit' disabled={isLoading}>
						{isLoading ? "Регистрация..." : "Зарегистрироваться"}
					</Button>

					<Links
						to='/'
						linkTittle='Войти в аккаунт'
						label='Уже есть аккаунт? '
					/>
				</form>
			</div>
		</section>
	);
}
