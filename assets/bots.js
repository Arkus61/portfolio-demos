const flowers = {
  start: {
    reply: 'Здравствуйте! Помогу выбрать букет или проверить условия доставки Maison Bloom. С чего начнём?',
    options: [['Подобрать букет', 'occasion'], ['Выбрать доставку', 'delivery'], ['Спросить про подписку', 'subscription']],
  },
  occasion: {
    reply: 'Для какого повода подбираем цветы?',
    options: [['Небольшой знак внимания', 'budget', 'occasion'], ['День рождения', 'budget', 'occasion'], ['Свадьба или юбилей', 'budget', 'occasion']],
  },
  budget: {
    reply: ({ occasion }) => `Повод — «${occasion}». В каком бюджете вам комфортно выбирать?`,
    options: [['До 4 000 ₽', 'small'], ['4 000–8 000 ₽', 'signature'], ['От 8 000 ₽', 'event']],
  },
  small: {
    reply: 'До 4 000 ₽ подойдут компактные букеты со светлой упаковкой или тёплой персиковой палитрой.',
    options: [['Нежность утра · 2 900 ₽', 'selected', 'bouquet'], ['Персиковый чай · 3 800 ₽', 'selected', 'bouquet']],
  },
  signature: {
    reply: 'В этом бюджете можно выбрать мягкую розовую или насыщенную коралловую композицию.',
    options: [['Розовое облако · 4 900 ₽', 'selected', 'bouquet'], ['Гранатовый свет · 7 200 ₽', 'selected', 'bouquet']],
  },
  event: {
    reply: 'Для торжества есть светлый «Белый сад», свадебный комплект и объёмный букет к юбилею.',
    options: [['Белый сад · 8 200 ₽', 'selected', 'bouquet'], ['Камерная свадьба · 9 800 ₽', 'selected', 'bouquet'], ['Большой праздник · 11 900 ₽', 'selected', 'bouquet']],
  },
  selected: {
    reply: ({ bouquet }) => `Выбрали «${bouquet}». Добавить открытку?`,
    options: [['Добавить открытку', 'delivery', 'card'], ['Без открытки', 'delivery', 'card']],
  },
  delivery: {
    reply: 'Покажу два способа получения в Санкт-Петербурге. Адрес и номер телефона в демо вводить не нужно.',
    options: [['Самовывоз · бесплатно', 'flowerSummary', 'delivery'], ['Курьер · +490 ₽', 'flowerTime', 'delivery']],
  },
  flowerTime: {
    reply: 'Выберите удобный интервал для курьера.',
    options: [['Утро · 10:00–13:00', 'flowerSummary', 'time'], ['День · 13:00–17:00', 'flowerSummary', 'time'], ['Вечер · 17:00–21:00', 'flowerSummary', 'time']],
  },
  flowerSummary: {
    reply: 'Вот сводка по вашему выбору. Это пробный заказ.',
    summary: { title: 'Ваши цветы', rows: [['Композиция', 'bouquet'], ['Открытка', 'card'], ['Получение', 'delivery'], ['Интервал', 'time']] },
  },
  subscription: {
    reply: 'Подписка подходит для дома или офиса. Пример стоимости одной сезонной композиции — 3 900 ₽. Как часто привозить цветы?',
    options: [['Раз в неделю', 'subscriptionSummary', 'frequency'], ['Раз в две недели', 'subscriptionSummary', 'frequency']],
  },
  subscriptionSummary: {
    reply: 'Сохранили выбранную частоту в рамках диалога. Состав букета в этом сценарии меняется по сезону.',
    summary: { title: 'Цветочная подписка', rows: [['Частота', 'frequency']] },
  },
};

const kids = {
  start: {
    reply: 'Привет! Подберу программу Wonder Steps по возрасту и интересам или покажу пример расписания.',
    options: [['Подобрать программу', 'age'], ['Посмотреть расписание', 'schedule'], ['Узнать про пробное занятие', 'trial']],
  },
  age: {
    reply: 'Сколько лет ребёнку? На границе возрастов можно попробовать обе группы.',
    options: [['3–5 лет', 'little', 'age'], ['5–7 лет', 'school', 'age'], ['7–10 лет', 'older', 'age']],
  },
  little: {
    reply: 'Для младшей группы подходят игровые занятия по 35 минут. Выберите, что сейчас интереснее.',
    options: [['Первые истории', 'littleTime', 'program'], ['Цвет и форма', 'littleTime', 'program'], ['Музыкальная игра', 'littleTime', 'program']],
  },
  school: {
    reply: 'Для 5–7 лет есть программы по 45 минут с играми и заданиями в небольших группах.',
    options: [['Математика в игре', 'schoolTime', 'program'], ['Чтение и речь', 'schoolTime', 'program'], ['Английский через игру', 'schoolTime', 'program']],
  },
  older: {
    reply: 'Старшие могут выбрать эксперимент, инженерный проект или собственную рисованную историю.',
    options: [['Лаборатория открытий', 'olderTime', 'program'], ['Роботы из конструктора', 'olderTime', 'program'], ['Студия комиксов', 'olderTime', 'program']],
  },
  littleTime: {
    reply: ({ program }) => `«${program}». Пробное занятие длится 35 минут, ориентир по цене — 650 ₽. Выберите пример времени.`,
    options: [['Пятница · 16:00', 'trialSummary', 'time'], ['Суббота · 10:00', 'trialSummary', 'time']],
  },
  schoolTime: {
    reply: ({ program }) => `«${program}». Длительность — 45 минут. Выберите удобный интервал для знакомства.`,
    options: [['Вторник · 16:00', 'trialSummary', 'time'], ['Суббота · 11:00', 'trialSummary', 'time']],
  },
  olderTime: {
    reply: ({ program }) => `«${program}». На пробном занятии группа собирает или рисует один небольшой проект. Когда удобнее?`,
    options: [['Четверг · 17:00', 'trialSummary', 'time'], ['Суббота · 14:00', 'trialSummary', 'time']],
  },
  schedule: {
    reply: 'Пример расписания: вторник 16:00 — математика, четверг 17:00 — лаборатория, пятница 16:00 — «Первые истории», суббота 11:00 — мастерская.',
    options: [['Подобрать по возрасту', 'age'], ['Что взять с собой?', 'trial']],
  },
  trial: {
    reply: 'Для пробного занятия подойдут сменная обувь и вода. Материалы для заданий предусмотрены, а после занятия можно поговорить с педагогом.',
    options: [['Выбрать программу', 'age'], ['Завершить просмотр', 'trialSummary']],
  },
  trialSummary: {
    reply: ({ program }) => program
      ? 'Проверьте сводку. Реальное место в группе в демо не бронируется.'
      : 'Вы посмотрели, как проходит пробное занятие. Начните заново, чтобы выбрать конкретную программу.',
    summary: { title: 'Пробное занятие', rows: [['Возраст', 'age'], ['Программа', 'program'], ['Время', 'time']] },
  },
};

const spa = {
  start: {
    reply: 'Добро пожаловать! Я демо-консьерж загородного отеля. Помогу собрать отдых, выбрать процедуру или уточнить трансфер.',
    options: [['Подобрать отдых', 'stay'], ['Выбрать процедуру', 'ritual'], ['Организовать трансфер', 'pickup']],
  },
  stay: {
    reply: 'С каким настроением вы едете?',
    options: [['Выходные вдвоём', 'couple', 'format'], ['Семейный отдых', 'family', 'format'], ['День восстановления', 'day', 'format']],
  },
  couple: {
    reply: 'Есть два примера для двоих: тихая термальная зона или вечер с банным ритуалом.',
    options: [['Тихие выходные · 2 ночи', 'period', 'package'], ['Банный уикенд · 2 ночи', 'period', 'package']],
  },
  family: {
    reply: 'Семье подойдёт формат с бассейном в первой половине дня или с прогулкой по территории.',
    options: [['Семейный бассейн · 2 ночи', 'period', 'package'], ['Лесной маршрут · 2 ночи', 'period', 'package']],
  },
  day: {
    reply: 'Если ночёвка не нужна, можно выбрать дневной доступ в термальную зону или сочетание с массажем.',
    options: [['Термальный день · 4 часа', 'period', 'package'], ['Спа-день с массажем · 4 часа', 'period', 'package']],
  },
  period: {
    reply: 'Какое время предпочтительнее? В демо даты условные.',
    options: [['Ближайшие выходные', 'stayTransfer', 'period'], ['Через две недели', 'stayTransfer', 'period'], ['Будние дни', 'stayTransfer', 'period']],
  },
  stayTransfer: {
    reply: 'Добавить встречу водителем или планируете добираться самостоятельно?',
    options: [['Добавить трансфер', 'pickup'], ['Самостоятельно', 'staySummary', 'pickup']],
  },
  ritual: {
    reply: 'Выберите процедуру. Длительность указана для примера.',
    options: [['Расслабляющий массаж · 50 минут', 'ritualTime', 'ritual'], ['Аромапарение · 40 минут', 'ritualTime', 'ritual'], ['Купель и отдых · 60 минут', 'ritualTime', 'ritual']],
  },
  ritualTime: {
    reply: 'В какой части дня вам удобнее пройти процедуру?',
    options: [['До обеда', 'staySummary', 'time'], ['После обеда', 'staySummary', 'time'], ['Вечером', 'staySummary', 'time']],
  },
  pickup: {
    reply: 'Откуда вас забрать? Для демонстрации достаточно выбрать точку из списка.',
    options: [['Из аэропорта', 'pickupGuests', 'pickup'], ['С железнодорожного вокзала', 'pickupGuests', 'pickup'], ['Из центра города', 'pickupGuests', 'pickup']],
  },
  pickupGuests: {
    reply: 'Сколько пассажиров будет в поездке?',
    options: [['1–2 гостя', 'staySummary', 'guests'], ['3–4 гостя', 'staySummary', 'guests'], ['5–6 гостей', 'staySummary', 'guests']],
  },
  staySummary: {
    reply: 'Проверьте сводку выбранных услуг. Заявка остаётся в демонстрации.',
    summary: { title: 'План отдыха', rows: [['Формат', 'format'], ['Пакет', 'package'], ['Период', 'period'], ['Процедура', 'ritual'], ['Время', 'time'], ['Трансфер', 'pickup'], ['Пассажиры', 'guests']] },
  },
};

const scenarios = { flowers, kids, spa };
const chat = document.querySelector('[data-bot]');
const nodes = scenarios[chat.dataset.bot];
const log = chat.querySelector('[data-log]');
const options = chat.querySelector('[data-chat-options]');
const progress = chat.querySelector('[data-progress]');
const back = chat.querySelector('[data-chat-back]');
const reset = chat.querySelector('[data-chat-reset]');
let history = [{ node: 'start', selection: {}, label: '' }];

function buildSummary({ title, rows }, selection) {
  const selected = rows.filter(([, key]) => selection[key]);
  if (selected.length === 0) return null;

  const card = document.createElement('aside');
  card.className = 'chat-summary';
  const heading = document.createElement('h3');
  heading.textContent = title;
  const details = document.createElement('dl');

  for (const [label, key] of selected) {
    const row = document.createElement('div');
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = selection[key];
    row.append(term, description);
    details.append(row);
  }

  card.append(heading, details);
  return card;
}

function appendMessage(text, own = false) {
  const bubble = document.createElement('p');
  bubble.className = own ? 'bot-message is-visitor' : 'bot-message';
  bubble.textContent = text;
  log.append(bubble);
}

function render({ rebuild = false, focus = true } = {}) {
  if (rebuild) log.replaceChildren();
  const last = history.at(-1);
  const messages = rebuild ? history : [last];

  for (const entry of messages) {
    if (entry.label) appendMessage(entry.label, true);
    const node = nodes[entry.node];
    const reply = typeof node.reply === 'function' ? node.reply(entry.selection) : node.reply;
    appendMessage(reply);
    const summary = node.summary && buildSummary(node.summary, entry.selection);
    if (summary) log.append(summary);
  }

  const step = nodes[last.node];
  const buttons = (step.options ?? []).map(([label, target, key]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.addEventListener('click', () => {
      const selection = key ? { ...last.selection, [key]: label } : last.selection;
      history.push({ node: target, selection, label });
      render();
    });
    return button;
  });

  options.replaceChildren(...buttons);
  const atStart = history.length === 1;
  back.disabled = atStart;
  reset.disabled = atStart;
  progress.textContent = buttons.length ? `Шаг ${history.length}` : 'Сценарий завершён';
  log.scrollTop = log.scrollHeight;
  if (focus) (buttons[0] ?? reset).focus({ preventScroll: true });
}

back.addEventListener('click', () => {
  history.pop();
  render({ rebuild: true });
});

reset.addEventListener('click', () => {
  history = history.slice(0, 1);
  render({ rebuild: true });
});

render({ rebuild: true, focus: false });
