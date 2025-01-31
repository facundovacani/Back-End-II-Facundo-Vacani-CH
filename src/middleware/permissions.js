export const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).send("Access denied");
    }
    next();
};

export const authorization = (rols) => {
    return async (req, res, next) => {
        if (rols.includes(req.user.role)) return next();
        return res
            .status(403)
            .send({ status: false, message: "No Permissions" });
    };
};
