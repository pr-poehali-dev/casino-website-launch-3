import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen casino-theme">
      {/* Header */}
      <header className="bg-casino-black border-b border-gold-400/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                <Icon name="Crown" size={24} className="text-casino-black" />
              </div>
              <h1 className="text-2xl font-bold text-gold-400">ROYAL CASINO</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-white hover:text-gold-400 transition-colors font-medium"
              >
                Главная
              </a>
              <a
                href="#"
                className="text-white hover:text-gold-400 transition-colors font-medium"
              >
                Игры
              </a>
              <a
                href="#"
                className="text-white hover:text-gold-400 transition-colors font-medium"
              >
                Турниры
              </a>
              <a
                href="#"
                className="text-white hover:text-gold-400 transition-colors font-medium"
              >
                Акции
              </a>
              <a
                href="#"
                className="text-white hover:text-gold-400 transition-colors font-medium"
              >
                Контакты
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-casino-black"
              >
                Войти
              </Button>
              <Button className="bg-gold-400 text-casino-black hover:bg-gold-500 font-semibold">
                Регистрация
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="casino-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
              ROYAL
              <span className="text-gold-400 block animate-golden-glow">
                CASINO
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Роскошный игровой опыт с премиальными слотами, рулеткой и покером.
              Добро пожаловать в мир больших выигрышей!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                size="lg"
                className="bg-gold-400 text-casino-black hover:bg-gold-500 text-lg px-8 py-4 font-bold hover-scale"
              >
                <Icon name="Play" size={20} className="mr-2" />
                Начать играть
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-casino-black text-lg px-8 py-4 font-bold"
              >
                <Icon name="Gift" size={20} className="mr-2" />
                Получить бонус
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-casino-black to-transparent"></div>
      </section>

      {/* Games Section */}
      <section className="py-16 bg-casino-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Популярные игры
            </h2>
            <p className="text-gray-400 text-lg">
              Выберите свою игру и выиграйте джекпот
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Slots */}
            <Card className="bg-gray-900 border-gold-400/30 hover:border-gold-400 transition-all duration-300 hover-scale group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center group-hover:animate-golden-glow">
                  <Icon name="Zap" size={32} className="text-casino-black" />
                </div>
                <CardTitle className="text-gold-400 text-xl">Слоты</CardTitle>
                <CardDescription className="text-gray-400">
                  Более 500 игровых автоматов
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <img
                  src="/img/ab6fbaf5-ee6a-41c5-ba71-e1bcb385675d.jpg"
                  alt="Casino Chip"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <Button className="w-full bg-gold-400 text-casino-black hover:bg-gold-500 font-semibold">
                  Играть
                </Button>
              </CardContent>
            </Card>

            {/* Roulette */}
            <Card className="bg-gray-900 border-gold-400/30 hover:border-gold-400 transition-all duration-300 hover-scale group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center group-hover:animate-golden-glow">
                  <Icon
                    name="RotateCw"
                    size={32}
                    className="text-casino-black"
                  />
                </div>
                <CardTitle className="text-gold-400 text-xl">Рулетка</CardTitle>
                <CardDescription className="text-gray-400">
                  Европейская и американская
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <img
                  src="/img/77ba386c-5326-4f02-a87e-f68a104774c6.jpg"
                  alt="Roulette Wheel"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <Button className="w-full bg-gold-400 text-casino-black hover:bg-gold-500 font-semibold">
                  Играть
                </Button>
              </CardContent>
            </Card>

            {/* Poker */}
            <Card className="bg-gray-900 border-gold-400/30 hover:border-gold-400 transition-all duration-300 hover-scale group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center group-hover:animate-golden-glow">
                  <Icon name="Spade" size={32} className="text-casino-black" />
                </div>
                <CardTitle className="text-gold-400 text-xl">Покер</CardTitle>
                <CardDescription className="text-gray-400">
                  Техасский холдем и омаха
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-full h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 flex items-center justify-center">
                  <Icon name="Spade" size={48} className="text-gold-400" />
                </div>
                <Button className="w-full bg-gold-400 text-casino-black hover:bg-gold-500 font-semibold">
                  Играть
                </Button>
              </CardContent>
            </Card>

            {/* Blackjack */}
            <Card className="bg-gray-900 border-gold-400/30 hover:border-gold-400 transition-all duration-300 hover-scale group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center group-hover:animate-golden-glow">
                  <Icon name="Heart" size={32} className="text-casino-black" />
                </div>
                <CardTitle className="text-gold-400 text-xl">
                  Блэкджек
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Классическая карточная игра
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-full h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 flex items-center justify-center">
                  <Icon name="Heart" size={48} className="text-red-500" />
                </div>
                <Button className="w-full bg-gold-400 text-casino-black hover:bg-gold-500 font-semibold">
                  Играть
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tournaments Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Турниры</h2>
            <p className="text-gray-400 text-lg">
              Участвуйте в захватывающих турнирах
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-casino-black border-gold-400/50 animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gold-400">Слот Турнир</CardTitle>
                  <Badge className="bg-gold-400 text-casino-black">
                    Активный
                  </Badge>
                </div>
                <CardDescription className="text-gray-400">
                  Призовой фонд: 100,000₽
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Участников:</span>
                    <span className="text-gold-400">234/500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Время:</span>
                    <span className="text-gold-400">2ч 45м</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gold-400 text-casino-black hover:bg-gold-500">
                  Участвовать
                </Button>
              </CardContent>
            </Card>

            <Card
              className="bg-casino-black border-gold-400/50 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gold-400">Покер Турнир</CardTitle>
                  <Badge variant="secondary" className="bg-gray-700 text-white">
                    Скоро
                  </Badge>
                </div>
                <CardDescription className="text-gray-400">
                  Призовой фонд: 250,000₽
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Участников:</span>
                    <span className="text-gold-400">89/200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Начало:</span>
                    <span className="text-gold-400">19:00</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gold-400 text-casino-black hover:bg-gold-500">
                  Зарегистрироваться
                </Button>
              </CardContent>
            </Card>

            <Card
              className="bg-casino-black border-gold-400/50 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gold-400">Рулетка VIP</CardTitle>
                  <Badge className="bg-purple-600 text-white">VIP</Badge>
                </div>
                <CardDescription className="text-gray-400">
                  Призовой фонд: 500,000₽
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Участников:</span>
                    <span className="text-gold-400">12/50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Минимум:</span>
                    <span className="text-gold-400">10,000₽</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gold-400 text-casino-black hover:bg-gold-500">
                  Войти в VIP
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-16 bg-casino-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Акции и бонусы
            </h2>
            <p className="text-gray-400 text-lg">
              Получите максимум от каждой игры
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-gold-400/20 to-gold-600/10 border-gold-400 animate-scale-in">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center">
                    <Icon name="Gift" size={24} className="text-casino-black" />
                  </div>
                  <div>
                    <CardTitle className="text-gold-400 text-xl">
                      Приветственный бонус
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      До 100,000₽ + 100 фриспинов
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Получите 100% бонус на первый депозит и наслаждайтесь
                  бесплатными вращениями в популярных слотах.
                </p>
                <Button className="bg-gold-400 text-casino-black hover:bg-gold-500 font-semibold">
                  Получить бонус
                </Button>
              </CardContent>
            </Card>

            <Card
              className="bg-gradient-to-br from-purple-600/20 to-purple-800/10 border-purple-400 animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                    <Icon name="Star" size={24} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-400 text-xl">
                      VIP программа
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Эксклюзивные привилегии
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Станьте VIP-игроком и получите доступ к персональному
                  менеджеру, повышенным лимитам и эксклюзивным турнирам.
                </p>
                <Button
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-semibold"
                >
                  Узнать больше
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gold-400/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
                  <Icon name="Crown" size={20} className="text-casino-black" />
                </div>
                <h3 className="text-xl font-bold text-gold-400">
                  ROYAL CASINO
                </h3>
              </div>
              <p className="text-gray-400 text-sm">
                Премиальное онлайн-казино с лучшими играми и высочайшим уровнем
                безопасности.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Игры</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    Слоты
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    Рулетка
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    Покер
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    Блэкджек
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    Чат 24/7
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    Правила
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    Контакты
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>support@royalcasino.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (800) 123-45-67</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gold-400/20 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Royal Casino. Все права защищены. Играйте ответственно.
              18+
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
