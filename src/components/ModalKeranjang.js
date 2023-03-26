import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithFormat } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function ModalKeranjang({ hapusPesanan, show, handleClose, ketDetail, jumlah, keterangan, tambah, kurang, changeKeterangan, handleSubmitEdit, totalHarga }) {
  if (ketDetail) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {ketDetail.product.nama} <br />
            <strong>Rp. {numberWithFormat(ketDetail.product.harga)}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga :</Form.Label>
              <strong>
                <p>Rp. {numberWithFormat(totalHarga)}</p>
              </strong>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah :</Form.Label> <br />
              <Button
              className="minesBtn"
                onClick={() => kurang()}
                variant="primary"
                size="sm"
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <strong>{jumlah}</strong>
              
              <Button onClick={() => tambah()} className="plusBtn" variant="primary" size="sm">
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Catatan :</Form.Label>
              <Form.Control
              onChange={(event) => changeKeterangan(event)}
                value={keterangan}
                name="catatan"
                placeholder="Masukan catatan"
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => hapusPesanan(ketDetail.id)}>
            <FontAwesomeIcon icon={faTrash} />
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ModalKeranjang;
