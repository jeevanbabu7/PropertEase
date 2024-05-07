import mongoose from "mongoose";

const validRoles = ["tenant", "owner", "admin"];

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740"
    },
    role: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validRoles.includes(value);
            },
            message: props => `${props.value} is not a valid role. Valid roles are: ${validRoles.join(", ")}`
        }
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
