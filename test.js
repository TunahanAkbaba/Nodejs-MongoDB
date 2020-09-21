const mongoose = require('mongoose');

const Post = require('./models/Post');
const { post } = require('./routes/main');

mongoose.connect('mongodb://127.0.0.1/nodeblog_test_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
Post.create({

    title: 'ilk post',
    content: 'post icerigi'

}, (error,post) => {
    console.log(error,post)
})
