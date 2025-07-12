import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface UserStats {
  balance: number;
  totalWins: number;
  totalLosses: number;
  gamesPlayed: number;
  vipLevel: number;
  vipProgress: number;
}

export const UserProfile = () => {
  const [user] = useState({
    name: "Иван Иванов",
    email: "ivan@example.com",
    avatar: "II",
    joinDate: "2024-01-15",
    stats: {
      balance: 125000,
      totalWins: 450000,
      totalLosses: 380000,
      gamesPlayed: 1247,
      vipLevel: 3,
      vipProgress: 65,
    } as UserStats,
  });

  const [gameHistory] = useState([
    {
      id: 1,
      game: 'Слот "Золотой дракон"',
      bet: 1000,
      win: 5000,
      time: "14:30",
      status: "win",
    },
    {
      id: 2,
      game: "Рулетка",
      bet: 2500,
      win: 0,
      time: "14:15",
      status: "loss",
    },
    {
      id: 3,
      game: "Блэкджек",
      bet: 1500,
      win: 3000,
      time: "14:00",
      status: "win",
    },
    {
      id: 4,
      game: 'Слот "Фрукты"',
      bet: 500,
      win: 0,
      time: "13:45",
      status: "loss",
    },
    {
      id: 5,
      game: "Покер турнир",
      bet: 10000,
      win: 25000,
      time: "13:00",
      status: "win",
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getVipLevelName = (level: number) => {
    const levels = [
      "Новичок",
      "Бронза",
      "Серебро",
      "Золото",
      "Платина",
      "Алмаз",
    ];
    return levels[level] || "VIP";
  };

  return (
    <div className="min-h-screen bg-casino-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="bg-gray-900 border-gold-400/30 mb-6">
          <CardHeader>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full bg-gold-400 flex items-center justify-center text-2xl font-bold text-casino-black">
                {user.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                  <Badge className="bg-gold-400 text-casino-black">
                    VIP {getVipLevelName(user.stats.vipLevel)}
                  </Badge>
                </div>
                <p className="text-gray-400 mb-2">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Участник с{" "}
                  {new Date(user.joinDate).toLocaleDateString("ru-RU")}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gold-400 mb-1">
                  {formatCurrency(user.stats.balance)}
                </div>
                <p className="text-sm text-gray-400">Текущий баланс</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* VIP Progress */}
        <Card className="bg-gray-900 border-gold-400/30 mb-6">
          <CardHeader>
            <CardTitle className="text-gold-400 flex items-center">
              <Icon name="Crown" size={24} className="mr-2" />
              VIP Прогресс
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  {getVipLevelName(user.stats.vipLevel)} уровень
                </span>
                <span className="text-gold-400">
                  {user.stats.vipProgress}% до следующего уровня
                </span>
              </div>
              <Progress value={user.stats.vipProgress} className="h-3" />
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    {user.stats.gamesPlayed}
                  </div>
                  <div className="text-sm text-gray-400">Игр сыграно</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">
                    {formatCurrency(user.stats.totalWins)}
                  </div>
                  <div className="text-sm text-gray-400">Общий выигрыш</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-400">
                    {formatCurrency(user.stats.totalLosses)}
                  </div>
                  <div className="text-sm text-gray-400">Общий проигрыш</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gold-400">
                    {formatCurrency(
                      user.stats.totalWins - user.stats.totalLosses,
                    )}
                  </div>
                  <div className="text-sm text-gray-400">Чистая прибыль</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              История игр
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Транзакции
            </TabsTrigger>
            <TabsTrigger
              value="bonuses"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Бонусы
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-white">История игр</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gameHistory.map((game) => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            game.status === "win"
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                        />
                        <div>
                          <div className="text-white font-medium">
                            {game.game}
                          </div>
                          <div className="text-sm text-gray-400">
                            {game.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">
                          Ставка: {formatCurrency(game.bet)}
                        </div>
                        <div
                          className={`text-sm font-semibold ${
                            game.status === "win"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {game.status === "win"
                            ? `+${formatCurrency(game.win)}`
                            : "Проигрыш"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-white">История транзакций</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Icon
                        name="ArrowUpRight"
                        size={20}
                        className="text-green-400"
                      />
                      <div>
                        <div className="text-white font-medium">
                          Пополнение через карту
                        </div>
                        <div className="text-sm text-gray-400">
                          Сегодня, 15:20
                        </div>
                      </div>
                    </div>
                    <div className="text-green-400 font-semibold">+50,000₽</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Icon
                        name="ArrowDownLeft"
                        size={20}
                        className="text-red-400"
                      />
                      <div>
                        <div className="text-white font-medium">
                          Вывод на карту
                        </div>
                        <div className="text-sm text-gray-400">
                          Вчера, 18:45
                        </div>
                      </div>
                    </div>
                    <div className="text-red-400 font-semibold">-25,000₽</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bonuses">
            <Card className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-white">Активные бонусы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-gold-400/20 to-gold-600/10 rounded-lg border border-gold-400/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gold-400 font-semibold">
                        Приветственный бонус
                      </h3>
                      <Badge className="bg-green-600 text-white">Активен</Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      100% до 100,000₽ + 50 фриспинов
                    </p>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-gray-400 mt-1">
                      Осталось отыграть: 37,500₽
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-white">Настройки аккаунта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-gold-400/30 text-white hover:bg-gold-400 hover:text-black"
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    Изменить профиль
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gold-400/30 text-white hover:bg-gold-400 hover:text-black"
                  >
                    <Icon name="Lock" size={16} className="mr-2" />
                    Сменить пароль
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gold-400/30 text-white hover:bg-gold-400 hover:text-black"
                  >
                    <Icon name="CreditCard" size={16} className="mr-2" />
                    Способы оплаты
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gold-400/30 text-white hover:bg-gold-400 hover:text-black"
                  >
                    <Icon name="Shield" size={16} className="mr-2" />
                    Безопасность
                  </Button>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-white font-semibold mb-4">
                    Лимиты ответственной игры
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        Дневной лимит депозита
                      </span>
                      <span className="text-gold-400">50,000₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Время сессии</span>
                      <span className="text-gold-400">4 часа</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gold-400/30 text-gold-400"
                    >
                      Изменить лимиты
                    </Button>
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
