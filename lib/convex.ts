import { ConvexProvider, ConvexReactClient } from "convex/react";

// This will be set to true during build time
declare const process: {
  env: {
    NEXT_PUBLIC_CONVEX_URL?: string;
    NODE_ENV: 'development' | 'production' | 'test';
  };
} & NodeJS.Process;

// Get the Convex URL from environment variables
const getConvexUrl = () => {
  // During build, we might not have access to process.env
  if (typeof process === 'undefined' || !process.env) {
    return '';
  }
  return process.env.NEXT_PUBLIC_CONVEX_URL || '';
};

// Only create the client if we have a URL and we're on the client side
let convexClient: ConvexReactClient | null = null;

const getConvexClient = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (!convexClient) {
    const url = getConvexUrl();
    if (!url) {
      console.warn('NEXT_PUBLIC_CONVEX_URL is not set');
      return null;
    }
    convexClient = new ConvexReactClient(url);
  }
  
  return convexClient;
};

// Initialize the client
const convex = getConvexClient();

// Helper hook to ensure Convex is only used client-side
export function useConvex() {
  if (typeof window === 'undefined') {
    throw new Error("Convex can only be used on the client side");
  }
  
  const client = getConvexClient();
  if (!client) {
    throw new Error(
      "Convex client is not initialized. Make sure NEXT_PUBLIC_CONVEX_URL is set correctly."
    );
  }
  
  return client;
}

export { convex, ConvexProvider };
