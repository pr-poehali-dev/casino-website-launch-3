import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Bet {
  type: string;
  numbers: number[];
  amount: number;
  payout: number;
}

interface RouletteNumber {
  number: number;
  color: "red" | "black" | "green";
}

const ROULETTE_NUMBERS: RouletteNumber[] = [
  { number: 0, color: "green" },
  { number: 32, color: "red" },
  { number: 15, color: "black" },
  { number: 19, color: "red" },
  { number: 4, color: "black" },
  { number: 21, color: "red" },
  { number: 2, color: "black" },
  { number: 25, color: "red" },
  { number: 17, color: "black" },
  { number: 34, color: "red" },
  { number: 6, color: "black" },
  { number: 27, color: "red" },
  { number: 13, color: "black" },
  { number: 36, color: "red" },
  { number: 11, color: "black" },
  { number: 30, color: "red" },
  { number: 8, color: "black" },
  { number: 23, color: "red" },
  { number: 10, color: "black" },
  { number: 5, color: "red" },
  { number: 24, color: "black" },
  { number: 16, color: "red" },
  { number: 33, color: "black" },
  { number: 1, color: "red" },
  { number: 20, color: "black" },
  { number: 14, color: "red" },
  { number: 31, color: "black" },
  { number: 9, color: "red" },
  { number: 22, color: "black" },
  { number: 18, color: "red" },
  { number: 29, color: "black" },
  { number: 7, color: "red" },
  { number: 28, color: "black" },
  { number: 12, color: "red" },
  { number: 35, color: "black" },
  { number: 3, color: "red" },
  { number: 26, color: "black" },
];

const BET_TYPES = {
  straight: { name: "Число", payout: 35 },
  red: { name: "Красное", payout: 1 },
  black: { name: "Черное", payout: 1 },
  even: { name: "Четное", payout: 1 },
  odd: { name: "Нечетное", payout: 1 },
  low: { name: "1-18", payout: 1 },
  high: { name: "19-36", payout: 1 },
  dozen1: { name: "1-я дюжина", payout: 2 },
  dozen2: { name: "2-я дюжина", payout: 2 },
  dozen3: { name: "3-я дюжина", payout: 2 },
};

export const Roulette = () => {
  const [spinning, setSpinning] = useState(false);
  const [winningNumber, setWinningNumber] = useState<RouletteNumber | null>(
    null,
  );
  const [bets, setBets] = useState<Bet[]>([]);
  const [currentBet, setCurrentBet] = useState(100);
  const [balance, setBalance] = useState(50000);
  const [history, setHistory] = useState<RouletteNumber[]>([]);
  const [wheelRotation, setWheelRotation] = useState(0);

  const addBet = (type: string, numbers: number[], payout: number) => {
    if (balance < currentBet) return;

    const existingBet = bets.find((bet) => bet.type === type);
    if (existingBet) {
      setBets(
        bets.map((bet) =>
          bet.type === type ? { ...bet, amount: bet.amount + currentBet } : bet,
        ),
      );
    } else {
      setBets([...bets, { type, numbers, amount: currentBet, payout }]);
    }
    setBalance((prev) => prev - currentBet);
  };

  const clearBets = () => {
    const totalBets = bets.reduce((sum, bet) => sum + bet.amount, 0);
    setBalance((prev) => prev + totalBets);
    setBets([]);
  };

  const spin = async () => {
    if (spinning || bets.length === 0) return;

    setSpinning(true);

    // Анимация колеса
    const spins = 5 + Math.random() * 5;
    const finalRotation = wheelRotation + spins * 360;
    setWheelRotation(finalRotation);

    // Ждем анимацию
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Определяем выигрышное число
    const randomIndex = Math.floor(Math.random() * ROULETTE_NUMBERS.length);
    const winner = ROULETTE_NUMBERS[randomIndex];
    setWinningNumber(winner);
    setHistory((prev) => [winner, ...prev.slice(0, 9)]);

    // Подсчет выигрышей
    let totalWin = 0;
    bets.forEach((bet) => {
      let won = false;

      switch (bet.type) {
        case "straight":
          won = bet.numbers.includes(winner.number);
          break;
        case "red":
          won = winner.color === "red";
          break;
        case "black":
          won = winner.color === "black";
          break;
        case "even":
          won = winner.number > 0 && winner.number % 2 === 0;
          break;
        case "odd":
          won = winner.number > 0 && winner.number % 2 === 1;
          break;
        case "low":
          won = winner.number >= 1 && winner.number <= 18;
          break;
        case "high":
          won = winner.number >= 19 && winner.number <= 36;
          break;
        case "dozen1":
          won = winner.number >= 1 && winner.number <= 12;
          break;
        case "dozen2":
          won = winner.number >= 13 && winner.number <= 24;
          break;
        case "dozen3":
          won = winner.number >= 25 && winner.number <= 36;
          break;
      }

      if (won) {
        totalWin += bet.amount * (bet.payout + 1);
      }
    });

    setBalance((prev) => prev + totalWin);
    setBets([]);
    setSpinning(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getNumberColor = (num: number) => {
    const rouletteNum = ROULETTE_NUMBERS.find((n) => n.number === num);
    if (!rouletteNum) return "bg-gray-500";

    switch (rouletteNum.color) {
      case "red":
        return "bg-red-600 text-white";
      case "black":
        return "bg-gray-900 text-white";
      case "green":
        return "bg-green-600 text-white";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-casino-black p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gray-900 border-gold-400/30 mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gold-400">
              Европейская рулетка
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Колесо рулетки */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gold-400/30 mb-6">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <div className="w-80 h-80 mx-auto relative">
                    {/* Колесо */}
                    <div
                      className="w-full h-full rounded-full border-8 border-gold-400 bg-casino-black relative transition-transform duration-3000 ease-out"
                      style={{ transform: `rotate(${wheelRotation}deg)` }}
                    >
                      {/* Числа на колесе */}
                      {ROULETTE_NUMBERS.map((rouletteNum, index) => {
                        const angle = (index / ROULETTE_NUMBERS.length) * 360;
                        return (
                          <div
                            key={rouletteNum.number}
                            className={`absolute w-8 h-8 flex items-center justify-center text-xs font-bold rounded ${getNumberColor(rouletteNum.number)}`}
                            style={{
                              top: "50%",
                              left: "50%",
                              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-130px) rotate(-${angle}deg)`,
                            }}
                          >
                            {rouletteNum.number}
                          </div>
                        );
                      })}
                    </div>

                    {/* Указатель */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gold-400"></div>
                    </div>
                  </div>

                  {/* Выигрышное число */}
                  {winningNumber && (
                    <div className="text-center mt-6">
                      <div className="text-2xl font-bold text-white mb-2">
                        Выигрышное число:
                      </div>
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold ${getNumberColor(winningNumber.number)}`}
                      >
                        {winningNumber.number}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Игровое поле для ставок */}
            <Card className="bg-gray-900 border-gold-400/30">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {/* Числа 1-36 */}
                  <div className="col-span-2">
                    <div className="grid grid-cols-12 gap-1">
                      {Array.from({ length: 36 }, (_, i) => i + 1).map(
                        (num) => (
                          <button
                            key={num}
                            onClick={() => addBet("straight", [num], 35)}
                            className={`aspect-square flex items-center justify-center text-sm font-bold rounded hover:opacity-80 ${getNumberColor(num)}`}
                            disabled={spinning}
                          >
                            {num}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Боковые ставки */}
                  <div className="space-y-2">
                    <Button
                      onClick={() =>
                        addBet(
                          "dozen1",
                          Array.from({ length: 12 }, (_, i) => i + 1),
                          2,
                        )
                      }
                      disabled={spinning}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                    >
                      1-12
                    </Button>
                    <Button
                      onClick={() =>
                        addBet(
                          "dozen2",
                          Array.from({ length: 12 }, (_, i) => i + 13),
                          2,
                        )
                      }
                      disabled={spinning}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                    >
                      13-24
                    </Button>
                    <Button
                      onClick={() =>
                        addBet(
                          "dozen3",
                          Array.from({ length: 12 }, (_, i) => i + 25),
                          2,
                        )
                      }
                      disabled={spinning}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                    >
                      25-36
                    </Button>
                  </div>
                </div>

                {/* Основные ставки */}
                <div className="grid grid-cols-6 gap-2 mb-6">
                  <Button
                    onClick={() => addBet("red", [], 1)}
                    disabled={spinning}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Красное
                  </Button>
                  <Button
                    onClick={() => addBet("black", [], 1)}
                    disabled={spinning}
                    className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-600"
                  >
                    Черное
                  </Button>
                  <Button
                    onClick={() => addBet("even", [], 1)}
                    disabled={spinning}
                    className="bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    Четное
                  </Button>
                  <Button
                    onClick={() => addBet("odd", [], 1)}
                    disabled={spinning}
                    className="bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    Нечетное
                  </Button>
                  <Button
                    onClick={() => addBet("low", [], 1)}
                    disabled={spinning}
                    className="bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    1-18
                  </Button>
                  <Button
                    onClick={() => addBet("high", [], 1)}
                    disabled={spinning}
                    className="bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    19-36
                  </Button>
                </div>

                {/* Ноль */}
                <div className="text-center mb-6">
                  <Button
                    onClick={() => addBet("straight", [0], 35)}
                    disabled={spinning}
                    className="bg-green-600 hover:bg-green-700 text-white w-20 h-12"
                  >
                    0
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Управление ставками */}
            <Card className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-gold-400">
                  Управление ставками
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm">Размер ставки</label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      type="number"
                      value={currentBet}
                      onChange={(e) => setCurrentBet(Number(e.target.value))}
                      className="bg-gray-700 border-gold-400/30 text-white"
                      min="10"
                      max={balance}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {[100, 500, 1000, 5000].map((amount) => (
                      <Button
                        key={amount}
                        onClick={() => setCurrentBet(amount)}
                        variant="outline"
                        size="sm"
                        className="border-gold-400/30 text-gold-400"
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-white text-sm">Баланс</div>
                  <div className="text-2xl font-bold text-gold-400">
                    {formatCurrency(balance)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={spin}
                    disabled={spinning || bets.length === 0}
                    className={`w-full h-12 text-lg font-bold ${
                      spinning
                        ? "bg-gray-600 text-gray-400"
                        : "bg-gold-400 text-casino-black hover:bg-gold-500"
                    }`}
                  >
                    {spinning ? "ВРАЩЕНИЕ..." : "КРУТИТЬ"}
                  </Button>
                  <Button
                    onClick={clearBets}
                    disabled={spinning || bets.length === 0}
                    variant="outline"
                    className="w-full border-gold-400/30 text-gold-400"
                  >
                    Очистить ставки
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Текущие ставки */}
            {bets.length > 0 && (
              <Card className="bg-gray-900 border-gold-400/30">
                <CardHeader>
                  <CardTitle className="text-gold-400">Ваши ставки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {bets.map((bet, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-white text-sm">
                          {BET_TYPES[bet.type as keyof typeof BET_TYPES]
                            ?.name || bet.type}
                        </span>
                        <Badge variant="secondary">
                          {formatCurrency(bet.amount)}
                        </Badge>
                      </div>
                    ))}
                    <div className="border-t border-gray-600 pt-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-white">Всего:</span>
                        <span className="text-gold-400">
                          {formatCurrency(
                            bets.reduce((sum, bet) => sum + bet.amount, 0),
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* История */}
            <Card className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-gold-400">История</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {history.map((num, index) => (
                    <div
                      key={index}
                      className={`aspect-square flex items-center justify-center text-sm font-bold rounded ${getNumberColor(num.number)}`}
                    >
                      {num.number}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
