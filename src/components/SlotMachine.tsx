import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface SlotSymbol {
  id: string;
  symbol: string;
  multiplier: number;
  color: string;
}

const SLOT_SYMBOLS: SlotSymbol[] = [
  { id: "cherry", symbol: "🍒", multiplier: 2, color: "text-red-400" },
  { id: "lemon", symbol: "🍋", multiplier: 3, color: "text-yellow-400" },
  { id: "orange", symbol: "🍊", multiplier: 4, color: "text-orange-400" },
  { id: "plum", symbol: "🍇", multiplier: 5, color: "text-purple-400" },
  { id: "bell", symbol: "🔔", multiplier: 8, color: "text-gold-400" },
  { id: "bar", symbol: "💎", multiplier: 10, color: "text-blue-400" },
  { id: "seven", symbol: "7️⃣", multiplier: 50, color: "text-gold-400" },
  { id: "jackpot", symbol: "💰", multiplier: 100, color: "text-gold-400" },
];

export const SlotMachine = () => {
  const [reels, setReels] = useState<SlotSymbol[][]>([
    [SLOT_SYMBOLS[0], SLOT_SYMBOLS[1], SLOT_SYMBOLS[2]],
    [SLOT_SYMBOLS[1], SLOT_SYMBOLS[2], SLOT_SYMBOLS[3]],
    [SLOT_SYMBOLS[2], SLOT_SYMBOLS[3], SLOT_SYMBOLS[4]],
  ]);
  const [spinning, setSpinning] = useState(false);
  const [bet, setBet] = useState(100);
  const [balance, setBalance] = useState(50000);
  const [lastWin, setLastWin] = useState(0);
  const [jackpot, setJackpot] = useState(2547890);
  const [autoPlay, setAutoPlay] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  // Jackpot increment
  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot((prev) => prev + Math.floor(Math.random() * 100) + 50);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getRandomSymbol = () => {
    const weights = [30, 25, 20, 15, 5, 3, 1, 0.5]; // Вероятности символов
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < SLOT_SYMBOLS.length; i++) {
      random -= weights[i];
      if (random <= 0) return SLOT_SYMBOLS[i];
    }
    return SLOT_SYMBOLS[0];
  };

  const calculateWin = (reels: SlotSymbol[][]) => {
    const middleRow = reels.map((reel) => reel[1]);

    // Проверка линии на выигрыш
    const symbol = middleRow[0];
    const isWinningLine = middleRow.every((s) => s.id === symbol.id);

    if (isWinningLine) {
      return bet * symbol.multiplier;
    }

    // Джекпот при трех 💰
    if (middleRow.every((s) => s.id === "jackpot")) {
      return jackpot;
    }

    return 0;
  };

  const spin = async () => {
    if (spinning || balance < bet) return;

    setSpinning(true);
    setBalance((prev) => prev - bet);
    setSpinCount((prev) => prev + 1);

    // Анимация вращения
    const spinDuration = 2000;
    const spinInterval = 100;
    let elapsed = 0;

    const spinAnimation = setInterval(() => {
      setReels((prev) => prev.map((reel) => reel.map(() => getRandomSymbol())));
      elapsed += spinInterval;

      if (elapsed >= spinDuration) {
        clearInterval(spinAnimation);

        // Финальный результат
        const finalReels = [
          [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
          [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
          [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
        ];

        setReels(finalReels);

        const winAmount = calculateWin(finalReels);
        setLastWin(winAmount);

        if (winAmount > 0) {
          setBalance((prev) => prev + winAmount);
        }

        setSpinning(false);
      }
    }, spinInterval);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-casino-black p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-900 border-gold-400/30 mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gold-400">
              Слот "Золотые Фрукты"
            </CardTitle>
            <div className="text-2xl font-bold text-gold-400 animate-golden-glow">
              ДЖЕКПОТ: {formatCurrency(jackpot)}
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Игровое поле */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gold-400/30">
              <CardContent className="p-6">
                {/* Слот барабаны */}
                <div className="bg-casino-black rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {reels.map((reel, reelIndex) => (
                      <div
                        key={reelIndex}
                        className="bg-gray-800 rounded-lg border-2 border-gold-400/30"
                      >
                        {reel.map((symbol, symbolIndex) => (
                          <div
                            key={`${reelIndex}-${symbolIndex}`}
                            className={`h-20 flex items-center justify-center text-4xl ${
                              symbolIndex === 1
                                ? "bg-gold-400/20 border-y-2 border-gold-400"
                                : ""
                            } ${spinning ? "animate-pulse" : ""}`}
                          >
                            <span className={symbol.color}>
                              {symbol.symbol}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Линия выигрыша */}
                  <div className="h-1 bg-gold-400 rounded-full mb-4 opacity-50"></div>
                </div>

                {/* Управление ставками */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label className="text-white">Ставка</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        type="number"
                        value={bet}
                        onChange={(e) => setBet(Number(e.target.value))}
                        className="bg-gray-700 border-gold-400/30 text-white"
                        min="10"
                        max={balance}
                      />
                      <Button
                        onClick={() => setBet(Math.min(bet * 2, balance))}
                        variant="outline"
                        className="border-gold-400/30 text-gold-400"
                      >
                        ×2
                      </Button>
                      <Button
                        onClick={() => setBet(Math.max(bet / 2, 10))}
                        variant="outline"
                        className="border-gold-400/30 text-gold-400"
                      >
                        ÷2
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Баланс</Label>
                    <div className="text-2xl font-bold text-gold-400 mt-2">
                      {formatCurrency(balance)}
                    </div>
                  </div>
                </div>

                {/* Кнопки управления */}
                <div className="space-y-4">
                  <Button
                    onClick={spin}
                    disabled={spinning || balance < bet}
                    className={`w-full h-16 text-xl font-bold ${
                      spinning
                        ? "bg-gray-600 text-gray-400"
                        : "bg-gold-400 text-casino-black hover:bg-gold-500 animate-golden-glow"
                    }`}
                  >
                    {spinning ? (
                      <div className="flex items-center">
                        <Icon
                          name="Loader2"
                          size={24}
                          className="mr-2 animate-spin"
                        />
                        ВРАЩЕНИЕ...
                      </div>
                    ) : (
                      "КРУТИТЬ"
                    )}
                  </Button>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      onClick={() => setBet(10)}
                      variant="outline"
                      className="border-gold-400/30 text-gold-400"
                    >
                      Мин
                    </Button>
                    <Button
                      onClick={() => setBet(balance)}
                      variant="outline"
                      className="border-gold-400/30 text-gold-400"
                    >
                      Макс
                    </Button>
                    <Button
                      onClick={() => setAutoPlay(!autoPlay)}
                      variant={autoPlay ? "default" : "outline"}
                      className={
                        autoPlay
                          ? "bg-gold-400 text-casino-black"
                          : "border-gold-400/30 text-gold-400"
                      }
                    >
                      Авто
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Последний выигрыш */}
            {lastWin > 0 && (
              <Card className="bg-gradient-to-br from-green-600/20 to-green-800/10 border-green-400">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <Icon name="Trophy" size={20} className="mr-2" />
                    Выигрыш!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">
                    {formatCurrency(lastWin)}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Таблица выплат */}
            <Card className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-gold-400">Таблица выплат</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {SLOT_SYMBOLS.map((symbol) => (
                    <div
                      key={symbol.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{symbol.symbol}</span>
                        <span className="text-sm text-gray-400">×3</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${symbol.color} bg-gray-800`}
                      >
                        ×{symbol.multiplier}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Статистика */}
            <Card className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-gold-400">
                  Статистика сессии
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Спинов:</span>
                  <span className="text-white">{spinCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Общий выигрыш:</span>
                  <span className="text-green-400">
                    {formatCurrency(lastWin)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Текущий RTP:</span>
                  <span className="text-gold-400">
                    {spinCount > 0
                      ? ((lastWin / (spinCount * bet)) * 100).toFixed(1)
                      : 0}
                    %
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
