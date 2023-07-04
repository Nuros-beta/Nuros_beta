import React from "react";
import { useFormContext } from "react-hook-form";

type InputProps = {
	name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextAreaProps = {
	name: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

type SelectProps = {
	name: string;
	options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function Input({ name, ...rest }: InputProps) {
	const { register } = useFormContext()

	return <input {...register(name)} {...rest} />;
}

export function TextArea({ name, ...rest }: TextAreaProps) {
	const { register, formState: {errors} } = useFormContext()

	return <><textarea {...register(name)} {...rest} />{errors?.[name] && <p>{`${name} is required.`}</p>}</>;
}

export function Select({ options, name, ...rest }: SelectProps) {
	const { register } = useFormContext()

	return (
		<select {...register(name)} {...rest}>
			{options.map(value => (
				<option key={value} value={value}>
					{value}
				</option>
			))}
		</select>
	);
}
