
import React from 'react';
import { Award, Camera, Users, Star } from 'lucide-react';
import SectionTitle from './ui/section-title';
import OptimizedImage from './ui/optimized-image';

const About = () => {
  const owners = [
    {
      name: 'Alpesh Patel',
      image: 'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984656/events/importants/about/alpesh-dp.jpg',
    },
    {
      name: 'Bhavesh Patel',
      image: 'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984656/events/importants/about/bhavesh-dp.jpg',
    },
  ];

  const achievements = [
    { icon: Award, number: '8+', label: 'Years Experience' },
    { icon: Users, number: '500+', label: 'Happy Clients' },
    { icon: Camera, number: '1000+', label: 'Events Captured' },
    { icon: Star, number: '5★', label: 'Rated Service' },
  ];

  return (
    <section id="about" className="py-12 lg:py-20 bg-primary text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle
          badge="About Us"
          title="About Us"
        />

        <div className="bg-card shadow-xl border border-border rounded-3xl overflow-hidden p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-background text-foreground p-8 rounded-3xl shadow-lg h-full flex flex-col border border-border">
                <div className="w-full h-56 sm:h-64 lg:h-80 overflow-hidden mb-4 rounded-2xl">
                  <video
                    src="https://res.cloudinary.com/dmo0bmu3c/video/upload/v1749987282/award-giving_tx67ss.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-main font-bold text-foreground mb-3">
                    Our Journey to Excellence
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Prit Photo has been capturing timeless moments for over 8 years. Our award-winning work reflects our passion for photography, blending creativity with tradition to create memories that last a lifetime.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-background text-foreground p-6 lg: rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-border">
                <h3 className="text-xl lg:text-2xl font-main font-bold text-foreground mb-6 text-center">
                  Founders
                </h3>
                <div className="flex flex-row gap-6 justify-between">
                  {owners.map((owner, index) => (
                    <div key={index} className="flex flex-col items-center text-center flex-1">
                      <div className="relative mb-4">
                        <div className="w-24 h-24 lg:w-32 lg:h-32 overflow-hidden rounded-full border-4 border-primary">
                          <OptimizedImage
                            src={owner.image}
                            alt={owner.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full">
                          <Camera className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="text-base lg:text-lg font-main font-bold text-foreground">
                        {owner.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background text-foreground p-3 sm:p-4 lg:p-3 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border">
                <h3 className="text-lg lg:text-base font-main font-bold text-foreground mb-4 text-center">
                  Achievements
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="text-center border border-border p-3 sm:p-4 lg:p-2 rounded-2xl"
                    >
                      <div className="text-primary mb-2">
                        <achievement.icon className="w-5 h-5 lg:w-4 lg:h-4 mx-auto" />
                      </div>
                      <div className="text-lg sm:text-xl lg:text-base font-bold text-foreground mb-1 font-main">
                        {achievement.number}
                      </div>
                      <p className="text-muted-foreground text-xs sm:text-sm lg:text-xs">
                        {achievement.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
