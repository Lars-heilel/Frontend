import { useLoginMutation } from "@/features/auth/api/authApi";
import { useAppDispatch } from "@/app/store/store";
import { setCredentials } from "@/features/auth/model/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormTypes } from "@zod/formValidation";
import { Button, Input, Links } from "@/shared/ui";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [login, { isLoading, error }] = useLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormTypes>({
		resolver: zodResolver(LoginSchema),
		mode: "onTouched",
	});

	const onSubmit = async (data: LoginFormTypes) => {
		try {
			const res = await login(data).unwrap();
			localStorage.setItem("accessToken", res.accessToken);
			localStorage.setItem("refreshToken", res.refreshToken);
			dispatch(setCredentials(res));
			navigate("/chat");
		} catch (err) {
			console.error("Login failed:", err);
		}
	};

	return (
		<section className='flex min-h-screen items-center justify-center bg-gray-900 p-6 text-white'>
			<div className='w-full max-w-md rounded-4xl bg-gray-600 p-8'>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<h1 className='text-center text-3xl'>Авторизация</h1>

					<Input
						label='Email'
						type='email'
						placeholder='Email@email.com'
						error={errors.email?.message}
						{...register("email")}
					/>

					<Input
						label='Password'
						type='password'
						placeholder='****'
						error={errors.password?.message}
						{...register("password")}
					/>

					{error && (
						<div className='text-center text-red-500'>
							{(error as any).data?.message || "Ошибка авторизации"}
						</div>
					)}

					<Button type='submit' disabled={isLoading}>
						{isLoading ? "Загрузка..." : "Войти"}
					</Button>

					<Links
						to='/register'
						linkTittle='Перейти к регистрации'
						label='Нужен аккаунт? :'
					/>
				</form>
			</div>
		</section>
	);
}
