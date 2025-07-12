import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  status: "active" | "blocked" | "vip";
  registrationDate: string;
  lastActivity: string;
  totalDeposits: number;
  totalWithdraws: number;
}

interface GameStats {
  name: string;
  players: number;
  revenue: number;
  rtp: number;
  status: "active" | "maintenance";
}

interface Transaction {
  id: string;
  user: string;
  type: "deposit" | "withdraw";
  amount: number;
  status: "pending" | "completed" | "failed";
  timestamp: string;
  method: string;
}

export const AdminPanel = () => {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Иван Иванов",
      email: "ivan@example.com",
      balance: 125000,
      status: "vip",
      registrationDate: "2024-01-15",
      lastActivity: "2024-07-12T14:30:00",
      totalDeposits: 500000,
      totalWithdraws: 375000,
    },
    {
      id: "2",
      name: "Петр Петров",
      email: "petr@example.com",
      balance: 45000,
      status: "active",
      registrationDate: "2024-03-22",
      lastActivity: "2024-07-12T13:15:00",
      totalDeposits: 150000,
      totalWithdraws: 105000,
    },
    {
      id: "3",
      name: "Анна Сидорова",
      email: "anna@example.com",
      balance: 0,
      status: "blocked",
      registrationDate: "2024-02-10",
      lastActivity: "2024-07-10T09:45:00",
      totalDeposits: 75000,
      totalWithdraws: 75000,
    },
  ]);

  const [gameStats] = useState<GameStats[]>([
    {
      name: "Слоты",
      players: 1247,
      revenue: 2340000,
      rtp: 96.5,
      status: "active",
    },
    {
      name: "Рулетка",
      players: 423,
      revenue: 890000,
      rtp: 97.3,
      status: "active",
    },
    {
      name: "Покер",
      players: 156,
      revenue: 450000,
      rtp: 98.1,
      status: "active",
    },
    {
      name: "Блэкджек",
      players: 234,
      revenue: 320000,
      rtp: 99.2,
      status: "maintenance",
    },
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      user: "ivan@example.com",
      type: "deposit",
      amount: 50000,
      status: "completed",
      timestamp: "2024-07-12T15:20:00",
      method: "Visa",
    },
    {
      id: "2",
      user: "petr@example.com",
      type: "withdraw",
      amount: 25000,
      status: "pending",
      timestamp: "2024-07-12T14:45:00",
      method: "МИР",
    },
    {
      id: "3",
      user: "anna@example.com",
      type: "deposit",
      amount: 10000,
      status: "failed",
      timestamp: "2024-07-12T13:30:00",
      method: "QIWI",
    },
  ]);

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    registrationEnabled: true,
    bonusesEnabled: true,
    vipProgramEnabled: true,
    maxDailyDeposit: 1000000,
    minWithdraw: 1000,
    maxWithdraw: 500000,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "blocked":
        return "bg-red-600";
      case "vip":
        return "bg-gold-500";
      case "pending":
        return "bg-yellow-600";
      case "completed":
        return "bg-green-600";
      case "failed":
        return "bg-red-600";
      case "maintenance":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активен";
      case "blocked":
        return "Заблокирован";
      case "vip":
        return "VIP";
      case "pending":
        return "В обработке";
      case "completed":
        return "Завершен";
      case "failed":
        return "Ошибка";
      case "maintenance":
        return "Обслуживание";
      default:
        return status;
    }
  };

  const totalRevenue = gameStats.reduce((sum, game) => sum + game.revenue, 0);
  const totalPlayers = gameStats.reduce((sum, game) => sum + game.players, 0);

  return (
    <div className="min-h-screen bg-casino-black p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-gray-900 border-gold-400/30 mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gold-400 flex items-center">
              <Icon name="Shield" size={32} className="mr-3" />
              Панель администратора
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gray-900 border-gold-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gold-400">
                    {formatCurrency(totalRevenue)}
                  </div>
                  <div className="text-sm text-gray-400">Общая выручка</div>
                </div>
                <Icon name="TrendingUp" size={24} className="text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gold-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gold-400">
                    {totalPlayers}
                  </div>
                  <div className="text-sm text-gray-400">Активных игроков</div>
                </div>
                <Icon name="Users" size={24} className="text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gold-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gold-400">
                    {users.length}
                  </div>
                  <div className="text-sm text-gray-400">
                    Всего пользователей
                  </div>
                </div>
                <Icon name="UserCheck" size={24} className="text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gold-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gold-400">97.2%</div>
                  <div className="text-sm text-gray-400">Средний RTP</div>
                </div>
                <Icon name="Target" size={24} className="text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Пользователи
            </TabsTrigger>
            <TabsTrigger
              value="games"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Игры
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Транзакции
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-gold-400">
                    Управление пользователями
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Поиск пользователя..."
                      className="bg-gray-800 border-gold-400/30 text-white w-64"
                    />
                    <Button
                      variant="outline"
                      className="border-gold-400/30 text-gold-400"
                    >
                      <Icon name="Search" size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center text-casino-black font-bold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {user.email}
                          </div>
                          <div className="text-xs text-gray-500">
                            Зарегистрирован:{" "}
                            {new Date(user.registrationDate).toLocaleDateString(
                              "ru-RU",
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            {formatCurrency(user.balance)}
                          </div>
                          <div className="text-sm text-gray-400">Баланс</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-semibold">
                            {formatCurrency(user.totalDeposits)}
                          </div>
                          <div className="text-sm text-gray-400">Депозиты</div>
                        </div>
                        <Badge
                          className={`${getStatusColor(user.status)} text-white`}
                        >
                          {getStatusText(user.status)}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gold-400/30 text-gold-400"
                          >
                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-400/30 text-red-400"
                          >
                            <Icon name="Ban" size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games">
            <Card className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-gold-400">Статистика игр</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {gameStats.map((game, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center text-casino-black font-bold">
                          {game.name[0]}
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {game.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {game.players} активных игроков
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="text-green-400 font-semibold">
                            {formatCurrency(game.revenue)}
                          </div>
                          <div className="text-sm text-gray-400">Выручка</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gold-400 font-semibold">
                            {game.rtp}%
                          </div>
                          <div className="text-sm text-gray-400">RTP</div>
                        </div>
                        <Badge
                          className={`${getStatusColor(game.status)} text-white`}
                        >
                          {getStatusText(game.status)}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gold-400/30 text-gold-400"
                        >
                          Настроить
                        </Button>
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
                <CardTitle className="text-gold-400">
                  Управление транзакциями
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Icon
                          name={
                            transaction.type === "deposit"
                              ? "ArrowDownLeft"
                              : "ArrowUpRight"
                          }
                          size={20}
                          className={
                            transaction.type === "deposit"
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        />
                        <div>
                          <div className="text-white font-medium">
                            {transaction.user}
                          </div>
                          <div className="text-sm text-gray-400">
                            {transaction.type === "deposit"
                              ? "Пополнение"
                              : "Вывод"}{" "}
                            • {transaction.method}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(transaction.timestamp).toLocaleString(
                              "ru-RU",
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div
                            className={`font-semibold ${
                              transaction.type === "deposit"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {transaction.type === "deposit" ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
                          </div>
                        </div>
                        <Badge
                          className={`${getStatusColor(transaction.status)} text-white`}
                        >
                          {getStatusText(transaction.status)}
                        </Badge>
                        {transaction.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              Одобрить
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-400/30 text-red-400"
                            >
                              Отклонить
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gold-400/30">
                <CardHeader>
                  <CardTitle className="text-gold-400">
                    Системные настройки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Режим обслуживания</Label>
                      <p className="text-sm text-gray-400">
                        Временно отключить доступ к сайту
                      </p>
                    </div>
                    <Switch
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) =>
                        setSystemSettings((prev) => ({
                          ...prev,
                          maintenanceMode: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">
                        Регистрация пользователей
                      </Label>
                      <p className="text-sm text-gray-400">
                        Разрешить новые регистрации
                      </p>
                    </div>
                    <Switch
                      checked={systemSettings.registrationEnabled}
                      onCheckedChange={(checked) =>
                        setSystemSettings((prev) => ({
                          ...prev,
                          registrationEnabled: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Бонусная система</Label>
                      <p className="text-sm text-gray-400">
                        Включить выдачу бонусов
                      </p>
                    </div>
                    <Switch
                      checked={systemSettings.bonusesEnabled}
                      onCheckedChange={(checked) =>
                        setSystemSettings((prev) => ({
                          ...prev,
                          bonusesEnabled: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">VIP программа</Label>
                      <p className="text-sm text-gray-400">
                        Активировать VIP статусы
                      </p>
                    </div>
                    <Switch
                      checked={systemSettings.vipProgramEnabled}
                      onCheckedChange={(checked) =>
                        setSystemSettings((prev) => ({
                          ...prev,
                          vipProgramEnabled: checked,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gold-400/30">
                <CardHeader>
                  <CardTitle className="text-gold-400">
                    Лимиты операций
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-white">
                      Максимальный дневной депозит
                    </Label>
                    <Input
                      type="number"
                      value={systemSettings.maxDailyDeposit}
                      onChange={(e) =>
                        setSystemSettings((prev) => ({
                          ...prev,
                          maxDailyDeposit: Number(e.target.value),
                        }))
                      }
                      className="bg-gray-800 border-gold-400/30 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-white">
                      Минимальная сумма вывода
                    </Label>
                    <Input
                      type="number"
                      value={systemSettings.minWithdraw}
                      onChange={(e) =>
                        setSystemSettings((prev) => ({
                          ...prev,
                          minWithdraw: Number(e.target.value),
                        }))
                      }
                      className="bg-gray-800 border-gold-400/30 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-white">
                      Максимальная сумма вывода
                    </Label>
                    <Input
                      type="number"
                      value={systemSettings.maxWithdraw}
                      onChange={(e) =>
                        setSystemSettings((prev) => ({
                          ...prev,
                          maxWithdraw: Number(e.target.value),
                        }))
                      }
                      className="bg-gray-800 border-gold-400/30 text-white mt-2"
                    />
                  </div>

                  <Button className="w-full bg-gold-400 text-casino-black hover:bg-gold-500">
                    Сохранить настройки
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
