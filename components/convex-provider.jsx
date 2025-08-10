"use client";

import { useEffect, useState } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

// This ensures we only create the client once and reuse it
let clientInstance = null;

function getConvexClient() {
  if (typeof window === 'undefined') return null;
  if (!clientInstance) {
    clientInstance = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || '');
  }
  return clientInstance;
}

export default function ConvexProviderWrapper({ children }) {
  const [client, setClient] = useState(null);
  
  useEffect(() => {
    // Initialize Convex client on the client side
    setClient(getConvexClient());
  }, []);

  if (typeof window === 'undefined' || !client) {
    // Don't render children during SSR or before client is initialized
    return <>{children}</>;
  }

  return (
    <ConvexProvider client={client}>
      {children}
    </ConvexProvider>
  );
}
