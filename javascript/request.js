function Request(url, callback) {
  this.url = url;
  this.callback = callback;
  this.transport = new XMLHttpRequest();
  this.transport.onreadystatechange = this.checkState.bind(this);
}

Request.prototype = {
  go: function() {
    this.transport.open('GET', this.url, true);
    this.transport.send();
  },
  checkState: function() {
    if(this.transport.readyState == 4) {
      this.callback(this.transport.responseText);
    }
  }
};
