import GoogleChatCard, { GoogleChatBuiltInIcon, GoogleChatImageType } from './index.js';
import fs from 'fs/promises';

describe('#constructor', () => {
    it('Creates a baseline card data object.', () => {
        expect(() => new GoogleChatCard()).not.toThrow();
        expect(new GoogleChatCard().data).toEqual({
            cardsV2: [
                {
                    card: { sections: [] }
                }
            ]
        });
    });
});

describe('JSON.stringify', () => {
    it('Returns the card object stringified.', async () => {
        let sample = new GoogleChatCard()
            .header('test')
            .section('test-section')
            .button('cool button', 'https://github.com/chriseaton/google-chat-cards');
        let result = JSON.parse(await fs.readFile('test/json.stringify.json', 'utf-8'));
        expect(JSON.stringify(sample)).toBe(JSON.stringify(result));
    });
});