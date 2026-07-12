const { test, expect } = require("@playwright/test");
const {customtest} = require('../../utils/test-base');

const {LoginPage} = require('../../pageobjects/LoginPage');
const {DashboardPage} = require('../../pageobjects/DashboardPage');
const {CartPage} = require('../../pageobjects/CartPage');
const {OrdersReviewPage} = require('../../pageobjects/OrdersReviewPage');
const {Orderplacedandhistory} = require('../../pageobjects/Orderplaced-history');
//json->string->js object 
const dataSet = JSON.parse(JSON.stringify(require('../../utils/placeorderTestData.json')));
/*Pasring the JSON to covert it into Javascript object */
/* we have to convert JSON into a string to have better output, as sometimes it may 
also contain some encoding (like upf-8) this may cause parsing to fail */

/*Parameteriazation -testing same test but with different data set, by making the JSON data
as an array, just by adding square bracets for the json data file */ 
//dataSet becomes an array now 
/* Adding the whole test in one forloop to check test with different data set */

for (const data of dataSet)
{
test.only (`Cient App logic for ${data.productName}`, async ({page}) =>{
    /*changing the test description above since, it throws error 
    to print same test name for multiple data from json */
   
    /*const productName = "ZARA COAT 3";

    const username = "manojkumarc2994@gmail.com";
    const password = "Radeon 123";

    const countryCode = "Ind";
    const countryName = "India";
    //data is now coming from external json file, so commenting this all out 

    /*const title = await page.title();
    console.log (title);
    await expect (page).toHaveTitle("Let's Shop");*/

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);
    //dataSet.username used to work when only one set of data is there ion JSON
    /*data.username is used to work when multiple data is there on json and data is variable of dataSet
    from the for loop above the test*/


    const dashboardPage = new DashboardPage (page);
    await dashboardPage.searchProductAddtoCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartpage = new CartPage (page, data.productName);
    await cartpage.CheckoutItem(data.productName);
    await cartpage.CheckOutprocess();

    const ordersreviewpage = new OrdersReviewPage (page);
    await ordersreviewpage.searchCountryCodeandSelect(data.countryCode,data.countryName);
    await ordersreviewpage.emailandSubmit(
        data.username);

    const orderplacedandhistory = new Orderplacedandhistory (page);
    await orderplacedandhistory.orderPlaced(page);


});
}

customtest.only (`Cient App logic`, async ({page,testDataForOrder}) =>{
    //@Web - tag can be used in cmd prmt to call only the tagged test and not other tests 

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
    //dataSet.username used to work when only one set of data is there ion JSON
    /*data.username is used to work when multiple data is there on json and data is variable of dataSet
    from the for loop above the test*/


    const dashboardPage = new DashboardPage (page);
    await dashboardPage.searchProductAddtoCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartpage = new CartPage (page, testDataForOrder.productName);
    await cartpage.CheckoutItem(testDataForOrder.productName);
    await cartpage.CheckOutprocess();
});
