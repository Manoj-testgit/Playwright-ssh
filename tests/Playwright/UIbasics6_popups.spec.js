const { test, expect } = require("@playwright/test")


test ("@Web Pop up validations",async ({page})=>
    { 


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    /*await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward();
    ^above code just to check the forward and backward flow*/

    await expect(page.locator ("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    /* Above code is written to show, how to validate a hidden element on the webpage*/

    /*Some of the dialogs cannot be accesed directly as a Webpage element
    coz it might be using different language like java
    below code is to handle the dialogs in playwright */

     page.on('dialog',dialog =>dialog.accept());/*On() method is used to check for the event 
     that is surfacing on webpage, in this moment dialogs are the event, it is waiting for 
     dialog to surface the first iteration of 'dialog' indicates the waiting for event (dialog), 
     the second 'dialog' here shows the action being performed that is accept or dismiss*/

    // page.on('dialog',dialog =>dialog.dismiss()); //
    /* dismisses the pop up,  the above dilaong accepts the pop up*/
    await page.locator("#confirmbtn").click(); 
    /*this code triggers the pop up and above code handles the pop up*/

    await page.locator("#mousehover").hover();
    /*this method hovers the mouse over the button*/


    /* Frames 
    Frames on a website are techniques used to divide a browser window into 
    independent sections or to embed one webpage inside another*/

    const framespage = page.frameLocator("#courses-iframe");

    /*this works exectaly like how another webpage works, where if we have to access 
    anything on the frame we can call the frame instead of page and give the action*/
    await framespage.locator("li a[href*='lifetime-access']:visible").click();
    /*this above is checking for button which says lifetime access but the css locators are not unique
    there are 2, but the second one is not visible, hence the line ":visible" after the locaor section*/
   
     //framespage.getByRole("link" , {name: 'NEW All Access plan' }).click();

     const textcheck = await framespage.locator(".text h2").textContent();
     //extracting text from a frame 
     console.log(textcheck.split("")[1]);



});