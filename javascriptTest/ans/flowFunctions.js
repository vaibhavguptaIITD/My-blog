//Should be able to print 'fizz' for item divisible by 3 or 'buzz' for item divisible by 5 or 'fizzbuzz' for items divisible by 3 & 5 otherwise the number itself
function fizzBuzz(item)
{
	
	return ((item % 3?"":"fizz") + (item % 5 ? "":"buzz")) || item;
}
