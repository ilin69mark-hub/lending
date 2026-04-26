"use client";

import { useEffect, useState, useRef } from "react";
import { cities } from "../data/cities";

type MapProps = {
  onSelectCity: (cityName: string) => void;
};

declare global {
  interface Window {
    ymaps?: any;
    ymapsReady?: () => void;
    selectCity?: (cityName: string) => void;
  }
}

export default function Map({ onSelectCity }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [activeCity, setActiveCity] = useState<string>("");
  const [ymapsReady, setYmapsReady] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Load Yandex Maps script
  useEffect(() => {
    // Check if already loaded
    if (typeof window !== 'undefined' && window.ymaps && window.ymaps.Map) {
      setYmapsReady(true);
      setLoading(false);
      return;
    }

    // Set up global handler
    window.ymapsReady = function() {
      setYmapsReady(true);
      setLoading(false);
    };

    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=cdee3082-2ec5-4523-b652-476d0d86c0a9&lang=ru_RU';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Give it a moment to initialize
      setTimeout(() => {
        if (window.ymaps) {
          window.ymaps.ready(() => {
            setYmapsReady(true);
            setLoading(false);
          });
        } else {
          setError('Не удалось загрузить Яндекс Карты');
          setLoading(false);
        }
      }, 500);
    };
    
    script.onerror = () => {
      setError('Ошибка загрузки карт');
      setLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup not needed for global script
    };
  }, []);

  // Initialize map when ready
  useEffect(() => {
    if (!ymapsReady || !mapRef.current || !window.ymaps) return;

    try {
      const map = new window.ymaps.Map(mapRef.current, {
        center: [55.751244, 37.618423],
        zoom: 4,
        controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
      });

      // Add zoom control
      map.controls.add('zoomControl', { 
        position: { right: 10, top: 75 } 
      });

      // Add placemarks
      cities.forEach((city) => {
        // @ts-ignore
        const placemark = new window.ymaps.Placemark(
          city.coords as [number, number],
          {
            hintContent: city.name,
            balloonContentBody: `
              <div style="padding: 10px; min-width: 150px;">
                <strong style="font-size: 14px;">${city.name}</strong>
                <br/>
                <span style="color: ${city.status === 'free' ? '#10b981' : '#ef4444'}; 
                      font-weight: 500;">
                  ${city.status === 'free' ? '✓ Свободно' : '✕ Занято'}
                </span>
                ${city.status === 'free' ? 
                  `<br/><button id="btn-${city.id}" style="margin-top: 8px; padding: 6px 12px; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Оставить заявку</button>` : 
                  ''}
              </div>
            `,
          },
          {
            preset: city.status === 'free' 
              ? 'islands#greenCircleDotIcon' 
              : 'islands#redCircleDotIcon',
          }
        );

        placemark.events.add('click', function(e: any) {
          // @ts-ignore
          const target = e.get('target');
          const coords = target.geometry.getCoordinates();
          const cityData = cities.find(c => 
            c.coords[0] === coords[0] && c.coords[1] === coords[1]
          );
          
          if (cityData && cityData.status === 'free') {
            setActiveCity(cityData.name);
          }
        });

        map.geoObjects.add(placemark);
      });

      mapInstanceRef.current = map;

      // Handle balloon button clicks
      const handleBalloonClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON') {
          const cityId = target.id.replace('btn-', '');
          const cityData = cities.find(c => c.id === parseInt(cityId));
          if (cityData) {
            onSelectCity(cityData.name);
          }
        }
      };

      document.addEventListener('click', handleBalloonClick);

      return () => {
        document.removeEventListener('click', handleBalloonClick);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
        }
      };
    } catch (err) {
      console.error('Map init error:', err);
      setError('Ошибка инициализации карты');
    }
  }, [ymapsReady]);

  const handleSubmit = () => {
    if (activeCity) {
      onSelectCity(activeCity);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        height: '500px', 
        width: '100%', 
        backgroundColor: '#f8fafc', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '12px'
      }}>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-500">Загрузка карты...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        height: '500px', 
        width: '100%', 
        backgroundColor: '#fef2f2', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '12px'
      }}>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div 
        ref={mapRef} 
        style={{ 
          height: '500px', 
          width: '100%',
          borderRadius: '12px',
        }} 
      />

      {activeCity && (
        <div className="mt-4 p-4 bg-slate-50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-600">Вы выбрали:</span>
            <span className="font-semibold text-slate-900">{activeCity}</span>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
          >
            Оставить заявку
          </button>
        </div>
      )}
    </div>
  );
}