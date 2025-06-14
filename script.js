const password = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

// Rule elements
const rules = {
  length: document.getElementById('length'),
  uppercase: document.getElementById('uppercase'),
  lowercase: document.getElementById('lowercase'),
  number: document.getElementById('number'),
  special: document.getElementById('special')
};

function updateRule(element, isValid) {
  element.classList.remove('valid', 'invalid');
  element.classList.add(isValid ? 'valid' : 'invalid');

  if (isValid) {
    element.classList.add('blink');
    setTimeout(() => element.classList.remove('blink'), 300);
  }
}

password.addEventListener('input', () => {
  const val = password.value;
  let strength = 0;

  const checks = {
    length: /.{8,}/.test(val),
    uppercase: /[A-Z]/.test(val),
    lowercase: /[a-z]/.test(val),
    number: /[0-9]/.test(val),
    special: /[^A-Za-z0-9]/.test(val)
  };

  for (let rule in checks) {
    updateRule(rules[rule], checks[rule]);
    if (checks[rule]) strength++;
  }

  const percent = (strength / 5) * 100;
  let color, text;
  if (strength <= 2) {
    color = 'red'; text = 'Weak';
  } else if (strength === 3 || strength === 4) {
    color = 'orange'; text = 'Moderate';
  } else {
    color = 'green'; text = 'Strong';
  }

  strengthBar.innerHTML = `<div style="height: 100%; width: ${percent}%; background: ${color}; border-radius: 5px;"></div>`;
  strengthText.textContent = text;
});

// Toggle password visibility
togglePassword.addEventListener('click', () => {
  const isVisible = password.type === 'text';
  password.type = isVisible ? 'password' : 'text';
  togglePassword.textContent = isVisible ? '👁️' : '🙈';
});
