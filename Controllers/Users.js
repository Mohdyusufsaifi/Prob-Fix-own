import argon2 from "argon2";
import Users from "../Models/Users.js"

export const GetallUsers = async (req, res) => {
    try {
        if(req.role==="Admin"){
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'password', 'email','role']
        });
        res.status(200).json(response);}else{ return res.status(401).json({msg:"Only Admin Can Access"})}
    } catch (error) {
        res.status(500).json({ msg: error.message });

    }
}


export const UsergetById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'password', 'email',"role"],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

export const createUser = async (req, res) => {
    const { name, password, confpassword, email,role } = req.body;
    let user = await Users.findOne({where:{email:email}})
    if (user) return res.status(400).json({ msg: "Email ID Already Exists" })
    if (password !== confpassword) return res.status(400).json({ msg: "Password is not Match with Comfirm password" })
    const hashpassword = await argon2.hash(password)
    try {
        await Users.create({
            name: name,
            password: hashpassword,
            email: email,
            role:role
        });
        res.status(201).json({ msg: "User SuccessFully Created" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not Found" })
    const { name,email, password, confpassword, role } = req.body;
    let hashpassword;
    if (password === "" || password === null) {
        hashpassword = user.password
    }
    else {
        hashpassword = await argon2.hash(password)
    }
    if (password!==confpassword)return res.status(400).json({ msg: "Password is not matched" })
    try {
        await Users.update({
            name: name,
            password: hashpassword,
            email: email,
            role:role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "Data is Updated" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

}

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    })
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Deleted" })
    } catch (error) {
        res.status(400).json({ msg: error.message });

    }
}

export const deleteAllUser = async (req, res) => {
    try {
        await Users.destroy({
            truncate: true
        })
        res.status(200).json({ msg: "deleted all users" })
    }
    catch (error) {
        res.status(400).send({ msg: error.message })

    }
}
