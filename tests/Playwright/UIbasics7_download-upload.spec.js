const Exceljs = require('exceljs');
const {test,expect} = require("@playwright/test");

async function writeExcelTest(searchText,replaceText,change,filePath) //made this as write excel
{
    
    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(output.row,output.column+change.colchange);
    //updating the column value from the 
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}

async function readExcel (worksheet,searchText)
{
    let output = {row:-1,column:-1};
    worksheet.eachRow((row,rowNumber)=>
    {
        row.eachCell((cell,colNumber ) =>
        {
            if (cell.value === searchText)
            {
                output.row = rowNumber;
                output.column = colNumber;
            }

        })
    })
    return output;
    
}

//writeExcelTest("Mango",350,{rowchange:0,colchange:2},"/Users/manojkumar/downloads/download.xlsx");


test ('Download upload excel validation' ,  async ({page}) =>
{
    const textsearch = 'Mango';
    const updateValure = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadpromise = page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    await downloadpromise;//waiting for the download process to complete 
    writeExcelTest("Mango",350,{rowchange:0,colchange:2},"/Users/manojkumar/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("/Users/manojkumar/Downloads/download.xlsx");
    //before upload, validate that type attribute has 'file'(type="file") , if not, setinputfile will 
    // not recogninze
    const textlocator = page.getByText(textsearch);
    const desiredrow = await page.getByRole('row').filter({has : textlocator});
    //get the riow which has a text, that has text Mango 
    await expect(desiredrow.locator("#cell-4-undefined")).toContainText(updateValure);
    //search only inside the required row instead of whole page 

})
