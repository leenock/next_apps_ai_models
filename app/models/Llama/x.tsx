"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatHistory {
  title: string;
  history: Message[];
}

const ChatModel: React.FC = () => {
  const [chats, setChats] = useState<ChatHistory[]>([]);
  const [currentChat, setCurrentChat] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo(
        0,
        chatContainerRef.current.scrollHeight
      );
    }
  }, [currentChat]);

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

    try {
      const response = await fetch(
        "http://127.0.0.1:1234/v1/chat/completions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama-3.2-1b-instruct",
            messages: updatedChat,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const aiMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
      };
      setCurrentChat([...updatedChat, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setCurrentChat([
        ...updatedChat,
        { role: "assistant", content: "❌ Sorry, an error occurred." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    if (currentChat.length > 0) {
      const firstQuestion =
        currentChat.find((msg) => msg.role === "user")?.content ||
        "Untitled Chat";
      setChats([...chats, { title: firstQuestion, history: currentChat }]);
    }
    setCurrentChat([]);
  };

  const loadChat = (chatHistory: Message[]) => {
    setCurrentChat(chatHistory);
  };

  const deleteChat = (index: number) => {
    setChats(chats.filter((_, i) => i !== index));
  };

  return (
    <section className="bg-animated cyber-grid py-20 relative overflow-hidden w-full">
  <div className="container mx-auto px-4">
    <h2
      className="text-3xl font-bold text-center mb-12 neon-text glitch-effect"
      data-text="Next-Gen Model Exploration"
    >
      Llama Model AI Text Completions
    </h2>

    {/* Mobile Layout: Add Chat Button Above */}
    <div className="sm:hidden flex justify-center mb-4">
      <button
        onClick={handleNewChat}
        className="p-3 bg-blue-600 text-white rounded-lg w-full max-w-md"
      >
        ➕ New Chat
      </button>
    </div>

    {/* Two-Column Layout for Desktop, Stacked on Mobile */}
    <div className="flex flex-col sm:flex-row h-screen bg-gray-900 text-white gap-4 w-full">
      
      {/* Sidebar - Chat History */}
      <div className="sm:w-64 bg-gray-800 p-4 flex flex-col sm:h-auto h-[40vh] sm:max-h-full overflow-hidden">
        {/* Add Chat Button (Visible Only on Desktop) */}
        <button
          onClick={handleNewChat}
          className="hidden sm:flex mb-4 p-2 bg-blue-600 rounded items-center justify-center w-full"
        >
          <FaPlus />
        </button>
        <div className="flex flex-col space-y-2 overflow-y-auto flex-1">
          {chats.map((chat, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-700 rounded p-2 hover:bg-gray-600"
            >
              <button
                onClick={() => loadChat(chat.history)}
                className="text-sm text-left flex-1 truncate"
              >
                {chat.title.length > 20 ? chat.title.substring(0, 20) + "..." : chat.title}
              </button>
              <button
                onClick={() => deleteChat(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-3xl bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700 flex flex-col">
          <div className="bg-black text-white text-center text-lg font-semibold p-4">
            Chat with Llama-3.2-1b 🤖
          </div>
          <div
            ref={chatContainerRef}
            className="overflow-y-auto p-4 space-y-4 h-[calc(100vh-180px)] no-scrollbar"
          >
            {currentChat.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-4 rounded-lg max-w-[80%] ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  } shadow`}
                >
                  <div
                    className="text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(message.content, message.role),
                    }}
                  />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg bg-gray-500 text-gray-300">
                  ⏳ Thinking...
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-gray-700 flex gap-2 flex-wrap"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Send 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>


  );
};

export default ChatModel;
