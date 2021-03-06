//Unit test for index.js using mocha
const expect = require("chai").expect;
const app = require("express");
const request = require("request");
const supertest = require("supertest");
const index = require("../index");

//Create a local test server to test api endpoints
var server = supertest.agent("http://localhost:8000");

//Tests all functions involved in authenticating a user
describe("Authenticate User", function(){

  describe("Random String Generator", function(){
    it("Generates random strings of correct length", function(){
      var random1 = index.generateRandomString(10);
      var random2 = index.generateRandomString(25);
      var random3 = index.generateRandomString(55);

      expect(random1.length).to.equal(10);
      expect(random2.length).to.equal(25);
      expect(random3.length).to.equal(55);
    });
    it("Random strings do not match", function(){
      var random1 = index.generateRandomString(16);
      var random2 = index.generateRandomString(16);

      expect(random1).to.not.equal(random2);
    })
  });

  describe("Fetch Login Page", function(){
    it("Returns the login page", function(){
      server
        .get("/")
        .expect("Content-type", /html/) //Check that html renders
        .expect(200)                    //Check response ok
        .end(function(err, res){
          expect(res.status).to.equal(200);
          expect(res.body.error).to.equal(false);
          done();
        });
      });
  });

    describe("Gets and Access and Refresh Tokens from Spotify", function(){
      it("Recieves Tokens", function(){
        request.get("http://localhost:8000/login", function(res){
          expect(res.status).to.equal(200);
          //Check that server returns tokens
          expect(res.access_token).to.not.equal(undefined);
          expect(res.refresh_token).to.not.equal(undefined);
        });
      });
    });
});

//Tests the Playlist Update function
describe("Playlist Update", function(){
	
	

	describe("Playlist Options", function(){
	  it("Open Playlist", function(){
		request.get("http://localhost:8000/get-tracks/:user_id/:playlist_id/:access_token", function(res){
		  expect(res.playlist_id).to.not.equal(undefined);
		});
	  });
	});	

	describe("Playlist Options", function(){
	  it("Open Playlist Options", function(){
	    request.get("http://localhost:8000/get-tracks/:user_id/:playlist_id/:access_token", function(res){
		  expect(res.get.res.render.songs).to.not.equal(undefined);
	    });
	  });
	});
	
	describe("Track Preview", function(){
	  it("Open Track Preview", function(){
	    request.get("http://localhost:8000/callback", function(res){
		  expect(res.get.get.render).to.not.equal(undefined);
	    });
	  });
	});
});


//Tests the Shuffle functions
describe("Shuffle Function", function(){
	
	

	describe("Random Shuffle", function(){
	  it("Random Shuffle", function(){
		var Testarray = ["Hi","hello","Hola","Pie","Cake","Pancake","Waffle","Phone","Waffle","Waffle"];
		var random = shuffles.randShuffle(Testarray);
		
		expect(Testarray.length).to.equal(10);
	  });
	});	
	describe("Spread Shuffle", function(){
	  it("Test Spread Shuffle", function(){    
	    var Testarray = [{shuffleParam:"pie",currentIndex:0,newIndex:null},{shuffleParam:"pie",currentIndex:1,newIndex:null},{shuffleParam:"cake",currentIndex:2,newIndex:null},{shuffleParam:"cake",currentIndex:3,newIndex:null},{shuffleParam:"pancake",currentIndex:4,newIndex:null}];
	    var spread = shuffles.spreadShuffle(Testarray);
	    
	    expect(Testarray.length).to.equal(5);
	  });
	});
	
	describe("Bias Shuffle", function(){
	  it("Test Bias Shuffle", function(){
	    var Testarray = [{rank:"5",currentIndex:0,newIndex:null},{rank:"1",currentIndex:0,newIndex:null},{rank:"3",currentIndex:0,newIndex:null},{rank:"2",currentIndex:0,newIndex:null},{rank:"4",currentIndex:0,newIndex:null}];
	    var bias = shuffles.biasedShuffle(Testarray);
	    var Rank = Testarray[0].rank
	    for (i=1; i<Testarray.length; i++){
		  if (Testarray[i].rank > Testarray[i-1].rank){
		    expect(Testarray.length).to.equal(10);
		  }
		  else if (i=Testarray.length-1){
			expect(Testarray.length).to.equal(5);
	      }
	    }
	  });
	});
});
