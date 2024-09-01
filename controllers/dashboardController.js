const axios = require('axios');


exports.index = (req, res) => {
    res.render('index', {
        title: 'Dashboard'
    });
}

exports.price = (req, res) => {
    res.render('price', {
        title: 'Price'
    });
}

exports.exchange = (req, res) => {
    res.render('exchange', {
        title: 'Exchange'
    });
}