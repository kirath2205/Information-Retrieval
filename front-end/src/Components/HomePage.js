import React, { useState } from 'react';
import Button from "react-bootstrap/Button";

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

    const [searchTerm, setsearchTerm] = useState("");

    const getResults = () => {
        const fetchURL = `http://localhost:8983/solr/CSVCore/select?df=tweet&indent=true&q.op=OR&q=${searchTerm.replace(" ", "%20")}&rows=200`;
        console.log(fetchURL);
        fetch(
			// "http://localhost:8983/solr/CSVCore/select?df=tweet&indent=true&q.op=OR&q=goldman&rows=200"
			fetchURL
		)
			.then((response) => response.json())
			.then((data) => console.log(data));
        // console.log("results")
    }

    const handleSearchChange = (event) => {
		setsearchTerm(event.target.value);
	};

    return (
            <div>
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Button onClick={getResults}>Get query results</Button>
            </div>
    );
}
