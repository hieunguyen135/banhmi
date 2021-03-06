import * as React from "react";
import { Border } from "../../border/border";
import { Button } from "../../button/button";
import { DivPx } from "../../div/div";
import { MenuItem as IMenuItem } from "../menu";
import s from "./item.module.scss";

interface Props {
	item: IMenuItem;
}

export const MenuItem = ({ item }: Props) =>
	item === "divider" ? (
		<div>
			<DivPx size={8} />
			<Border color="weak" />
			<DivPx size={8} />
		</div>
	) : (
		<button
			onClick={() => item.fn?.()}
			disabled={item.disabled}
			children={item.label}
			className={[
				s.action,
				Button.style.flat.main,
				Button.size.medium.main,
				item.disabled ? Button.style.flat.disabled : "",
			].join(" ")}
		/>
	);
