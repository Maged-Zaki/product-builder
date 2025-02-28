import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
	width?: 'w-full' | 'w-fit';
	type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, className, width = 'w-full', type = 'submit', ...rest }: IProps) => {
	return (
		<button type={type} className={`${className} ${width} text-center p-2 rounded-lg cursor-pointer`} {...rest}>
			{children}
		</button>
	);
};

export default Button;
