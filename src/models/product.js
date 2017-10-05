const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'Slug é obrigatório.'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
            type: String,
            required: true
        }]
        // ,
        // image: {
        //     type: String,
        //     required: true,
        //     trim: true
        // }
});

module.exports = mongoose.model('Product', productSchema);