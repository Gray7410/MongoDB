import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";
import QualityForm from "../components/ui/qualityForm";

const EditQualityPage = () => {
  const [quality, setQuality] = useState(null);
  const id = useParams().id;
  const updateQuality = async (content) => {
    try {
      const data = await qualityService.update(id, content);
      return data.content;
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };
  const getQuality = async (id) => {
    try {
      const data = await qualityService.get(id);
      return data.content;
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  const handleSubmit = (data) => {
    updateQuality(data);
  };
  useEffect(() => {
    getQuality(id).then((data) => {
      setQuality(data);
    });
  }, []);
  return (
    <>
      <h1>Edit Quality Page</h1>
      {quality !== null ? (
        <QualityForm data={quality} onSubmit={handleSubmit} />
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
