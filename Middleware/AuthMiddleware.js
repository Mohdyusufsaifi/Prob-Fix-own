import jwt from 'jsonwebtoken';

export const verifyUser = async (req, res, next) => {
    const token = req.headers['authorization']
    // const token = authheader && authheader.split(' ')[1]
    if (token == null) {
        return res.status(401).json({ msg: "User Not Authenticated" });
    } else {
        await jwt.verify(
            token, process.env.JWT_accestoken_KEY, (err, User) => {
                if (err){res.status(401).json({ msg: "token is expires" })}
                else{
                    const UserId = User.log.id
                    const role=User.log.role
                    req.UsID = UserId
                    req.role=role
                    next();
                }
            })
    }
};
