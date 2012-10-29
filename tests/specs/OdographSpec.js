describe('Odograph', function() {

  xit('it can be tested', function () {
    expect(1).toBeTruthy();
  });

  describe('#constructor', function () {

    beforeEach(function () {
      this.value = '123';
      this.odo = new Odograph(this.value);
    });

    it('should set this.value = parseInt(value, 10)', function () {
      expect(this.odo.value).toEqual(parseInt(this.value, 10));
    });

    it('should throw exception if value is not provided', function () {
      var exception = new Error(Odograph.prototype.CONST['ERROR_VALUE_IS_NOT_DEFINED']);
      expect(function () { new Odograph() }).toThrow(exception);
    });

    it('should throw exception if value is NaN', function () {
      var exception = new Error(Odograph.prototype.CONST['ERROR_VALUE_IS_NOT_NUMERIC']);
      expect(function () { new Odograph('asdf123') }).toThrow(exception);
    });

    it('should invoke this.initalize if it is defined', function () {
      Odograph.prototype.initialize = jasmine.createSpy('#initialize');
      var val = 34444;
      var odo = new Odograph(val);
      expect(Odograph.prototype.initialize).toHaveBeenCalled();
      expect(Odograph.prototype.initialize).toHaveBeenCalledWith(val);
    });

  });

  describe('Method', function () {

    beforeEach(function () {
      this.value = 123;
      this.odo = new Odograph(this.value);
    });

    describe('#initialize', function () {

      beforeEach(function () {
        
      });

      it('TODO: implement', function () {

      });


    });
    
    describe('#render', function () {

      beforeEach(function () {
        this.callback = jasmine.createSpy('render callback');

        this.result = this.odo.render(this.callback);
      });

      it('should create div.odo-board', function () {
        expect(this.odo.el).toBe('div.odo-board');
      });

      it('should contain this.value', function () {
        expect(this.odo.el).toHaveText(this.value);
      });

      it('should call callback with this.el if defined', function () {
        expect(this.callback).toHaveBeenCalled();
        expect(this.callback).toHaveBeenCalledWith(this.odo.el);
      });

      it('should return itself', function () {
        expect(this.result).toEqual(this.odo);
      });


    });

    describe('#decrease', function () {

      beforeEach(function () {
    
      });

      it('should decrease by 1 if no argument passed', function () {
        this.odo.decrease();
        expect(this.odo.value).toEqual(--this.value);
      });

      it('should decrease by val if val passed', function () {
        var minus = 5;
        this.odo.decrease(minus);
        expect(this.odo.value).toEqual(this.value - minus);
      });

      it('should return itself', function () {
        var result = this.odo.decrease();
        expect(result).toEqual(this.odo);
      });

    });

    describe('#increase', function () {

      beforeEach(function () {
    
      });

      it('should increase by 1 if no argument passed', function () {
        this.odo.increase();
        expect(this.odo.value).toEqual(++this.value);
      });

      it('should plus by val if val passed', function () {
        var plus = 15;
        this.odo.increase(plus);
        expect(this.odo.value).toEqual(this.value + plus);
      });

      it('should return itself', function () {
        var result = this.odo.increase();
        expect(result).toEqual(this.odo);
      });

    });


  });

});