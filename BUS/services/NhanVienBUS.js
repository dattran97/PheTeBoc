let NhanVienDAO = require('../DAO/NhanVienDAO');

loginHandler = (req, res) => {
  req.on('data', chunk => {
    req.body = JSON.parse(chunk);
  });
  req.on('end', () => {
    NhanVienDAO.login(req.body)
    .then(data => {
      // res.writeHeader(200, {'Content-Type': 'text/xml'})
      res.write(JSON.stringify(data));
      res.end();

    })
    .catch(err => {
      // res.writeHeader(400, {'Content-Type': 'text/xml'})
      res.write(JSON.stringify(err));
      res.end();
    })
  });
}

module.exports = {
  loginHandler
}