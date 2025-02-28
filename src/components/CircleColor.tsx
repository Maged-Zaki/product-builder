import { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
	color: string;
}

const CircleColor = ({ color, ...rest }: IProps) => {
	return <div className="w-5 h-5 rounded-full cursor-pointer" style={{ backgroundColor: color }} {...rest}></div>;
};

export default CircleColor;
