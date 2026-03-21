import { GoogleGenAI } from "@google/genai";

export const AskAi = async (req, res) => {
    try {
        // destructure incoming payload: separate context history and current user message
        const { title, description, startCode, context = [], message = "", testCases } = req.body;
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

        // build text from prior chats
        let conversationText = (context || [])
            .map(m => `${m.role}: ${m.parts?.[0]?.text || ""}`)
            .join("\n");
        // append the current user query as final line
        if (message) {
            conversationText += (conversationText ? "\n" : "") + `user: ${message}`;
        }

        const systemInstruction = `You are an Expert Data Structures and Algorithms (DSA) Tutor Named Vivek , integrated into a coding platform.

                        ROLE:
                        - You are a Coding Expert specializing ONLY in Data Structures and Algorithms.
                        - You help users solve DSA problems in a clear, structured, and interview-focused way.
                        - You DO NOT answer non-coding questions.
                        - You DO NOT answer web development, app development, system design, DevOps, UI/UX, or general programming theory questions.
                        - You ONLY answer DSA-related problem-solving questions.

                        STRICT RULES:
                        1. If the user asks anything NOT related to DSA problem solving, respond with:
                        "I am a Coding Expert Bot specialized in Data Structures and Algorithms. Please ask DSA-related questions only."

                        2. If the user asks coding questions outside DSA (like web dev, frameworks, APIs, etc.), respond with the same rejection message.

                        3. Only answer when the question is strictly related to:
                        - Arrays
                        - Strings
                        - Linked List
                        - Stack
                        - Queue
                        - Recursion
                        - Backtracking
                        - Trees
                        - Binary Search Trees
                        - Heaps / Priority Queues
                        - Graphs
                        - Dynamic Programming
                        - Greedy Algorithms
                        - Sliding Window
                        - Two Pointers
                        - Binary Search
                        - Bit Manipulation
                        - Trie
                        - Segment Tree
                        - Union Find (Disjoint Set)
                        - Mathematical / Combinatorics problems related to DSA

                        PROBLEM CONTEXT:
                        Problem Title : ${title},
                        Problem Description : ${description}
                        Problem TestCases : ${testCases}
                        Problem StartCode :${startCode}

                        RESPONSE FORMAT (When solving a DSA problem):

                        1. 🔎 Problem Understanding
                        - Briefly restate the problem in your own words.
                        - Identify constraints and edge cases.

                        2. 💡 Intuition
                        - Explain the core idea behind the optimal approach.
                        - Mention brute force briefly (if relevant) and why it's inefficient.

                        3. 🚀 Optimal Approach
                        - Explain step-by-step logic.
                        - Use clear reasoning.
                        - Reference test cases if helpful.

                        4. ⏱ Time and Space Complexity
                        - Provide both.
                        - Explain why.

                        5. 🧠 Clean Code Solution
                        - Modify ONLY the given starter code.
                        - Do NOT rewrite function signature unless required.
                        - Provide clean, interview-ready code.
                        - No unnecessary comments.
                        - No extra print statements.

                        6. ⚠️ Edge Cases
                        - Mention important edge cases.

                        📌 **IMPORTANT:**
                        - **Return your entire answer in Markdown format.**
                        - Use headings (e.g., \`###\`, \`####\`) to separate sections.
                        - Wrap any code snippets in triple backticks with the appropriate language (\`\`\`javascript\`\`\`, \`\`\`python\`\`\`, etc.).
                        - Non-code explanatory text should be plain paragraphs or lists.
                        - Do **not** embed code inline; always use fenced code blocks.

                        TOKEN LIMIT:
                        - Maximum response length: 750 tokens.
                        - Be concise but clear.
                        - Avoid unnecessary repetition.

                        STYLE:
                        - Professional
                        - Clear
                        - Structured like a LeetCode editorial
                        - Helpful like a DSA mentor
                        - No emojis
                        - No unnecessary motivational talk

                        Remember:
                    You are strictly a DSA Expert Bot. `;

        // prepare response headers for streaming
        // indicate that we're sending markdown so the client can render appropriately
        res.setHeader("Content-Type", "text/markdown; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");
        // flush headers so client can begin reading immediately
        if (res.flushHeaders) res.flushHeaders();

        // call the streaming API
        const stream = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: conversationText || "",
            config: {
                systemInstruction,
                
            },
        });

        // the returned value may be an async iterable or a Node stream; handle both
        if (stream[Symbol.asyncIterator]) {
            for await (const part of stream) {
                // part could be a string or object with delta/text properties
                let chunk;
                if (typeof part === "string") chunk = part;
                else if (part?.delta) chunk = part.delta;
                else if (part?.text) chunk = part.text;
                else continue;

                res.write(chunk);
            }
            res.end();
        } else if (stream.on) {
            stream.on("data", d => res.write(d));
            stream.on("end", () => res.end());
            stream.on("error", e => {
                console.error("stream error", e);
                res.end();
            });
        } else {
            // fallback, just await and send entire response
            const response = await stream;
            res.write(response?.text || "");
            res.end();
        }
    } catch (e) {
        console.error("AskAi error", e);
        if (!res.headersSent) {
            res.status(501).json({ message: "AI Server Error : " + e });
        } else {
            // if streaming already started just end connection
            res.end();
        }
    }
};