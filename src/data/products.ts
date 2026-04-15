import { Product } from '../../types.ts';

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'CUSTOM PLATE',
        handle: 'lebanon-plate-style',
        price: 10,
        category: 'keychain',
        description: 'Stainless steel rectangle shape with laser engraved custom Lebanese car plate design. Essential, durable, and personalized.',
        image: '/images/product1.jpg',
        stock: 4
    },
    {
        id: '2',
        name: 'SPOTIFY CODE',
        handle: 'spotify-code-keychain',
        price: 11,
        originalPrice: 22.5,
        category: 'keychain',
        description: 'Scan and play. A custom keychain with your favorite song\'s Spotify code and the album art laser engraved. A playable memory in steel.',
        image: '/images/product2.jpg',
        images: ['/images/product2.jpg', '/images/product2-2.jpeg'],
        stock: 2,
        isBestSeller: true
    },
    {
        id: '3',
        name: 'THE BOND',
        handle: 'the-bond-keychain',
        price: 10,
        category: 'keychain',
        description: 'A symbol of connection. Rectangle stainless steel keychain designed for meaningful quotes, dates, or matching couple designs. Carry your story with you.',
        image: '/images/product3.jpg',
        stock: 6
    },
    {
        id: '4',
        name: 'PET TAG',
        handle: 'pet-tag-guardian',
        price: 10,
        category: 'keychain',
        description: 'Safety meets style. Durable custom dog tag engraved with your pet\'s name and your phone number. Built to last through every adventure.',
        image: '/images/p4.jpg',
        stock: 3
    },
    {
        id: '5',
        name: 'THE ORBIT',
        handle: 'round-keychain-orbit',
        price: 10,
        category: 'keychain',
        description: 'Minimalist perfection. A 4cm diameter round keychain awaiting your custom image, logo, or text. Perfectly balanced and precision engraved.',
        image: '/images/p5.jpg.jpg',
        stock: 5
    },
    {
        id: '6',
        name: 'BOTTLE OPENER',
        handle: 'bottle-opener-brew',
        price: 10,
        category: 'keychain',
        description: 'Utility refined. A robust stainless steel bottle opener that doubles as a personal statement. Engrave any text or name for a gift that will actually be used.',
        image: '/images/p6.jpg.jpg',
        stock: 2
    },
    {
        id: '7',
        name: 'COUPLE TAG',
        handle: 'the-bond-tag',
        price: 10,
        category: 'keychain',
        description: 'Stainless steel tag shape designed for couples. Deeply engraved with your custom text. A modern symbol of connection.',
        image: '/images/product7.jpeg',
        stock: 4
    },
    {
        id: '8',
        name: 'PUZZLE HEARTS',
        handle: 'puzzle-hearts-union',
        price: 11,
        category: 'keychain',
        description: 'Two halves that complete each other. A puzzle-piece heart design for couples that fit perfectly together.',
        image: '/images/product8.jpeg',
        stock: 3
    },
    {
        id: '9',
        name: 'CUSTOM CIRCLE',
        handle: 'custom-circle-token',
        price: 10,
        category: 'keychain',
        description: 'Round 4cm diameter circle with custom logo. Simple, elegant, and perfect for branding or personal designs.',
        image: '/images/product9.jpeg',
        stock: 5
    },
    {
        id: '10',
        name: 'GYM & COUPLE',
        handle: 'gym-couple-duo',
        price: 10,
        category: 'keychain',
        description: 'Two distinct styles in one series. Swipe to see the Gym motivation design and the matching Couple set. Small, subtle, and meaningful.',
        image: '/images/qsmallgym.jpeg',
        images: ['/images/qsmallgym.jpeg', '/images/qsmallcouple.jpeg'],
        stock: 10
    },
    {
        id: '11',
        name: 'AL-HAMD',
        handle: 'al-hamd-gratitude',
        price: 10,
        category: 'keychain',
        description: '“Al-Hamdulillah” beautifully engraved. A daily reminder of gratitude and faith, crafted in durable stainless steel.',
        image: '/images/hamd.jpeg',
        stock: 8
    },
    {
        id: '12',
        name: 'CUSTOM QUOTE',
        handle: 'quote-rectangle-keychain',
        price: 10,
        category: 'keychain',
        description: 'Your words, immortalized. Available in vertical and horizontal orientations. Swipe to see options. Perfect for favorite quotes or names.',
        image: '/images/qrect.jpeg',
        images: ['/images/qrect.jpeg', '/images/qrecthorizontal.jpeg'],
        stock: 10
    },
    {
        id: '13',
        name: 'MOM SPECIAL',
        handle: 'mom-keychain-special',
        price: 10,
        category: 'keychain',
        description: 'A beautiful custom keychain for Mother\'s Day. Show your love with a personalized message. The perfect gift to celebrate her.',
        image: '/images/mom1.jpeg',
        stock: 10,
        isBestSeller: true
    },
    {
        id: '14',
        name: 'ISLAMIC CALLI',
        handle: 'islamic-calligraphy-round',
        price: 10,
        category: 'keychain',
        description: 'Elegant round keychain featuring exquisite Islamic calligraphy. A perfect blend of faith and craftsmanship.',
        image: '/images/calli.jpeg',
        stock: 8
    }
];

