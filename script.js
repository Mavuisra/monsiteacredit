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

function sendChatMessage(e) {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    const chatMessages = document.getElementById('chatMessages');
    
    // Message de l'utilisateur
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

    // Réponse automatique
    setTimeout(() => {
        chatMessages.innerHTML += `
            <div class="mb-4">
                <div class="flex items-start space-x-2">
                    <div class="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">
                        P
                    </div>
                    <div class="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                        Merci pour votre message. Un de nos agents vous répondra bientôt. Pour une réponse immédiate, appelez-nous au +243 819 301 875.
                    </div>
                </div>
            </div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
} 