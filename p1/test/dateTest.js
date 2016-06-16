//To run karma
//karma start --reporters clear-screen,dots

describe('date test', function() {

  it('canary is passing', function() {
    expect(true).to.be.eql(true);
  });
	
   it('should return correct year', function() {
    expect(fillDate().slice(0,4)).to.be.eql(new Date().toJSON().slice(0,4));
  });
  
  it('should return correct month', function() {
    expect(fillDate().slice(5,7)).to.be.eql(new Date().toJSON().slice(5,7));
  });
  
  it('should return correct day', function() {
    expect(fillDate().slice(8,10)).to.be.eql(new Date().toJSON().slice(8,10));
  });
	it('should return todays date', function() {
    expect(fillDate().slice(0,10)).to.be.eql(new Date().toJSON().slice(0,10));
  });
});

describe('valid', function() {

  beforeEach(function() {
    var fixture = '<input type="hidden" name="latitude"  id="latHidden" value="na"></input>'+ 
				'<span style="color:red" id="latRequired"></span>'+
				'<span style="color:red" id="longRequired"></span>'+
				'<span style="color:red" id="altRequired"></span>'+
				'<input type="hidden" name="longitude"  id="longHidden" value="na"></input>,'+
				'<input type="hidden" name="altitude"  id="altHidden" value="na"></input>';

    document.body.insertAdjacentHTML(
      'afterbegin', 
      fixture);
  });

  
  /////Venkat - regarding geolocation: how can we extend the coverage for these guys?
  it('should return FALSE if longitude value is not changed', function() {
    document.getElementById('latHidden').value = "na";
	document.getElementById('longHidden').value = "na";
	document.getElementById('altHidden').value = "na";
	
    expect(valid()).to.be.eql(false);
  });
  
    it('should return TRUE if longitude value is populated', function() {
    document.getElementById('latHidden').value = "1234";
	document.getElementById('longHidden').value = "1234";
	document.getElementById('altHidden').value = "1234";
	
    expect(valid()).to.be.eql(true);
  });

});