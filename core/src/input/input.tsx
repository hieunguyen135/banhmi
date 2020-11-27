import React from "react";
import { background } from "../background/background";
import { borderColor } from "../border/border";
import { Icon, IconPath, IconSize } from "../icon/icon";
import { outline } from "../outline/outline";
import { text } from "../text/text";
import s from "./input.module.css";

export interface InputStyle {
	main: string;
	disabled: string;
}

export interface InputSize {
	main: string;
	mainWithIcon: string;
	icon: string;
	iconSize: IconSize;
}

const getClass = <T,>(props: Props<T>) => {
	const styles = [s.input, outline.normal, props.style.main];
	styles.push(props.icon ? props.size.mainWithIcon : props.size.main);
	if (props.disabled) styles.push(props.style.disabled);
	return styles.join(" ");
};

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const onChange = <T,>(props: Props<T>) => (e: ChangeEvent) => {
	if (props.setValue === undefined || props.value === undefined) return;
	const { currentTarget: target } = e;
	const isNumber = typeof props.value === "number";
	props.setValue(isNumber ? target.valueAsNumber : (target.value as any));
};

interface Props<T> {
	// Value
	defaultValue?: T;
	value?: T;
	setValue?: (value: T) => void;
	/**
	 * Id of a datalist element to be used. Can pass an object with values for
	 * the Input component to create the datalist.
	 */
	list?: { id: string; values: T[] } | string;
	// Style
	icon?: IconPath;
	style: InputStyle;
	size: InputSize;
	// Attributes
	id?: string;
	disabled?: boolean;
	readOnly?: boolean;
	placeholder?: string;
	autoFocus?: boolean;
	autoSelect?: boolean;
	"aria-label"?: string;
	"aria-labelledby"?: string;
	// Events
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	onFocus?: React.FocusEventHandler<HTMLInputElement>;
	onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
	onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const getType = (props: Props<any>): string => {
	const target = props.value ?? props.defaultValue;
	switch (typeof target) {
		case "string":
			return "text";
		case "number":
			return "number";
		default:
			throw Error(`Unknown input type: "${typeof target}"`);
	}
};

export const Input = <T extends number | string>(props: Props<T>) => {
	const ref = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (!props.autoSelect) return;
		const element = ref.current;
		if (element === null) throw Error("ref is null");
		element.select();
	}, []);

	return (
		<div className={s.container}>
			<input
				ref={ref}
				// value
				type={getType(props)}
				defaultValue={props.defaultValue}
				value={props.value}
				onChange={onChange(props)}
				// event handlers
				onBlur={props.onBlur}
				onFocus={props.onFocus}
				onKeyDown={props.onKeyDown}
				onKeyPress={props.onKeyPress}
				onKeyUp={props.onKeyUp}
				// properties
				id={props.id}
				className={getClass(props)}
				list={
					typeof props.list === "string"
						? props.list
						: props.list?.id ?? undefined
				}
				readOnly={props.readOnly}
				disabled={props.disabled}
				placeholder={props.placeholder}
				autoFocus={props.autoFocus}
				aria-label={props["aria-label"]}
				aria-labelledby={props["aria-labelledby"]}
			/>
			{props.icon && (
				<div
					className={[s.icon, text.muted, props.size.icon].join(" ")}
				>
					<Icon
						display="block"
						path={props.icon}
						size={props.size.iconSize}
					/>
				</div>
			)}
			{typeof props.list === "object" && (
				<datalist id={props.list.id}>
					{props.list.values.map((value) => (
						<option key={value} value={value} />
					))}
				</datalist>
			)}
		</div>
	);
};

Input.style = {
	outset: {
		main: [s.outset, borderColor.strong, background.primary].join(" "),
		disabled: "",
	} as InputStyle,
	flat: {
		main: s.flat,
		disabled: text.muted,
	} as InputStyle,
};

Input.size = {
	medium: {
		main: s.mediumMain,
		mainWithIcon: s.mediumMainWithIcon,
		icon: s.mediumIcon,
		iconSize: 16,
	} as InputSize,
	small: {
		main: s.smallMain,
		mainWithIcon: s.smallMainWithIcon,
		icon: s.smallIcon,
		iconSize: 12,
	} as InputSize,
};

Input.defaultProps = {
	style: Input.style.outset,
	size: Input.size.medium,
};
