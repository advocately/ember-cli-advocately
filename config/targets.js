var browsers;

if (process.env.EMBER_ENV === 'test') {
  browsers = [ 'last 1 Chrome versions' ];
} else {
  browsers = ['> 3%'];
}

module.exports = {
  browsers
};
