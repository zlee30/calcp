const exprEl   = document.getElementById('expr');
const resultEl = document.getElementById('result');

let expr = '';          // the expression being typed
let justEvaluated = false;

// ---------- helpers ----------
const isDigit = c => c >= '0' && c <= '9';
const isOp    = c => '+-*/'.includes(c);
const last    = () => expr.slice(-1);

function openParens() {
  let bal = 0;
  for (const c of expr) { if (c === '(') bal++; if (c === ')') bal--; }
  return bal;
}

function updateScreen(resultText) {
  // Pretty symbols for the screen
  const pretty = expr.replace(/\//g, '\u00F7').replace(/\*/g, '\u00D7');
  exprEl.textContent = pretty;
  if (resultText !== undefined) resultEl.textContent = resultText;
}

// ---------- input handling ----------
function press(key) {
  if (key === 'C')    return clearAll();
  if (key === 'back') return backspace();
  if (key === '=')    return evaluate();
  if (key === '()')   return paren();

  if (justEvaluated) {
    // After '=': typing a digit starts fresh; an operator continues from the result
    if (isDigit(key) || key === '.') expr = '';
    else if (resultEl.textContent !== 'Error') expr = resultEl.textContent;
    justEvaluated = false;
  }

  if (isDigit(key)) {
    if (last() === ')' || last() === '%') expr += '*';   // 2(3)4 -> implicit multiply
    expr += key;
  }
  else if (key === '.') {
    // only one decimal point per number
    const m = expr.match(/(\d*\.?\d*)$/);
    if (m && m[1].includes('.')) return;
    if (expr === '' || isOp(last()) || last() === '(') expr += '0';
    expr += '.';
  }
  else if (isOp(key)) {
    if (expr === '' && key !== '-') return;              // can't start with + * /
    if (isOp(last())) expr = expr.slice(0, -1) + key;    // replace operator
    else expr += key;
  }
  else if (key === '%') {
    if (isDigit(last()) || last() === ')') expr += '%';
  }
  updateScreen();
}

function paren() {
  const l = last();
  if (openParens() > 0 && (isDigit(l) || l === ')' || l === '%')) {
    expr += ')';
  } else {
    if (isDigit(l) || l === ')' || l === '%') expr += '*';  // implicit multiply
    expr += '(';
  }
  updateScreen();
}

function backspace() {
  if (justEvaluated) { justEvaluated = false; }
  expr = expr.slice(0, -1);
  updateScreen(expr === '' ? '0' : undefined);
}

function clearAll() {
  expr = '';
  justEvaluated = false;
  updateScreen('0');
}

// ---------- safe evaluation ----------
function evaluate() {
  if (expr === '') return;
  let s = expr;

  // close any unclosed parentheses
  s += ')'.repeat(openParens());
  // percent -> divide by 100
  s = s.replace(/%/g, '/100');
  // implicit multiplication: 2( -> 2*(   and   )2 -> )*2
  s = s.replace(/(\d|\))\(/g, '$1*(').replace(/\)(\d)/g, ')*$1');
  // strip trailing operators and remove empty () pairs
  s = s.replace(/[+\-*/.]+$/, '');
  while (s.includes('()')) s = s.replace(/\(\)/g, '');
  s = s.replace(/[+\-*/.]+$/, '');
  if (s === '') return;

  // whitelist check - only safe calculator characters allowed
  if (!/^[0-9+\-*/().]+$/.test(s)) return showError();

  let value;
  try { value = Function('"use strict"; return (' + s + ')')(); }
  catch (e) { return showError(); }

  if (typeof value !== 'number' || !isFinite(value)) return showError();

  // round away floating point noise (0.1+0.2 -> 0.3)
  value = Math.round(value * 1e10) / 1e10;
  let out = String(value);
  if (out.length > 14) out = value.toExponential(8);

  updateScreen(out);
  justEvaluated = true;
}

function showError() {
  updateScreen('Error');
  justEvaluated = true;
}

// ---------- wire up buttons ----------
document.querySelectorAll('.key').forEach(btn => {
  btn.addEventListener('click', () => press(btn.dataset.key));
});

// ---------- keyboard support ----------
document.addEventListener('keydown', e => {
  const k = e.key;
  let mapped = null;
  if (isDigit(k) || '+-*/.%'.includes(k)) mapped = k;
  else if (k === 'Enter' || k === '=') { mapped = '='; e.preventDefault(); }
  else if (k === 'Backspace') mapped = 'back';
  else if (k === 'Escape' || k.toLowerCase() === 'c') mapped = 'C';
  else if (k === '(' || k === ')') mapped = '()';
  if (mapped !== null) {
    press(mapped);
    const btn = document.querySelector('.key[data-key="' + CSS.escape(mapped) + '"]');
    if (btn) { btn.classList.add('pressed'); setTimeout(() => btn.classList.remove('pressed'), 120); }
  }
});

updateScreen('0');