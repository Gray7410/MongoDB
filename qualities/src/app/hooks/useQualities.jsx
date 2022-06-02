import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.service";

const QualityContext = React.createContext();

export const useQualities = () => {
  return useContext(QualityContext);
};
const qualities = [{ _id: 123, name: "dasdad" }];

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setLoading(false);
      } catch (error) {
        const { message } = error.response.data;
        setError(message);
      }
    };
    getQualities();
  }, []);
  return (
    <QualityContext.Provider value={{ qualities, isLoading }}>
      {!isLoading ? children : <h1>Qualities loading...</h1>}
    </QualityContext.Provider>
  );
};
