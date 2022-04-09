import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FieldSelect(props) {
	return (
		<div>
			<FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="demo-simple-select-filled-label">
					Field
				</InputLabel>
				<Select
					labelId="demo-simple-select-filled-label"
					id="demo-simple-select-filled"
					value={props.field}
					onChange={props.handleFieldChange}
					defaultValue={"tweet"}
				>
					<MenuItem value={"tweet"}>Tweet</MenuItem>
					<MenuItem value={"username"}>Username</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
