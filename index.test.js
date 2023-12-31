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

describe('#reset', () => {
    it('Resets the data object back to an initial state.', () => {
        let sample = new GoogleChatCard().header('Test');
        expect(sample.data).not.toEqual(new GoogleChatCard().data);
        sample.reset();
        expect(sample.data).toEqual(new GoogleChatCard().data);
    });
});

describe('#toJSON', () => {
    it('Returns the data object of the card.', async () => {
        let sample = new GoogleChatCard()
            .header('test')
            .section('test-section')
            .button('cool button', 'https://github.com/chriseaton/google-chat-cards');
        expect(sample.data).toEqual(sample.toJSON());
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