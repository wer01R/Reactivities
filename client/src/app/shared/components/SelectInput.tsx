import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form"

type Props<T extends FieldValues> = {
	items: { text: string, value: string }[]
} & UseControllerProps<T> & SelectProps

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
	const { field, fieldState } = useController(props);

	return (
		<FormControl fullWidth error={!!fieldState.error}>
			<InputLabel>Category</InputLabel>
			<Select
				value={field.value || ''}
				label={props.label}
				onChange={field.onChange}
				onClose={field.onBlur}
			>
				{props.items.map((item) =>
					<MenuItem value={item.value} key={item.text} >{item.text}</MenuItem>
				)}
			</Select>
			<FormHelperText>{fieldState.error?.message}</FormHelperText>
		</FormControl>
	)
}