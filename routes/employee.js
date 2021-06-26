const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Job = require('../models/Job');

router.get('/', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/view-Jobs', ensureAuthenticated, (req, res) =>{

    Job.find().then(jobs => {
        
      if(!jobs){
          errors.push({ msg: 'You have not posted a job yet' });
          res.render('dashboard', { errors });
      }
      else{
          user = req.user
          res.render('employee-job-view', {jobs, user})
      }
        
    })
  });

  module.exports = router;