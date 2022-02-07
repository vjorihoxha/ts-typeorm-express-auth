module.exports = {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	synchronize: false,
	logging: false,
	entities: ['src/typeorm/entities/*.ts'],
	migrations: ['src/typeorm/migrations/*.ts'],
	cli: {
		entitiesDir: 'src/typeorm/entities',
		migrationsDir: 'src/typeorm/migrations',
		subscribersDir: 'src/typeorm/subscriber',
	},
};
