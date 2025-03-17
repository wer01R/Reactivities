import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

type Props = {
	value: Activity
	HandleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void
}

export default function ActivityCategorySelect({value, HandleChange} : Props) {
	return (
		<FormControl>
			<InputLabel required>Category</InputLabel>
			<Select
				label="Category"
				name="category"
				required
				defaultValue={value.category ?.toLowerCase()}
				onChange={e => HandleChange(e)}
			>
				<MenuItem value="culture">culture</MenuItem>
				<MenuItem value="drinks">drinks</MenuItem>
				<MenuItem value="film">film</MenuItem>
				<MenuItem value="food">food</MenuItem>
				<MenuItem value="music">music</MenuItem>
				<MenuItem value="travel">travel</MenuItem>
			</Select>
		</FormControl>
	)
}