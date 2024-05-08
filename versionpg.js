const options = {
	client: "pg",
	connection: {
		host: "localhost",
		user: "postgres",
		password: "root",
		port: 5432,
		database: "latihan",
	},
};
// const timestamp = new Date().toISOString();
const timestamp = new Date();
const knex = require("knex")(options);

const display = () => {
	knex("tbl_knex")
		.then((res) => {
			console.log("Pakai array map :");
			res.map((dataRow) => {
				console.log(dataRow);
			});
			console.log("total data : " + res.length);
		})
		.catch((err) => {
			console.log(err);
			throw err;
		})
		.finally(() => {
			knex.destroy();
		});
};

const insert = () => {
	knex("tbl_knex")
		// .insert({ value: "value3" }, ["id"])
		.insert(
			{
				// id: 1,
				value: "value",
				created_at: timestamp,
				last_login: timestamp,
			},
			["id"]
		)
		// .onConflict()
		// .merge()
		.then(() => console.log("data inserted"))
		.catch((err) => {
			console.log(err);
			throw err;
		})
		.finally(() => {
			knex.destroy();
		});
};

const insertConflictMerge = (id) => {
	knex("tbl_knex")
		// .insert({ value: "value3" }, ["id"])
		.insert({
			id: id,
			value: "value1",
			created_at: timestamp,
			last_login: timestamp,
		})
		.onConflict("id")
		.merge(["last_login"])
		.then(() => console.log("data inserted"))
		.catch((err) => {
			console.log(err);
			throw err;
		})
		.finally(() => {
			knex.destroy();
		});
};

console.log(timestamp);
// insert();
insertConflictMerge(1);
display();
