export interface CarDesign {
    id: string;
    model: string;
    image: string;
}

export const CAR_DESIGNS: CarDesign[] = [
    {
        id: 'test-1',
        model: 'Test Model',
        image: '/images/car.jpeg' // Placeholder using existing image
    },
    {
        id: 'mclaren-1',
        model: 'McLaren',
        image: '/images/mclaren.png'
    }
];
