import React, { useState, useEffect, useCallback } from 'react';
import FactCard from './FactCard';

// Predefined list of interesting marine species IDs (AphiaIDs)
const SPECIES_IDS = [
  127160, // Balaenoptera musculus (Blue Whale)
  126436, // Carcharodon carcharias (Great White Shark)
  217230, // Amphiprion ocellaris (Clownfish)
  125767, // Chelonia mydas (Green Sea Turtle)
  124316, // Octopus vulgaris (Common Octopus)
  105792, // Orcinus orca (Killer Whale)
];

const OceanDashboard: React.FC = () => {
  const [waveHeight, setWaveHeight] = useState<number | null>(null);
  const [tideLevel, setTideLevel] = useState<number | null>(null);
  const [speciesName, setSpeciesName] = useState<string | null>(null);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Open-Meteo Marine API (Monterey Bay)
      const weatherRes = await fetch(
        'https://marine-api.open-meteo.com/v1/marine?latitude=36.6002&longitude=-121.8947&current=wave_height'
      );
      const weatherData = await weatherRes.json();
      setWaveHeight(weatherData.current.wave_height);

      // 2. NOAA Tides API (Monterey Harbor)
      // Note: NOAA API might be flaky or have CORS issues in some environments, but usually works for GET.
      const tideRes = await fetch(
        'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=latest&station=9413450&product=water_level&datum=MLLW&time_zone=gmt&units=english&format=json&application=ocean_watch'
      );
      const tideData = await tideRes.json();
      if (tideData.data && tideData.data.length > 0) {
        setTideLevel(parseFloat(tideData.data[0].v));
      }

      // 3. WoRMS API (Random Species)
      const randomId = SPECIES_IDS[Math.floor(Math.random() * SPECIES_IDS.length)];
      const speciesRes = await fetch(`https://www.marinespecies.org/rest/AphiaRecordByAphiaID/${randomId}`);
      
      if (speciesRes.ok) {
          const speciesData = await speciesRes.json();
          setSpeciesName(speciesData.scientificname);
      } else {
          setSpeciesName("Unknown Species");
      }

    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch some data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="dashboard">
      <div className="controls">
        <button onClick={fetchData} disabled={loading} className="refresh-btn">
          {loading ? 'Refreshing...' : 'Refresh Facts 🔄'}
        </button>
        <p className="location-info">📍Location: Monterey Bay, CA</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="cards-container">
        <FactCard
          title="Wave Height"
          value={waveHeight}
          unit="m"
          description="Current wave height in Monterey Bay."
          loading={loading}
          icon="🌊"
        />
        <FactCard
          title="Tide Level"
          value={tideLevel}
          unit="ft"
          description="Latest water level (MLLW)."
          loading={loading}
          icon="🌖"
        />
        <FactCard
          title="Marine Life"
          value={speciesName}
          unit=""
          description="Random species from the World Register of Marine Species."
          loading={loading}
          icon="🐠"
        />
      </div>
    </div>
  );
};

export default OceanDashboard;
