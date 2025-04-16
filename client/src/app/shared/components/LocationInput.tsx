import { Box, debounce, List, ListItemButton, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form"

type Props<T extends FieldValues> = {
	label: string
} & UseControllerProps<T>

export default function LocationInput<T extends FieldValues>(props : Props<T>) {
	const { field, fieldState } = useController(props);
	const [loading, setLoading] = useState(false);
	const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
	const [inputValue, setInputValue] = useState(field.value || '');

	useEffect(() => {
		if(field.value && typeof field.value == 'object')	{
			setInputValue(field.value.venue || '');
		} else {
			setInputValue(field.value || '');
		}
	}, [field.value]);

	const locationURl = `https://api.locationiq.com/v1/autocomplete?key=${import.meta.env.VITE_API_LOCATIONIQ_TOKEN}&limit=5&dedupe=1&`
	const fetchSuggections = useMemo(
		() => debounce(async (query: string) => {
			if(!query || query.length < 3) {
				setSuggestions([]);
				return;
			}

			setLoading(true);

			try {
				const res = await axios.get<LocationIQSuggestion[]>(`${locationURl}q=${query}`);
				if(res.data)
					setSuggestions(res.data);
			} catch(e) {
				console.error(e)
			} finally {
				setLoading(false);
			}
		}, 500), [locationURl]
	)

	const handleChange = async (value: string) => {
		field.onChange(value);
		await fetchSuggections(value);
	}

	const handleSelect = (location : LocationIQSuggestion) => {
		const city = location.address?.city || location.address?.town || location.address?.village;
		const venue = location.display_name;
		const latitude = location.lat;
		const longitude = location.lon;

		setInputValue(venue);
		field.onChange({venue: venue, city: city, latitude: latitude, longitude: longitude});
		setSuggestions([]);
	}

	return (
		<Box>
			<TextField 
				{...props}
				value={inputValue}
				onChange={(e) => handleChange(e.target.value)}
				fullWidth
				variant="outlined"
				error={!!fieldState.error}
				helperText={fieldState.error?.message}
			/>
			{loading && <Typography>loading...</Typography>}
			{suggestions.length > 0 && (
				<List>
					{suggestions.map(suggestion => (
						<ListItemButton
							divider
							key={suggestion.place_id}
							onBlur={field.onBlur}
							onClick={() => handleSelect(suggestion)}
						>
							{suggestion.display_name}
						</ListItemButton>
					))}
				</List>
			)}
		</Box>
	)
}