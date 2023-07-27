import React, { createContext, useContext, useState } from "react";

interface ContentIDs {
  campusID: number;
  locationID: number;
  dishID: number;
}

interface ContentIDContext {
  contentIDs: ContentIDs;
  setContentIDs: React.Dispatch<React.SetStateAction<ContentIDs>>;
}

const ContentIDContext = createContext<ContentIDContext>({
  contentIDs: { campusID: -999, locationID: -999, dishID: -999 },
  setContentIDs: () => {},
});

export default function ContentIDProvider({
  children,
  campusID,
}: {
  children: any;
  campusID: number;
}) {
  const [contentIDs, setContentIDs] = useState<ContentIDs>({
    campusID: campusID,
    locationID: -999,
    dishID: -999,
  });

  return (
    <ContentIDContext.Provider value={{ contentIDs, setContentIDs }}>
      {children}
    </ContentIDContext.Provider>
  );
}

export const useContentIDs = () => useContext(ContentIDContext);
