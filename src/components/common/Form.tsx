import clsx from "clsx";
import React, { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

type FormProps = {
	// defaultValues?: Record<string, any>;
	onSubmit: (data: Record<string, any>) => void;
	children: React.ReactElement | React.ReactElement[] | any;
}

export function Form({ children, onSubmit, className }: ComponentProps<"form"> & FormProps) {
	const methods = useFormContext();
	const { handleSubmit } = methods;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={clsx("flex flex-col ring-1 ring-zinc-300 justify-between rounded-xl py-8 px-[50px]", className)}>
			{React.Children.map(children, child => {
				return child.props.name
					? React.createElement(child.type, {
						...{
							...child.props,
							register: methods.register,
							key: child.props.name
						}
					})
					: child;
			})}
		</form>
	);
}
