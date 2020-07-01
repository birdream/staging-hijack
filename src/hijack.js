const rp = require('request-promise');

module.exports = async (req, res) => {

  try {
    console.log('--sending..')
    await rp({
      method: 'POST',
      uri: 'https://chat.shoplinestg.com/webhook',
      body: req.body,
      json: true
   })
   console.log('----send to chat succeed.')
  } catch (error) {
    console.log('send to cha fail', error.message || error)
  }
  
  console.log('--------------------------------------------');
  console.dir(req.query, {depth: 9});
  console.dir(req.body, {depth: 9});

  return res.send('ok.')
}