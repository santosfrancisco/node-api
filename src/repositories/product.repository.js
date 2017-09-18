'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    const res = await Product
        .find({ active: true }, 'title slug price');
    return res;
}
exports.getBySlug = async(slug) => {
    const res = await Product
        .findOne({
            slug: slug,
            active: true
        }, 'title description slug price tags');
    return res;
}
exports.getById = (id) => {
    return Product
        .findById(id)
}
exports.getByTag = (tag) => {
    return Product
        .find({
            tags: tag,
            active: true
        }, 'title description tags slug price');
}
exports.create = (data) => {
    let product = new Product();
    product.title = data.title;
    product.slug = data.slug;
    product.description = data.description;
    product.price = data.price;
    product.active = data.active;
    product.tags = data.tags;

    return product.save();
}
exports.update = (id, data) => {
    return Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                price: data.price
            }
        });
}
exports.remove = (id) => {
    return Product
        .findOneAndRemove(id)
}