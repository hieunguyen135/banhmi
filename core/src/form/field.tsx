import React from "react";

import s from "./field.module.css";
import { DivPx } from "../div/div";

interface Props {
	label?: React.ReactNode;
	children: React.ReactNode;
	useLabelTag?: boolean;
	labelWidth?: number;
}

export const FormField: React.FC<Props> = (props) => {
	const { label, children, useLabelTag, labelWidth } = props;
	const labelStyle = { width: labelWidth ?? "auto" };
	return React.createElement(
		useLabelTag ? "label" : "div",
		{ className: s.container },
		<span className={s.label} style={labelStyle}>
			{label}
		</span>,
		<DivPx size={8} />,
		<span className={s.input}>{children}</span>
	);
};
