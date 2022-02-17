import {useState, useEffect} from 'react';

function useTableScreen() {
  const [tableScreen, setTabletScreen] = useState(window.innerWidth);

  const handleResize = () => {
    setTabletScreen(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tableScreen]);

  return Number(tableScreen);
}

export default useTableScreen;