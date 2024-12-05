import axios from 'axios';
import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory (ES modules equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to get Steam App ID from game name
async function getAppId(gameName) {
    try {
        const response = await axios.get(`https://steamcommunity.com/actions/SearchApps/${encodeURIComponent(gameName)}`);
        if (response.data && response.data.length > 0) {
            return response.data[0];
        }
        return null;
    } catch (error) {
        console.error(`Error finding app ID for ${gameName}:`, error.message);
        return null;
    }
}

// Function to get game reviews
async function getGameReviews(appId) {
    try {
        const response = await axios.get(`https://store.steampowered.com/appreviews/${appId}?json=1`);
        return response.data.query_summary;
    } catch (error) {
        console.error(`Error fetching reviews for app ${appId}:`, error.message);
        return null;
    }
}

// Function to process game and get ratings
async function processGame(gameName) {
    const gameData = await getAppId(gameName);
    if (!gameData) {
        return {
            appId: "0",
            icon: "Not found",
            logo: "Not found",
            name: "Not found", 
            nameLocal: gameName,
            review_percentage: 'Not found',
            review_score_desc: 'Not found',
            total_negative: 'Not found',
            total_positive: 'Not found',
            total_reviews: 'Not found',
        };
    }

    const { appid: appId, name, icon, logo } = gameData;
    const reviews = await getGameReviews(appId);
    if (!reviews) {
        return {
            appId,
            icon,
            logo,
            name,
            nameLocal: gameName,
            review_percentage: 'Error',
            review_score_desc: 'Error',
            total_negative: 'Error',
            total_positive: 'Error',
            total_reviews: 'Error',
        };
    }

    return {
        appId,
        icon,
        logo,
        name,
        nameLocal: gameName,
        review_percentage: reviews.total_positive / reviews.total_reviews,
        review_score_desc: reviews.review_score_desc || 'Not found',
        total_negative: reviews.total_negative || 0,
        total_positive: reviews.total_positive || 0,
        total_reviews: reviews.total_reviews || 0,
    };
}

// Main function
async function main() {
    try {
        // Read the markdown file
        const filePath = join(__dirname, 'games.md');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const gameNames = fileContent.split('\n').filter(line => line.trim());

        console.log('Processing games...');
        const results = [];
        
        // Process each game with a delay to avoid rate limiting
        for (const gameName of gameNames) {
            const result = await processGame(gameName);
            console.log(`Game Info: {
              AppId: ${result.appId},
              Icon: ${result.icon},
              Logo: ${result.logo},
              Name: ${result.name},
              NameLocal: ${result.nameLocal},
              Negative_Reviews: ${result.total_negative},
              Positive_Reviews: ${result.total_positive},
              Review_Percentage: ${result.review_percentage},
              Review_Score_Desc: ${result.review_score_desc},
              Total_Reviews: ${result.total_reviews}
            }`);
            results.push(result);
            // Add a small delay between requests
            await new Promise(resolve => setTimeout(resolve, 601));
        }

        // Create CSV content
        const csvHeaders = ['App ID', 'Icon', 'Logo', 'Game Name (Steam)', 'Game Name (Local)', 'Review Percentage', 'Review Score Description', 'Positive Reviews', 'Negative Reviews', 'Total Reviews'];
        const csvRows = results.map(r => 
            `"${r.appId}","${r.icon}","${r.logo}","${r.name}","${r.nameLocal}","${r.review_percentage}","${r.review_score_desc}","${r.total_positive}","${r.total_negative}","${r.total_reviews}"`
        );
        const csvContent = [csvHeaders.join(','), ...csvRows].join('\n');

        // Write CSV file
        const outputPath = join(__dirname, 'game_ratings.csv');
        await fs.writeFile(outputPath, csvContent);
        console.log('CSV file has been created successfully!');

    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the script
main();
