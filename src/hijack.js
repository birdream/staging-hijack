const rp = require('request-promise');

module.exports = async (req, res) => {

  await rp({
      method: 'POST',
      uri: 'https://chat.shoplinestg.com/webhook',
      body: req.body,
      json: true
  })

  console.log('--------------------------------------------');
  console.dir(req.body, {depth: 9});

  return res.send('ok.')
}