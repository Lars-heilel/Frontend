import { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
	label: string;
	error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
	return (
		<div>
			<label className='mb-2 block text-2xl font-medium text-black dark:text-white'>
				{label}
			</label>
			<input
				className={`${error ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"} focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
				{...props}
			></input>
			{error && <span className='text-red-500'>{error}</span>}
		</div>
	);
}
