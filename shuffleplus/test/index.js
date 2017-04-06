//Unit test for index.js using mocha
  const expect = require("chai").expect;
  const index = require("../index");

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
