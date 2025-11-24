import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const isAdmin = true;

  const [games, setGames] = useState<Game[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  const [newGame, setNewGame] = useState({ name: '', description: '', image: '' });
  const [newNews, setNewNews] = useState({ title: '', content: '', category: '' });

  const rules = [
    {
      id: '1',
      title: '1. Общие правила',
      sections: [
        {
          id: '1.1',
          title: '1.1 Правила нахождения на сервере',
          items: [
            '1.1.1 Запрещён флуд',
            '1.1.2 Запрещено обходить мут (Первый кик | При повторном бан 10 мин)',
            '1.1.3 Запрещено оскорблять других игроков и администрацию (Первый кик | При повторном бан 30 мин)',
            '1.1.4 Запрещена реклама (Бан навсегда)',
            '1.1.5 Запрещены спреи с порнографией, оскорблением (Карается Киком)',
            '1.1.6 Запрещено обходить БАНЫ (бан навсегда)',
            '1.1.7 Оскорбление Родных (Бан на 5 Часов. При повторно бан на 30 дней)',
            '1.1.8 Передача аккаунта с донатом - снятие',
          ]
        },
        {
          id: '1.2',
          title: '1.2 Правила игры',
          items: [
            '1.2.1 Новый приказ-игра отменяет действующий, если противоречит',
            '1.2.2 Запрещено использовать баги и залезать за текстуры (искл. Фридей)',
            '1.2.3 Запрещено использовать читы',
            '1.2.4 Запрещены программы для смены голоса (Бан 30 мин)',
            '1.2.5 Вышки и оружейка - зона CT',
            '1.2.6 Джайлы, игровая, карцер - зона T',
            '1.2.7 Бан за фрикил при убийстве 3+ Т (Бан 10-30 минут)',
            '1.2.8 Админ может запретить игроку CT без знания правил',
          ]
        }
      ]
    },
    {
      id: '2',
      title: '2. Игра за T',
      sections: [
        {
          id: '2.1',
          title: '2.1 Бунт',
          items: [
            '2.1.1 T могут бунтовать в любой момент (искл. lr, мирный fd, оборона, прятки)',
            '2.1.2 T могут резать CT обеими кнопками на территории Т - не бунт',
            '2.1.3 T могут резать CT ЛКМ при "замереть" - не бунт',
            '2.1.4 T могут ломать нычку на своей территории - не бунт',
            '2.1.5 Игнорирование не-control приказов - не бунт',
            '2.1.6 Если CT входит в Т зону - можно резать (искл. !control)',
          ]
        },
        {
          id: '2.2',
          title: '2.2 Отказ',
          items: [
            '2.2.1 T могут отказаться от приказов !control',
            '2.2.2 Форма отказа: "Отказ. Причина."',
            '2.2.3 Можно отказаться от игры при неполном составе или нестандарте',
            '2.2.4 Причины: несоблюдение п.3.1, фрикилл, гарант. смерть, фридамаг, нет смысла, повтор',
          ]
        },
        {
          id: '2.3',
          title: '2.3 Фридамаг',
          items: [
            '2.3.1 При фридамаге CT обязаны отвести в лечебку',
            '2.3.2 Можно убить CT за неустранённый фридамаг - не бунт (искл. линия огня)',
            '2.3.3 !control обязан дать возможность убить CT за фридамаг',
          ]
        }
      ]
    },
    {
      id: '3',
      title: '3. Игра за CT',
      sections: [
        {
          id: '3.1',
          title: '3.1 Требования к CT',
          items: [
            '3.1.1 Наличие хорошо настроенного микрофона',
            '3.1.2 Знание правил',
            '3.1.3 Возраст - не менее 14 лет',
            '3.1.4 Зайдя за CT - обязан контролить',
            '3.1.5 Нельзя брать !control каждый раунд (искл. один за CT, прятки, оборона)',
            '3.1.6 !control обязан внятно и чётко отдавать приказы',
            '3.1.7 CT обязан следить за Т или искать бунтующих',
          ]
        },
        {
          id: '3.2',
          title: '3.2 Убийство T',
          items: [
            '3.2.1 Можно убить за невыполнение приказов !control',
            '3.2.2 Если T пытается убить CT (искл. lr, охота, zfd)',
            '3.2.3 Если у T оружие в руках (искл. lr, оборона, афк)',
            '3.2.4 Оружие за спиной - дать возможность выкинуть, досчитав до 3',
            '3.2.5 T в нычке или зоне CT - можно убить (искл. lr, оборона)',
            '3.2.6 Последний CT (не единственный) может убивать до lr (искл. zfd)',
            '3.2.7 T стоит в афк - досчитать до 5 (искл. режим афк, замирание)',
            '3.2.8 Если T покинул джайл до открытия',
          ]
        },
        {
          id: '3.3',
          title: '3.3 CT Запрещается',
          items: [
            '3.3.1 Ломать или залезать в нычки (искл. п.3.2.5, lr, прятки, оборона)',
            '3.3.2 Находиться в оружейке после 3:00 (искл. п.3.2.5, lr, прятки)',
            '3.3.3 Держать джайлы закрытыми после 3:00 (слей всем CT)',
            '3.3.4 Закрывать джайлы',
            '3.3.5 Подкидывать оружие T',
            '3.3.6 Залезать на вышки с двумя CT',
            '3.3.7 Убивать в закрытых джайлах (искл. п.3.2.2 и 3.2.3)',
            '3.3.8 Взятие !control после 3:30 - slay (искл. Заместитель)',
            '3.3.9 Лояльно относиться к бунтующим',
            '3.3.10 Убивать Т без причины',
            '3.3.11 Открывать джайлы без разрешения !control',
          ]
        }
      ]
    },
    {
      id: '4',
      title: '4. Игра за !control',
      sections: [
        {
          id: '4.1',
          title: '4.1 Приказы',
          items: [
            '4.1.1 !control может давать приказы T (искл. lr, fd, мирный fd)',
            '4.1.2 Любой приказ/игру можно отменить (искл. п.4.1.6.1)',
            '4.1.3 "Замереть" - запрет шагов, прыжков, приседаний, подъёмов',
            '4.1.4 "АФК" - запрет любых действий (искл. чат)',
            '4.1.5 "Нервы" - смотреть вверх сидя с фонариком, не двигаться (1 раз за раунд, макс. 1 мин)',
            '4.1.6 !control может разрешить реснутся админу (15 сек на выход)',
            '4.1.7 !control обязан объяснять стандартные игры и приказы',
            '4.1.8 Первый приказ до открытия камер',
            '4.1.9 Может запретить параллельную активацию микрофона',
            '4.1.10 Дополнительный приказ отменяется отдельно',
            '4.1.11 Обязан реснуть случайно убитого',
            '4.1.12 Не может запретить чиркать ножом',
            '4.1.13 АФК можно давать только через раунд',
          ]
        },
        {
          id: '4.2',
          title: '4.2 Отказы',
          items: [
            '4.2.1 !control обязан устранять причины отказов',
            '4.2.2 Может убить T за причину не из п.2.2',
            '4.2.3 Не обязан рассматривать отказы в закрытых джайлах',
            '4.2.4 Может игнорировать отказы не по форме',
          ]
        },
        {
          id: '4.3',
          title: '4.3 Заместитель',
          items: [
            '4.3.1 !control может назначить заместителя',
            '4.3.2 Приказы действуют 15 сек после смерти !control',
            '4.3.3 У заместителя 15 сек на взятие !control',
          ]
        }
      ]
    },
    {
      id: '5',
      title: '5. LR (Last Request)',
      sections: [
        {
          id: '5.1',
          title: '5.1 Основные правила lr',
          items: [
            '5.1.1 LR начинается при 2 T (искл. оборона, прятки, zfd)',
            '5.1.2 T могут написать "!lr"',
            '5.1.3 Во время lr отменяются все приказы и игры',
            '5.1.4 Если T не пишет !lr - CT досчитывают до 10',
            '5.1.5 Если T не выбирает игру - CT досчитывают до 10',
            '5.1.6 CT отказался дважды - объявляется охота',
            '5.1.7 Бунт только через соответствующий пункт',
            '5.1.8 Админ может отменить !lr максимум 3 раза',
          ]
        },
        {
          id: '5.2',
          title: '5.2 Игры lr',
          items: [
            '5.2.1 T и CT должны быть в равных условиях',
            '5.2.2 Правила "рулетка" и "обойма на обойму" выбирает первый стреляющий',
            '5.2.3 Проиграв, нельзя делать самоубийство',
            '5.2.4 Запрещено мешать проведению !lr (slay)',
            '5.2.5 Запрещено заходить в лечебку (искл. игры без требования HP)',
            '5.2.6 !control обязан снять контролку для равенства',
          ]
        }
      ]
    },
    {
      id: '6',
      title: '6. FreeDay (FD)',
      sections: [
        {
          id: '6.1',
          title: '6.1 Причины наступления fd',
          items: [
            '6.1.1 !control не взят до 3:30',
            '6.1.2 Первый раунд на карте',
            '6.1.3 Заместитель не взял !control в течение 15 сек',
            '6.1.4 Соотношение T к CT в 3:00 меньше 2 (дисбаланс)',
            '6.1.5 Джайлы открыты до взятия !control',
            '6.1.6 CT закрыли джайлы',
            '6.1.7 Причина отказа не устранена 15 сек',
            '6.1.8 T выиграли lr в предыдущем раунде',
            '6.1.9 CT убили T во время !lr без причины',
            '6.1.10 !control лично дал fd',
            '6.1.11 Выиграна оборона',
            '6.1.12 Массовый фрикилл 3+',
            '6.1.13 Выиграны прятки',
          ]
        },
        {
          id: '6.2',
          title: '6.2 Виды fd',
          items: [
            '6.2.1 FD - отмена всех приказов/игр, новые не поступают',
            '6.2.2 Мирный FD - перемирие до времени (минимум 1 мин)',
            '6.2.3 Жёсткий FD - бунт одного = бунт всех (без приказов)',
            '6.2.4 ZFD - T ходят на шифтах и режут ЛКМ (макс. 2 мин, потом жёсткий FD)',
            '6.2.5 Нельзя давать FD больше 1 Т',
          ]
        }
      ]
    },
    {
      id: '7',
      title: '7. Правила для Администрации',
      sections: [
        {
          id: '7.1',
          title: 'Общие правила администрации',
          items: [
            '1. Запрещено кикать/банить без причины [1/3 по донату, повтор - снятие]',
            '2. Младшие админы не снимают КТбан [устник, потом 1/3]',
            '3. Админы ведут себя адекватно [устник, потом 1/3]',
            '4. Играть каждый день 1 час. Неделя без входа [устник, 1/3, снятие]',
            '5. Не менять карту без голосования (искл. все просят) [устник, потом 1/3]',
            '6. Младшие/Средние/Старшие не дают 1/3',
            '7. Не обязаны объяснять причину бана/кика/мута',
            '8. Всегда иметь доказательства на бан/кик/мут',
            '9. Соблюдать правила сервера — иначе снятие',
          ]
        }
      ]
    },
    {
      id: '8',
      title: '8. Паутинка (донат)',
      sections: [
        {
          id: '8.1',
          title: 'Правила использования паутинки',
          items: [
            '1. Запрещено перетаскивать грабом без согласия [устное, потом 1/3]',
            '2. Запрещено багать донат [1/3]',
            '3. Запрещено избегать приказы контрола [устное, потом 1/3]',
            '4. Запрещено багать карту грабом [устное, потом 1/3]',
            '5. Контрол может запрещать паутинку/граб [устное, потом 1/3]',
            '6. Запрещено улетать за пределы карты [устное, потом 1/3]',
            '7. Запрещено начинать бунт с паутинкой [пред., потом 1/3]',
            '8. Запрещено во время !lr, обороны, пряток [пред., потом 1/3]',
          ]
        }
      ]
    },
    {
      id: '9',
      title: '9. Правила обороны',
      sections: [
        {
          id: '9.1',
          title: 'Проведение обороны',
          items: [
            '!control объявляет оборону, называет место и кто обороняется',
            'Можно запретить оружие для T (нельзя все виды)',
            'Указать время начала и завершения (минимум 2 минуты)',
            'Во время обороны запрещено писать !lr (искл. бунт)',
            'Можно установить наказание за перемирие (не всей команде)',
            'Оборону объявлять только после 1 раунда',
            'Проводить оборону 3 раунда за карту',
            'После времени CT убивают оставшихся T',
            'Нельзя проводить в оружейке и лечебке',
          ]
        }
      ]
    },
    {
      id: '10',
      title: '10. Правила пряток',
      sections: [
        {
          id: '10.1',
          title: 'Проведение пряток',
          items: [
            '!control объявляет прятки, все CT в оружейке до поиска',
            'Во время пряток запрещён бунт для T',
            'Указать время начала и завершения (минимум 2 минуты)',
            'Запрещено писать !lr (можно выбрать бунт)',
            'Можно назначить наказание (не всей команде)',
            'Прятки только после 1 раунда',
            'Прятки 3 раунда за карту',
            'Админам запрещено бунтовать замаскированными [slay, потом kick]',
            'После времени победившие T убивают CT',
            'Запрещено приседать замаскированным [пред., потом 1/3]',
            'Запрещено прятаться в баг зонах',
          ]
        }
      ]
    }
  ];

  const handleAddGame = () => {
    if (newGame.name && newGame.description) {
      setGames((prev) => [...prev, { ...newGame, id: Date.now().toString(), image: newGame.image || '🎮' }]);
      setNewGame({ name: '', description: '', image: '' });
      toast({ title: 'Игра добавлена', description: 'Новый режим успешно добавлен' });
    }
  };

  const handleDeleteGame = (id: string) => {
    setGames((prev) => prev.filter((game) => game.id !== id));
    toast({ title: 'Игра удалена', description: 'Режим удалён из списка' });
  };

  const handleAddNews = () => {
    if (newNews.title && newNews.content) {
      setNews((prev) => [
        { ...newNews, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] },
        ...prev
      ]);
      setNewNews({ title: '', content: '', category: '' });
      toast({ title: 'Новость опубликована', description: 'Запись успешно добавлена' });
    }
  };

  const handleDeleteNews = (id: string) => {
    setNews((prev) => prev.filter((item) => item.id !== id));
    toast({ title: 'Новость удалена', description: 'Запись удалена из ленты' });
  };

  const filteredRules = rules.map((rule) => ({
    ...rule,
    sections: rule.sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
      }))
      .filter((section) => section.items.length > 0)
  })).filter((rule) => rule.sections.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Gamepad2" size={28} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">JailBreak Rules</h1>
                <p className="text-sm text-muted-foreground">Панель управления сервером</p>
              </div>
            </div>
            <Badge variant="outline" className="gap-1">
              <Icon name="Shield" size={14} />
              Админ-доступ активен
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="rules" className="spaceýa6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto bg-muted/50 p-1">
            <TabsTrigger value="rules" className="gap-2">
              <Icon name="BookOpen" size={16} />
              Правила
            </TabsTrigger>
            <TabsTrigger value="games" className="gap-2">
              <Icon name="Trophy" size={16} />
              Игры
            </TabsTrigger>
            <TabsTrigger value="news" className="gap-2">
              <Icon name="Newspaper" size={16} />
              Новости
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-2">
              <Icon name="Settings" size={16} />
              Админка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rules" className="space-y-6">
            <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-3xl">
                  <Icon name="ScrollText" size={32} className="text-primary" />
                  Правила сервера
                </CardTitle>
                <CardDescription>Полный свод правил для игроков и администрации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-я-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по правилам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Accordion type="single" collapsible className="space-y-3">
                  {(searchQuery ? filteredRules : rules).map((rule) => (
                    <AccordionItem
                      key={rule.id}
                      value={rule.id}
                      className="border border-border/40 rounded-lg bg-card/50 px-4"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <span className="text-lg font-semibold">{rule.title}</span>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2">
                        {rule.sections.map((section) => (
                          <div key={section.id} className="space-y-2">
                            <h4 className="font-semibold text-primary">{section.title}</h4>
                            <ul className="space-y-1.5 ml-4">
                              {section.items.map((item, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                  <Icon name="ChevronRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <Card className="border-secondary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-3xl">
                  <Icon name="Trophy" size={32} className="text-secondary" />
                  Игры на сервере
                </CardTitle>
                <CardDescription>Добавляйте режимы и описания вручную</CardDescription>
              </CardHeader>
              <CardContent>
                {games.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <p className="text-lg font-semibold">Пока нет опубликованных игр</p>
                    <p className="text-sm">Добавьте первую игру через админку</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {games.map((game) => (
                      <Card key={game.id} className="border-border/40 bg-muted/30 hover:border-primary/40 transition-all hover:scale-105">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="text-4xl">{game.image}</div>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteGame(game.id)} className="h-8 w-8">
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                          <CardTitle className="text-xl">{game.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{game.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <Card className="border-accent/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-3xl">
                  <Icon name="Newspaper" size={32} className="text-accent" />
                  Новости и обновления
                </CardTitle>
                <CardDescription>Публикуйте обновления сервера</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {news.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <p className="text-lg font-semibold">Новостей ещё нет</p>
                    <p className="text-sm">Расскажите игрокам о свежих изменениях</p>
                  </div>
                ) : (
                  news.map((item) => (
                    <Card key={item.id} className="border-border/40 bg-muted/30">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{item.category || 'Обновление'}</Badge>
                              <span className="text-xs text-muted-foreground">{item.date}</span>
                            </div>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteNews(item.id)} className="h-8 w-8">
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{item.content}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Plus" size={24} className="text-primary" />
                    Добавить игру
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Название игры</Label>
                    <Input
                      value={newGame.name}
                      onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                      placeholder="Например: Саймон говорит"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Описание</Label>
                    <Textarea
                      value={newGame.description}
                      onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                      placeholder="Краткое описание игры"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Эмодзи (необязательно)</Label>
                    <Input
                      value={newGame.image}
                      onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
                      placeholder="🎮"
                      maxLength={2}
                    />
                  </div>
                  <Button onClick={handleAddGame} className="w-full">
                    <Icon name="Plus" size=16 className="mr-2" />
                    Добавить игру
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Plus" size={24} className="text-secondary" />
                    Добавить новость
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Заголовок</Label>
                    <Input
                      value={newNews.title}
                      onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                      placeholder="Название новости"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Категория</Label>
                    <Input
                      value={newNews.category}
                      onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                      placeholder="Правила, Игры, Обновления..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Содержание</Label>
                    <Textarea
                      value={newNews.content}
                      onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                      placeholder="Текст новости"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleAddNews} className="w-full">
                    <Icon name="Plus" size=16 className="mr-2" />
                    Опубликовать новость
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 JailBreak Server. Все правила обязательны к соблюдению.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Icon name="Users" size={14} />
                Онлайн: 42
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Icon name="Activity" size={14} />
                Сервер активен
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
