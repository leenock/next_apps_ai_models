"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatModel: React.FC = () => {
  const [currentChat, setCurrentChat] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<{ id: number; messages: Message[] }[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedChats = localStorage.getItem("chatHistory");
    if (savedChats) {
      setChatHistory(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo(0, chatContainerRef.current.scrollHeight);
    }
  }, [currentChat]);

  const saveChat = () => {
    if (currentChat.length === 0) return;
    const newChat = { id: Date.now(), messages: currentChat };
    const updatedHistory = [...chatHistory, newChat];
    setChatHistory(updatedHistory);
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    setCurrentChat([]);
    setSelectedChatId(null);
  };

  const loadChat = (id: number) => {
    const selectedChat = chatHistory.find(chat => chat.id === id);
    if (selectedChat) {
      setCurrentChat(selectedChat.messages);
      setSelectedChatId(id);
    }
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  };

  const formatMessage = (text: string, role: "user" | "assistant"): string => {
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italics
      .replace(/\n/g, "<br />") // Line breaks
      .replace(/\+ (.*?)<br \/>/g, "✅ $1<br />") // Bullet points with checkmarks
      .replace(/- (.*?)<br \/>/g, "🔹 $1<br />") // Alternative bullet style
      .replace(/<\/li><br \/>/g, "</li>") // Fix extra line breaks in lists
      .replace(/<li>/g, "<ul><li>") // Wrap list items in <ul>
      .replace(/<\/li>(?!.*<\/li>)/g, "</li></ul>"); // Close the list at the end

    return role === "user" ? `🧑‍💬 ${formattedText}` : `🤖 ${formattedText}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedChat = [...currentChat, userMessage];
    setCurrentChat(updatedChat);
    setInput("");
    setIsLoading(true);
// https://e9f8-197-155-73-18.ngrok-free.app/v1/chat/completions
//http://127.0.0.1:1234/v1/chat/completions
    try {
      const response = await fetch(" https://20d2-197-155-73-18.ngrok-free.app/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.2-1b-instruct",
          messages: updatedChat,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const aiMessage: Message = { role: "assistant", content: data.choices[0].message.content };
      setCurrentChat([...updatedChat, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setCurrentChat([...updatedChat, { role: "assistant", content: "❌ Sorry, an error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-animated cyber-grid py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 neon-text glitch-effect" data-text="Next-Gen Model Exploration">
          Next-Gen Model Exploration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          <div className="w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700 flex flex-col">
            <h2 className="text-1xl font-bold text-center mb-12 neon-text glitch-effect text-white">
              Experience AI-powered conversations with the LLaMA model, seamlessly integrated from LM Studio into a Next.js app.
            </h2>
            <div className="bg-black text-white text-center text-lg font-semibold p-4">Chat with Llama-3.2-1b 🤖</div>
            <div ref={chatContainerRef} className="overflow-y-auto p-4 space-y-4 h-[calc(100vh-250px)] no-scrollbar">
              {currentChat.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-4 rounded-lg max-w-[80%] ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"} shadow`}>
                    <div className="text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(message.content, message.role),
                    }}/>
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><div className="p-3 rounded-lg bg-gray-500 text-gray-300">⏳ Loading...</div></div>}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 flex gap-2 flex-wrap">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 p-3 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type a message..." />
              <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Send 🚀</button>
            </form>
            <div className="p-4 border-t border-gray-700 flex justify-between">
              <button onClick={saveChat} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Save Chat 💾</button>
              <button onClick={() => setCurrentChat([])} className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">New Chat ➕</button>
              <button onClick={clearHistory} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Clear History 🗑️</button>
            </div>
            <div className="p-4 border-t border-gray-700">
              <h3 className="text-white text-lg font-semibold">Chat History</h3>
              <ul className="space-y-2 mt-2">
                {chatHistory.map((chat) => (
                  <li key={chat.id} className="text-blue-400 cursor-pointer hover:underline" onClick={() => loadChat(chat.id)}>
                    Chat {new Date(chat.id).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatModel;
