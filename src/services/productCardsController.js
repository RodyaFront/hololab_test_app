export class productCardsController {
    static async getCards() {
        const response = await fetch('https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e')
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
