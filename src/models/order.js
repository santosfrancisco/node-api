const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    number: {
        type: String,
        required: true,
        trim: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: [{
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        }]
        // items seria um array de 'OrderItems'. Assim os items do pedido estariam em um schema separado
        // items: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'OrderIems',
        //     required: true
        // }],

});

module.exports = mongoose.model('Order', orderSchema);