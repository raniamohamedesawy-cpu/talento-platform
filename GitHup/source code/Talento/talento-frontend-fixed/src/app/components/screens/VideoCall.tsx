import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  Monitor,
  MessageSquare,
  Users,
  MoreVertical,
} from "lucide-react";
import { Textarea } from "../ui/textarea";

export function VideoCall() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");

  const chatMessages = [
    { sender: "Sarah Chen", message: "Hi! Ready to start?", time: "2:00 PM" },
    { sender: "You", message: "Yes, let's begin!", time: "2:01 PM" },
    {
      sender: "Sarah Chen",
      message: "I'll share my screen to show you the code",
      time: "2:02 PM",
    },
  ];

  return (
    <div className="h-screen bg-[var(--navy)] flex flex-col">
      <div className="flex-1 flex gap-4 p-4">
        <div className="flex-1 flex flex-col gap-4">
          <Card className="flex-1 bg-black relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-[var(--primary)] text-[var(--navy)] flex items-center justify-center text-4xl font-semibold mb-4 mx-auto">
                  SC
                </div>
                <h3 className="text-white font-medium text-lg">Sarah Chen</h3>
                <p className="text-white/60 text-sm">Teaching: Python Basics</p>
              </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-black/50 border-white/20 text-white hover:bg-black/70"
              >
                <Monitor className="h-4 w-4 mr-2" />
                Share Screen
              </Button>
            </div>

            <div className="absolute bottom-4 right-4 w-48 h-36 rounded-lg overflow-hidden border-2 border-white/30 bg-gray-800">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--navy)] text-[var(--primary)] flex items-center justify-center text-xl font-semibold">
                  JD
                </div>
              </div>
            </div>
          </Card>

          <div className="bg-[var(--navy-light)] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <Button
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className={
                    isMuted
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-[var(--navy)] hover:bg-[var(--navy-light)] border border-white/20"
                  }
                >
                  {isMuted ? (
                    <MicOff className="h-5 w-5 text-white" />
                  ) : (
                    <Mic className="h-5 w-5 text-white" />
                  )}
                </Button>

                <Button
                  size="icon"
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={
                    isVideoOff
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-[var(--navy)] hover:bg-[var(--navy-light)] border border-white/20"
                  }
                >
                  {isVideoOff ? (
                    <VideoOff className="h-5 w-5 text-white" />
                  ) : (
                    <Video className="h-5 w-5 text-white" />
                  )}
                </Button>

                <Button
                  size="icon"
                  onClick={() => setShowChat(!showChat)}
                  className="bg-[var(--navy)] hover:bg-[var(--navy-light)] border border-white/20"
                >
                  <MessageSquare className="h-5 w-5 text-white" />
                </Button>

                <Button
                  size="icon"
                  className="bg-[var(--navy)] hover:bg-[var(--navy-light)] border border-white/20"
                >
                  <MoreVertical className="h-5 w-5 text-white" />
                </Button>
              </div>

              <div className="text-white ml-4">
                <p className="text-sm font-medium">Session Time: 23:45</p>
                <p className="text-xs text-white/60">Python Basics with Sarah Chen</p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Phone className="h-5 w-5 mr-2" />
              End Call
            </Button>
          </div>
        </div>

        {showChat && (
          <Card className="w-80 flex flex-col">
            <div className="p-4 border-b border-[var(--border)]">
              <h3 className="font-medium">Session Chat</h3>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    msg.sender === "You" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-2 ${
                      msg.sender === "You"
                        ? "bg-[var(--navy)] text-white"
                        : "bg-[var(--secondary)]"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)] mt-1">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-[var(--border)]">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="resize-none h-10"
                />
                <Button size="sm">Send</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
