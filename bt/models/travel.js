import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TravelSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    description: {
        type: String,
    },
    guide: {
        type: String 
    }

}, { timestamps: true });

const Travel = mongoose.model('Travel', TravelSchema);
export default Travel;
