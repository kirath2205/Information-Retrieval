import React, { useState } from 'react';

import Button from "react-bootstrap/Button";
import styled from "styled-components";
import SearchResult from './SearchComponents/SearchResult';
import SearchIcon from "@mui/icons-material/Search";

import { DummyData } from "./TempData";

// Require module
// var SolrNode = require("solr-node");

// Create client
// var client = new SolrNode({
// 	host: "127.0.0.1",
// 	port: "8983",
// 	core: "test",
// 	protocol: "http",
// });
 
// Set logger level (can be set to DEBUG, INFO, WARN, ERROR, FATAL or OFF)
// require('log4js').getLogger('solr-node').level = 'DEBUG';


// var solr = require('solr-client')
// var solr = require('./../lib/solr');

// var client = solr.createClient();

export const HomePage = () => {

    const tweet = {
		id: "1494302463117176832",
		username: ["GoldmanSachs"],
		created_at: [1.645104444e12],
		date: ["2022-02-17T21:27:24Z"],
		tweet: ["David Solomon on Goldman Sachs’ path forward and opportunities for growth:  https://t.co/gogjCujuwM  https://t.co/JBtoqKIK0s"],
		language: ["en"],
		hashtags: ["[]"],
		cashtags: ["[]"],
		link: ["https://twitter.com/GoldmanSachs/status/1494302463117176832"],
		urls: ["['https://click.gs.com/hdkw']"],
		photos: ["['https://pbs.twimg.com/media/FLzUK63WQAYUpxm.jpg']"],
		video: [1],
		thumbnail: ["https://pbs.twimg.com/media/FLzUK63WQAYUpxm.jpg"],
		nlikes: [13],
		nreplies: [1],
		nretweets: [7],
		_version_: 1729379740141223936,
		score: 1.4015064,
	};

    // var SolrNode = require("solr-node");

    const [searchTerm, setsearchTerm] = useState("");
    const [results, setResults] = useState({});

    const queryBuilder = (q) => {
        const myUrlWithParams = new URL(
			"http://localhost:8983/solr/CSVCore/select?"
		);

		myUrlWithParams.searchParams.append("q", q);
        myUrlWithParams.searchParams.append("df", "tweet");
        
        // extra query params
        myUrlWithParams.searchParams.append("debugQuery", "false");
        myUrlWithParams.searchParams.append("fl", "*, score");
        myUrlWithParams.searchParams.append("indent", "true");
        myUrlWithParams.searchParams.append("q.op", "OR");
        myUrlWithParams.searchParams.append("rows", "200");

        return myUrlWithParams.href;
    }

    const getResults = () => {
        const query_term = searchTerm.replace(" ", "%20");
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
            });
        // console.log(DummyData.response.docs);
    }

    const handleSearchChange = (event) => {
		setsearchTerm(event.target.value);
	};

    return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
			}}
		>
			<div
				style={{
					flex: 1,
					border: "1px solid #ced4d8",
				}}
			></div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					flex: 2,
					justifyContent: "center",
					alignContent: "center",
					border: "1px solid #ced4d8",
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
						{results.response && results.response.docs.map((tweet) => (
							<SearchResult tweet={tweet} key={tweet.id} />
						))}
					</div>
				</div>
			</div>
			<div
				style={{
					flex: 1,
					border: "1px solid #ced4d8",
				}}
			></div>
		</div>
	);
}
