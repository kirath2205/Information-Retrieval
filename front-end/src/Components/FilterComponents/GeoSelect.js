import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const names = [
	"France",
	"India",
	"UK",
	"USA",
	"Singapore",
    "Germany",
    "China"
];

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function GeoSelect(props) {
	const theme = useTheme();

	return (
		<div>
			<FormControl sx={{ m: 1, width: 260 }}>
				<InputLabel id="demo-multiple-chip-label">Countries</InputLabel>
				<Select
					labelId="demo-multiple-chip-label"
					id="demo-multiple-chip"
					multiple
					value={props.country}
					onChange={props.handleCountryChange}
					input={
						<OutlinedInput id="select-multiple-chip" label="Countries" />
					}
					renderValue={(selected) => (
						<Box
							sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
						>
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{names.map((name) => (
						<MenuItem
							key={name}
							value={name}
							style={getStyles(name, props.country, theme)}
						>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
