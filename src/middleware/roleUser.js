export const roleUser = (req, res, next) => {
    if (req.user.role !== "admin") {
        req.user.find = { email: req.user.email };
        next();
    } else {
        req.user.find = {};
        next();
    }
};
