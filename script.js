// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Supprimer ce gestionnaire qui entre en conflit
// document.getElementById('contact-form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     alert('Message envoyé ! (Simulation)');
//     this.reset();
// });

function sendEmail(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const templateParams = {
        to_name: "PreventPain",
        from_name: formData.get('name'),
        name: formData.get('name'),
        company: formData.get('company'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        siteType: formData.get('siteType'),
        package: formData.get('package'),
        features: Array.from(formData.getAll('features')).join(', '),
        description: formData.get('description'),
        deadline: formData.get('deadline')
    };

    console.log('Envoi des données:', templateParams);

    emailjs.send('service_ijxa1z3', 'template_m5nkr64', templateParams, 'IzHR-2Y94KusMvNb0')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Une erreur est survenue. Veuillez nous contacter par téléphone.');
        });
}

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('hidden');
}

// Modifier la constante pour utiliser la clé Claude
const CLAUDE_API_KEY = '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';

// Modifier la fonction sendChatMessage
async function sendChatMessage(e) {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    const chatMessages = document.getElementById('chatMessages');
    
    // Afficher le message de l'utilisateur
    chatMessages.innerHTML += `
        <div class="mb-4">
            <div class="flex items-start space-x-2 justify-end">
                <div class="bg-sky-600 text-white p-3 rounded-lg shadow-sm max-w-xs">
                    ${message}
                </div>
                <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
            </div>
        </div>
    `;

    // Simuler un délai de réponse
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Logique de réponse basée sur les mots-clés
    const messageLower = message.toLowerCase();
    console.log('Message reçu:', messageLower); // Debug log

    let response = '';

    // Mots-clés pour chaque catégorie
    const keywords = {
        prix: ['prix', 'tarif', 'coût', 'combien', 'montant', 'payer', 'dollar', '$'],
        delai: ['délai', 'temps', 'durée', 'quand', 'livraison', 'jour'],
        avantages: ['inclus', 'avantage', 'service', 'compris', 'bénéfice', 'offre'],
        paiement: ['paiement', 'crédit', 'mensualité', 'mois', 'payer', 'acompte'],
        contact: ['contact', 'whatsapp', 'téléphone', 'appeler', 'joindre', 'numéro'],
        bonjour: ['bonjour', 'salut', 'hello', 'hi', 'bonsoir', 'hey']
    };

    // Vérifier chaque catégorie de mots-clés
    let matched = false;

    if (keywords.prix.some(word => messageLower.includes(word))) {
        response = `Voici nos tarifs mensuels sur 10 mois :
        - Site vitrine (5 pages) : 15$ par mois
        - Site blog : 20$ par mois
        - Site e-commerce : 34$ par mois
        Pour un site sur mesure, contactez-nous sur WhatsApp au +243 819 301 875.`;
        matched = true;
    }
    
    if (keywords.delai.some(word => messageLower.includes(word))) {
        response = "Nous livrons votre site web dans un délai de 3 à 6 jours ouvrables.";
        matched = true;
    }
    
    if (keywords.avantages.some(word => messageLower.includes(word))) {
        response = `Tous nos forfaits incluent :
        - Certificat SSL
        - Optimisation SEO
        - Hébergement
        - Nom de domaine
        - Support technique`;
        matched = true;
    }
    
    if (keywords.paiement.some(word => messageLower.includes(word))) {
        response = "Nous proposons un paiement échelonné sur 10 mois, sans frais supplémentaires. Vous commencez à payer dès la livraison de votre site.";
        matched = true;
    }
    
    if (keywords.contact.some(word => messageLower.includes(word))) {
        response = "Vous pouvez nous contacter directement sur WhatsApp au +243 819 301 875 pour discuter de votre projet.";
        matched = true;
    }

    if (keywords.bonjour.some(word => messageLower.includes(word))) {
        response = "Bonjour! Je suis l'assistant PreventPain. Je peux vous renseigner sur nos forfaits de création de sites web à crédit, nos tarifs et nos services. Comment puis-je vous aider?";
        matched = true;
    }
    
    // Si aucun mot-clé n'est trouvé
    if (!matched) {
        response = "Je peux vous renseigner sur nos tarifs, nos délais de livraison, les avantages inclus et nos modalités de paiement. N'hésitez pas à me poser des questions précises!";
    }

    console.log('Réponse:', response); // Debug log

    // Afficher la réponse
    chatMessages.innerHTML += `
        <div class="mb-4">
            <div class="flex items-start space-x-2">
                <div class="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">
                    P
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                    ${response}
                </div>
            </div>
        </div>
    `;

    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
} 