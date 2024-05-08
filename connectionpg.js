const { Client } = require("pg");

const dbConfig = new Client({
	user: "postgres",
	host: "localhost",
	database: "latihan",
	password: "root",
	port: 5432,
});

const client = new Client(dbConfig);

// open connection
client
	.connect()
	.then(() => {
		console.log("Connected to Postgre SQL database");

		// query
		client.query("SELECT * FROM colors", (err, result) => {
			if (err) {
				console.error("Error executing query", err);
			} else {
				console.log("Query result:", result.rows);
			}

			// close connection
			client
				.end()
				.then(() => {
					console.log("Connection to PostgreSQL closed");
				})
				.catch((err) => {
					console.error("Error closing connection", err);
				});
		});
	})
	.catch((err) => {
		console.error("Error connecting database : ", err);
	});
