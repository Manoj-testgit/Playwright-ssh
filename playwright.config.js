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
  /* Run tests in files in parallel */
  timeout: 20 *1000,  // timeout for everystep
     expect : {
      timeout: 5000,  // timeout for every assertion
     },

     reporter: 'html',


     use: {
      browserName: 'chromium',
      headless:true,
      screenshot : 'on',//'only-on-failure'
      trace : 'on',  /*use this to get screeshot only when it fails ('retain-on-failure')*/
     }
     


});

