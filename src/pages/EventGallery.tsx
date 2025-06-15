import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import SectionTitle from '@/components/ui/section-title';

// Import Cloudinary URLs
import arpitanddrashtiUrls from '../data/arpitanddrashti.json';
import hardikandpoonamUrls from '../data/hardikandpoonam.json';
import harshandriddhiUrls from '../data/harshandriddhi.json';
import kuldipanddevangiUrls from '../data/kuldipanddevangi.json';
import kuldipanddevangiPreUrls from '../data/kuldipanddevangi-pre.json';
import parimalandrinkalUrls from '../data/parimalandrinkal.json';
import yashanddivyaUrls from '../data/yashanddivya.json';
import darshananddivyaUrls from '../data/darshananddivya.json';

// Simplified TypeScript interfaces
interface Event {
  title: string;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  date: string;
  location?: string;
  videos: string[];
  images: string[];
}

const EventGallery: React.FC = () => {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId?: string }>();

  const eventData: { [key: string]: Event } = {
    arpitanddrashti: {
      title: 'Arpit & Drashti',
      type: 'Pre-Wedding Shoot',
      icon: Heart,
      date: 'February 15, 2024',
      location: 'Carvan Film City, Gujarat',
      videos: [],
      images: arpitanddrashtiUrls,
    },
    parimalandrinkal: {
      title: 'Parimal & Rinkal',
      type: 'Pre-Wedding Shoot',
      icon: Heart,
      date: 'January 20, 2024',
      location: 'Manali, Himachal Pradesh',
      videos: [],
      images: parimalandrinkalUrls,
    },
    hardikandpoonam: {
      title: 'Hardik & Poonam',
      type: 'Wedding Ceremony',
      icon: Heart,
      date: 'March 5, 2024',
      videos: [
        'https://res.cloudinary.com/dxgkclanr/video/upload/v1732726838/prit-portfolio/sample1_vfzh5z.mp4',
        'https://res.cloudinary.com/dxgkclanr/video/upload/v1732726838/prit-portfolio/sample2_xjythe.mp4',
      ],
      images: hardikandpoonamUrls,
    },
    harshandriddhi: {
      title: 'Harsh & Riddhi',
      type: 'Wedding Ceremony',
      icon: Heart,
      date: 'April 10, 2024',
      videos: [
        'https://res.cloudinary.com/dxgkclanr/video/upload/v1732726838/prit-portfolio/sample1_vfzh5z.mp4',
        'https://res.cloudinary.com/dxgkclanr/video/upload/v1732726838/prit-portfolio/sample2_xjythe.mp4',
      ],
      images: harshandriddhiUrls,
    },
    kuldipanddevangi: {
      title: 'Kuldip & Devangi',
      type: 'Wedding Ceremony',
      icon: Heart,
      date: 'May 12, 2024',
      videos: [
        'https://res.cloudinary.com/dxgkclanr/video/upload/v1732726838/prit-portfolio/sample1_vfzh5z.mp4',
        'https://res.cloudinary.com/dxgkclanr/video/upload/v1732726838/prit-portfolio/sample2_xjythe.mp4',
      ],
      images: kuldipanddevangiUrls,
    },
    'kuldipanddevangi-pre': {
      title: 'Kuldip & Devangi',
      type: 'Pre-Wedding Shoot',
      icon: Heart,
      date: 'April 25, 2024',
      location: 'Udaipur, Rajasthan',
      videos: [],
      images: kuldipanddevangiPreUrls,
    },
    yashanddivya: {
      title: 'Yash & Divya',
      type: 'Ring Ceremony',
      icon: Heart,
      date: 'June 1, 2024',
      videos: [],
      images: yashanddivyaUrls,
    },
    darshananddivya: {
      title: 'Darshan & Divya',
      type: 'Maternity Shoot',
      icon: Heart,
      date: 'May 20, 2024',
      videos: [],
      images: darshananddivyaUrls,
    },
  };

  const event = eventData[eventId || ''];

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center bg-card shadow-xl rounded-2xl p-8 border border-border max-w-md mx-4">
          <h1 className="text-xl font-serif font-bold text-foreground mb-4">Event Not Found</h1>
          <p className="text-sm text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button
            onClick={() => navigate('/events')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-xl transition-colors duration-200 flex items-center gap-2"
            aria-label="Back to Events"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = event.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-background/20 text-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/events')}
              className="text-primary-foreground hover:bg-background/20 mb-4 px-4 py-2 rounded-xl transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 bg-background/20 flex items-center justify-center rounded-full">
                <IconComponent className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-serif font-bold">
                {event.title}
              </h1>
            </div>
            <p className="text-base text-primary-foreground/80 mb-2">
              {event.type}
            </p>
            <p className="text-sm text-primary-foreground/60">
              {event.date}
              {event.location && ` • ${event.location}`}
            </p>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {event.videos.length > 0 && (
        <div className="py-8 lg:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <SectionTitle badge="Videos" title="Video Highlights" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.videos.map((video, index) => (
                <div
                  key={index}
                  className="group cursor-pointer bg-card shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border rounded-2xl"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <video
                      src={video}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      muted
                      loop
                      autoPlay
                      playsInline
                      aria-label={`Video highlight ${index + 1} for ${event.title}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Photo Gallery */}
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionTitle badge="Gallery" title="Photo Collection" />
          {event.images.length > 0 ? (
            <React.Fragment>
              {/* Desktop: Multi-column masonry layout */}
              <div className="hidden md:block">
                <div className="columns-2 lg:columns-3 gap-4">
                  {event.images.map((image, index) => (
                    <div
                      key={index}
                      className="break-inside-avoid mb-4"
                    >
                      <div className="group cursor-pointer bg-card shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border rounded-2xl">
                        <div className="overflow-hidden relative">
                          <LazyLoadImage
                            src={image}
                            alt={`${event.title} - Photo ${index + 1}`}
                            effect="blur"
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                            wrapperProps={{ style: { display: 'block' } }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mobile: Single-column masonry */}
              <div className="block md:hidden">
                <div className="columns-1 gap-4">
                  {event.images.map((image, index) => (
                    <div
                      key={index}
                      className="break-inside-avoid mb-4"
                    >
                      <div className="group cursor-pointer bg-card shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border rounded-2xl">
                        <div className="overflow-hidden relative">
                          <LazyLoadImage
                            src={image}
                            alt={`${event.title} - Photo ${index + 1}`}
                            effect="blur"
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                            wrapperProps={{ style: { display: 'block' } }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              No images available for this event.
            </p>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-primary text-primary-foreground py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-background/20">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-4">Love What You See?</h2>
            <p className="text-base text-primary-foreground/80 mb-4 max-w-xl mx-auto">
              Let us create the same magic for your special day
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-background text-foreground hover:bg-background/90 px-6 py-3 text-base font-medium rounded-xl transition-colors duration-200"
            >
              Book Your Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventGallery;