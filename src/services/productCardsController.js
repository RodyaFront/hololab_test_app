export class productCardsController {
    static CARDS_URL = 'https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e';
    static async getCards() {
        const response = await fetch(this.CARDS_URL)
        if(!response) {
            return { ok: false }
        }
        try {
            return await response.json()
        } catch (e) {
            return {ok: false, error: 'parsing error'}
        }
    }
}
