'use client';

import { createContext, Dispatch, FC,ReactNode, SetStateAction, useContext, useState } from 'react';

// Define the type for the ContentContext value
interface ContentContextType {
  content: string | null;
  setContent: Dispatch<SetStateAction<string | null>>;
}

// Create the context with a default value of null for content and a no-op for setContent
const ContentContext = createContext<ContentContextType>({
  content: null,
  setContent: () => null, // Placeholder function to avoid empty function lint error
});

// Custom hook to use the ContentContext
export const useContent = () => useContext(ContentContext);

// Define props for ContentProvider to accept children
interface ContentProviderProps {
  children: ReactNode;
}

// ContentProvider component with typed content and setContent
const ContentProvider: FC<ContentProviderProps> = ({ children }) => {
  const [content, setContent] = useState<string | null>(null); // Initial content state

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export { ContentProvider };
