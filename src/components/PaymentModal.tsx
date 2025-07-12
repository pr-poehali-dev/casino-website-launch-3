import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface PaymentModalProps {
  children: React.ReactNode;
  type?: "deposit" | "withdraw";
}

export const PaymentModal = ({
  children,
  type = "deposit",
}: PaymentModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const paymentMethods = [
    {
      id: "visa",
      name: "Visa/MasterCard",
      icon: "CreditCard",
      fee: "0%",
      minAmount: 1000,
      maxAmount: 500000,
    },
    {
      id: "mir",
      name: "МИР",
      icon: "CreditCard",
      fee: "0%",
      minAmount: 1000,
      maxAmount: 300000,
    },
    {
      id: "sbp",
      name: "СБП",
      icon: "Smartphone",
      fee: "0%",
      minAmount: 100,
      maxAmount: 200000,
    },
    {
      id: "qiwi",
      name: "QIWI",
      icon: "Wallet",
      fee: "2%",
      minAmount: 500,
      maxAmount: 100000,
    },
    {
      id: "yandex",
      name: "ЮMoney",
      icon: "Wallet",
      fee: "1%",
      minAmount: 100,
      maxAmount: 150000,
    },
    {
      id: "crypto",
      name: "Криптовалюта",
      icon: "Bitcoin",
      fee: "0%",
      minAmount: 5000,
      maxAmount: 1000000,
    },
  ];

  const quickAmounts = [1000, 5000, 10000, 25000, 50000, 100000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment:", { type, amount, method: selectedMethod, cardData });
    setIsOpen(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gold-400/30">
        <DialogHeader>
          <DialogTitle className="text-gold-400 text-center text-2xl font-bold">
            {type === "deposit" ? "Пополнение счета" : "Вывод средств"}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="method" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger
              value="method"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Способ оплаты
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Детали платежа
            </TabsTrigger>
          </TabsList>

          <TabsContent value="method">
            <div className="space-y-6">
              {/* Amount Selection */}
              <Card className="bg-gray-800 border-gold-400/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Сумма</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="amount" className="text-white">
                      Введите сумму
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="10000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-gray-700 border-gold-400/30 text-white text-lg font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {quickAmounts.map((quickAmount) => (
                      <Button
                        key={quickAmount}
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount(quickAmount.toString())}
                        className="border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-black"
                      >
                        {formatCurrency(quickAmount)}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="bg-gray-800 border-gold-400/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">
                    Способ оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedMethod === method.id
                            ? "border-gold-400 bg-gold-400/10"
                            : "border-gray-600 hover:border-gold-400/50"
                        }`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon
                              name={method.icon as any}
                              size={24}
                              className="text-gold-400"
                            />
                            <div>
                              <div className="text-white font-medium">
                                {method.name}
                              </div>
                              <div className="text-sm text-gray-400">
                                {formatCurrency(method.minAmount)} -{" "}
                                {formatCurrency(method.maxAmount)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                method.fee === "0%" ? "default" : "secondary"
                              }
                              className={
                                method.fee === "0%"
                                  ? "bg-green-600"
                                  : "bg-yellow-600"
                              }
                            >
                              Комиссия {method.fee}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {amount && selectedMethod && (
                <Card className="bg-gray-800 border-gold-400/30">
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">
                          Сумма к {type === "deposit" ? "зачислению" : "выводу"}
                          :
                        </span>
                        <span className="text-white font-semibold">
                          {formatCurrency(Number(amount))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Комиссия:</span>
                        <span className="text-white">
                          {paymentMethods.find((m) => m.id === selectedMethod)
                            ?.fee || "0%"}
                        </span>
                      </div>
                      <div className="border-t border-gray-600 pt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Итого:</span>
                          <span className="text-gold-400 font-bold text-lg">
                            {formatCurrency(Number(amount))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="details">
            <form onSubmit={handleSubmit} className="space-y-6">
              {selectedMethod === "visa" || selectedMethod === "mir" ? (
                <Card className="bg-gray-800 border-gold-400/30">
                  <CardHeader>
                    <CardTitle className="text-white">Данные карты</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-white">
                        Номер карты
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.number}
                        onChange={(e) =>
                          setCardData({ ...cardData, number: e.target.value })
                        }
                        className="bg-gray-700 border-gold-400/30 text-white"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-white">
                          Срок действия
                        </Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={(e) =>
                            setCardData({ ...cardData, expiry: e.target.value })
                          }
                          className="bg-gray-700 border-gold-400/30 text-white"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-white">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={(e) =>
                            setCardData({ ...cardData, cvv: e.target.value })
                          }
                          className="bg-gray-700 border-gold-400/30 text-white"
                          maxLength={3}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName" className="text-white">
                        Имя владельца
                      </Label>
                      <Input
                        id="cardName"
                        placeholder="IVAN IVANOV"
                        value={cardData.name}
                        onChange={(e) =>
                          setCardData({ ...cardData, name: e.target.value })
                        }
                        className="bg-gray-700 border-gold-400/30 text-white"
                      />
                    </div>
                  </CardContent>
                </Card>
              ) : selectedMethod === "crypto" ? (
                <Card className="bg-gray-800 border-gold-400/30">
                  <CardHeader>
                    <CardTitle className="text-white">Криптовалюта</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-white">Выберите валюту</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-700 border-gold-400/30 text-white">
                          <SelectValue placeholder="Выберите криптовалюту" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                          <SelectItem value="usdt">Tether (USDT)</SelectItem>
                          <SelectItem value="ltc">Litecoin (LTC)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {type === "withdraw" && (
                      <div>
                        <Label className="text-white">Адрес кошелька</Label>
                        <Input
                          placeholder="Введите адрес кошелька"
                          className="bg-gray-700 border-gold-400/30 text-white"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gray-800 border-gold-400/30">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Подтверждение платежа
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      После нажатия кнопки "Продолжить" вы будете перенаправлены
                      на страницу оплаты.
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gold-400 text-black hover:bg-gold-500 font-semibold"
                  disabled={!amount || !selectedMethod}
                >
                  <Icon
                    name={type === "deposit" ? "Plus" : "Minus"}
                    size={16}
                    className="mr-2"
                  />
                  {type === "deposit" ? "Пополнить" : "Вывести"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
