angular
  .module('uploader')
  .controller('MainController', MainController);

MainController.$inject = ['Upload', 'API_URL'];
function MainController(Upload, API_URL) {
  var self = this;

  self.file = null;
  self.files = null;
  
  this.uploadSingle = function() {
    Upload.upload({
      url: API_URL + '/upload/single',
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
      url: API_URL + '/upload/multi',
      arrayKey: '', // IMPORTANT: without this multer will not accept the files
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