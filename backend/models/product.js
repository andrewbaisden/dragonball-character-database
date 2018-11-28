const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

exports.findById = (id, cb) => {
  getProductsFromFile(products => {
    const product = products.find(p => p.id === id);
    
    cb(product);
  });
}

exports.findByTitle = (title, cb) => {
  getProductsFromFile(products => {
    const product = products.find(p => p.title === title);
    
    cb(product);
  });
}

exports.findByPrice = (price, cb) => {
  getProductsFromFile(products => {
    const product = products.find(p => p.price === price);
    
    cb(product);
  });
}
