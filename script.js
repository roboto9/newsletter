const API_URL = 'https://script.google.com/macros/s/AKfycbyCFQq8PNkIpaZimtcXkprx4cWSD8uc-kUnx6gufb0emDjGbOAtNlsHMGcUUGXviioRBw/exec';

const form      = document.getElementById('form-inscription');
const messageEl = document.getElementById('message');
const btn       = document.getElementById('btn-submit');

function afficherMessage(texte, type = 'info') {
  messageEl.textContent = texte;
  messageEl.className   = 'message ' + type;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nom   = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();

  if (nom.length < 2) {
    return afficherMessage('Veuillez saisir un nom valide.', 'error');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return afficherMessage('Adresse email invalide.', 'error');
  }

  btn.disabled = true;
  btn.textContent = 'Envoi en cours…';
  afficherMessage('');

  try {
    // Modification : Construction manuelle de la chaîne de caractères
    const bodyData = `action=inscription&nom=${encodeURIComponent(nom)}&email=${encodeURIComponent(email)}`;

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: bodyData
    });

    const data = await res.json();

    if (data.result === 'success') {
      afficherMessage(data.message, 'success');
      form.reset();
    } else {
      afficherMessage(data.message, 'error');
    }
  } catch (err) {
    console.error(err);
    afficherMessage('Erreur réseau. Réessayez plus tard.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = "S'abonner";
  }
});
