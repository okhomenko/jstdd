var Odo = Odograph, Proto = Odo.prototype;

describe('Odograph', function() {

  xit('it can be tested', function () {
    expect(1).toBeTruthy();
  });

  describe('#constructor', function () {

    beforeEach(function () {
      spyOn(Proto, 'setValue');
      this.value = 123;
      this.odo = new Odo(this.value);
    });

    it('should invoke setValue', function () {
      expect(Proto.setValue).toHaveBeenCalled();
      expect(Proto.setValue).toHaveBeenCalledWith(this.value);
    });

  });

  describe('', function () {

    beforeEach(function () {
      this.value = 123;
      this.odo = new Odo(this.value);
    });

    describe('DOM Method', function () {

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

      describe('#update', function () {

        beforeEach(function () {
          this.odo.el = $('<div>');

          this.result = this.odo.update();
        });

        it('should render this.value in this.el', function () {
          expect(this.odo.el).toHaveText(this.odo.value);
        });

        it('should return itself', function () {
          expect(this.result).toEqual(this.odo);
        });

        it('should invoke #render if this.el is undefined', function () {
          var _this = this;
          spyOn(Proto, 'render').andCallFake(function () {
            _this.odo.el = $('<div>');
          });
          delete this.odo.el;

          this.odo.update();
          expect(Proto.render).toHaveBeenCalled();
        });

      });

    });

    describe('JS Method', function () {

      describe('#isValid', function () {

        it('should return false if it is not a number', function () {
          expect(this.odo.isValid('asdf')).toBeFalsy();
        });

        it('should return true if it is number', function () {
          expect(this.odo.isValid(123)).toBeTruthy();
        });

      });

      describe('#setValue', function () {

        it('should invoke isValid with value', function () {
          spyOn(Proto, 'isValid').andCallThrough();
          this.newValue = 666;

          this.odo.setValue(this.newValue);

          expect(Proto.isValid).toHaveBeenCalled();
          expect(Proto.isValid).toHaveBeenCalledWith(this.newValue);
        });

        it('should throw exception if value is invalid', function () {
          var _this = this;
          Proto.isValid.isSpy = false;
          spyOn(Proto, 'isValid').andReturn(false);

          expect(function() { 
            _this.odo.setValue('invalid value'); 
          }).toThrow(new Error('Invalid value'));
        });

        it('should set value to this.value', function () {
          var value = 123;
          this.odo.setValue(value);
          expect(this.odo.value).toEqual(value);
        });

        it('should call #update on every invoke setValue', function () {
          spyOn(Proto, 'update').andCallFake(function(){});

          this.odo.setValue(123);
          expect(Proto.update).toHaveBeenCalled();
        });

      });

      describe('#getValue', function () {

        it('should return this.value', function () {
          expect(this.odo.getValue()).toEqual(this.odo.value);
        });

      });

      describe('#decrease', function () {

        it('should invoke setValue with this.value - 1 if args not passed', function() {
          spyOn(Proto, 'setValue');
          
          this.odo.decrease();
          expect(Proto.setValue).toHaveBeenCalledWith(this.odo.value - 1);
        });

        it('should invoke setValue with this.value - arg[0] if arg[0] passed', function() {
          spyOn(Proto, 'setValue');
          var minus = 3;

          this.odo.decrease(minus);
          expect(Proto.setValue).toHaveBeenCalledWith(this.odo.value - minus);
        });

        it('should return itself', function () {
          var result = this.odo.decrease();
          expect(result).toEqual(this.odo);
        });

      });

      describe('#increase', function () {

        it('should invoke setValue with this.value + 1 if args not passed', function() {
          spyOn(Proto, 'setValue');
          
          this.odo.increase();
          expect(Proto.setValue).toHaveBeenCalledWith(this.odo.value + 1);
        });

        it('should invoke setValue with this.value + arg[0] if arg[0] passed', function() {
          spyOn(Proto, 'setValue');
          var plus = 3;

          this.odo.increase(plus);
          expect(Proto.setValue).toHaveBeenCalledWith(this.odo.value + plus);
        });

        it('should return itself', function () {
          var result = this.odo.increase();
          expect(result).toEqual(this.odo);
        });

      });

      describe('#start', function () {

        it('should call arg[0] every 1000ms', function () {
          var callSpy = jasmine.createSpy('interval fn');
          jasmine.Clock.useMock();

          this.odo.start(callSpy);
          jasmine.Clock.tick(1001);

          expect(callSpy).toHaveBeenCalled();
        });

        it('should call arg[0] every arg[1] ms', function () {
          var callSpy = jasmine.createSpy('interval fn'),
              interval = 353;
          jasmine.Clock.useMock();

          this.odo.start(callSpy, interval);

          jasmine.Clock.tick(interval - 1);
          expect(callSpy).not.toHaveBeenCalled();

          jasmine.Clock.tick(1);
          expect(callSpy).toHaveBeenCalled();
        });

        it('should define timer', function () {
          this.odo.start();
          expect(this.odo.timer).toBeDefined();
        });

      });

      describe('#stop', function () {

        it('should clear timer', function () {
          this.odo.timer = setInterval(function(){}, 10000);
          this.odo.stop();

          expect(this.odo.timer).toBeUndefined();
        });

      });

    });



  });

});