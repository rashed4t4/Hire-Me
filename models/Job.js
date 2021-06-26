var User = require('./User');
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    post: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    },
    applicants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    responsibilities: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    },
    nov: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
     }
    // jobs: [{ 
    //   type: mongoose.Schema.Types.ObjectId, 
    //   ref: 'Job' 
    // }]
  });
  
  const Job = mongoose.model('Job', JobSchema);
  
  module.exports = Job;