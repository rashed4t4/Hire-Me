const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Job = require('../models/Job');

// Dashboard
router.get('/post-Job', ensureAuthenticated, (req, res) =>
  res.render('post-job', {
    user: req.user
  })
);

router.get('/view-Jobs', ensureAuthenticated, (req, res) =>{

  Job.find({ owner: req.user.id }).then(jobs => {
      
    if(!jobs){
        errors.push({ msg: 'You have not posted a job yet' });
        res.render('dashboard', { errors  });
    }
    else{
        res.render('company-job-view', {jobs})
    }
      
  })
});

router.get('/delete/:id',  ensureAuthenticated, (req, res) =>{

  Job.deleteOne(Job.findById(req.params.id), function(err){
    if(err){
      console.log(err);
    } 
    else{
      Job.find({owner: req.user.id}).then(jobs => {
        if(!jobs){
            errors.push({ msg: 'You have not posted a job yet' });
            res.render('dashboard', { errors  });
        }
        else{
            res.render('company-job-view', {jobs})
        }
      })
    }
  });

});

router.get('/update/:id',  ensureAuthenticated, (req, res) =>{

  Job.findById(req.params.id).then(job => {
    res.render('post-job',{
      post:job.post,
      responsibilities: job.responsibilities,
      deadline: job.deadline,
      nov: job.nov
    })
  });

});

router.post('/post-job',ensureAuthenticated, (req, res) => {
    const { post, responsibilities, deadline, nov } = req.body;
    let errors = [];
  
    if (!post || !responsibilities || !deadline || !nov) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
   
    if (errors.length > 0) {
      res.render('post-job', {
        errors,
        post,
        responsibilities,
        deadline,
        nov
      });
    } else {
        const owner = req.user.id
        const newJob = new Job({
            post: post,
            owner: owner,
            responsibilities: responsibilities,
            deadline: deadline,
            nov: nov
        });
  
         
        newJob.save()
                .then(user => {
                  req.flash(
                    'success_msg',
                    'Job posted successfully'
                  );
                  res.redirect('/dashboard');
                })
                
            
        
        }
      
    
  });

module.exports = router;