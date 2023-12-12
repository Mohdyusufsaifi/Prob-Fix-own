import argon2 from "argon2"
import Users from "../Models/Users.js"
import jwt from "jsonwebtoken"

export const Login = async (req, res) => {
    try {
        const log = await Users.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!log) return res.status(401).json({ msg: "User is Invalid" })
        const passordMatch = await argon2.verify(log.password, req.body.password)
        if (!passordMatch) {
            return res.status(401).json({ msg: "Password is Invalid" })
        } else {
            // const token = await jwt.sign({log:log}, process.env.JWT_SECRET_KEY,{expiresIn:"50s"})
            const token = await jwt.sign({ log: log }, process.env.JWT_SECRET_KEY)
            return res.status(200).json({ uuid: log.uuid, token, msg: "Successfully Login" });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const Me = async (req, res) => {
    const token = req.headers['authorization']
    // const token = authheader && authheader.split(' ')[1]
    await jwt.verify(token, process.env.JWT_accestoken_KEY, (err, User) => {
        if (err) { res.status(401).json({ msg: "token is expires" }) }
        else {
            const name = User.log.name
            const role = User.log.role
            const uuid = User.log.uuid
            res.status(200).json({name,role,uuid});
        }
    })
};


export const Logout = async (req, res) => {
    const authheader = req.token
    if (authheader == null) {
        console.log("logout")
        return res.status(200).json({ msg: "User Logout" })
    } else {
        console.log("not right")
        return res.status(401).json({ msg: "token is invalid" })
    }
}




