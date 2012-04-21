//Function to delete item in an array. The function will modify the original array.
function deleteItem(array, item)
{
	var indexOfItem = array.indexOf(item);
	if(indexOfItem != -1)
	{
		array.splice(indexOfItem, 1);
	}
}

//Function to add item in an array. The function will modify the original array.
function addItem(array, item, index)
{
	array.splice(index, 0, item);
}

//Function with return the location of an item in an array.
function findLocation(array, item)
{
	return array.indexOf(item);
}