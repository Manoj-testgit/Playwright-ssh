const base = require("@playwright/test");

//page, browsers - are the default fixtures by playwright 
//we can also make a custum fixtures 

exports.customtest = base.test.extend(
{
    testDataForOrder : //this is a custom fixture 
    {
      username : "manojkumarc2994@gmail.com",
     password  : "Radeon 123",
     productName  : "ZARA COAT 3",
     countryCode  : "Ind",
     countryName  : "India"
    }
        
    

})