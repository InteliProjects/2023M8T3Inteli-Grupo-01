const webhooks = require('node-webhooks');

class WebhookService {
    constructor() {
        this.webhook = new webhooks({
            db: { 'callback_hook': ['http://127.0.0.1:5000/ReceiveDescription'] }
        });
    }

    async sendTextHooks(dataText, requestId) {
        try {
            console.log(`Enviando texto para API Flask: ${dataText}`);
            await this.webhook.trigger('callback_hook', { new_description: dataText, requestId: requestId });
            return 'Texto enviado com sucesso para a API Flask';
        } catch (error) {
            console.error('Erro no webhook ao enviar o texto para a API Flask', error);
            throw new Error('Erro no webhook ao enviar o texto para a API Flask');
        }
    }
}

module.exports = new WebhookService();