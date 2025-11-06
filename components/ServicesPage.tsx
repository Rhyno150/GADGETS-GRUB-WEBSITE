
import React from 'react';
import { Service } from '../types';
import { 
    ScreenRepairIcon, BatteryIcon, ChargingPortIcon, SoftwareIcon, WaterDamageIcon, 
    SpeakerIcon, CameraIcon, ButtonIcon, DiagnosticIcon, ShieldIcon
} from './icons';

const allServices: Service[] = [
    { icon: ScreenRepairIcon, title: 'Screen Repair & Replacement', description: 'Cracked, shattered, or unresponsive screen? We fix it fast for iPhone, Android, and more, using high-quality replacement screens.' },
    { icon: BatteryIcon, title: 'Battery Replacement', description: 'If your phone doesn\'t hold a charge, we can replace the battery to restore its performance and longevity.' },
    { icon: ChargingPortIcon, title: 'Charging Port Repair', description: 'Phone not charging or connecting to your computer? We can clean or replace your charging port.' },
    { icon: SoftwareIcon, title: 'Software & Data Recovery', description: 'Stuck in a boot loop or need to recover precious data? Our software experts can troubleshoot and restore your device.' },
    { icon: WaterDamageIcon, title: 'Water Damage Treatment', description: 'Spilled something on your phone? Our comprehensive cleaning and diagnostic process can save your device from liquid damage.' },
    { icon: SpeakerIcon, title: 'Speaker & Earpiece Repair', description: 'Can\'t hear callers or play music? We repair or replace faulty speakers and earpieces.' },
    { icon: CameraIcon, title: 'Camera Repair & Replacement', description: 'Blurry photos or a camera that won\'t open? We can fix or replace both front and rear camera modules.' },
    { icon: ButtonIcon, title: 'Button Repair (Volume/Power)', description: 'Stuck or unresponsive buttons? We can repair the delicate mechanisms for your power, volume, or home buttons.' },
    { icon: ShieldIcon, title: 'Nano Screen Protector', description: 'Protect your new screen with a high-quality, shatter-resistant nano liquid screen protector for ultimate durability.' },
    { icon: DiagnosticIcon, title: 'Full Diagnostic Service', description: 'Not sure what\'s wrong? We\'ll perform a complete diagnostic check to identify any and all issues with your device.' },
];

const ServicesPage: React.FC = () => {
    return (
        <div className="bg-white py-16 sm:py-24 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Our Repair Services</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        We offer a comprehensive range of hardware and software solutions for all major smartphone and tablet brands.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allServices.map((service, index) => (
                        <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm flex flex-col items-start border border-gray-200 hover:border-orange-500 hover:shadow-lg hover:scale-105 transition-all duration-300">
                            <div className="flex-shrink-0">
                                <service.icon className="h-10 w-10 text-orange-500" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                                <p className="mt-2 text-base text-gray-600">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
