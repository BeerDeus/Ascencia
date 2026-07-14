// ===== Écran de connexion : Google + Email/Mot de passe (sign in / sign up). =====
import { el } from '../utils/dom.js';
import { signInGoogle, signInEmail, signUpEmail, resetPassword } from '../firebase/auth.js';

// onSuccess() est appelé après connexion réussie (le boot s'occupe de la suite).
export function mountLoginScreen(container, onSuccess) {
  let mode = 'signin'; // 'signin' | 'signup'

  const errorBox = el('div.login-error', { style: 'display:none;' });
  const emailInput = el('input.login-input', { type: 'email', placeholder: 'Email', autocomplete: 'email' });
  const passInput = el('input.login-input', { type: 'password', placeholder: 'Mot de passe', autocomplete: 'current-password' });
  const submitBtn = el('button.btn-craft.login-submit', { text: 'Se connecter', type: 'submit' });
  const toggleLink = el('a.login-toggle', { href: '#', text: "Pas de compte ? S'inscrire" });
  const forgotLink = el('a.login-forgot', { href: '#', text: 'Mot de passe oublié ?' });
  const googleBtn = el('button.login-google', { text: 'Continuer avec Google', type: 'button' });

  function setBusy(busy) {
    submitBtn.disabled = busy ? 'true' : null;
    googleBtn.disabled = busy ? 'true' : null;
  }
  function showError(msg) { errorBox.textContent = msg; errorBox.style.display = ''; }
  function clearError() { errorBox.style.display = 'none'; }

  function syncMode() {
    submitBtn.textContent = mode === 'signin' ? 'Se connecter' : 'Créer le compte';
    passInput.autocomplete = mode === 'signin' ? 'current-password' : 'new-password';
    toggleLink.textContent = mode === 'signin' ? "Pas de compte ? S'inscrire" : 'Déjà un compte ? Se connecter';
  }

  toggleLink.onclick = (e) => { e.preventDefault(); mode = mode === 'signin' ? 'signup' : 'signin'; clearError(); syncMode(); };

  forgotLink.onclick = async (e) => {
    e.preventDefault();
    clearError();
    const email = emailInput.value.trim();
    if (!email) { showError("Entre ton email d'abord."); return; }
    setBusy(true);
    const r = await resetPassword(email);
    setBusy(false);
    showError(r.ok ? 'Email de réinitialisation envoyé.' : r.error);
  };

  googleBtn.onclick = async () => {
    clearError(); setBusy(true);
    const r = await signInGoogle();
    setBusy(false);
    if (r.ok) onSuccess(); else showError(r.error);
  };

  const form = el('form.login-form', {
    onsubmit: async (e) => {
      e.preventDefault();
      clearError();
      const email = emailInput.value.trim(), pass = passInput.value;
      if (!email || !pass) { showError('Email et mot de passe requis.'); return; }
      setBusy(true);
      const r = mode === 'signin' ? await signInEmail(email, pass) : await signUpEmail(email, pass);
      setBusy(false);
      if (r.ok) onSuccess(); else showError(r.error);
    },
  }, [emailInput, passInput, submitBtn, forgotLink]);

  syncMode();

  container.replaceChildren(
    el('div.login-screen', {}, [
      el('img.boot-logo-img', { src: 'logo.png', alt: 'Ascencia' }),
      el('div.login-intro', { text: 'Connecte-toi pour retrouver ta progression.' }),
      googleBtn,
      el('div.login-sep', { text: 'ou' }),
      form,
      toggleLink,
      errorBox,
    ]),
  );
}
