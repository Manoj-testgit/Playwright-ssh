/*What you are testing: Create a brand new event from the admin panel, then complete a booking for that event, 
and finally verify the seat count drops by exactly 1.*/

const {test,expect} = require ("@playwright/test");
const { match } = require("node:assert");
const console = require("node:console");
const { text } = require("node:stream/consumers");




test ("Testing Admin tool", async ({page})=>
{
    const Base_URL = "https://eventhub.rahulshettyacademy.com";
    await page.goto(Base_URL);
    const title = await page.title();
    console.log (title);
    await expect (page).toHaveTitle("EventHub — Discover & Book Events");

    const username = "manojkumarc2994@gmail.com";
    const password = "Radeon 123"
    const event = "Deepavali";
    const dropdown = page.locator("#category");

    await page.getByPlaceholder("you@email.com").fill(username);
    await page.getByLabel("password").fill(password);
    await page.getByRole("button",{name: 'Sign In'}).click();
    await expect (page.locator(".max-w-7xl").first()).toBeVisible();
    await expect (page.getByRole("link",{name:'Browse Events →'})).toBeVisible();

    await page.getByRole("button",{name:'Admin' }).click();
    await page.getByRole("link",{name:'Manage Events'}).first().click();
    await page.getByPlaceholder("Event title").fill(event);
    await page.locator("#admin-event-form textarea").fill("Deepavali Dance Party");
    await dropdown.selectOption("Festival");
    await page.getByLabel("city").fill("Bengaluru");
    await page.getByLabel("venue").fill("Bangalore Palace");
    await page.getByLabel("Event Date & Time").fill("2026-11-09T16:54");
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("75");
    await page.getByLabel("Total Seats").fill("1000");
    await page.getByRole("button",{name:'+ Add Event'}).click();
    const toaster = page.locator(".pointer-events-auto");
    await toaster.waitFor();
    await expect(toaster).toBeVisible();

    await page.locator("#nav-events").click();
    const allevents = await page.locator("#event-card a h3").allTextContents();//was able narrow on headers by usng a to
    //  eleminate all other texts and used h3 like to to eleminate the other test that was under id #event-card a 
    console.log(allevents);
    await expect(page.locator("#event-card").first()).toBeVisible();
    const matchedevent = page.locator("#event-card").filter({hasText:event});
    await expect(matchedevent).toBeVisible({timeout: 5000});
    await expect(matchedevent).toContainText(event);
    const seatstext = await matchedevent.getByText(/seat/i).first().innerText();
    //trying to extract the exact text from the inttertext
    console.log(seatstext);
    const seatbeforebooking = parseInt(seatstext);
    //test.setTimeout(10000);//adding timeout to the test itself
    console.log(seatbeforebooking);

    await matchedevent.locator("#book-now-btn").click();//

    const ticketCount = page.locator("#ticket-count");
    await expect(ticketCount).toHaveText("1");
    await page.getByLabel("Full Name").fill("Manoj Kumar")
    await page.locator("#customer-email").fill(username);
    await page.getByPlaceholder("+91 98765 43210").fill("9980441385");
    await page.locator(".confirm-booking-btn").click();

    const bookingref = page.locator(".booking-ref");
    await expect(bookingref).toBeVisible();
    const bookingId = await bookingref.innerText();
    console.log("Booking Id is " +bookingId);

    await page.getByRole("button" ,{name:'View My Bookings'}).click();
    await expect (page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
    await expect (page.locator("#booking-card").first()).toBeVisible();
    //const allcards = await page.locator(".space-y-4.mb-8").allTextContents();
    //console.log(allcards);
    const bookedcard =  page.locator("#booking-card").filter({hasText:bookingId});
    console.log(await bookedcard.textContent());
    await expect (bookedcard).toBeVisible();
    await expect (bookedcard).toContainText(bookingId);

    await page.goto(`${Base_URL}/events`);
    const firstcard = page.locator("#event-card").first()
    await expect (firstcard).toBeVisible();
    const neweventCard = page.locator("#event-card").filter({hasText:event});
    await expect (neweventCard).toBeVisible();
    const seafsafterbooking = seatbeforebooking-1;
    console.log(seafsafterbooking);
    await expect (seafsafterbooking) === seatbeforebooking-1

    
});