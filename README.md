# CZ4043 Group 5 Information Retrieval System Usage 

## System Prerequisite:
* solr-8.11.1
* React.js

## Getting Started 
### Step 1: Installing Dependencies for Frontend
Navigate to the `front-end` folder and run `npm install` in your terminal to install package dependencies.

### Step 2: Start solr
Navigate to the `solr-8.11.1` folder and run solr by typing `./bin/solr start`.

### Step 3: Start the Frontend Server 
Navigate back to `front-end` folder and run `npm start` in your terminal to start the server.

### Step 4: Using the Application
Navigate to `localhost:3000` to access the application. The application should look like the image below:

![Image of Application](https://github.com/kirath2205/Information-Retrieval/blob/main/assets/frontend_ss.png)

The application allows you to:
1. Enter a **search/query** term (search bar)
2. Filter your query by **Tweet** or **Username**
3. Sort the queries by **Date**, **Number of Likes**, **Retweets** or **Replies** (ascending/ descending order)
4. Filter your query by the **Country**
5. View the sentiment score related to specific car companies 
