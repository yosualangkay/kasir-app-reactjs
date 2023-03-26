import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constans';
import { useEffect } from 'react';

const Sukses = ({keranjang}) => {

    const ambilKeranjang = () => {
        axios.get(API_URL+'/keranjangs')
        .then((res) => {
            keranjang = res.data
            keranjang.map(function(item) {
                return axios
                .delete(API_URL+"/keranjangs/"+item.id)
                .then((res) => console.log(res))
                .catch(error => {
                    console.log(error)
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        ambilKeranjang()
    }, [])

        return (
            <div className='text-center mt-5'>
                <Image src="asset/assets/berhasil.png" width="300" />
                <h1>Terima kasih</h1>
                <p>Terima kasih sudah memesan</p>
                <Button variant='primary' as={Link} to="/">Kembali</Button>
            </div>
        );
    }

export default Sukses;