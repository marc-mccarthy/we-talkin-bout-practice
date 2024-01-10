import 'dotenv/config';
import { chromium } from 'playwright';

// Family member details - structured as per the form
const familyDetails = JSON.parse(process.env.FAMILY_DETAILS || '[]');

async function fillAndSubmitForm(details) {
    console.log(`Launching browser for ${details.name}...`);

    const browser = await chromium.launch();
    // GUI for browser
    // const browser = await chromium.launch({ headless: false, slowMo: 10 });

    // Headless browser
    const page = await browser.newPage();

    console.log(`Navigating to the form page for ${details.name}...`);
    await page.goto('https://safercovid.org/mytest/dtcorder.html?lang=en');

    const selectors = {
        name: '#full-name',
        // phone: '#phone-number',
        address: '#address-1',
        unit: '#address-2',
        city: '#city',
        state: '#state',
        zip: '#zip'
    };

    // Helper function to fill and verify a field
    async function fillAndVerify(selector, value) {
        await page.fill(selector, value);
        const fieldValue = await page.inputValue(selector);
        if (fieldValue === value) {
            console.log(`Field ${selector} correctly filled with: ${value}`);
        } else {
            console.error(`Error: Field ${selector} not filled correctly. Expected: ${value}, but got: ${fieldValue}`);
            return false;
        }
        return true;
    }

    let allFieldsCorrect = true;
    for (const field in details) {
        if (field !== 'state' && selectors[field]) {
            const isCorrect = await fillAndVerify(selectors[field], details[field]);
            if (!isCorrect) {
                allFieldsCorrect = false;
                console.log(`Error in filling out the ${field} field.`);
                break;
            }
        }
    }

    if (allFieldsCorrect) {
        console.log(`Selecting 'State' for ${details.name}...`);
        await page.selectOption(selectors.state, details.state);
        const selectedState = await page.inputValue(selectors.state);
        if (selectedState !== details.state) {
            console.error(`Error: State not selected correctly. Expected: ${details.state}, but got: ${selectedState}`);
            allFieldsCorrect = false;
        }
        console.log(`Field ${selectors.state} correctly filled with: ${details.state}`);
    }

    if (allFieldsCorrect) {
        console.log(`All fields filled correctly. Submitting form for ${details.name}...`);
        await page.click('.standard-button');
        console.log(`Waiting for navigation after form submission for ${details.name}...`);
        // await page.waitForNavigation({ url: 'https://safercovid.org/confirmation' });
        console.log(`Form submitted successfully for ${details.name}.`);
    } else {
        console.log(`Form not submitted due to incorrect field values for ${details.name}.`);
    }

    await browser.close();
}

// // Test run for the first member in the familyDetails array
// fillAndSubmitForm(familyDetails[0]);

// Run this script immediately for each family member
familyDetails.forEach(member => {
    console.log(`Starting scheduled task for ${member.name}...`);
    fillAndSubmitForm(member);
});

// // Schedule task for each family member on the 1st of every month
// familyDetails.forEach(member => {
//     schedule.scheduleJob('0 0 1 * *', () => {
//         console.log(`Starting scheduled task for ${member.name}...`);
//         fillAndSubmitForm(member);
//     });
// });

console.log(`Scheduled tasks for all family members.`);
