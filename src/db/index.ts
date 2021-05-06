import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	logging: process.env.NODE_ENV === "development",
	dialectOptions: {
		ssl: process.env.DB_ENABLE_SSL && {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

sequelize
	.authenticate()
	.then(() => console.log("Database connected..."))
	.catch((err) => console.log(err.toString()));

export default sequelize;
