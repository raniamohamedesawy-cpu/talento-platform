import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SkillBadge } from "../SkillBadge";
import { Search, Send, MoreVertical, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Message, Conversation } from "../../types";
import { useApp } from "../../context/AppContext";
import { getStoredUser } from "../../api/authApi";
import { useWebSocket } from "../../hooks/useWebSocket";

export function Chat() {
  const { conversations, setConversations } = useApp();
  const authUser = getStoredUser();
  const { messages: wsMessages, send } = useWebSocket(authUser?.id);
  const [selectedId, setSelectedId] = useState<string | null>(conversations[0]?.id ?? null);
  const [newMessage, setNewMessage] = useState("");
  const [chatSearch, setChatSearch] = useState("");
  const [showList, setShowList] = useState(true); // mobile: show list or chat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === selectedId) ?? conversations[0];
  const messages = active?.messages ?? [];

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(chatSearch.toLowerCase()) ||
    c.skills.some((s) => s.toLowerCase().includes(chatSearch.toLowerCase()))
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, wsMessages]);

  useEffect(() => {
    if (!wsMessages.length || !selectedId) return;
    const last = wsMessages[wsMessages.length - 1];
    const content =
      typeof last === "string"
        ? last
        : String((last as { content?: string }).content ?? JSON.stringify(last));
    const msg: Message = {
      id: `ws-${Date.now()}`,
      sender: "Partner",
      content,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSelf: false,
    };
    setConversations(
      conversations.map((c) =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, msg], lastMessage: content, time: "now" }
          : c
      )
    );
  }, [wsMessages]);

  const selectConversation = (id: string) => {
    setSelectedId(id);
    setShowList(false); // mobile: switch to chat view
  };

  const sendMessage = () => {
    const text = newMessage.trim();
    if (!text || !selectedId) return;

    send({
      conversationId: Number(selectedId) || 1,
      content: text,
    });

    const msg: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSelf: true,
    };
    setConversations(
      conversations.map((c) =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, msg], lastMessage: text, time: "now", unread: 0 }
          : c
      )
    );
    setNewMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-[var(--background)]">
      {/* Conversation list — hidden on mobile when a chat is open */}
      <div
        className={`
          w-full md:w-80 border-r border-[var(--border)] bg-white dark:bg-[var(--navy-light)] flex flex-col flex-shrink-0
          ${!showList ? "hidden md:flex" : "flex"}
        `}
      >
        {/* Header */}
        <div className="p-5 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold text-[#1F2937] dark:text-white mb-4 tracking-tight">
            Messages
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <Input
              type="search"
              placeholder="Search conversations..."
              className="pl-9 text-sm font-medium bg-[#F3F4F6] dark:bg-[var(--navy)] border-0 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-0 text-[#1F2937] dark:text-white placeholder:text-[#9CA3AF]"
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <p className="p-4 text-sm font-medium text-[#6B7280] dark:text-[#D1D5DB] text-center">
              No conversations found
            </p>
          ) : (
            filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                className={`w-full p-4 flex gap-3 border-b border-[#E5E7EB] dark:border-[var(--border)] hover:bg-[#F9FAFB] dark:hover:bg-[var(--navy)] transition-colors text-left ${
                  selectedId === conv.id
                    ? "bg-[#F3F4F6] dark:bg-[var(--navy)]"
                    : ""
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white dark:text-white flex items-center justify-center font-bold text-sm">
                    {conv.avatar}
                  </div>
                  {conv.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                      {conv.unread}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Name and time */}
                  <div className="flex items-start justify-between mb-1.5 gap-2">
                    <h4 className="font-semibold text-[#1F2937] dark:text-white text-sm truncate">
                      {conv.name}
                    </h4>
                    <span className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF] flex-shrink-0">
                      {conv.time}
                    </span>
                  </div>

                  {/* Last message */}
                  <p className="text-sm text-[#6B7280] dark:text-[#D1D5DB] truncate mb-2.5 leading-[1.4]">
                    {conv.lastMessage}
                  </p>

                  {/* Skills */}
                  <div className="flex gap-1.5">
                    {conv.skills.slice(0, 2).map((skill, i) => (
                      <SkillBadge
                        key={skill}
                        skill={skill}
                        type={i === 0 ? "offered" : "wanted"}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat window — full width on mobile when open */}
      <div
        className={`
          flex-1 flex flex-col bg-white dark:bg-[var(--navy-dark)] min-w-0
          ${showList ? "hidden md:flex" : "flex"}
        `}
      >
        {active ? (
          <>
            {/* Chat header */}
            <div className="p-4 md:p-5 border-b border-[#E5E7EB] dark:border-[var(--border)] flex items-center justify-between flex-shrink-0 bg-white dark:bg-[var(--navy-light)]">
              <div className="flex items-center gap-3 min-w-0">
                {/* Back button on mobile */}
                <button
                  className="md:hidden text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#1F2937] dark:hover:text-white transition-colors"
                  onClick={() => setShowList(true)}
                  aria-label="Back to conversations"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white dark:text-white flex items-center justify-center font-bold flex-shrink-0">
                  {active.avatar}
                </div>

                {/* Name and skills */}
                <div className="min-w-0">
                  <h3 className="font-semibold text-[#1F2937] dark:text-white text-base truncate">
                    {active.name}
                  </h3>
                  <div className="flex gap-1.5 mt-1">
                    {active.skills.map((skill, i) => (
                      <SkillBadge
                        key={skill}
                        skill={skill}
                        type={i === 0 ? "offered" : "wanted"}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#1F2937] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[var(--navy)]"
                aria-label="More options"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[var(--background)] dark:bg-[var(--navy-dark)]">
              <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-[#9CA3AF] dark:text-[#D1D5DB]">
                    <p className="text-sm font-medium">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSelf ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] md:max-w-md rounded-xl px-4 py-3 shadow-sm transition-all ${
                          message.isSelf
                            ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white shadow-md"
                            : "bg-white dark:bg-[var(--navy-light)] text-[#111827] dark:text-white border border-[#E5E7EB] dark:border-[var(--border)]"
                        }`}
                      >
                        {/* Message content - DARK TEXT FOR RECEIVED MESSAGES */}
                        <p className={`text-sm font-medium leading-[1.5] break-words ${
                          message.isSelf ? "text-white" : "text-[#111827] dark:text-white"
                        }`}>
                          {message.content}
                        </p>

                        {/* Message time */}
                        <p
                          className={`text-xs font-semibold mt-2 ${
                            message.isSelf
                              ? "text-white/80"
                              : "text-[#6B7280] dark:text-[#D1D5DB]"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message input */}
            <div className="p-4 md:p-5 border-t border-[#E5E7EB] dark:border-[var(--border)] flex-shrink-0 bg-white dark:bg-[var(--navy-light)]">
              <div className="max-w-3xl mx-auto flex gap-3">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 text-sm font-medium bg-[#F3F4F6] dark:bg-[var(--navy)] border-0 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-0 dark:focus:ring-offset-[var(--navy-light)] placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280] text-[#1F2937] dark:text-white"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  aria-label="Message input"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:shadow-lg hover:shadow-[var(--primary)]/30 text-white font-semibold disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#9CA3AF] dark:text-[#D1D5DB]">
            <p className="text-center font-medium">
              <span className="block text-lg mb-1">Select a conversation</span>
              <span className="text-sm">to start chatting</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
