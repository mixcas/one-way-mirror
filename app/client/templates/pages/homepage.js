
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
  var peer = new Peer({
    'key': 'g6tlckalty4uc8fr',
  });

  peer.on('call', function(call) {
    // Answer the call, providing our mediaStream
    call.answer();
    console.log('answer');
    call.on('stream', function(stream) {
      // `stream` is the MediaStream of the remote peer.

      var video = document.getElementById('mirror-video');
      var url = window.URL || window.webkitURL;
      video.src = url ? url.createObjectURL(stream) : stream;
      video.play();

    });
  });
  
  var conn = peer.connect('one-way-mirror');


  conn.on('open', function(id){

    conn.on('data', function(data){
      // Will print 'hi!'
      console.log(data);

    });

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
