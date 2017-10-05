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
exports.getById = async(id) => {
    const res = await Product
        .findById(id);
    return res;
}
exports.getByTag = async(tag) => {
    const res = await Product
        .find({
            tags: tag,
            active: true
        }, 'title description tags slug price');
    return res;
}
exports.create = async(data) => {
    let product = new Product(data);
    await product.save();
}
exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                price: data.price
            }
        });
}
exports.remove = async(id) => {
    await Product
        .findOneAndRemove(id);
}