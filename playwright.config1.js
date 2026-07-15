// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries : 1, //this will retry the failed cases, it should be declared in object level
  /* Run tests in files in parallel */
   workers: 3, //If there are multiple test files to run, it will run 3 files parallely, 
  //if there is nothing defined, max 6 workers are running parallely - may be depends 
  timeout: 20 *1000,  // timeout for everystep
     expect : {
      timeout: 5000,  // timeout for every assertion
     },

     reporter: 'html',
     projects:[
        {
            name: 'safari',
             use: {
                  browserName: 'webkit',
                  headless:false,
                  screenshot : 'off',//'only-on-failure'
                  trace : 'on',  /*use this to get screeshot only when it fails ('retain-on-failure')*/
                  //...devices['iPhone 17'],
                  //testing it on specific devices 
            
            }
        },
        {
            name: 'chrome',
             use: 
              {
                browserName: 'chromium',
                headless:false,
                screenshot : 'on',//'only-on-failure'
                trace : 'on',  /*use this to get screeshot only when it fails ('retain-on-failure')*/
                //viewport : {width: 720,height: 720},
                //adding the port to open the browser in particular web window size 
                ignoreHTTPSErrors: true,
                //helps to load the page whne it is not https, it helps to accepts the ssl certificate 
                permissions:['geolocation'],
                //If gets a pop up to allow location acess, the above persmission will handle it, it will 
                //accept
                //video: 'retain-on-failure',


             }
        }
     ]

});

