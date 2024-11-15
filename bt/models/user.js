import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User",
        enum: ["Guide", "Traveler"]
    }
});

const User = mongoose.model('User', UserSchema);
export default User;
