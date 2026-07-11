const {test,expect} = require('@playwright/test')

//test.describe.configure({mode: 'parallel'});
//the above syntax will help to run test cases on same file run in parallel 

test.describe.configure({mode: 'serial'});
/*If the cases are interdependent on each other, we should the above syntax 
compared to the regular flow, where the dependacny/next test fails or stops executing 
this mode skips the dependancy/next checks */

test ("My First Test",async function ({page}){
    expect(12).toBe(12)
})
test ("My Second Test",async function ({page}){
    expect(100).toBe(102)

})
test ("My Third Test",async function ({page}){
    expect(2.0).toBe(2.0)
})
test ("My Fourth Test",async function ({page}){
    expect("Manoj Kumar ").toContain("Manoj")
    expect(true).toBeTruthy()
})
test ("My Fifth Test",async function ({page}){
    expect(false).toBeFalsy()
    
})
test ("My Sixth Test",async function ({page}){
    expect("Manoj Kumar ".includes("Manoj")).toBeTruthy()
  
})

