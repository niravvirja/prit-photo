
import { useState, useEffect } from 'react';

const preloadAsset = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (src.match(/\.(jpeg|jpg|gif|png|webp)$/)) {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = (err) => reject(err);
    } else if (src.match(/\.(mp4|webm)$/)) {
      const video = document.createElement('video');
      video.src = src;
      video.oncanplaythrough = () => resolve();
      video.onerror = (err) => reject(err);
      video.load();
    } else {
      // Resolve for unknown file types to not block loading
      resolve();
    }
  });
};

const useAssetPreloader = (assetUrls: string[]) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const preloadAssets = async () => {
      try {
        const promises = assetUrls.map(url => preloadAsset(url));
        await Promise.all(promises);
        if (!isCancelled) {
          setAssetsLoaded(true);
        }
      } catch (error) {
        console.error("Failed to preload one or more assets", error);
        // Set to true even on error to avoid blocking the app
        if (!isCancelled) {
          setAssetsLoaded(true);
        }
      }
    };

    preloadAssets();

    return () => {
      isCancelled = true;
    };
  }, [assetUrls]);

  return assetsLoaded;
};

export default useAssetPreloader;
