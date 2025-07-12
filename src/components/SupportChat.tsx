import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  sender: "user" | "support";
  text: string;
  timestamp: Date;
  type?: "text" | "system";
}

interface Notification {
  id: string;
  type: "bonus" | "tournament" | "payment" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "support",
      text: "Добро пожаловать в службу поддержки Royal Casino! Как я могу вам помочь?",
      timestamp: new Date(Date.now() - 60000),
      type: "text",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Имитация ответа поддержки
    setTimeout(() => {
      const responses = [
        "Спасибо за ваш вопрос! Я проверю эту информацию для вас.",
        "Понимаю вашу ситуацию. Давайте разберемся с этим вместе.",
        "Это отличный вопрос! Позвольте мне найти для вас подробную информацию.",
        "Я передам ваш запрос специалисту. Ответ поступит в течение 5 минут.",
        "Благодарю за обращение! Проверяю ваш аккаунт...",
      ];

      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "support",
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: "text",
      };

      setMessages((prev) => [...prev, supportMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gold-400 text-casino-black hover:bg-gold-500 shadow-lg z-50"
          size="icon"
        >
          <Icon name="MessageCircle" size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[600px] bg-gray-900 border-gold-400/30 p-0">
        <DialogHeader className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center">
                <Icon
                  name="Headphones"
                  size={20}
                  className="text-casino-black"
                />
              </div>
              <div>
                <DialogTitle className="text-gold-400">Поддержка</DialogTitle>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-400"}`}
                  />
                  <span className="text-sm text-gray-400">
                    {isOnline ? "Онлайн" : "Оффлайн"}
                  </span>
                </div>
              </div>
            </div>
            <Badge className="bg-green-600 text-white">24/7</Badge>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-[500px]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-gold-400 text-casino-black"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    <div className="text-sm">{message.text}</div>
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-casino-black/70"
                          : "text-gray-400"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-white p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="bg-gray-800 border-gray-600 text-white"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button
                onClick={sendMessage}
                className="bg-gold-400 text-casino-black hover:bg-gold-500"
                disabled={!newMessage.trim()}
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>

            <div className="flex justify-center space-x-4 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:bg-gray-800"
                onClick={() => setNewMessage("Проблема с депозитом")}
              >
                Депозит
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:bg-gray-800"
                onClick={() => setNewMessage("Вопрос по бонусам")}
              >
                Бонусы
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:bg-gray-800"
                onClick={() => setNewMessage("Техническая проблема")}
              >
                Техподдержка
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Компонент уведомлений
export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "bonus",
      title: "Новый бонус!",
      message: "Получите 50 фриспинов за депозит от 5000₽",
      timestamp: new Date(Date.now() - 300000),
      read: false,
    },
    {
      id: "2",
      type: "tournament",
      title: "Турнир начался",
      message: "Слот Мания уже стартовал! Присоединяйтесь!",
      timestamp: new Date(Date.now() - 600000),
      read: false,
    },
    {
      id: "3",
      type: "payment",
      title: "Пополнение счета",
      message: "На ваш счет зачислено 10,000₽",
      timestamp: new Date(Date.now() - 1800000),
      read: true,
    },
    {
      id: "4",
      type: "system",
      title: "Обновление системы",
      message: "Плановые технические работы завтра с 03:00 до 05:00",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "bonus":
        return "Gift";
      case "tournament":
        return "Trophy";
      case "payment":
        return "CreditCard";
      case "system":
        return "Settings";
      default:
        return "Bell";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "bonus":
        return "text-yellow-400";
      case "tournament":
        return "text-gold-400";
      case "payment":
        return "text-green-400";
      case "system":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Icon name="Bell" size={20} className="text-gold-400" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-600 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-gray-900 border-gold-400/30">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-gold-400">Уведомления</DialogTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-gold-400 hover:bg-gold-400/10"
              >
                Прочитать все
              </Button>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[400px]">
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Icon
                  name="Bell"
                  size={48}
                  className="mx-auto mb-2 opacity-50"
                />
                <p>Нет новых уведомлений</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    notification.read
                      ? "bg-gray-800 border-gray-700"
                      : "bg-gray-800/50 border-gold-400/30 hover:bg-gray-800"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <Icon
                      name={getNotificationIcon(notification.type) as any}
                      size={20}
                      className={getNotificationColor(notification.type)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4
                          className={`font-medium ${notification.read ? "text-gray-300" : "text-white"}`}
                        >
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-gold-400 rounded-full" />
                        )}
                      </div>
                      <p
                        className={`text-sm mt-1 ${notification.read ? "text-gray-500" : "text-gray-400"}`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {notification.timestamp.toLocaleString("ru-RU")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
