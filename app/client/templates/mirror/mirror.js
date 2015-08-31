/* ---------------------------------------------------- +/

## mirror ##

Code related to the mirror template

/+ ---------------------------------------------------- */

Template.mirror.helpers({

  myHelper: function () {
    //
  }

});

Template.mirror.onCreated(function () {
  var _this = this;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  var peer = new Peer('one-way-mirror', {
    'key': 'g6tlckalty4uc8fr',
  });

  //camStream = null;

  navigator.getUserMedia({video: true}, function(stream) {
    peer.on('connection', function(conn) {

      var camStream = stream;

      conn.on('open', function(){

        conn.on('data', function(data){
          console.log(data);
        });

        var callerId = conn.peer;
        console.log(callerId);
        
        var call = peer.call(callerId, stream);

      });
    });
  }, function(err) {
    console.log(err);
  });



  /*
  navigator.getUserMedia({video: true, audio: true}, function(stream) {
    peer.on('connection', function(conn) {
      conn.on('open', function(){
        conn.send('hi!');
      });
      debugger;
      conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
      });
    });
  }, function(err) {
    console.log(err);
  });

 */
/*
  navigator.getUserMedia({video: true, audio: true}, function(stream) {
    peer.on('connection', function(conn) {
      console.log('Answer');
      conn.send('Hola');
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });

*/
  Session.set('peer', peer);

});

Template.mirror.onRendered(function () {
  var _this = this;

});

Template.mirror.events({

  'click .delete': function(e, instance){
    var mirror = this;
    e.preventDefault();
    Meteor.call('removemirror', item, function(error, result){
      alert('mirror deleted.');
      Router.go('/mirrors');
    });
  }

});
