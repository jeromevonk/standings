const jsonData = require('./results.json');

export default function handler(req, res) {
  return res.status(200).json(jsonData);
}