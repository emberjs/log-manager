// the base for dist files
var baseDistFile = 'dist/<%= pkg.name %>';
var builds = [''];
var s3Uploads = [];
builds.forEach(function(build){
  var srcFile = baseDistFile + build + 'js';
  s3Uploads.push({ src: srcFile, dest: '<%= pkg.name %>-<%= env.TRAVIS_COMMIT %>.' + build + 'js' });
  s3Uploads.push({ src: srcFile, dest: '<%= pkg.name %>-latest.' + build + 'js' });
});

module.exports = {
  options: {
    bucket: '<%= pkg.name %>-builds',
    access: 'public-read'
  },
  dev: {
    upload: s3Uploads
  }
};
