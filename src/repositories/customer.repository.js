'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async(data) => {
    console.log('data', data);
    let customer = new Customer();
    customer.name = data.name;
    customer.email = data.email;
    customer.password = data.password;
    customer.roles = data.roles;
    await customer.save();
}

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    })
    return res;
}

exports.getById = async(id) => {
    const res = await Customer.findById(id)
    return res;
}