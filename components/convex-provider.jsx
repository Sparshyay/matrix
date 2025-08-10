"use client";

import { useEffect, useState } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

// Create the client outside the component to ensure it's only created once
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  console.error('NEXT_PUBLIC_CONVEX_URL is not set');
}

const convex = new ConvexReactClient(convexUrl);

export default function ConvexProviderWrapper({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Mark that the component is mounted
    setIsMounted(true);
  }, []);

  // Don't render children until the component is mounted
  if (!isMounted) {
    return null;
  }

  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
}
