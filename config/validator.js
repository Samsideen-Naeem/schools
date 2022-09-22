const yup = require("yup");

function validate(data) {
    const userSchema = yup.object().shape({
        username: yup.string().required("username must be filled").min(3).max(20),
        email: yup.string().email().required("email is required").min(3).max(50),
        password: yup.string().required("password required").min(8).max(20),
    });
    return userSchema.validate(data);
}
module.exports = { validate};