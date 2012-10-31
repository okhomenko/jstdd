(function (window, $, _) {
  'use strict';

  var Odograph = function (value) {
    this.setValue(value);

    return this;
  };

  Odograph.prototype = {

    render: function (callback) {
      this.el = $('<div>', { 
        class: 'odo-board',
        html: this.value 
      });

      if (typeof callback === 'function') {
        callback.apply(this, [this.el]);
      }

      return this;
    },

    update: function () {
      if (typeof this.el === 'undefined') {
        this.render();
      }

      this.el.html(this.getValue());

      return this;
    },

    isValid: function (value) {
      return !isNaN(value);
    },

    setValue: function (value) {
      if (!this.isValid(value)) {
        throw new Error('Invalid value');
      }

      this.value = value;
      this.update();
    },

    getValue: function () {
      return this.value;
    },

    decrease: function (value) {
      this.setValue(this.value - (value || 1));

      return this;
    },

    increase: function (value) {
      this.setValue(this.value + (value || 1));

      return this;
    },

    start: function (fn, interval) {
      var _this = this;
      fn = (typeof fn === 'function') ? fn : function () {};

      this.timer = setInterval(function () {
        fn.call(_this);
      }, interval || 1000);
    },

    stop: function () {
      clearInterval(this.timer);
      delete this.timer;
    }

  };

  window.Odograph = Odograph;

}(window, jQuery, _));