'use strict';
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer.repository');
const md5 = require('md5');
const emailService = require('../services/email.service');
const authService = require('../services/auth.service');

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.isEmail(req.body.email, 'E-mail é inválido.');
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 6 caracteres.');
    console.log(req.body);
    // valida dados
    if (!contract.isValid()) {
        res.status(400).send(contract.erros()).end();
        return;
    }

    try {
        await repository
            .create({
                name: req.body.name,
                email: req.body.email,
                password: md5(req.body.password + global.SALT_KEY),
                roles: ['user']
            });

        // envia o e-mail de boas vindas
        emailService.send(req.body.email, 'Bem vindo a lojinha', global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).send({ message: 'Falha ao cadastrar o cliente', data: error });
    }
}

exports.authenticate = async(req, res, next) => {

    try {
        const customer = await repository
            .authenticate({
                email: req.body.email,
                password: md5(req.body.password + global.SALT_KEY)
            });
        if (!customer) {
            res.status(404).json({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }
        const token = await authService.generateToken({
            id: customer._id,
            name: customer.name,
            email: customer.email,
            roles: customer.roles
        });

        res.status(200).send({
            token: token,
            data: {
                name: customer.name,
                email: customer.email
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Falha na autenticação', data: error });
    }
}

exports.refreshToken = async(req, res, next) => {

    try {
        // recupera o token
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Decodifica o token
        let data = await authService.decodeToken(token);

        const customer = await repository
            .getById(data.id);
        if (!customer) {
            res.status(404).json({
                message: 'Cliente não encontrado'
            });
            return;
        }
        const tokenData = await authService.generateToken({
            id: customer._id,
            name: customer.name,
            email: customer.email,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                name: customer.name,
                email: customer.email
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Falha na requisição', data: error });
    }
}