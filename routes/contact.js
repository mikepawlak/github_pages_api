const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const sendMail = require('./../util/mail.js');
const validate = require('./../util/validation.js');


router.get('/', (req, res) => {

});

router.post('/', validate, (req, res) => {

  let data = req.body;
  if (data) {
    const errors = validationResult(req);
   if (!errors.isEmpty()) {
     res.status(422).json({ errors: errors.mapped() });
   }
    sendMail(data).then((succ) => {
      res.sendStatus(200);
    }).catch((err) => {
        console.error(err);
      res.status(500).json({"errors" : {"internal": {"msg": "Internal error"}}});
    });

  } else {
    res.status(422).json({"errors" : {"internal": {"msg": "Data undefined"}}});
  }
});

module.exports = router;
