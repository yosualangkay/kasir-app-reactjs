import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { numberWithFormat } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../utils/constans';
import { useNavigate } from 'react-router-dom';

const TotalBayar = ({ keranjang }) => {

    const navigate = useNavigate()

    const submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar : totalBayar,
            menus: keranjang
        }

        axios.post(API_URL+'/pesanans', pesanan)
        .then((res) =>  {
         navigate("/sukses")
      }).catch (error=> {
        console.log(error);
        })

       
    }

    const totalBayar = keranjang.reduce(function (result, item) {
        return result + item.total_harga
    }, 0)
        return (
            <div className='fixed-bottom'>
                <Row>
                    <Col md={{span: 3, offset:9}} className='px-4'>
                    <h4>Total Harga : <strong className='float-end'>Rp. {numberWithFormat(totalBayar)}</strong></h4>
                    <Button  variant='primary' className='w-100 mb-4 mt-4' size='lg' onClick={() => submitTotalBayar(totalBayar)}>
                        <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong></Button>
                    </Col>
                </Row>
            </div>
        );
    }


export default TotalBayar;