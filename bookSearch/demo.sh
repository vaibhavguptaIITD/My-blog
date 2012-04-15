#!/bin/sh
locationArray=("/Users/vaibhav/Downloads/Simpsons Seasons 1-18/Nonfiction Ebook Pack January 2012 PHC" "/Users/vaibhav/Documents/myStuff/mybooks" "/Volumes/Expansion Drive/E-books" "/Volumes/Expansion Drive/extensive/ebooks" "/Volumes/Expansion Drive/mybooks")
for location in "${locationArray[@]}"
do
	while read inputline
	do
		echo $inputline
	 	find "$location" -iname "*$inputline*" -print -exec cp '{}' "/Users/vaibhav/Documents/myStuff/mybooks/amazonWishlist/" \;
		find "$location" -iname "*${inputline// /.}*" -print -exec cp '{}' "/Users/vaibhav/Documents/myStuff/mybooks/amazonWishlist/" \;
		echo "##################"
	done < ./book.txt
done

