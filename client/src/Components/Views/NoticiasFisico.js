import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import BarraNavegacion from '../Views/BarraNavegacion'
import Footer from '../Views/Footer'

//CSS
import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/fonts/font-awesome.min.css";
import "../../assets/fonts/ionicons.min.css";
import "../../assets/css/Article-Clean.css";
import "../../assets/css/Article-Dual-Column.css";
import "../../assets/css/Article-List.css";
import "../../assets/css/Footer-Dark.css";
import "../../assets/css/Social-Icons.css";


const NoticiasFisico = () => {
  const [noticiasFisico, setNoticiasFisico] = useState([]);
  const getNoticiasFisico = async () => {
    await db
      .collection("Noticias-Fisico")
      .orderBy("Date", "desc")
      .limit(4)
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setNoticiasFisico(docs);
      });
  };
  useEffect(() => {
    getNoticiasFisico();
  });
  return (
    <>
    <BarraNavegacion/>
      <header>
        <div
          className="jumbotron jumbotron-fluid"
          style={{
            backgroundColor: "rgba(255,255,255,0.3)",
            backgroundSize: "auto",
          }}
        >
          <h1>Titulo Noticia</h1>
          <p>
            Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
            odio, dapibus ac facilisis in, egestas eget quam.
          </p>
          <p>
            <Link to="/" className="btn btn-outline-dark" role="button">
              Learn more
            </Link>
          </p>
        </div>
      </header>
      <div
        className="article-list"
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      >
        <div className="container">
          <div className="row article">
            {noticiasFisico.map((noticia) => (
              <div className="col-sm-6 col-md-4 item" key={noticia.id}>
                {noticia.NoticiaFisicoImg && (
                  <img
                    className="img-fluid"
                    src={noticia?.NoticiaFisicoImg}
                    style={{ width: "50%" }}
                    alt="sample"
                  />
                )}
                <Link to={"./noticiafisico/" + noticia.id}>
                  <h3>{noticia.Title}</h3>
                  <p className="text-white-50 description">{noticia.Body}</p>
                  <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default NoticiasFisico;
