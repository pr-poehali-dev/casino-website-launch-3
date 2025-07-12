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
import Icon from "@/components/ui/icon";

interface AuthModalProps {
  children: React.ReactNode;
}

export const AuthModal = ({ children }: AuthModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Имитация логина
    console.log("Login:", loginData);
    setIsOpen(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Имитация регистрации
    console.log("Register:", registerData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gold-400/30">
        <DialogHeader>
          <DialogTitle className="text-gold-400 text-center text-2xl font-bold">
            Добро пожаловать в Royal Casino
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Вход
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
            >
              Регистрация
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="bg-gray-800 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-white">Войти в аккаунт</CardTitle>
                <CardDescription className="text-gray-400">
                  Введите свои данные для входа
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      className="bg-gray-700 border-gold-400/30 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Пароль
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      className="bg-gray-700 border-gold-400/30 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm text-gray-400">
                      <input type="checkbox" className="rounded" />
                      <span>Запомнить меня</span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-gold-400 hover:underline"
                    >
                      Забыли пароль?
                    </a>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gold-400 text-black hover:bg-gold-500 font-semibold"
                  >
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Войти
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="bg-gray-800 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-white">Создать аккаунт</CardTitle>
                <CardDescription className="text-gray-400">
                  Зарегистрируйтесь и получите приветственный бонус
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">
                        Имя
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Иван"
                        value={registerData.firstName}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            firstName: e.target.value,
                          })
                        }
                        className="bg-gray-700 border-gold-400/30 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">
                        Фамилия
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Иванов"
                        value={registerData.lastName}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            lastName: e.target.value,
                          })
                        }
                        className="bg-gray-700 border-gold-400/30 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regEmail" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="regEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      className="bg-gray-700 border-gold-400/30 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Телефон
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={registerData.phone}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          phone: e.target.value,
                        })
                      }
                      className="bg-gray-700 border-gold-400/30 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regPassword" className="text-white">
                      Пароль
                    </Label>
                    <Input
                      id="regPassword"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      className="bg-gray-700 border-gold-400/30 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">
                      Подтвердите пароль
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="bg-gray-700 border-gold-400/30 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" required />
                    <label className="text-sm text-gray-400">
                      Я согласен с{" "}
                      <a href="#" className="text-gold-400 hover:underline">
                        условиями использования
                      </a>
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gold-400 text-black hover:bg-gold-500 font-semibold"
                  >
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Зарегистрироваться
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
