import { model, Schema } from "mongoose";

const ticketModel = Schema({
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
                total: {
                    type: Number,
                    required: true,
                },
            },
        ],
        default: [],
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
    code: {
        type:String,
        unique:true,
    }
});

export default model("Tickets", ticketModel);
