const express = require('express');

const router = express.Router();

const { exec } = require('child_process');

router.get(
  '/subject-performance',

  (req, res) => {

    exec(

      'python ml/predict/predict_subject.py',

      (error, stdout, stderr) => {

        if (error) {

          return res.status(500).json({
            error: error.message
          });

        }

        res.json({
          result: stdout
        });

      }

    );

});

module.exports = router;