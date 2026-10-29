const API_URL = 'https://script.google.com/macros/s/AKfycbyCFQq8PNkIpaZimtcXkprx4cWSD8uc-kUnx6gufb0emDjGbOAtNlsHMGcUUGXviioRBw/exec';

const form      = document.getElementById('form-inscription');
const messageEl = document.getElementById('message');
const btn       = document.getElementById('btn-submit');

function afficherMessage(texte, type = 'info') {
  messageEl.textContent = texte;
  messageEl.className   = 'message ' + type;
}

function afficherRemerciement(nom) {
  // On remplace le formulaire par un message de remerciement
  form.style.display = 'none';
  messageEl.className = 'message success';
  messageEl.innerHTML =
    '<div style="font-size:2.5rem;margin-bottom:10px;">🎉</div>' +
    '<strong style="font-size:1.2rem;display:block;margin-bottom:8px;"></strong>' +
    '<span style="color:#475569;">Votre inscription est bien confirmée. ' +
    'Bienvenue dans la communauté de L\'Œil du Numérique : vous recevrez bientôt ' +
    'l\'essentiel de l\'actualité tech directement dans votre boîte mail.</span>';
  // textContent pour éviter toute injection HTML via le nom
  messageEl.querySelector('strong').textContent = 'Merci ' + nom + ' !';
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
    // Requête "simple" (form-urlencoded) : pas de blocage CORS avec Apps Script
    const res  = await fetch(API_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'inscription', nom: nom, email: email })
    });
    const data = await res.json();

    if (data.result === 'success') {
      afficherRemerciement(nom);
      form.reset();
    } else {
      afficherMessage(data.message || 'Une erreur est survenue.', 'error');
    }
  } catch (err) {
    afficherMessage('Impossible de contacter le serveur. Réessayez dans un instant.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = "S'abonner";
  }
});
