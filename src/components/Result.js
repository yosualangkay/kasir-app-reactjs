import React, { Component } from "react";
import {
  Col,
  ListGroup,
  Row,
  Badge,
  Modal,
  Button,
  Card,
} from "react-bootstrap";
import { numberWithFormat } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import Sukses from "../pages/Sukses";
import Home from "../pages/Home";
import { useEffect, useState } from "react";
import ModalKeranjang from "./ModalKeranjang";
import axios from "axios";
import { API_URL } from "../utils/constans";
import swal from "sweetalert";

function Result({ keranjang, changeHandler, handleSubmit, getKeranjang }) {
  const [show, setShow] = useState(false);
  const [ketDetail, setKetDetail] = useState(false);
  const [jumlah, setJumlah] = useState(0);
  const [keterangan, setKeterangan] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (menuKeranjang) => {
    setShow(true);
    setKetDetail(menuKeranjang);
    setJumlah(menuKeranjang.jumlah);
    setKeterangan(menuKeranjang.keterangan);
    setTotalHarga(menuKeranjang.total_harga);
  };

  const tambah = () => {
    setJumlah(jumlah + 1);
    setTotalHarga(ketDetail.product.harga * (jumlah + 1));
  };
  const kurang = () => {
    if (jumlah !== 1) {
      setJumlah(jumlah - 1);
      setTotalHarga(ketDetail.product.harga * (jumlah - 1));
    }
  };

  const changeKeterangan = (event) => {
    setKeterangan(event.target.value);
  };
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    handleClose();
    const data = {
      jumlah: jumlah,
      total_harga: totalHarga,
      product: ketDetail.product,
      keterangan: keterangan,
    };
    axios
      .put(API_URL + "/keranjangs/" + ketDetail.id, data)
      .then((res) => {
        swal({
          title: "Pesanan Terupdate",
          text: data.product.nama + " berhasil update ke keranjang",
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hapusPesanan = (id) => {
    handleClose();
    axios
      .delete(API_URL + "/keranjangs/" + id)
      .then((res) => {
        swal({
          title: "Pesanan Dihapus",
          text: ketDetail.product.nama + " berhasil hapus dari keranjang",
          icon: "error",
          button: false,
          timer: 1500,
        });
        getKeranjang();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Col md={3} mt="2">
      <h4>
        <strong>Result</strong>
      </h4>
      <hr />
      {keranjang.length !== 0 && (
        <Card className="result overflow-auto">
          <ListGroup variant="flush">
            {keranjang.map((menuKeranjang) => (
              <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => handleShow(menuKeranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <Badge pill variant="success">
                      {menuKeranjang.jumlah}
                    </Badge>
                  </Col>

                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    <p>Rp. {numberWithFormat(menuKeranjang.product.harga)}</p>
                  </Col>

                  <Col>
                    <strong className="float-end">
                      Rp. {numberWithFormat(menuKeranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            <ModalKeranjang
              hapusPesanan={hapusPesanan}
              handleSubmitEdit={handleSubmitEdit}
              changeKeterangan={changeKeterangan}
              handleClose={handleClose}
              show={show}
              ketDetail={ketDetail}
              jumlah={jumlah}
              keterangan={keterangan}
              tambah={tambah}
              kurang={kurang}
              totalHarga={totalHarga}
            />
          </ListGroup>
        </Card>
      )}

      <TotalBayar keranjang={keranjang} />
    </Col>
  );
}

export default Result;
