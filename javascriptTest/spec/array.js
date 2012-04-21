describe("Array:", function() {
  var array;

  beforeEach(function() {
    array = ["abcd","efgh","hijk"];
  });

  it("Should be able to delete an item from array", function() {
    
    deleteItem(array,"efgh");
    expect(array.length).toEqual(2);
    expect(array.join(" ")).toEqual("abcd hijk");
	});
	
	it("Should be able to add an item to an array at a given position", function() {
    
    addItem(array,"lmno", 1);
    expect(array.length).toEqual(4);
    expect(array.join(" ")).toEqual("abcd lmno efgh hijk");
	});
	
	it("Should be able to find an item's location", function() {
    var location = findLocation(array,"efgh");
    var locationMissing = findLocation(array, "lsdf");
    expect(location).toEqual(1);
	expect(locationMissing).toEqual(-1);
	});
});