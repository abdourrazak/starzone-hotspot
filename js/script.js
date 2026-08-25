/**
 * StarZone.Net - Script d'interface
 */

document.addEventListener("DOMContentLoaded", () => {
    
    const ticketForm = document.getElementById("ticketForm");
    const ticketCodeInput = document.getElementById("ticketCode");
    const formMessage = document.getElementById("formMessage");
    const buyTicketBtn = document.getElementById("buyTicketBtn");

    // Liste des codes de test valides
    const validTestCodes = ["STAR24", "STAR3J", "TEST123"];

    /**
     * Affiche un message dans le formulaire
     * @param {string} text - Le texte du message
     * @param {string} type - 'success' ou 'error'
     */
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
    }

    /**
     * Nettoie le message affiché
     */
    function clearMessage() {
        formMessage.className = "form-message";
        formMessage.textContent = "";
    }

    /**
     * Fonction destinée à être remplacée lors de l'intégration avec MikroTik
     * @param {string} ticket - Le code du ticket saisi
     */
    function authenticateWithMikroTik(ticket) {
        // TODO: Intégration réelle avec le HotSpot MikroTik
        // Exemple : soumission d'un formulaire caché POST vers l'URL de login MikroTik
        console.log("Tentative de connexion au routeur MikroTik avec le ticket :", ticket);
    }

    // Gestion de la soumission du formulaire
    if (ticketForm) {
        ticketForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Empêcher le rechargement de la page
            clearMessage();

            const code = ticketCodeInput.value.trim().toUpperCase();

            // Validation de base
            if (code === "") {
                showMessage("Veuillez saisir votre code ticket.", "error");
                ticketCodeInput.focus();
                return;
            }

            // Changer l'état du bouton (simulation de chargement)
            const submitBtn = ticketForm.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="btn-text"><span class="btn-title">CONNEXION...</span></div>';
            submitBtn.disabled = true;

            // Simulation d'un délai réseau (ex: 800ms)
            setTimeout(() => {
                // Logique de validation simulée
                if (validTestCodes.includes(code)) {
                    showMessage("✓ Code valide. Connexion en cours...", "success");
                    // Appel de la fonction préparée pour MikroTik
                    authenticateWithMikroTik(code);
                } else {
                    showMessage("✗ Code invalide ou expiré.", "error");
                }

                // Restaurer l'état du bouton
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
            }, 800);
        });
    }

    // Vider le message quand l'utilisateur commence à taper
    if (ticketCodeInput) {
        ticketCodeInput.addEventListener("input", clearMessage);
    }

    // Action pour le bouton "Acheter un ticket"
    if (buyTicketBtn) {
        buyTicketBtn.addEventListener("click", () => {
            // Animation ou scroll vers une section (simulation)
            const btnOriginalText = buyTicketBtn.querySelector('.btn-title').textContent;
            buyTicketBtn.querySelector('.btn-title').textContent = "REDIRECTION...";
            
            setTimeout(() => {
                // TODO: Ajouter le lien vers la page d'achat Mobile Money
                alert("Redirection vers la page de paiement Mobile Money...");
                buyTicketBtn.querySelector('.btn-title').textContent = btnOriginalText;
            }, 500);
        });
    }
});
