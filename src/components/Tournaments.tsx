import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface Tournament {
  id: string;
  name: string;
  type: "slots" | "poker" | "roulette" | "blackjack";
  status: "active" | "upcoming" | "finished";
  prize: number;
  entryFee: number;
  participants: number;
  maxParticipants: number;
  startTime: string;
  endTime: string;
  description: string;
}

interface Leaderboard {
  rank: number;
  player: string;
  score: number;
  prize: number;
}

export const Tournaments = () => {
  const [tournaments] = useState<Tournament[]>([
    {
      id: "1",
      name: "Слот Мания",
      type: "slots",
      status: "active",
      prize: 500000,
      entryFee: 1000,
      participants: 234,
      maxParticipants: 500,
      startTime: "2024-07-12T10:00:00",
      endTime: "2024-07-12T22:00:00",
      description: "Турнир по слотам с огромными призами!",
    },
    {
      id: "2",
      name: "Покер Чемпионат",
      type: "poker",
      status: "upcoming",
      prize: 1000000,
      entryFee: 5000,
      participants: 89,
      maxParticipants: 200,
      startTime: "2024-07-13T19:00:00",
      endTime: "2024-07-14T03:00:00",
      description: "Техасский холдем турнир для профессионалов",
    },
    {
      id: "3",
      name: "Рулетка VIP",
      type: "roulette",
      status: "upcoming",
      prize: 750000,
      entryFee: 10000,
      participants: 12,
      maxParticipants: 50,
      startTime: "2024-07-14T20:00:00",
      endTime: "2024-07-15T02:00:00",
      description: "Эксклюзивный турнир для VIP игроков",
    },
    {
      id: "4",
      name: "Блэкджек Мастерс",
      type: "blackjack",
      status: "finished",
      prize: 300000,
      entryFee: 2000,
      participants: 150,
      maxParticipants: 150,
      startTime: "2024-07-11T15:00:00",
      endTime: "2024-07-11T23:00:00",
      description: "Завершенный турнир по блэкджеку",
    },
  ]);

  const [leaderboard] = useState<Leaderboard[]>([
    { rank: 1, player: "ProGamer2024", score: 95420, prize: 150000 },
    { rank: 2, player: "LuckyWinner", score: 87360, prize: 100000 },
    { rank: 3, player: "SlotMaster", score: 73450, prize: 75000 },
    { rank: 4, player: "BigBettor", score: 68920, prize: 50000 },
    { rank: 5, player: "CasinoKing", score: 62180, prize: 25000 },
    { rank: 6, player: "RoyalPlayer", score: 58430, prize: 15000 },
    { rank: 7, player: "GoldRush", score: 54290, prize: 10000 },
    { rank: 8, player: "WinStreak", score: 49870, prize: 5000 },
  ]);

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newTimeLeft: { [key: string]: string } = {};

      tournaments.forEach((tournament) => {
        const endTime = new Date(tournament.endTime);
        const startTime = new Date(tournament.startTime);

        if (tournament.status === "active") {
          const diff = endTime.getTime() - now.getTime();
          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            newTimeLeft[tournament.id] = `${hours}ч ${minutes}м`;
          } else {
            newTimeLeft[tournament.id] = "Завершен";
          }
        } else if (tournament.status === "upcoming") {
          const diff = startTime.getTime() - now.getTime();
          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            newTimeLeft[tournament.id] = `${hours}ч ${minutes}м до старта`;
          } else {
            newTimeLeft[tournament.id] = "Начался";
          }
        }
      });

      setTimeLeft(newTimeLeft);
    }, 60000);

    return () => clearInterval(interval);
  }, [tournaments]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "slots":
        return "Zap";
      case "poker":
        return "Spade";
      case "roulette":
        return "RotateCw";
      case "blackjack":
        return "Heart";
      default:
        return "Trophy";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "upcoming":
        return "bg-blue-600";
      case "finished":
        return "bg-gray-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активный";
      case "upcoming":
        return "Скоро";
      case "finished":
        return "Завершен";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-casino-black p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gray-900 border-gold-400/30 mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gold-400">
              Турниры и соревнования
            </CardTitle>
            <p className="text-gray-400 text-lg">
              Участвуйте в захватывающих турнирах и выигрывайте крупные призы
            </p>
          </CardHeader>
        </Card>

        <Tabs defaultValue="tournaments" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger
              value="tournaments"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Турниры
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Таблица лидеров
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              История участия
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tournaments">
            <div className="grid lg:grid-cols-2 gap-6">
              {tournaments.map((tournament) => (
                <Card
                  key={tournament.id}
                  className="bg-gray-900 border-gold-400/30 hover:border-gold-400 transition-all"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center">
                          <Icon
                            name={getTypeIcon(tournament.type) as any}
                            size={24}
                            className="text-casino-black"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-gold-400 text-xl">
                            {tournament.name}
                          </CardTitle>
                          <p className="text-gray-400 text-sm">
                            {tournament.description}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`${getStatusColor(tournament.status)} text-white`}
                      >
                        {getStatusText(tournament.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400">
                          Призовой фонд
                        </div>
                        <div className="text-xl font-bold text-gold-400">
                          {formatCurrency(tournament.prize)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Взнос</div>
                        <div className="text-lg font-semibold text-white">
                          {formatCurrency(tournament.entryFee)}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Участников</span>
                        <span>
                          {tournament.participants}/{tournament.maxParticipants}
                        </span>
                      </div>
                      <Progress
                        value={
                          (tournament.participants /
                            tournament.maxParticipants) *
                          100
                        }
                        className="h-2"
                      />
                    </div>

                    {timeLeft[tournament.id] && (
                      <div className="text-center">
                        <div className="text-sm text-gray-400">
                          {tournament.status === "active"
                            ? "До окончания"
                            : "До начала"}
                        </div>
                        <div className="text-lg font-semibold text-gold-400">
                          {timeLeft[tournament.id]}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Начало:</span>
                        <span className="text-white">
                          {new Date(tournament.startTime).toLocaleString(
                            "ru-RU",
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Окончание:</span>
                        <span className="text-white">
                          {new Date(tournament.endTime).toLocaleString("ru-RU")}
                        </span>
                      </div>
                    </div>

                    <Button
                      className={`w-full ${
                        tournament.status === "active"
                          ? "bg-gold-400 text-casino-black hover:bg-gold-500"
                          : tournament.status === "upcoming"
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-600 text-gray-300 cursor-not-allowed"
                      }`}
                      disabled={tournament.status === "finished"}
                    >
                      {tournament.status === "active" && "Участвовать"}
                      {tournament.status === "upcoming" && "Зарегистрироваться"}
                      {tournament.status === "finished" && "Завершен"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-gold-400 flex items-center">
                  <Icon name="Trophy" size={24} className="mr-2" />
                  Лидеры турнира "Слот Мания"
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        entry.rank <= 3
                          ? "bg-gradient-to-r from-gold-400/20 to-gold-600/10 border border-gold-400/30"
                          : "bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            entry.rank === 1
                              ? "bg-yellow-500 text-black"
                              : entry.rank === 2
                                ? "bg-gray-400 text-black"
                                : entry.rank === 3
                                  ? "bg-orange-600 text-white"
                                  : "bg-gray-600 text-white"
                          }`}
                        >
                          {entry.rank === 1
                            ? "🥇"
                            : entry.rank === 2
                              ? "🥈"
                              : entry.rank === 3
                                ? "🥉"
                                : entry.rank}
                        </div>
                        <div>
                          <div
                            className={`font-semibold ${entry.rank <= 3 ? "text-gold-400" : "text-white"}`}
                          >
                            {entry.player}
                          </div>
                          <div className="text-sm text-gray-400">
                            Счет: {entry.score.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-bold ${entry.rank <= 3 ? "text-gold-400" : "text-green-400"}`}
                        >
                          {formatCurrency(entry.prize)}
                        </div>
                        <div className="text-sm text-gray-400">Приз</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-gold-400">История участия</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Icon name="Trophy" size={20} className="text-gold-400" />
                      <div>
                        <div className="text-white font-medium">
                          Блэкджек Мастерс
                        </div>
                        <div className="text-sm text-gray-400">
                          11.07.2024 • 15 место из 150
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">
                        +5,000₽
                      </div>
                      <div className="text-sm text-gray-400">Приз</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Icon name="Zap" size={20} className="text-gold-400" />
                      <div>
                        <div className="text-white font-medium">
                          Слот Экспресс
                        </div>
                        <div className="text-sm text-gray-400">
                          09.07.2024 • 45 место из 200
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400">Без приза</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Icon
                        name="RotateCw"
                        size={20}
                        className="text-gold-400"
                      />
                      <div>
                        <div className="text-white font-medium">
                          Рулетка Чемпионат
                        </div>
                        <div className="text-sm text-gray-400">
                          05.07.2024 • 3 место из 100
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gold-400 font-semibold">
                        +25,000₽
                      </div>
                      <div className="text-sm text-gray-400">Приз</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
