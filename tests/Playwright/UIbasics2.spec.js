const { test, expect } = require("@playwright/test");
const { text } = require("node:stream/consumers");

test ('Login page flow with UI elements', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const title = await page.title();
    console.log(title); 
    await expect (page).toHaveTitle ("LoginPage Practise | Rahul Shetty Academy");

    const userName = page.locator('#username');
    const userPassword = page.locator('#password');
    const documentLink = page.locator(".float-right a").first();

    await page.locator('#username').fill("rahul shetty");
    await page.locator('#password').fill("Learning@830$3mK2");
    await page.locator('#signInBtn').click();
    console.log (await page.locator("[style*='block']").textContent());
    await expect (page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");

    await userName.fill("rahulshettyacademy");
    //await page.locator('#signInBtn').click();

    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log (await page.locator(".radiotextsty").last().isChecked());/*not an accertion, this to check 
    if tick mark is checked or not */
    await expect (page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect (page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck(); //there is no assertion for uncheck
    expect (await page.locator("#terms").isChecked()).toBeFalsy();/*way to check assert the above
     state by saying it is false since there is direct methed we are treating uncheck as false
     Note - await is added where the action is performed, line 30, 32 has await before expect 
     the action is performed at the last with funtions, but line 34 has await after expected 
     here  action is performe within the brackets not at last */
    await expect (documentLink).toHaveAttribute("class", "blinkingText");

    //await page.pause();
    /*console.log (await page.locator(".card-body a").first().textContent());
    console.log (await page.locator(".card-body a").allTextContents());*/


});

test ('Child windows handling', async ({browser}) => //created a new browser
{
    
    const context = await browser.newContext(); // when a browser is opended, a context is created for the page
    // creates a new context for the orginal page - loginpractise page
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator(".float-right a").first();
    //when i click on the link to open, the new page 
    const [newPage] = await Promise.all // iterates until all the promises are completely fulfilled 
    // fulfilled promises are - returns new page from first promise (page context) hence newpage index 
    // 2nd promise does not return anything, it is just an operation (click opetation)
    // since it returns in array format, square brackets are used for newPage
    ([

            /* Promise - pending, rejected, fulfilled*/

        context.waitForEvent('page'),//check for any new page to open - once it is ready, it 
        // returns the new page as an object 

        documentLink.click(),/*if this(new page trigger - document Link) is written before the context of new page 
        (context.waitForEvent('page')), then context will end up searching for the new event (document Link) 
        which is already completed(click is compelte in previour step), it wont find any info.
        If this document link is written after the context of new page, it will not work because 
        the document link is page triggering step, without the trigger we wont be able to open the new page.
        both the step are passed together to work parallely, these steps we can wrap in an array

        Promises - new page context is one promise and download step is one promise 
        with promise, page context will execute first and will be in the pending state
        next downlink click will execute, the control will come out of the array only 
        when the promises are fulfilled i.e. all the promises are completed or executed n*/
    ])

    const text = await newPage.locator(".red").textContent(); //grabbing the text what is located on the page 
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
    /*textContent only retrives when it is attached to DOM or on whn the page already has text shown 
    inputValue retrives the text that is updated text on the placeholder/input field or text is added to dom*/
    //await page.pause();


    

});