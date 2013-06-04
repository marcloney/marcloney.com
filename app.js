var fs = require('fs')
  , async = require('async')
  , marked = require('marked')
  , express = require('express')
  , app = module.exports = express();

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  langPrefix: 'language-',
});

var getPost = function(post_id, fn) {
  var calls = []
    , json = {};
        
  // Grab the metadata {title: string, date: datetime, tags: [string, ...]}
  calls.push(function(fn) {
    fs.readFile('posts/' + post_id + '.json', 'utf8', function (err, data) {
      if (err) {
        return fn(err);
      }
      
      data = JSON.parse(data);
      
      for(var key in data) {
        json[key] = data[key];
      }
      
      fn(null);
    });
  });
      
  // Grab the post, stored in markdown
  calls.push(function(fn) {
    fs.readFile('posts/' + post_id + '.md', 'utf8', function (err, data) {
      if (err) {
        return fn(err);
      }
      
      json.extended = marked(data);
      
      fn(null);
    });
  });
  
  // Once we have everything, send it off to the client!
  async.parallel(calls, function(err) {
    if (err) {
      return fn(err);
    }
    
    fn(null, json);
  });
};

app.configure(function() {
  app.set('view engine', 'ejs');
  app.set('view options', {layout: false});
  app.set('views', __dirname + '/views');

});

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/dist')); //Ember.js application is built by Grunt.js into /dist
  app.use(express.logger());
  app.use(app.router);
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api/:version/posts', function(req,res, fn) {
  var calls = []
    , posts = {
      "posts": []
    };
  
  fs.readdir('posts/', function(err, files) {
    files.forEach(function(file) {
      var post_id = /(.*)\.json$/.exec(file);
      if(post_id) {
        calls.push(function(fn) {
          getPost(post_id[1], function(err, data) {
            if(err) {
              return fn(err);
            }
            
            posts.posts.push(data);
            fn(null);
          });
        });
      }
    });
  
    async.parallel(calls, function(err) {
      res.writeHead(200, {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*"
      });
      
      res.end(JSON.stringify(posts));
    });
  });
});

app.get('/api/:version/posts/:post_id', function(req, res, fn) {
  switch(req.params.version) {
    case "1.0":
      var post_id = req.params.post_id
        , posts = {};
        
      getPost(post_id, function(err, data) {
        if(err) {
          return fn(err);
        }
        
        posts.post = data;
        
        res.writeHead(200, {
          "Content-Type": "text/json",
          "Access-Control-Allow-Origin": "*"
        });
    
        res.end(JSON.stringify(posts));
      });
    break;
    
    default:
      res.writeHead(200);
      res.end("Version not supported");
    break;
  }
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("marcloney.com started on port " + port);
});