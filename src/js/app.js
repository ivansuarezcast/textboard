App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Textboard.json", function(textboard) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Textboard= TruffleContract(textboard);
      // Connect provider to interact with contract
      App.contracts.Textboard.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var textboardInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Textboard.deployed().then(function(instance) {
      textboardInstance= instance;
      return textboardInstance.postCount();
    }).then(function(postCount) {
      var postResults= $("#postResults");
      postResults.empty();

      for (var i = 1; i <= postCount; i++) {
        textboardInstance.posts(i).then(function(post) {
          var id = post[0];
          var text= post[1];
          var date= post[2];

          // Render candidate Result
          var postTemplate= "<tr><th>" + id + "</th><td>" + text+ "</td><td>" + date+ "</td></tr>";
        // var postTemplate = "<p>sketit"+id+";"+text+";"+date+"</p>"; 
	 postResults.append(postTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },
	post: function(){
		var newPost = "this is a new post";
		App.contracts.Textboard.deployed().then(function(instance){
	return instance.addPost(newPost);
//	$("#content").hide();
//	$("#loader").show();
	});
	}
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
