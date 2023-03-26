import React from "react";
import { Col, Card,  } from "react-bootstrap";
import { numberWithFormat } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xm={6} className="mb-4">
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        <Card.Img variant="top" src={"asset/assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} />
        <Card.Body>
          <Card.Title>{menu.nama}</Card.Title>
          <Card.Text>
            Rp. {numberWithFormat(menu.harga)}
            </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
