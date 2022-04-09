import React from 'react';
import InsertChartIcon from "@mui/icons-material/InsertChart";

const Navbar = () => {
  return (
		<div
			style={{
				width: "100%",
				height: "50px",
				backgroundColor: "#0d6efd",
				marginBottom: "20px",
				color: "white",
				fontSize: "25px",
				display: "flex",
				padding: "5px"
			}}
		>
			<InsertChartIcon
				style={{
					fontSize: "40",
					color: "white",
					marginRight: "3px"
				}}
		  />
		  TradeMaster
		</div>
  );
}

export default Navbar;