"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useState, useEffect } from "react";

/**
 * A component that handles loading and displaying images from Convex storage.
 * It properly handles both storage IDs and full URLs.
 */
export function StorageImage({
  storageId,
  alt,
  className,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
  priority = false,
  width,
  height,
  ...props
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Check if the storageId is already a URL
  const isUrl = storageId?.startsWith('http');
  
  // Get the image URL if it's a storage ID
  const urlResult = useQuery(
    !isUrl ? api.files.getImageUrl : null, 
    !isUrl ? { storageId } : 'skip'
  );

  // Update image URL when it's loaded
  useEffect(() => {
    if (isUrl) {
      setImageUrl(storageId);
      setIsLoading(false);
    } else if (urlResult !== undefined) {
      setImageUrl(urlResult);
      setIsLoading(false);
      setError(!urlResult);
    }
  }, [storageId, urlResult, isUrl]);

  // Loading state
  if (isLoading) {
    return (
      <div 
        className={`bg-muted flex items-center justify-center ${className || ""}`}
        style={!fill ? { width, height } : {}}
      >
        <span className="text-muted-foreground text-sm">Loading...</span>
      </div>
    );
  }

  // Error state
  if (!imageUrl || error) {
    return (
      <div 
        className={`bg-muted flex items-center justify-center ${className || ""}`}
        style={!fill ? { width, height } : {}}
      >
        <span className="text-muted-foreground text-sm">Image not found</span>
      </div>
    );
  }

  // Handle fill mode
  if (fill) {
    return (
      <div className={`relative ${className || ""}`} style={{ width: '100%', height: '100%' }}>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain"
          priority={priority}
          quality={100} // Maximum quality
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          style={{
            imageRendering: 'high-quality',
            objectFit: 'contain'
          }}
          onError={() => setError(true)}
          {...props}
        />
      </div>
    );
  }

  // Handle fixed dimensions with quality optimization
  const finalWidth = width || 1200; // Increased default width for better quality
  const finalHeight = height || 800; // Increased default height for better quality

  return (
    <div className={`relative ${className || ''}`} style={{ 
      width: '100%',
      aspectRatio: `${finalWidth} / ${finalHeight}`,
      maxWidth: '100%',
      margin: '0 auto',
      overflow: 'hidden'
    }}>
      <Image
        src={imageUrl}
        alt={alt}
        width={finalWidth}
        height={finalHeight}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"}
        className="object-contain"
        priority={priority}
        quality={100} // Maximum quality
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          imageRendering: 'high-quality'
        }}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}
