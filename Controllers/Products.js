import Products from "../Models/Products.js";
import Users from "../Models/Users.js";

export const ProductsAllGets = async (req, res) => {
    try {
        const role = req.role
        if (role === "Admin") {
            const response = await Products.findAll({
                attributes: ["uuid", "Item", "Price"],
                include: [{
                    model: Users,
                    attributes: ["name", "email"]
                }]
            })
            res.status(200).send(response)
        } else {
            const response = await Products.findAll({
                attributes: ["Item", "Price"],
                where: { UserId: req.UsID },
                include: [{
                    model: Users,
                    attributes: ["name", "email"]
                }]
            })
            res.status(200).send(response)
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const ProductgetByID = async (req, res) => {
    try {
        const Product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!Product) return res.status(400).json({ msg: "Product Not Found" })
        let response
        if (req.role === "Admin") {
            response = await Products.findOne({
                attributes: ["Item", "Price"],
                where: { id: Product.id }, include: [{
                    model: Users,
                    attributes: ["name", "email"]
                }]
            });
        } else {
            response = await Products.findOne({
                attributes: ["Item", "Price"],
                where: { id: Product.id }, include: [{
                    model: Users,
                    attributes: ["name", "email"]
                }]
            });
        } res.status(200).send(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })

    }
}



export const ProductsCreate = async (req, res) => {
    try {
        await Products.create({
            Item: req.body.Item,
            Price: req.body.Price,
            UserId: req.UsID
        })
        res.status(201).json({ msg: "Products is Created" })
    } catch (error) {

    }
}

export const DeleteAllProducts = async (req, res) => {
    try {
        await Products.destroy({ truncate: true })
        res.status(200).json({ msg: "All Products Deleted" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const ProductdeletebyId = async (req, res) => {
    const d = req.params.id
    console.log(d)
    try {
        await Products.destroy({ where: { uuid: d } })
        res.status(200).json({ msg: "Product Delete" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const ProductUpdateByID = async (req, res) => {
    try {
        const Product = await Products.findOne({ where: { uuid: req.params.id } });
        if (!Product) return res.status(404).json({ msg: "Product is not Found" })
        const { Item, Price } = req.body
        const response = await Products.update({ Item, Price }, { where: { id: Product.id } });
        return res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ msg: message.error })

    }
}