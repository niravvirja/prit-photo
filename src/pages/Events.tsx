import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import SectionTitle from '@/components/ui/section-title';

const Events = () => {
  const navigate = useNavigate();

  const eventsList = [
    {
      id: 'kuldipanddevangi-pre',
      title: 'Kuldip & Devangi',
      type: 'Pre-Wedding',
      icon: Heart,
      coverImage: 'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749882584/events/kuldipanddevangi-pre/10.jpg',
    },
    {
      id: 'arpitanddrashti',
      title: 'Arpit & Drashti',
      type: 'Pre-Wedding',
      icon: Heart,
      coverImage: 'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749881990/events/arpitanddrashti/01.jpg',
    },
    {
      id: 'parimalandrinkal',
      title: 'Parimal & Rinkal',
      type: 'Pre-Wedding',
      icon: Heart,
      coverImage: 'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749881650/events/parimalandrinkal/08.jpg',
    },
    {
      id: 'hardikandpoonam',
      title: 'Hardik & Poonam',
      type: 'Wedding',
      icon: Heart,
      coverImage: 'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749792406/events/hardikandpoonam/11.jpg',
    },
    {
      id: 'harshandriddhi',
      title: 'Harsh & Riddhi',
      type: 'Wedding',
      icon: Heart,
      coverImage: 'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749792773/events/harshandriddhi/14.jpg',
    },
    {
      id: 'kuldipanddevangi',
      title: 'Kuldip & Devangi',
      type: 'Wedding',
      icon: Heart,
      coverImage: 'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749882887/events/kuldipanddevangi/27.jpg',
    },
    {
      id: 'yashanddivya',
      title: 'Yash & Divya',
      type: 'Ring Ceremony',
      icon: Heart,
      coverImage: 'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749893035/events/yashanddivya/01.jpg',
    },
    {
      id: 'darshananddivya',
      title: 'Darshan & Divya',
      type: 'Maternity',
      icon: Heart,
      coverImage: 'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749893040/events/darshananddivya/01.jpg',
    },
  ];

  const weddingEvents = eventsList.filter((event) => event.type === 'Wedding');
  const preWeddingEvents = eventsList.filter((event) => event.type === 'Pre-Wedding');
  const ringCeremonyEvents = eventsList.filter((event) => event.type === 'Ring Ceremony');
  const maternityEvents = eventsList.filter((event) => event.type === 'Maternity');

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const renderEventCard = (event) => {
    const IconComponent = event.icon;
    return (
      <div
        key={event.id}
        onClick={() => handleEventClick(event.id)}
        className="group cursor-pointer bg-card shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border rounded-2xl"
      >
        {/* Event Cover Image - Fixed aspect ratio and full coverage */}
        <div className="aspect-[3/4] overflow-hidden relative">
          <LazyLoadImage
            src={event.coverImage}
            alt={event.title}
            effect="blur"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            wrapperProps={{ style: { display: 'block', height: '100%' } }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/70 backdrop-blur-sm rounded-xl p-3 shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-full">
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-extrabold text-white">
                    {event.title}
                  </h3>
                  <p className="text-gray-300 text-xs">{event.type}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-background/20 text-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-primary-foreground hover:bg-background/20 mb-4 px-4 py-2 rounded-xl transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-serif font-bold mb-3">
                Event Collections
              </h1>
              <p className="text-base text-primary-foreground/80 max-w-xl mx-auto">
                Discover our captured moments from beautiful weddings, special occasions, and more
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wedding Events Section */}
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionTitle badge="Weddings" title="Wedding Collections" />
          {weddingEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {weddingEvents.map(renderEventCard)}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              No wedding events available.
            </p>
          )}
        </div>
      </div>

      {/* Pre-Wedding Events Section */}
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionTitle badge="Pre-Weddings" title="Pre-Wedding Collections" />
          {preWeddingEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {preWeddingEvents.map(renderEventCard)}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              No pre-wedding events available.
            </p>
          )}
        </div>
      </div>

      {/* Ring Ceremony Events Section */}
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionTitle badge="Ring Ceremonies" title="Ring Ceremony Collections" />
          {ringCeremonyEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ringCeremonyEvents.map(renderEventCard)}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              No ring ceremony events available.
            </p>
          )}
        </div>
      </div>

      {/* Maternity Photography Section */}
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionTitle badge="Maternity" title="Maternity Photography Collections" />
          {maternityEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {maternityEvents.map(renderEventCard)}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              No maternity events available.
            </p>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-primary text-primary-foreground py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-background/20">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-4">Ready to Book Your Event?</h2>
            <p className="text-base text-primary-foreground/80 mb-4 max-w-xl mx-auto">
              Let us capture your special moments with the same care and artistry
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-background text-foreground hover:bg-background/90 px-6 py-3 text-base font-medium rounded-xl transition-colors duration-200"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
