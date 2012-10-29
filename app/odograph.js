(function (window, $, _) {
  'use strict';


  var Odograph = function (value) {
  	if (typeof value === 'undefined') {
  		throw new Error(this.CONST['ERROR_VALUE_IS_NOT_DEFINED']);
  	}

    if (isNaN(value)) {
      throw new Error(this.CONST['ERROR_VALUE_IS_NOT_NUMERIC']);
    }

    this.value = parseInt(value, 10);

    if (typeof this.initialize === 'function') {
      this.initialize.apply(this, arguments);
    }

    this.trigger('changed:value');
    return this;
  };

  Odograph.prototype = {

    CONST: {
      'ERROR_VALUE_IS_NOT_DEFINED': 'Value must be defined!',
      'ERROR_VALUE_IS_NOT_NUMERIC': 'Numeric value must be provided!'
    },

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

    decrease: function (value) {
      this.value -= (value || 1);

      this.trigger('changed:value');
      return this;
    },

    increase: function (value) {
      this.value += (value || 1);

      this.trigger('changed:value');
      return this;
    }



  };

  window.Odograph = Odograph;

}(window, jQuery, _));