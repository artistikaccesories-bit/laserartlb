
import React from 'react';

const Services: React.FC = () => {
    const services = [
        {
            id: 'mark',
            title: 'Laser Marking',
            description: 'Permanent, high-contrast marking on metals and plastics. Ideal for serialization, branding, and personalization.',
            image: '/images/service1.jpg.jpg',
            action: 'Get Quote'
        },
        {
            id: 'cut',
            title: 'Laser Cutting',
            description: 'Precision cutting for custom shapes, prototypes, and intricate designs. Perfect for acrylic, wood, and leather.',
            image: '/images/p5.jpg.jpg',
            action: 'Get Quote'
        }
    ];

    const handleInquiry = (serviceName: string) => {
        const message = `*LASERARTLB - SERVICE INQUIRY*\n\nHello, I am interested in your *${serviceName}* service.\n\nPlease provide me with more information and pricing.`;
        window.open(`https://wa.me/96181388115?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section id="services" className="py-24 px-4 bg-deep-black border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-4 uppercase tracking-tighter">Professional <span className="text-zinc-500">Services</span></h2>
                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em]">Industrial Grade • Custom Solutions</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map(service => (
                        <div key={service.id} className="group relative glass rounded-[2rem] overflow-hidden border-white/5 hover:border-white/20 transition-all duration-500">
                            <div className="aspect-video overflow-hidden bg-zinc-900 relative">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] opacity-60 group-hover:opacity-80 grayscale group-hover:grayscale-0"
                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1635322966219-b25aa1cfa049?auto=format&fit=crop&q=80&w=600' }} // Fallback
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/40 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <h3 className="text-2xl font-black font-heading text-white mb-2 uppercase italic group-hover:text-white transition-colors duration-300">{service.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">{service.description}</p>

                                    <button
                                        onClick={() => handleInquiry(service.title)}
                                        className="px-6 py-3 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:scale-105 transition-all flex items-center gap-3 w-fit group/btn"
                                    >
                                        {service.action}
                                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
