pragma solidity 0.5.0;

contract Textboard {

	struct Post{
		uint id;
		string text;
		string date;
	}

	mapping(uint=>Post) public posts;
	
	uint public postCount;

	function addPost(string memory _text, string memory _date) public{
		postCount++;
		posts[postCount]=Post(postCount, _text, _date);
	}

	constructor() public {
		addPost("Hello world","0");
		addPost("Whatup","0");
	}
}
