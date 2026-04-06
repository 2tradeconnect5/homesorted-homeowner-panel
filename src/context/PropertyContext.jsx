import { createContext, useContext, useState, useMemo } from 'react';
import { mockProperties } from '../data/mockProperties';

const PropertyContext = createContext(null);

export function PropertyProvider({ children }) {
  const [properties] = useState(mockProperties);
  const [selectedEircode, setSelectedEircode] = useState(mockProperties[0]?.eircode || null);

  const selectedProperty = useMemo(
    () => properties.find((p) => p.eircode === selectedEircode) || properties[0],
    [properties, selectedEircode]
  );

  const selectProperty = (eircode) => setSelectedEircode(eircode);

  return (
    <PropertyContext.Provider
      value={{ properties, selectedProperty, selectedEircode, selectProperty }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error('useProperties must be used within PropertyProvider');
  return ctx;
}
