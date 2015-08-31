
/* ---------------------------------------------------- +/

## homepage ##

Code related to the homepage template

/+ ---------------------------------------------------- */

Template.homepage.helpers({

  myHelper: function () {
    //
  }

});

Template.homepage.onCreated(function () {
  var _this = this;

  // Create peer
  var peer = new Peer({
    'key': 'g6tlckalty4uc8fr',
  });

  peer.on('call', function(call) {
    
    // Answer the call
    call.answer();

    // On stream add to video as src
    call.on('stream', function(stream) {
      var video = document.getElementById('mirror-video');
      var url = window.URL || window.webkitURL;
      video.src = url ? url.createObjectURL(stream) : stream;
      video.play();
    });

  });
  
  // Connect to server
  var conn = peer.connect('one-way-mirror');
  conn.on('open', function(id){

    conn.on('data', function(data){
      console.log(data);
    });

    var onScrollDebounced = _.debounce(function () {
      conn.send({ scroll: document.body.scrollTop });
      console.log(document.body.scrollTop); 
    }, 400);

    window.addEventListener('scroll', onScrollDebounced, false);

  });



/*
    // Show stream in some video/canvas element.
  });
*/

});

Template.homepage.onRendered(function () {
  var _this = this;

});

Template.homepage.events({

  'click .delete': function(e, instance){
    var homepage = this;
    e.preventDefault();
    Meteor.call('removehomepage', item, function(error, result){
      alert('homepage deleted.');
      Router.go('/homepages');
    });
  }

});
