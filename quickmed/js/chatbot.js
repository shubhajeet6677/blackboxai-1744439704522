// AI Health Assistant functionality
class HealthAssistant {
    constructor() {
        this.conversations = [];
        this.isOpen = false;
    }

    // Initialize chatbot UI
    init() {
        this.createChatInterface();
        this.attachEventListeners();
    }

    // Create chat interface
    createChatInterface() {
        const chatHTML = `
            <div id="chatbot" class="fixed bottom-4 right-4 z-50">
                <!-- Chat Toggle Button -->
                <button id="chatToggle" class="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-teal-800">
                    <i class="fas fa-comment-medical text-xl"></i>
                </button>

                <!-- Chat Window -->
                <div id="chatWindow" class="hidden absolute bottom-16 right-0 w-96 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
                    <!-- Header -->
                    <div class="p-4 bg-primary text-white rounded-t-lg flex justify-between items-center">
                        <div>
                            <h3 class="font-semibold">AI Health Assistant</h3>
                            <p class="text-sm text-white/80">Ask me anything about your health</p>
                        </div>
                        <button id="chatClose" class="text-white/80 hover:text-white">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Messages Container -->
                    <div id="chatMessages" class="h-96 overflow-y-auto p-4 space-y-4"></div>

                    <!-- Quick Actions -->
                    <div class="p-4 border-t border-slate-200 dark:border-slate-700">
                        <div class="flex flex-wrap gap-2">
                            <button class="quick-action px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600">
                                Common cold symptoms
                            </button>
                            <button class="quick-action px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600">
                                Headache remedies
                            </button>
                            <button class="quick-action px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600">
                                Prescription reminder
                            </button>
                        </div>
                    </div>

                    <!-- Input Area -->
                    <div class="p-4 border-t border-slate-200 dark:border-slate-700">
                        <form id="chatForm" class="flex gap-2">
                            <input type="text" 
                                   class="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:border-primary"
                                   placeholder="Type your health query...">
                            <button type="submit" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-teal-800">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        // Add chat interface to body
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    // Attach event listeners
    attachEventListeners() {
        const chatToggle = document.getElementById('chatToggle');
        const chatClose = document.getElementById('chatClose');
        const chatWindow = document.getElementById('chatWindow');
        const chatForm = document.getElementById('chatForm');
        const quickActions = document.querySelectorAll('.quick-action');

        chatToggle.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.toggleChat());
        chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
        quickActions.forEach(button => {
            button.addEventListener('click', () => this.handleQuickAction(button.textContent.trim()));
        });
    }

    // Toggle chat window
    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        this.isOpen = !this.isOpen;
        chatWindow.classList.toggle('hidden');
    }

    // Handle message submission
    handleSubmit(e) {
        e.preventDefault();
        const input = e.target.querySelector('input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage('user', message);
            this.processQuery(message);
            input.value = '';
        }
    }

    // Handle quick action clicks
    handleQuickAction(action) {
        this.addMessage('user', action);
        this.processQuery(action);
    }

    // Add message to chat
    addMessage(sender, text) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageHTML = `
            <div class="flex ${sender === 'user' ? 'justify-end' : 'justify-start'}">
                <div class="${sender === 'user' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white'} 
                            max-w-[80%] rounded-lg px-4 py-2">
                    ${text}
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Process user query
    async processQuery(query) {
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        let response;
        query = query.toLowerCase();

        if (query.includes('cold') || query.includes('cough')) {
            response = "Based on common cold symptoms, I recommend: \n1. Rest and hydration\n2. Over-the-counter medications like:\n   - Paracetamol for fever\n   - Antihistamines for runny nose\n   - Throat lozenges for sore throat\nWould you like me to show available medications?";
        } else if (query.includes('headache')) {
            response = "For headache relief, I suggest:\n1. Paracetamol or Ibuprofen\n2. Rest in a quiet, dark room\n3. Stay hydrated\n4. Consider triggers (stress, eye strain)\nShall I show you available pain relievers?";
        } else if (query.includes('prescription') || query.includes('reminder')) {
            response = "I can help you set up medication reminders. Would you like to:\n1. Set up daily reminders\n2. Get refill alerts\n3. Track your medication schedule";
        } else {
            response = "I'm here to help with your health queries. You can ask about:\n- Symptoms and remedies\n- Medicine information\n- Setting medication reminders\n- Health tips and advice";
        }

        this.addMessage('assistant', response);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.healthAssistant = new HealthAssistant();
    window.healthAssistant.init();
});
