
function openDemoDialog(button) {
  let dialog = document.querySelector('.demo-dialog');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.className = 'demo-dialog panel';
    dialog.setAttribute('aria-labelledby', 'demo-dialog-title');
    dialog.innerHTML = `
      <h2 id="demo-dialog-title"></h2>
      <p class="muted" data-dialog-description></p>
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

    dialog.querySelector('form').addEventListener('submit', (event) => {
      if (event.submitter?.value !== 'confirm') return;
      event.preventDefault();
      const selection = dialog.querySelector('select').value;
      dialog.querySelector('[data-dialog-description]').textContent =
        `Выбрано: ${selection}. Это демонстрация, данные никуда не отправлены.`;
      dialog.querySelector('label').hidden = true;
      event.submitter.hidden = true;
      dialog.querySelector('[value="close"]').focus();
    });
  }

  dialog.querySelector('h2').textContent = button.textContent.trim();
  dialog.querySelector('[data-dialog-description]').textContent = button.dataset.demo;
  const choices = button.dataset.choices?.split('|') ?? [];
  dialog.querySelector('[data-dialog-label]').textContent = button.dataset.choiceLabel ?? '';
  dialog.querySelector('select').replaceChildren(...choices.map(text => new Option(text)));
  dialog.querySelector('label').hidden = !choices.length;
  dialog.querySelector('[value="confirm"]').hidden = !choices.length;
  dialog.showModal();
}

document.addEventListener('click', (e) => {
  const demo = e.target.closest('[data-demo]');
  if (demo) openDemoDialog(demo);

  const saveBouquet = e.target.closest('[data-save-bouquet]');
  if (saveBouquet) {
    const rows = document.querySelectorAll('#builder tr');
    const bouquet = Array.from(rows, row =>
      Array.from(row.cells, cell => cell.textContent.trim()).join(' — ')
    ).join('\n');
    const url = URL.createObjectURL(new Blob([`Maison Bloom\n\n${bouquet}\n`], { type: 'text/plain;charset=utf-8' }));
    const download = document.createElement('a');
    download.href = url;
    download.download = 'maison-bloom-bouquet.txt';
    download.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const btn = e.target.closest('[data-tab]');
  if (btn) {
    const wrap = btn.closest('[data-tabs-wrap]');
    if (!wrap) return;
    wrap.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    wrap.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const pane = wrap.querySelector(`#${btn.dataset.tab}`);
    if (pane) pane.classList.add('active');
  }
  const step = e.target.closest('[data-add-msg]');
  if (step) {
    const log = document.querySelector(step.dataset.target);
    if (!log) return;
    const text = step.dataset.addMsg || 'Готово';
    const reply = step.dataset.reply || '';
    const me = document.createElement('div');
    me.className = 'msg self';
    me.textContent = text;
    log.appendChild(me);
    if (reply) {
      setTimeout(() => {
        const bot = document.createElement('div');
        bot.className = 'msg alt';
        bot.textContent = reply;
        log.appendChild(bot);
        bot.scrollIntoView({behavior:'smooth', block:'end'});
      }, 450);
    }
    me.scrollIntoView({behavior:'smooth', block:'end'});
  }
});
