describe('Odograph', function() {

  it('it can be tested', function () {
    expect(1).toBeTruthy();
  });

  describe('constructor', function () {

    beforeEach(function () {
      this.value = 'value123';
      this.instance = new Odograph(this.value);
      console.log('what is that?');
    });

    it('should set value to this.value', function () {
      expect(this.instance.value).toEqual(this.value);
    });

  });

});