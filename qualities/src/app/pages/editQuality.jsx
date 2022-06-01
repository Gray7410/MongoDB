import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";
import axios from "axios";
import httpService from "../services/http.service";
import config from "../config.json";

const EditQualityPage = () => {
  const [quality, setQuality] = useState(null);
  const id = useParams().id;
  const qualityEndPoint = `quality/${id}`;

  const handleSubmit = async (data) => {
    try {
      await httpService
        .put(qualityEndPoint, data)
        .then((res) => res.data.content);
    } catch (error) {
      console.log("Expected error");
    }
  };
  useEffect(async () => {
    const { data } = await axios.get(qualityEndPoint);

    setQuality(data.content);
  }, []);
  return (
    <>
      <h1>Edit Quality Page</h1>
      {quality !== null ? (
        <EditForm data={quality} onSubmit={handleSubmit} />
      ) : (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditQualityPage;
