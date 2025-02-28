interface IProps {
	message?: string;
}

const ErrorMessage = ({ message }: IProps) => {
	return message ? <div className="text-red-500 text-sm">{message}</div> : null;
};

export default ErrorMessage;
