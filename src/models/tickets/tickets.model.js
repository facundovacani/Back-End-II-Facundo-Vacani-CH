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
    totalPrice: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

export default model("Tickets", ticketModel);
