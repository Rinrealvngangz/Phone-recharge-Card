module.exports = (tem, product) => {
  let output = tem.replace(/{%NAMECARD%}/g, product.Namecard);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  return output;
};
