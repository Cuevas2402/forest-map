import { useEffect, useState } from "react";
import FormMenu from "./parts/FormMenu";
import GlobalMap from "./parts/GlobalMap";
import Forest from "@/interfaces/forest";
import useClient from "@/hooks/useClient";
import { GlobalMapProps, TreesDist } from "@/interfaces/props";
import { Spinner } from "spin.js";

const ZoneMap = () => {
  const client = useClient();

  const [data, setData] = useState<Forest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [curr, setCurr] = useState<Forest | null>(null);
  const [dist, setDist] = useState<TreesDist[][]>([]);
  const [currDist, setCurrDist] = useState<TreesDist[]>([]);

  const handleGetData = async () => {
    try {
      const response = await client.get("/forests/map");
      setData(response.data.forests);
      setCurr(response.data.forests[0]);
	  setDist(response.data.classes);
      setCurrDist(response.data.classes[0]);
    } catch (error) {
      console.error("Error fetching forests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const globalmapprops: GlobalMapProps = {
    forests: data,
    curr: curr,
    setCurr,
	dist : dist,
	currDist : currDist,
	setCurrDist : setCurrDist,

  };

  useEffect(() => {
    if (isLoading) {
      const spinnerContainer = document.getElementById("spinner-container");
      
      if (spinnerContainer) {
        const spinner = new Spinner().spin(spinnerContainer);
        
        return () => {
          spinner.stop();
        };
      }
    }
  }, [isLoading]);

  if (isLoading || !curr) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div id="spinner-container"></div>
      </div>
    );
  }

  return (
    <div className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <GlobalMap {...globalmapprops} />
      <div className="relative flex-col md:flex" x-chunk="dashboard-03-chunk-0">
        <FormMenu {...globalmapprops} />
      </div>
    </div>
  );
};

export default ZoneMap;
