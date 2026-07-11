class LoginPage {


    constructor(page)
    {
        this.page = page; //to make avaiable to the public, we have create local variable this.page 
        // and assign to page 
        this.signInbutton = page.getByRole("button",{name: "Login"});
        this.userName =  page.getByPlaceholder('email@example');
        this.password = page.getByPlaceholder('enter your passsword');

    }

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin(username,password)

{
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle');//better to have wait state in login state itself
}

}

module.exports = {LoginPage};
