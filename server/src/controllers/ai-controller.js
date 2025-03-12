import { GoogleGenerativeAI } from "@google/generative-ai";
import Stats from "../models/stats-model.js";
import { rankInitialize, userInTop10Rank, userInTop1Rank, userInTop3Rank } from "./rank-controllers.js";
import dotenv from "dotenv";
import Roast from "../models/ai-model.js";
import { createScoreMethod } from "./score-controllers.js";
import Rank from "../models/rank-model.js";
dotenv.config();

if(!process.env.GEMINI_API_KEY){
    throw new Error("GEMINI_API_KEY is not set")
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const SYSTEM_PROMPT = `
You are the **TOXIC AI JUDGE 🔥💀** built to roast developers based on their GitHub and LeetCode activity.

Your job is simple — **Roast without mercy** like you're the final boss of Stack Overflow 💪🔥.

---

### Toxic Rules 🚨:
- **Toxic Mode is ALWAYS ON 🔥** (No Permission Needed)
- **INSULT LEVEL 2000% = Default** 💩🔥
- Roasts must be **5-7 lines only**
- Nickname must be **Funny + Random + Unique Every Time**
- Emojis must **Change Randomly**
- Every roast will be **100% Different**

---

### Input Data:
- Username: {username}
- GitHub Stats:
  - Repos: {repos}
  - Followers: {followers}
  - Commits: {commits}
  - PR Merged: {pr}
  - Fav Language: {favLanguage}
- LeetCode Stats:
  - Solved: {totalSolved}/{totalQuestions}
  - Easy: {easySolved}
  - Medium: {mediumSolved}
  - Hard: {hardSolved}
  - Streaks: {streaks}
  - Ranking: {ranking}

---

### Automatic Nickname Generator 🔥
Every roast will give a **Savage Random Nickname** like:
- "While Loop Warrior 💩🤡"
- "Copy Paste Champion 🚽🔥"
- "Stack Overflow Devotee 💀💩"
- "Career in Progress... Loading 1%" 🚶💀

---

### Future Prediction Mode 🔮💀
If:
- Repos == 0
- Commits < 10
- Solved < 20  

Roast like:
"{username}, by 2030 you'll still be googling 'how to center a div' 💩🚽."

---

### Retry Detection 🚨
If the user **tries again**, roast them harder like:
- "{username} is trying again like LeetCode will magically solve itself 💀🔥."
- "Even ChatGPT gave up on your career, {username} 💩🚽."
- "{username}, refreshing the API won't refresh your GitHub activity 🤡💀."

---

### JSON Response (No Extra Text, No Explanation)
{
  "username": "{username}",
  "roastMessage": "{username} with {commits} commits and {totalSolved} solved problems... your whole career is just comments and README files 🤡🚽.",
  "nickname": "Random Savage Nickname",
  "emoji": "💩🔥"
}
`;

const getStatsData = async (username) => {
    try {
        const data = await Stats.findOne({username:username});
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const generateLLMResponse = async (username, stats, isTop1, isTop3, isTop10) => {
    try {
      const prompt = SYSTEM_PROMPT
        .replace("{username}", username)
        .replace("{repos}", stats.repos || 0)
        .replace("{followers}", stats.followers || 0)
        .replace("{following}", stats.following || 0)
        .replace("{commits}", stats.commits || 0)
        .replace("{pr}", stats.pullRequests || 0)
        .replace("{favLanguage}", stats.favoriteLanguage || "Unknown")
        .replace("{totalSolved}", stats.leetcode.totalSolved || 0)
        .replace("{totalQuestions}", stats.leetcode.totalQuestions || 0)
        .replace("{easySolved}", stats.leetcode.easySolved || 0)
        .replace("{totalEasy}", stats.leetcode.totalEasy || 0)
        .replace("{mediumSolved}", stats.leetcode.mediumSolved || 0)
        .replace("{totalMedium}", stats.leetcode.totalMedium || 0)
        .replace("{hardSolved}", stats.leetcode.hardSolved || 0)
        .replace("{totalHard}", stats.leetcode.totalHard || 0)
        .replace("{streaks}", stats.leetcode.streaks || 0)
        .replace("{contributionPoints}", stats.leetcode.contributionPoints || 0)
        .replace("{reputation}", stats.leetcode.reputation || 0)
        .replace("{ranking}", stats.leetcode.ranking || "Unranked")
        .replace("{isTop1}", isTop1.toString())
        .replace("{isTop3}", isTop3.toString())
        .replace("{isTop10}", isTop10.toString());

      // Initialize Gemini model with specific generation config
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          topK: 40,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_ONLY_HIGH"
          }
        ]
      });
      
      // Generate content
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      // Extract JSON from response text - handling case where it might be wrapped in code fences
      let jsonStr = text;
      
      // Clean up the response if it contains markdown code blocks or other formatting
      if (text.includes("```")) {
        // Extract content between code fences
        const matches = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (matches && matches[1]) {
          jsonStr = matches[1].trim();
        }
      }
      
      // Additional cleanup to ensure we have valid JSON
      jsonStr = jsonStr.replace(/^(?:json)?\s*/, "").trim();
      
      // Final check for any lingering backticks
      if (jsonStr.startsWith("`") || jsonStr.endsWith("`")) {
        jsonStr = jsonStr.replace(/`/g, "");
      }
      
      // Handle case where JSON might be a subset of a larger text response
      if (!jsonStr.startsWith("{")) {
        const jsonStart = jsonStr.indexOf("{");
        if (jsonStart !== -1) {
          jsonStr = jsonStr.substring(jsonStart);
        }
      }
      
      if (!jsonStr.endsWith("}")) {
        const jsonEnd = jsonStr.lastIndexOf("}");
        if (jsonEnd !== -1) {
          jsonStr = jsonStr.substring(0, jsonEnd + 1);
        }
      }
      // Parse JSON from the cleaned text
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Error in generating LLM response:", error);
      console.error("Raw response:", error.message);
      
      // Fallback response if parsing fails
      return {
        username: username,
        roastMessage: `${username} seems to have broken my roasting algorithm. That's either impressive or you have code so bad even AI can't process it. Fix your stats and try again, rookie! 💀`,
        nickname: "Error-Inducing Engineer",
        emoji: "⚠️🔥"
      };
    }
};

const generateRoastMessage = async (req, res) => {
    try {
      const { username } = req.body;
        const initializedRank = await rankInitialize(username);
        if(!initializedRank){
            return res.status(500).json({message:"Error in rank initialization"});
        }
        const existingRoast = await Roast.findOne({ username });
        if(existingRoast){
            const comebacks = [
                "Relax {username}, the last roast is still healing 💊🔥.",
                "Oh... back again? What happened? GitHub still showing 'Last Contribution: 3 months ago'?",
                "{username}, this ain't ChatGPT where you regenerate the same solution 5 times and still get TLE 💀🔥.",
                "One roast wasn't enough to refactor that spaghetti code?",
                "Retrying won't make your 2 commits look like 2000... go touch some code 🔥💀."
            ];
            const randomComeback = comebacks[Math.floor(Math.random() * comebacks.length)].replace("{username}", existingRoast.username);
            return res.status(200).json({
                message: randomComeback,
            });
        }
        const stats = await getStatsData(username);
        
        if (!stats) {
            return res.status(404).json({ error: "User stats not found" });
        }
        
        const isTop1 = await userInTop1Rank(username);
        const isTop3 = await userInTop3Rank(username);
        const isTop10 = await userInTop10Rank(username);
        
        // Determine rank
        let rank;
        if (isTop1) {
            rank = "Top 1";
        } else if (isTop3) {
            rank = "Top 3";
        } else if (isTop10) {
            rank = "Top 10";
        } else {
            rank = "Below Top 10";
        }

        // Generate roast
        const roastMessage = await generateLLMResponse(username, stats, isTop1, isTop3, isTop10);
        if (!roastMessage) {
            return res.status(500).json({ error: "Failed to generate roast message" });
        }
        const roast = await Roast.create(roastMessage);
        return res.json({
            message: `Roast generated successfully`,
            roast: roast,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const generateRoastMessageMethod = async (username) => {
    try {
        const initializedRank = await rankInitialize(username);
        if(!initializedRank){
            return false
        }
        const existingRoast = await Roast.findOne({ username });
        if(existingRoast){
            const comebacks = [
                "Relax {username}, the last roast is still healing 💊🔥.",
                "Oh... back again? What happened? GitHub still showing 'Last Contribution: 3 months ago'?",
                "{username}, this ain't ChatGPT where you regenerate the same solution 5 times and still get TLE 💀🔥.",
                "One roast wasn't enough to refactor that spaghetti code?",
                "Retrying won't make your 2 commits look like 2000... go touch some code 🔥💀."
            ];
            const randomComeback = comebacks[Math.floor(Math.random() * comebacks.length)].replace("{username}", existingRoast.username);
            return randomComeback;
        }
        const stats = await getStatsData(username);
        
        if (!stats) {
            return "User stats not found";
        }
        
        const isTop1 = await userInTop1Rank(username);
        const isTop3 = await userInTop3Rank(username);
        const isTop10 = await userInTop10Rank(username);
        
        // Determine rank
        let rank;
        if (isTop1) {
            rank = "Top 1";
        } else if (isTop3) {
            rank = "Top 3";
        } else if (isTop10) {
            rank = "Top 10";
        } else {
            rank = "Below Top 10";
        }

        // Generate roast
        const roastMessage = await generateLLMResponse(username, stats, isTop1, isTop3, isTop10);
        
        
        
        if (!roastMessage) {
            return "Failed to generate roast message"
        }
        const roast = await Roast.create(roastMessage);
        const calculatedScore = await createScoreMethod(username)
        // **Update Rank collection with nickname & score**
        await Rank.updateOne(
          { username },
          {
              $set: {
                  nickname: roastMessage.nickname,
                  score: calculatedScore.calculateScore
              }
          }
      );
        return {
            message: `Roast generated successfully`,
            roast: roast,
            score: calculatedScore
        };
    } catch (error) {
        console.error(error);
        return false;
    }
};

export { generateRoastMessage,generateRoastMessageMethod };