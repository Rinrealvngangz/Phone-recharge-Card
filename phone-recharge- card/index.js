const http = require('http');
const url = require('url');
const fs = require('fs');

const ReplaceTemplate = require('./modules/replaceTemplate');

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateproduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
////////////////////////
//SERVER//
///////////////////////
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === '/' || pathname === '/overview') {
    const replaceTemCard = dataObj.map(el => ReplaceTemplate(templateCard, el));
    const output = templateOverview.replace(/{%PRODUCT-CARD%}/g, replaceTemCard);
    res.writeHead(200, {
      'Contend-type': 'text/html'
    });
    res.end(output);
  } else if (pathname === '/product') {
    const product = dataObj[query.id];
    const output = ReplaceTemplate(templateproduct, product);
    res.writeHead(200, {
      'Contend-type': 'text/html'
    });
    res.end(output);
  } else {
    res.writeHead(404, {
      'Contend-type': 'text/html',
      'my-ower-header': 'hello world'
    });
    res.end('<h1>Page not found</h1>');
  }
  res.end('hello from server');
});

server.listen(4000, '192.168.1.248', () => {
  console.log('Start server on 4000');
});
