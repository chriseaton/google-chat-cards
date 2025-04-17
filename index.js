
/**
 * @enum {String}
 */
const GoogleChatImageType = {
    square: 'SQUARE',
    circle: 'CIRCLE',
};

/**
 * @enum {String}
 */
const GoogleChatBuiltInIcon = {
    airplane: 'AIRPLANE',
    bookmark: 'BOOKMARK',
    bus: 'BUS',
    car: 'CAR',
    clock: 'CLOCK',
    confirmationNumber: 'CONFIRMATION_NUMBER_ICON',
    description: 'DESCRIPTION',
    dollar: 'DOLLAR',
    email: 'EMAIL',
    event_seat: 'EVENT_SEAT',
    flightArrival: 'FLIGHT_ARRIVAL',
    flightDeparture: 'FLIGHT_DEPARTURE',
    hotel: 'HOTEL',
    hotelRoomType: 'HOTEL_ROOM_TYPE',
    invite: 'INVITE',
    mapPin: 'MAP_PIN',
    membership: 'MEMBERSHIP',
    multiplePeople: 'MULTIPLE_PEOPLE',
    person: 'PERSON',
    phone: 'PHONE',
    restaurant: 'RESTAURANT_ICON',
    shoppingCart: 'SHOPPING_CART',
    star: 'STAR',
    store: 'STORE',
    ticket: 'TICKET',
    train: 'TRAIN',
    videoCamera: 'VIDEO_CAMERA',
    videoPlay: 'VIDEO_PLAY'
};

/**
 * Represents a Google Chat card (v2).
 * @see https://developers.google.com/chat/api/reference/rest/v1/cards
 */
class GoogleChatCard {
    /**
     * Creates an instance of `GoogleChatCard`.
     */
    constructor() {

        /**
         * The Google Chat Card object.
         * @private
         */
        this.data = null;

        //init
        this.reset();
    }

    /**
     * Sets the card header title with other additional attributes (sub-title, image URL, etc.).
     * @param {String} title - Required. The title of the card header. The header has a fixed height: if both a title 
     * and subtitle are specified, each takes up one line. If only the title is specified, it takes up both lines.
     * @param {String} [subtitle] - The subtitle of the card header. If specified, appears on its own line below the
     * title.
     * @param {GoogleChatImageType} [imageType] - The crop style applied to the image.
     * @param {String} [imageURL] - The HTTPS URL of the image in the card header.
     * @param {String} [imageAltText] - The alternative text of this image that's used for accessibility.
     * @returns {GoogleChatCard}
     */
    header(title, subtitle, imageType, imageURL, imageAltText) {
        if (!title || typeof title !== 'string') {
            throw new Error('A valid "title" string argument is required.');
        }
        this.data.cardsV2[0].card.header = { title, subtitle, imageType, imageUrl: imageURL, imageAltText };
        return this;
    }

    /**
     * Creates a new section in the card, making it the section that new widgets will be added too.
     * @param {String} [title] - Text that appears at the top of a section. Supports simple HTML formatted text.
     * @param {Boolean} [collapsible] - Indicates whether this section is collapsible.
     * @param {Number} [uncollapsibleWidgetsCount] - The number of uncollapsible widgets which remain visible even 
     * when a section is collapsed.
     * @returns {GoogleChatCard}
     */
    section(title, collapsible, uncollapsibleWidgetsCount) {
        this.data.cardsV2[0].card.sections.push({
            header: title,
            widgets: [],
            collapsible,
            uncollapsibleWidgetsCount
        });
        return this;
    }

    /**
     * Adds a divider widget to the current section which displays a horizontal line between widgets.
     * @returns {GoogleChatCard}
     */
    divider() {
        if (!this.data.cardsV2[0].card.sections || this.data.cardsV2[0].card.sections.length === 0) {
            throw new Error('A section is required.');
        }
        let section = this.data.cardsV2[0].card.sections[this.data.cardsV2[0].card.sections.length - 1];
        section.widgets.push({ divider: {} });
        return this;
    }

    /**
     * Adds an image widget to the current section.
     * @param {String} imageURL - The HTTPS URL that hosts the image.
     * @param {String} [altText] - The alternative text of this image that's used for accessibility.
     * @param {String} [linkURL] - A URL to navigate to when the image is clicked.
     * @returns {GoogleChatCard}
     */
    image(imageURL, altText, linkURL) {
        if (!this.data.cardsV2[0].card.sections || this.data.cardsV2[0].card.sections.length === 0) {
            throw new Error('A section is required.');
        }
        if (!imageURL || typeof imageURL !== 'string') {
            throw new Error('A valid "imageUrl" string argument is required.');
        }
        let section = this.data.cardsV2[0].card.sections[this.data.cardsV2[0].card.sections.length - 1];
        let img = { image: {
            imageUrl: imageURL,
            altText
        } };
        if (linkURL) {
            img.image.onClick = {
                openLink: {
                    url: linkURL
                }
            };
        }
        section.widgets.push(img);
        return this;
    }

    /**
     * Adds text to the current section.
     * @param {String} text - The text that's shown in the widget.
     * @returns {GoogleChatCard}
     */
    textParagraph(text) {
        if (!this.data.cardsV2[0].card.sections || this.data.cardsV2[0].card.sections.length === 0) {
            throw new Error('A section is required.');
        }
        if (!text || typeof text !== 'string') {
            throw new Error('A valid "text" string argument is required.');
        }
        let section = this.data.cardsV2[0].card.sections[this.data.cardsV2[0].card.sections.length - 1];
        section.widgets.push({ textParagraph: { text } });
        return this;
    }

    /**
     * Adds decorated text (optional labels and icon) to the current section.
     * @param {String} text - Required. The primary text.
     * @param {Boolean} [wrapText] - The wrap text setting. If `true`, the text wraps and displays on multiple lines.
     * @param {String} [topLabel] - The text that appears above text. Always truncates.
     * @param {String} [bottomLabel] - The text that appears below text. Always wraps.
     * @param {GoogleChatImageType} [imageType] - The crop style applied to the image.
     * @param {String | GoogleChatBuiltInIcon} [iconURL] - URL to an icon shown before the text. Alternatively can be
     * a built-in icon name.
     * @param {String} [iconAlt] - The alternative text of this image that's used for accessibility.
     * @returns {GoogleChatCard}
     */
    decoratedText(text, wrapText, topLabel, bottomLabel, imageType, iconURL, iconAlt) {
        if (!this.data.cardsV2[0].card.sections || this.data.cardsV2[0].card.sections.length === 0) {
            throw new Error('A section is required.');
        }
        if (!text || typeof text !== 'string') {
            throw new Error('A valid "text" string argument is required.');
        }
        let section = this.data.cardsV2[0].card.sections[this.data.cardsV2[0].card.sections.length - 1];
        let dt = { decoratedText: {
            text, wrapText, topLabel, bottomLabel
        } };
        if (iconURL) {
            dt.decoratedText.startIcon = {
                imageType,
                iconUrl: iconURL,
                altText: iconAlt
            };
            if (Object.values(GoogleChatBuiltInIcon).some(i => i === iconURL)) {
                delete dt.decoratedText.startIcon.iconUrl;
                dt.decoratedText.startIcon.knownIcon = iconURL;
            }
        }
        section.widgets.push(dt);
        return this;
    }

    /**
     * Adds a button to the current section as part of a button list.
     * @param {String} text - Required. The primary text of the button.
     * @param {String} linkURL - Required. The URL navigated to when the button is clicked.
     * @param {GoogleChatImageType} [imageType] - The crop style applied to the image.
     * @param {String | GoogleChatBuiltInIcon} [iconURL] - URL to an icon shown before the text. Alternatively can be
     * a built-in icon name.
     * @param {String} [iconAlt] - The alternative text of this image that's used for accessibility.
     * @returns {GoogleChatCard}
     */
    button(text, linkURL, imageType, iconURL, iconAlt) {
        if (!this.data.cardsV2[0].card.sections || this.data.cardsV2[0].card.sections.length === 0) {
            throw new Error('A section is required.');
        }
        if (!text || typeof text !== 'string') {
            throw new Error('A valid "text" string argument is required.');
        }
        if (!linkURL || typeof linkURL !== 'string') {
            throw new Error('A valid "linkURL" string argument is required.');
        }
        let section = this.data.cardsV2[0].card.sections[this.data.cardsV2[0].card.sections.length - 1];
        //check if last widget is a buttonList.
        let buttonList = null;
        if (section.widgets.length && typeof section.widgets[section.widgets.length - 1].buttonList === 'object') {
            buttonList = section.widgets[section.widgets.length - 1];
        } else {
            //create new buttonlist widget.
            buttonList = { buttonList: {buttons: []}};
            section.widgets.push(buttonList);
        }
        let button = {
            text,
            onClick: {
                openLink: {
                    url: linkURL
                }
            }
        };
        if (iconURL) {
            button.icon = {
                imageType,
                iconUrl: iconURL,
                altText: iconAlt
            };
            if (Object.values(GoogleChatBuiltInIcon).some(i => i === iconURL)) {
                delete button.icon.iconUrl;
                button.icon.knownIcon = iconURL;
            }
        }
        buttonList.buttonList.buttons.push(button);
        return this;
    }

    /**
     * Adds a simple message above the card. This can only be specificied once per card (chat message), so any
     * subsequent calls will overwrite the previous message.
     * 
     * This text allows you to include mentions for users in the format of `<users/userId>`, where `userId` is the
     * Google Chat user ID. This will send a notification to the mentioned user from the space.
     * @param {String} simpleMessage - The simple message to be displayed above the card.
     */
    text(simpleMessage) {
        this.data.text = simpleMessage;
        return this;
    }

    /**
     * Resets the card back to it's original (blank) configuration. All widgets, headers, etc. are cleared.
     * @returns {GoogleChatCard}
     */
    reset() {
        this.data = {
            cardsV2: [
                {
                    card: { sections: [] }
                }
            ]
        };
        return this;
    }

    /**
     * Returns the constructed Card object for use in `JSON.stringify` calls.
     * @returns {*}
     */
    toJSON() {
        return this.data;
    }

    /**
     * Sends a Google Chat message to the webhook URL using a fetch POST call.
     * @param {String} url - The Google Chat webhook URL to POST to.
     */
    async send(url) {
        let res = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this)
        });
        if (!res.ok) {
            throw new Error(`Response from POST request was not 200 OK. Received: ${res.status}`);
        }
    }

}

export {
    GoogleChatBuiltInIcon,
    GoogleChatImageType,
    GoogleChatCard as default
};