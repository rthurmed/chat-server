const { model } = require('mongoose');

const Message = model('Message')
const PAGE_LENGTH = 20

exports.list = (req, res) => {
  const page = req.query.p;
  const options = {
    page: page,
    limit: PAGE_LENGTH,
    sort: { timestamp: 'desc' },
    customLabels: { docs: 'list' }
  }
  Message.paginate({}, options, (err, result) => {
    if (err) res.send(err);
    res.json(result);
  })
}