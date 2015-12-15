angular
  .module('uploader')
  .controller('MainController', MainController);

MainController.$inject = ['Upload'];
function MainController(Upload) {
  var self = this;

  self.file = null;
  self.files = null;
  
  this.uploadSingle = function() {
    Upload.upload({
      url: 'http://localhost:3000/upload/single',
      data: { file: self.file }
    })
    .then(function(res) {
      console.log("Success!");
      console.log(res);
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  this.uploadMulti = function() {
    Upload.upload({
      url: 'http://localhost:3000/upload/multi',
      arrayKey: '',
      data: { files: self.files }
    })
    .then(function(res) {
      console.log("Success!");
      console.log(res);
    })
    .catch(function(err) {
      console.error(err);
    });
  }
}