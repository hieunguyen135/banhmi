import React from "react";

import { Radio } from "./radio";
import s from "./radio-group.module.css";

export interface RadioOption<T> {
	value: T;
	id: string;
	label: React.ReactNode;
}

interface Props<T> {
	name: string;
	value: T;
	setValue: (value: T) => void;
	options: RadioOption<T>[];
}

type Foo<T> = Props<T> & { option: RadioOption<T> };

const SingleRadio = <T,>({ name, value, setValue, option }: Foo<T>) => (
	<Radio
		name={name}
		checked={value === option.value}
		label={option.label}
		value={option.id}
		setValue={() => setValue(option.value)}
	/>
);

export const RadioGroup = <T,>(props: Props<T>) => (
	<div className={s.container}>
		{props.options.map((option) => (
			<div className={s.item} key={option.id}>
				<SingleRadio {...props} option={option} />
			</div>
		))}
	</div>
);
