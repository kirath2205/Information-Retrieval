import React, { useState } from 'react';

import Button from "react-bootstrap/Button";
import styled from "styled-components";
import SearchResult from './SearchComponents/SearchResult';
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import FieldSelect from './FilterComponents/FieldSelect';
import FilterSelect from './FilterComponents/FilterSelect';
import GeoSelect from './FilterComponents/GeoSelect';

import { DummyData } from "./TempData";

export const HomePage = () => {

    const [searchTerm, setsearchTerm] = useState("");
	const [results, setResults] = useState({});
	const [displyResults, setDisplyResults] = useState({});

	const [field, setField] = useState("tweet");

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [sort, setSort] = useState("");
	const [order, setOrder] = useState("");

	const [country, setCountry] = useState([]);

	const handleFieldChange = (event) => {
		setField(event.target.value);
		console.log("Query field:", event.target.value);
	};

	const FilterSelectChange = (event) => {
		setSort(event.target.value);
		if (event.target.value === "") {
			setOrder("");
		}
		console.log("Sort filer:", event.target.value);
	};

	const OrderChange = (event) => {
		setOrder(event.target.value);
		console.log("Order filer:", event.target.value);
	};
	
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		setDisplyResults(
			results.response.docs.slice(
				newPage * rowsPerPage,
				newPage * rowsPerPage + rowsPerPage
			)
		);
		console.log("PageChange:", newPage)
	};

	const handleCountryChange = (event) => {
		const {
			target: { value },
		} = event;
		setCountry(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
		console.log(
			"Country:",
			typeof value === "string" ? value.split(",") : value
		);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
		
		setDisplyResults(
			results.response.docs.slice(0, parseInt(event.target.value, 10))
		);

		console.log("RowsChange:", parseInt(event.target.value, 10));
	};

    const queryBuilder = (q) => {
        const myUrlWithParams = new URL(
			"http://localhost:8983/solr/CSVCore/select?"
		);

		myUrlWithParams.searchParams.append("q", q);
		myUrlWithParams.searchParams.append("df", field);
		
		// sorting
		if (sort !== "")
		{
			myUrlWithParams.searchParams.append("sort", `${sort} ${order}`);
		}

        // extra query params
        myUrlWithParams.searchParams.append("debugQuery", "false");
        myUrlWithParams.searchParams.append("fl", "*, score");
        myUrlWithParams.searchParams.append("indent", "true");
        myUrlWithParams.searchParams.append("q.op", "OR");
        myUrlWithParams.searchParams.append("rows", "5000");

        return myUrlWithParams.href;
    }

    const getResults = () => {
        const query_term = searchTerm;
        // normal
        const fetchURL = `http://localhost:8983/solr/CSVCore/select?df=tweet&indent=true&q.op=OR&q=${searchTerm.replace(" ", "%20")}&rows=200`;
        // with score
        const fetchURL_score = `http://localhost:8983/solr/CSVCore/select?debugQuery=false&df=tweet&fl=*%2C%20score&indent=true&q.op=OR&q=${searchTerm.replace(
			" ",
			"%20"
		)}&rows=200`;

        console.log(queryBuilder(query_term));
        fetch(
			// "http://localhost:8983/solr/CSVCore/select?df=tweet&indent=true&q.op=OR&q=goldman&rows=200"
			// fetchURL_score
            queryBuilder(query_term)
		)
			.then((response) => response.json())
            .then((data) => {
                console.log(data);
				setResults(data);
				setDisplyResults(data.response.docs.slice(0, 10));
            });
    }

    const handleSearchChange = (event) => {
		setsearchTerm(event.target.value);
	};

	const TestClick = () => {
		console.log("Sort:", sort, "Order:", order);
	}

    return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					flex: 1,
					// border: "1px solid #ced4d8",
				}}
			>
				<p style={{ textAlign: "right" }}>
					{results.response &&
						`Total results: ${results.response.numFound}`}
					<br></br>
					{results.response &&
						`Query time: ${
							results.responseHeader.QTime / 1000
						} sec`}
				</p>
				{/* <Button onClick={TestClick}></Button> */}
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					flex: 2,
					// justifyContent: "center",
					alignContent: "center",
					// border: "1px solid #ced4d8",
				}}
			>
				<div
					style={{
						width: "80%",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							height: "40px",
						}}
					>
						<input
							style={{ flex: 4 }}
							type="text"
							id="fname"
							name="fname"
							value={searchTerm}
							onChange={handleSearchChange}
						/>

						<Button style={{ flex: 1 }} onClick={getResults}>
							<SearchIcon
								style={{
									fontSize: "25",
									color: "white",
									marginRight: "1px",
								}}
							/>
							Search
						</Button>
					</div>
					<div
						style={{
							flexDirection: "column",
						}}
					>
						{results.response &&
							displyResults.map((tweet) => (
								<SearchResult tweet={tweet} key={tweet.id} />
							))}
					</div>
					{results.response && (
						<TablePagination
							style={{ marginTop: "20px", padding: "0px" }}
							component="div"
							count={results.response.numFound}
							page={page}
							onPageChange={handleChangePage}
							rowsPerPage={rowsPerPage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					)}
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					flex: 1,
					// border: "1px solid #ced4d8",
				}}
			>
				<h5 style={{ alignSelf: "flex-start" }}>Select query field</h5>
				<FieldSelect
					field={field}
					handleFieldChange={handleFieldChange}
				/>
				<h5 style={{ alignSelf: "flex-start", marginTop: "10px" }}>
					Sort filter
				</h5>
				<FilterSelect
					sort={sort}
					FilterSelectChange={FilterSelectChange}
					order={order}
					OrderChange={OrderChange}
				/>
				<h5 style={{ alignSelf: "flex-start", marginTop: "10px" }}>
					Select geo-locations
				</h5>
				<GeoSelect
					country={country}
					handleCountryChange={handleCountryChange}
				/>
			</div>
		</div>
	);
}
