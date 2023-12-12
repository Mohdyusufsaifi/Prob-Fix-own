// import {Sequelize} from "sequelize"

// const db=new Sequelize("db","root","",{
//     host:"localhost",
//     dialect:"mysql"
// });

// export default db;


import { Sequelize } from "sequelize";

const db = new Sequelize({
  database: "auth_db_lzph",
  username: "auth_db_lzph_user",
  password: "OA3EOoN40nOCRXz6uFwTzAqdyicef7D6",
  host: "dpg-clh4jpnjc5ks73ejfqr0-a.oregon-postgres.render.com",
  dialect: "postgres",
  port: 5432, // default PostgreSQL port
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // disable SSL verification
    },
  },
});

export default db;