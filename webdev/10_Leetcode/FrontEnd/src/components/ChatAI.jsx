import { useForm } from "react-hook-form"
import {Send} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import axiosClient from "../utils/axiosClient"

export const ChatAI = ({problem}) => {

    const [messages, setMessages] = useState([
        { parts: [{ text: "Hey there! Wanna help with your coding problem?" }], role: "model" }
    ])
    const [isThinking, setIsThinking] = useState(false);

    const {register,handleSubmit,reset,formState:{errors}} = useForm()
    const messageEndRef = useRef(null)

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isThinking])

    async function formSubmit(data){
        const userMsg = { role: "user", parts: [{ text: data.message }] };
        reset();

        // prepare conversation state and placeholder for the bot
        const updated = [...messages, userMsg, { role: "model", parts: [{ text: "" }] }];
        setMessages(updated);
        const placeholderIndex = updated.length - 1;

        // take previous chats only (exclude the message we just added)
        const prevChats = updated.slice(0, -1);
        const context = prevChats.slice(-8); // last 4 pairs
        console.log("sending context to AI", context, "current user message", userMsg);

        setIsThinking(true);
        try {
            const res = await fetch(`${axiosClient.defaults.baseURL}/ai/chat`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    context,
                    message: userMsg.parts[0].text,
                    title: problem.title,
                    description: problem.description,
                    testCases: problem.visibleTestCases,
                    startCode: problem.startCode,
                }),
            });

            if (!res.body) {
                throw new Error('No response body');
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let accumulated = "";

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                if (value) {
                    const chunk = decoder.decode(value);
                    accumulated += chunk;
                    // update the placeholder message in one block
                    setMessages(prev => {
                        const copy = [...prev];
                        copy[placeholderIndex] = { role: "model", parts: [{ text: accumulated }] };
                        return copy;
                    });
                }
            }

        } catch (err) {
            console.error("API Error : " + err);
            setMessages(prev => {
                const copy = [...prev];
                copy[placeholderIndex] = { role: "model", parts: [{ text: "Sorry, something went wrong. Please try again later." }] };
                return copy;
            });
        } finally {
            setIsThinking(false);
        }
    }


    return (
        <>
            <h1 className="text-xl font-bold text-indigo-600 mb-3">Chat With AI</h1>
            <div className="border border-gray-300 rounded-lg p-4 mb-3 space-y-3 h-96 overflow-y-auto">

                {/* <div className="chat chat-start ">
                    <div className="chat-bubble chat-bubble-primary">What kind of nonsense is this</div>
                </div> */}
                
                
                {/* <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-success">You have been given a great honor.</div>
                </div> */}

                {messages.map((msg,index)=>(
                    <div key={index} className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}>
                        <div className={`chat-bubble ${msg.role === "user" ?   "chat-bubble-success text-white" :"chat-bubble-primary"}`}>                        
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({node, inline, className, children, ...props}){
                                        const match = /language-(\w+)/.exec(className || "");
                                        return !inline && match ? (
                                            <pre className="bg-gray-900 text-green-200 rounded p-2 overflow-auto">
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            </pre>
                                        ) : (
                                            <code className={className} {...props}>{children}</code>
                                        );
                                    }
                                }}
                            >
                                {msg.parts[0].text}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}

                {isThinking && (
                    <div className="chat chat-start">
                        <div className="chat-bubble chat-bubble-primary">
                            <span className="loading loading-dots"></span>
                        </div>
                    </div>
                )}

                <div ref={messageEndRef} />
                

            </div>
            <form action="" className="flex gap-2" onSubmit={handleSubmit(formSubmit)}>
                <input type="text" placeholder="Type your message here..." className="input input-bordered w-full bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 text-gray-700 px-3 py-1  text-[14px]  font-medium" {...register("message",{required:true , minLength:3})} />
                <button type="submit" className="btn btn-primary" disabled={errors.message ? true : false}><Send className="w-5 h-5"/></button>
            </form>
        </>
    )
}