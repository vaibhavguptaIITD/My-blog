describe("Function flow:", function() {


  it("Should be able to print 'fizz' for item divisible by 3 or 'buzz' for item divisible by 5 or 'fizzbuzz' for items divisible by 3 & 5 otherwise the number itself", function() {
    expect(fizzBuzz(3)).toEqual("fizz");
    expect(fizzBuzz(5)).toEqual("buzz");
    expect(fizzBuzz(15)).toEqual("fizzbuzz");
    expect(fizzBuzz(4)).toEqual(4);
	});
});