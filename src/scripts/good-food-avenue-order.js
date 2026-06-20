/**
 * Good Food Avenue — Order Builder
 * Tap dishes to build a cart, open a detail modal, then compose a pre-filled
 * WhatsApp order. Vanilla JS, no deps. Price-optional: if items carry a numeric
 * data-price, the bar + message show a running total automatically.
 */
document.addEventListener('astro:page-load', () => {
  const section = document.getElementById('order-builder');
  const bar = document.getElementById('order-bar');
  const modal = document.getElementById('food-modal');
  if (!section || !bar || !modal) return;

  const wa = section.dataset.wa || '2348077125775';
  const cart = new Map(); // id -> { name, price, qty }
  const naira = (n) => '₦' + n.toLocaleString('en-NG');

  const chips = Array.from(section.querySelectorAll('.order-chip'));
  const items = Array.from(section.querySelectorAll('.order-item'));
  const countEl = bar.querySelector('.order-bar-count');
  const roundWa = document.querySelector('.sticky-wa-btn');

  // Paint any control scope (a card or the modal) to match a quantity.
  function paint(scope, qty) {
    const add = scope.querySelector('.oi-add');
    const step = scope.querySelector('.oi-step');
    const qtyEl = scope.querySelector('.oi-qty');
    if (qty > 0) { add.hidden = true; step.hidden = false; qtyEl.textContent = qty; }
    else { add.hidden = false; step.hidden = true; qtyEl.textContent = 0; }
  }

  function updateBar() {
    let units = 0, total = 0, priced = true;
    cart.forEach((v) => { units += v.qty; if (v.price == null) priced = false; else total += v.price * v.qty; });
    if (units === 0) {
      bar.classList.remove('is-active');
      if (roundWa) roundWa.classList.remove('is-hidden');
    } else {
      countEl.textContent = (units === 1 ? '1 item' : units + ' items') + (priced && total > 0 ? ' · ' + naira(total) : '');
      bar.classList.add('is-active');
      if (roundWa) roundWa.classList.add('is-hidden');
    }
  }

  function setQty(item, qty) {
    qty = Math.max(0, qty);
    const id = item.dataset.id;
    if (qty === 0) cart.delete(id);
    else cart.set(id, { name: item.dataset.name, price: item.dataset.price ? Number(item.dataset.price) : null, qty });
    item.classList.toggle('in-cart', qty > 0);
    paint(item.querySelector('.order-item-control'), qty);
    if (activeCard === item) paint(modalControl, qty);
    updateBar();
  }
  const qtyOf = (item) => cart.get(item.dataset.id)?.qty || 0;

  // ── Category filter ──
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
      chip.classList.add('is-active');
      chip.setAttribute('aria-selected', 'true');
      const cat = chip.dataset.cat;
      items.forEach((it) => { it.hidden = cat !== 'all' && it.dataset.cat !== cat; });
    });
  });

  // ── Per-card controls + open-modal ──
  items.forEach((item) => {
    const ctrl = item.querySelector('.order-item-control');
    ctrl.querySelector('.oi-add').addEventListener('click', (e) => { e.stopPropagation(); setQty(item, 1); });
    ctrl.querySelector('.oi-inc').addEventListener('click', (e) => { e.stopPropagation(); setQty(item, qtyOf(item) + 1); });
    ctrl.querySelector('.oi-dec').addEventListener('click', (e) => { e.stopPropagation(); setQty(item, qtyOf(item) - 1); });
    item.addEventListener('click', () => openModal(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(item); }
    });
  });

  // ── Modal ──
  const modalControl = document.getElementById('fm-control');
  const fmImg = document.getElementById('fm-img');
  let activeCard = null;
  let lastFocus = null;

  function openModal(item) {
    activeCard = item;
    lastFocus = item;
    document.getElementById('fm-cat').textContent = item.dataset.catlabel || '';
    document.getElementById('fm-name').textContent = item.dataset.name || '';
    document.getElementById('fm-desc').textContent = item.dataset.desc || '';
    if (item.dataset.img) { fmImg.style.backgroundImage = 'url("' + item.dataset.img + '")'; fmImg.classList.add('has-img'); }
    else { fmImg.style.backgroundImage = ''; fmImg.classList.remove('has-img'); }
    paint(modalControl, qtyOf(item));
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.food-modal-close').focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    activeCard = null;
    if (lastFocus) lastFocus.focus();
  }

  modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
  modalControl.querySelector('.oi-add').addEventListener('click', () => activeCard && setQty(activeCard, 1));
  modalControl.querySelector('.oi-inc').addEventListener('click', () => activeCard && setQty(activeCard, qtyOf(activeCard) + 1));
  modalControl.querySelector('.oi-dec').addEventListener('click', () => activeCard && setQty(activeCard, qtyOf(activeCard) - 1));

  // ── Order bar: clear + send ──
  bar.querySelector('.order-bar-clear').addEventListener('click', () => {
    cart.clear();
    items.forEach((it) => { it.classList.remove('in-cart'); paint(it.querySelector('.order-item-control'), 0); });
    if (activeCard) paint(modalControl, 0);
    updateBar();
  });

  bar.querySelector('.order-bar-send').addEventListener('click', () => {
    if (cart.size === 0) return;
    const lines = [];
    let total = 0, priced = true;
    cart.forEach((v) => { lines.push('• ' + v.qty + '× ' + v.name); if (v.price == null) priced = false; else total += v.price * v.qty; });
    let msg = "Hi Good Food Avenue! I'd like to place an order:\n\n" + lines.join('\n');
    msg += priced && total > 0
      ? '\n\nTotal: ' + naira(total) + '\n\nPlease confirm availability. Thank you!'
      : '\n\nPlease confirm availability and total. Thank you!';
    window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
});
