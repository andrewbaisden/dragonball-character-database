const Product = require('../models/product');

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {

        // console.log(product);
        res.json(product);
        
        // if (product) {
        //     console.log(product);
        //     res.json(product);
        // } else if (!product) {
        //     console.log('No ID found, redirecting back to products page')
        //     // res.redirect('/products')
        //     // res.json(product);
        // }
        
      });
}