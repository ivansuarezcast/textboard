pragma solidity 0.5.0;

contract Textboard {

	struct Post{
		uint id;
		string text;
		uint date;
	}

	mapping(uint=>Post) public posts;
	
	uint public postCount;

	function addPost(string memory _text) public{
		postCount++;
		posts[postCount]=Post(postCount, _text, 0);
	}

	constructor() public {
		addPost("Hello world");
		addPost("Whatup");
	}
}
