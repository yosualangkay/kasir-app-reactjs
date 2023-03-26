import { Result, ListCategory, Menus } from "../components";
import { Row, Col, Container } from "react-bootstrap";
import React, { Component } from "react";
import { API_URL } from "../utils/constans";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Sukses from "./Sukses";

function Home() {
  const [dataProduct, setDataProduct] = useState([]);
  const [categorySelected, setCategorySelected] = useState("Makanan");
  const [keranjang, setKeranjang] = useState([]);

  const getKeranjang = () => {
    axios
      .get(`${API_URL + "/keranjangs"}`)
      .then((res) => setKeranjang(res.data));
  };

  const getKategori = () => {
    axios
      .get(`${API_URL + "/products?category.nama=" + categorySelected}`)
      .then((res) => setDataProduct(res.data));
  };

  useEffect(() => {
    getKeranjang();
    getKategori();
  }, []);

  const changeCategory = (value) => {
    setCategorySelected(value);
    setDataProduct([]);

    axios
      .get(`${API_URL + "/products?category.nama=" + value}`)
      .then((res) => setDataProduct(res.data));
  };

  const masukKeranjang = (value) => {
    axios
      .get(API_URL + "/keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "/keranjangs", keranjang)
            .then((res) => {
              getKeranjang();
              swal({
                title: "Masuk Keranjang",
                text:
                  keranjang.product.nama + " berhasil dimasukan ke keranjang",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "/keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              getKeranjang();
              swal({
                title: "Masuk Keranjang",
                text:
                  keranjang.product.nama + " berhasil dimasukan ke keranjang",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategory
              changeCategory={changeCategory}
              categorySelected={categorySelected}
            />
            <Col>
              <h4>
                <strong>Daftar Product</strong>
              </h4>
              <hr />
              <Row>
                {dataProduct &&
                  dataProduct.map((menu) => (
                    <Menus
                      menu={menu}
                      key={menu.id}
                      masukKeranjang={masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Result keranjang={keranjang} getKeranjang={getKeranjang} />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
