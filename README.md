# Google Chat Cards
This package provides a simple interface to create [Google Chat Card](https://developers.google.com/chat/api/reference/rest/v1/cards) objects using a simple chained syntax.

For example, the following creates a robust card with a header, and a section containing rich-text with an icon, and a 
group of buttons that link the user to some URLs:
```js
import GoogleChatCard, { GoogleChatBuiltInIcon, GoogleChatImageType } from 'google-chat-cards';
...
let card = new GoogleChatCard()
    .header('My Cool Chat Card', 'Subtitles, yes!', GoogleChatImageType.circle, 'https://placekitten.com/128/128')
    .section('Information')
    .decoratedText(
        'Lorem <b>ipsum</b> <i>dolor<i> sit amet, <a href="https://google.com">consectetur</a> adipiscing elit.'
        true, //wrap
        'Fancy Text!', //top label
        null, //bottom label
        GoogleChatImageType.square, //icon crop
        GoogleChatBuiltInIcon.airplane //built-in icon
    )
    .button('Search', 'https://google.com')
    .button('Build', 'https://appku.com');
...
```

It's even easy to send your card to a Google Chat webhook!
```js
await card.send('https://chat.googleapis.com/v1/spaces/XXXX/messages?key=XXXXXX');
```

To keep your card organized, split widgets with a new `.section()`. You can also add a `.divider()` between sections.

## Supported Features
Currently this utility supports creating cards with the following widgets:

- [x] Headers ([`header`](https://developers.google.com/chat/api/reference/rest/v1/cards#cardheader))
- [x] Sections ([`sections`](https://developers.google.com/chat/api/reference/rest/v1/cards#section))
- [x] Text Paragraphs ([`textParagraph`](https://developers.google.com/chat/api/reference/rest/v1/cards#TextParagraph_1))
- [x] Rich-Text Paragraphs w/ Labels and Icons ([`decoratedText`](https://developers.google.com/chat/api/reference/rest/v1/cards#DecoratedText))
- [x] Images ([`image`](https://developers.google.com/chat/api/reference/rest/v1/cards#Image_1))
- [x] Buttons/ButtonList Linked ([`button`](https://developers.google.com/chat/api/reference/rest/v1/cards#button) automatically grouped in a [`buttonList`](https://developers.google.com/chat/api/reference/rest/v1/cards#ButtonList) when added consecutively)

### Future Features
The following don't currently have an interface.    
*Pull requests are welcome.*

- [ ] Grid ([`grid`](https://developers.google.com/chat/api/reference/rest/v1/cards#Grid))
- [ ] Column Support  [`columnItems`](https://developers.google.com/chat/api/reference/rest/v1/cards#Columns))

## Install
```sh
npm i google-chat-cards
#or
yarn install google-chat-cards
```

### Building & Testing
This project has no dependencies for runtime, but does for linting `npm run lint` and unit testing `npm test`. To
start developing loclaly, you'll need to install the dev-dependencies (`npm i`).

Public contributions are welcome.