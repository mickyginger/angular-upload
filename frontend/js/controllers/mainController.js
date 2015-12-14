angular
  .module('uploader')
  .controller('MainController', MainController);

MainController.$inject = ['Upload'];
function MainController(Upload) {
  var self = this;

  self.file = null;
  
  this.upload = function() {
    Upload.upload({
      url: 'http://localhost:3000/upload',
      data: { file: self.file }
    }).then(function(res) {
      console.log("Success!");
      console.log(res);
    })
    .catch(function(err) {
      console.error(err);
    });
  }
}