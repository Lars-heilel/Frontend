import { ComponentPropsWithoutRef, ReactNode } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
	children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
	return (
		<button
			className='w-full rounded-full bg-sky-500 p-2 text-center text-white hover:bg-sky-700'
			{...props}
		>
			{children}
		</button>
	);
}
