import React from "react";
import { Col, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constans";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheese,
  faCoffee,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

function ListCategory({ changeCategory, categorySelected }) {
  const Icon = ({ nama }) => {
    if (nama === "Makanan")
      return <FontAwesomeIcon icon={faUtensils} classname="mr-2" />;
    if (nama === "Minuman")
      return <FontAwesomeIcon icon={faCoffee} classname="mr-2" />;
    if (nama === "Cemilan")
      return <FontAwesomeIcon icon={faCheese} classname="mr-2" />;
  };

  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/categories`).then((res) => setCategory(res.data));
  }, []);

  return (
    <Col md={2} mt="2">
      <h4>
        <strong>Daftar Kategori</strong>
      </h4>
      <hr />

      <ListGroup>
        {category &&
          category.map((categori) => (
            <ListGroup.Item
              key={categori.id}
              onClick={() => changeCategory(categori.nama)}
              className={categorySelected === categori.nama && "category-aktif"}
              style={{
                cursor: "pointer",
                display: "flex",
              }}
            >
              <Icon nama={categori.nama} />
              <h5>{categori.nama}</h5>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Col>
  );
}

export default ListCategory;
