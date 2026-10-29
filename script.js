const form      = document.getElementById('form-inscription');
const messageEl = document.getElementById('message');
const btn       = document.getElementById('btn-submit');
const iframe    = document.getElementById('hidden_iframe');

function afficherMessage(texte, type = 'info') {
  messageEl.textContent = texte;
  messageEl.className   = 'message ' + type;
}

// Quand on soumet le formulaire, on affiche "Envoi en cours..."
form.addEventListener('submit', (e) => {
  const nom   = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();

  // Validation basique avant l'envoi
  if (nom.length < 2) {
    e.preventDefault(); // On bloque l'envoi
    return afficherMessage('Veuillez saisir un nom valide.', 'error');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    e.preventDefault();
    return afficherMessage('Adresse email invalide.', 'error');
  }

  // Si c'est bon, le formulaire part vers l'iframe
  btn.disabled = true;
  btn.textContent = 'Envoi en cours…';
  afficherMessage('');
});

// Quand l'iframe a fini de charger la réponse du serveur
iframe.addEventListener('load', () => {
  try {
    // On récupère le texte JSON renvoyé par Apps Script
    const reponse = iframe.contentDocument.body.innerText;
    
    // On vérifie qu'on a bien reçu une réponse
    if (reponse && reponse.includes('result')) {
      const data = JSON.parse(reponse);
      
      if (data.result === 'success') {
        afficherMessage(data.message, 'success');
        form.reset(); // On vide le formulaire
      } else {
        afficherMessage(data.message, 'error');
      }
    }
  } catch (err) {
    console.log("En attente de réponse...");
  } finally {
    // On réactive le bouton dans tous les cas
    btn.disabled = false;
    btn.textContent = "S'abonner";
  }
});