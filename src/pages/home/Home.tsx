import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";

// Extend the Navigator interface to include the standalone property
declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

const Home = () => {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStandaloneMode = () => {
      const isStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        !!navigator.standalone;
      setIsStandalone(isStandaloneMode);
    };

    checkStandaloneMode();

    window.addEventListener("resize", checkStandaloneMode);
    return () => window.removeEventListener("resize", checkStandaloneMode);
  }, []);

  return (
    <>
      <PageHeader title="Home" />
      {isStandalone ? (
        <div className="p-4">
          2. Create a mesocycle using a Template <br />
          3. Go to "Workout" and enjoy!
        </div>
      ) : (
        <div className="p-4">
          <div>1. Add to home screen</div>
          <img
            src="https://s3.amazonaws.com/groovehq/uploaded/6420cyp1i86fsm28gez11hqfg74cgovnd8zfqkpjp33f12hqks?1447801075"
            alt="add to home screen"
          />
        </div>
      )}
    </>
  );
};

export default Home;
