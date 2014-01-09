App.Router.map(function () {
  // MAIN
  this.resource('main', {path: '/'}, function () {
    this.route('about');
  });

  // ERROR
  this.resource('error', function () {
    this.route('unauthorized');
  });
});