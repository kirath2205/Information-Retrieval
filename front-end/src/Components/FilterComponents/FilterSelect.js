import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterSelect(props) {

	return (
		<div>
			<FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="demo-simple-select-filled-label">
					Field
				</InputLabel>
				<Select
					labelId="demo-simple-select-filled-label"
					id="demo-simple-select-filled"
					value={props.sort}
					onChange={props.FilterSelectChange}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={"created_at"}>Date</MenuItem>
					<MenuItem value={"nlikes"}>Likes</MenuItem>
					<MenuItem value={"nretweets"}>Retweets</MenuItem>
					<MenuItem value={"nreplies"}>Replies</MenuItem>
				</Select>
			</FormControl>
			<FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="demo-simple-select-filled-label">
					Order
				</InputLabel>
				<Select
					labelId="demo-simple-select-filled-label"
					id="demo-simple-select-filled"
					value={props.order}
					onChange={props.OrderChange}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={"asc"}>Ascending</MenuItem>
					<MenuItem value={"desc"}>Descending</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
