const currency = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

function createDemoDialog() {
  const dialog = document.createElement('dialog');
  dialog.className = 'demo-dialog panel';
  dialog.setAttribute('aria-labelledby', 'demo-dialog-title');
  dialog.innerHTML = `
    <h2 id="demo-dialog-title"></h2>
    <p class="muted" data-dialog-description></p>
    <p data-dialog-result role="status" hidden></p>
    <form method="dialog">
      <label>
        <span data-dialog-label></span>
        <select></select>
      </label>
      <div class="hero-actions">
        <button class="btn" type="submit" value="confirm">Подтвердить в демо</button>
        <button class="ghost" type="submit" value="close">Закрыть</button>
      </div>
    </form>`;
  document.body.append(dialog);

  dialog.querySelector('form').addEventListener('submit', event => {
    if (event.submitter?.value !== 'confirm') return;

    event.preventDefault();
    const result = dialog.querySelector('[data-dialog-result]');
    result.textContent = `Выбрано: ${dialog.querySelector('select').value}. Это демонстрация. Данные не отправлены.`;
    result.hidden = false;
    dialog.querySelector('label').hidden = true;
    event.submitter.hidden = true;
    dialog.querySelector('[value="close"]').focus();
  });
  return dialog;
}

function openDemoDialog(title, description, label, choices) {
  const dialog = document.querySelector('.demo-dialog') ?? createDemoDialog();
  dialog.querySelector('h2').textContent = title;
  dialog.querySelector('[data-dialog-description]').textContent = description;
  dialog.querySelector('[data-dialog-result]').hidden = true;
  dialog.querySelector('[data-dialog-label]').textContent = label;
  dialog.querySelector('select').replaceChildren(...choices.map(text => new Option(text)));
  dialog.querySelector('label').hidden = choices.length === 0;
  dialog.querySelector('[value="confirm"]').hidden = choices.length === 0;
  dialog.showModal();
}

for (const catalog of document.querySelectorAll('[data-catalog]')) {
  const filters = Array.from(catalog.querySelectorAll('[data-filter]'));
  const cards = Array.from(catalog.querySelectorAll('[data-category]'));
  const count = catalog.querySelector('[data-catalog-count]');
  catalog.querySelector('.catalog-controls').hidden = false;

  for (const filter of filters) {
    filter.addEventListener('click', () => {
      const category = filter.dataset.filter;
      filters.forEach(button => button.setAttribute('aria-pressed', String(button === filter)));
      cards.forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
      });
      const visible = cards.filter(card => !card.hidden).length;
      count.textContent = `Показано ${visible} из ${cards.length}`;
    });
  }
}

const estimator = document.querySelector('[data-estimate]');
if (estimator) {
  const product = estimator.querySelector('[data-estimate-product]');
  const quantity = estimator.querySelector('[data-estimate-quantity]');
  const extras = Array.from(estimator.querySelectorAll('[data-extra]'));
  const output = estimator.querySelector('output');

  function updateEstimate() {
    const units = Number(quantity.value);
    const base = Number(product.selectedOptions[0].dataset.price) * units;
    const added = extras.reduce((total, option) => {
      const multiplier = option.hasAttribute('data-order-extra') ? 1 : units;
      return total + Number(option.value) * multiplier;
    }, 0);
    output.value = currency.format(base + added);
  }

  function describeEstimate() {
    const selection = [product, ...extras].map(select => select.selectedOptions[0].textContent.trim());
    return [...selection, `Количество: ${quantity.value}`, `Ориентировочная стоимость: ${output.value}`];
  }

  estimator.addEventListener('change', updateEstimate);
  updateEstimate();

  for (const item of document.querySelectorAll('[data-estimate-item]')) {
    item.addEventListener('click', () => {
      product.value = item.dataset.estimateItem;
      updateEstimate();
    });
  }

  for (const item of document.querySelectorAll('[data-estimate-option]')) {
    item.addEventListener('click', () => {
      const value = item.dataset.estimateOption;
      const select = extras.find(field => Array.from(field.options).some(option => option.value === value));
      if (select) {
        select.value = value;
        updateEstimate();
      }
    });
  }

  const request = estimator.querySelector('[data-estimate-request]');
  request.addEventListener('click', () => {
    const flowers = request.dataset.requestKind === 'flowers';
    const choices = flowers ? ['Утро', 'День', 'Вечер'] : ['Будни, до 12:00', 'Будни, после 12:00', 'Выходные'];
    openDemoDialog(request.textContent.trim(), describeEstimate().join('. '), 'Удобное время', choices);
  });

  const save = estimator.querySelector('[data-save-estimate]');
  save?.addEventListener('click', () => {
    const summary = [estimator.dataset.document, ...describeEstimate(), 'Демонстрационный расчёт.'].join('\n');
    const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'maison-bloom-bouquet.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}

for (const button of document.querySelectorAll('[data-demo]')) {
  button.addEventListener('click', () => {
    const { demo, choiceLabel = '', choices } = button.dataset;
    openDemoDialog(button.textContent.trim(), demo, choiceLabel, choices?.split('|') ?? []);
  });
}
