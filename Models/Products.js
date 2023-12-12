import db from "../Database/config.js";
import { Sequelize, UUIDV4 } from "sequelize";
import Users from "./Users.js";


const { DataTypes } =Sequelize;

const Products= db.define("Products",{
    Item:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    Price:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    uuid:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
},{
    
    freezeTableName:true
});

Users.hasMany(Products);
Products.belongsTo(Users,{foreignKey:"UserId"});

export default Products;