import React, { useState } from 'react';
import { useEffect } from 'react';
import { FormGroup, Form, Button } from 'react-bootstrap';

const FormUpdateBarang = ({ onHide, id , getdataupdate}) => {
    const [foto_barang, setPhoto] = useState('');
    const [nama_barang, setItemName] = useState('');
    const [harga_jual, setSellingPrice] = useState('');
    const [harga_beli, setPurchasePrice] = useState('');
    const [stok, setStock] = useState('');
    const [viewGambar, setViewGambar] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData()
    }, [viewGambar, id]);

    const getData = async () => {
        try {
            const data = await fetch(`${import.meta.env.VITE_ENDPOINT}/api/barang/${id}`);
            const result = await data.json();
            setPhoto(result.barang[0].foto_barang);
            setItemName(result.barang[0].nama_barang)
            setSellingPrice(result.barang[0].harga_jual)
            setPurchasePrice(result.barang[0].harga_beli)
            setStock(result.barang[0].stok)
            setViewGambar(result.barang[0].foto_barang)
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // handle image size 100kB
        if (typeof foto_barang === 'object' && foto_barang.target.files[0].size > 100000) {
            swal("Gagal", "Ukuran file terlalu besar, pastikan ukuran gambar 100KB", "warning");
            return;
        }
        // handle image extension
        const extName = typeof foto_barang === 'object' && foto_barang.target.files[0].name
            .split(".")
            .pop()
            .toLowerCase();
        if (typeof foto_barang === 'object' && extName !== "jpg" && extName !== "png" && extName !== "jpeg") {
            swal("Gagal", "Extension file tidak di izinkan, pastikan extension JPG, JPEG atau PNG", "warning");
            return;
        }
        const formData = new FormData();
        if (typeof foto_barang === 'object') {
            formData.append("foto_barang", foto_barang.target.files[0]);
            formData.append("nama_barang", nama_barang);
            formData.append("harga_jual", harga_jual);
            formData.append("harga_beli", harga_beli);
            formData.append("stok", stok);
        } else {
            formData.append("nama_barang", nama_barang);
            formData.append("harga_jual", harga_jual);
            formData.append("harga_beli", harga_beli);
            formData.append("stok", stok);
        }

        try {
            setLoading(true)
            const hasil = await fetch(`${import.meta.env.VITE_ENDPOINT}/api/barang/${id}`, {
                method: 'PUT',
                body: formData,
            });
            const data = await hasil.json();
            if (data.status === 200) {
                swal("Berhasil", "Data Berhasil diupdate", "success");
                setLoading(false);
                getdataupdate()
                onHide()
                if (typeof foto_barang === 'object') {
                    const objectUrl = URL.createObjectURL(foto_barang?.target?.files[0]);
                    setViewGambar(objectUrl);
                }
            } else {
                swal("Gagal", `Terjadi Kesalahan, ${data.message}`, "warning");
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
            swal("Gagal", `Terjadi Kesalahan, Coba Beberapa Saat Lagi`, "error");
            setLoading(false)
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <div>
                    <img style={{ width: '20%' }} src={viewGambar} alt={nama_barang} />
                </div>
                <Form.Label htmlFor="photo">Gambar Barang</Form.Label>
                <Form.Control
                    type="file"
                    name="foto_barang"
                    id="photo"
                    onChange={(e) => setPhoto(e)}
                />
            </FormGroup>
            <FormGroup>
                <Form.Label htmlFor="itemName">Nama Barang</Form.Label>
                <Form.Control
                    type="text"
                    name="itemName"
                    id="itemName"
                    required
                    value={nama_barang}
                    onChange={(e) => setItemName(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Form.Label htmlFor="sellingPrice">Harga Jual</Form.Label>
                <Form.Control
                    type="number"
                    name="sellingPrice"
                    id="sellingPrice"
                    required
                    value={harga_jual}
                    onChange={(e) => setSellingPrice(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Form.Label htmlFor="purchasePrice">Harga Beli</Form.Label>
                <Form.Control
                    type="number"
                    name="purchasePrice"
                    id="purchasePrice"
                    required
                    value={harga_beli}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Form.Label htmlFor="stock">stok</Form.Label>
                <Form.Control
                    type="number"
                    name="stok"
                    id="stock"
                    required
                    value={stok}
                    onChange={(e) => setStock(e.target.value)}
                />
            </FormGroup>
            {
                loading ?
                    <Button className='mt-3' type="button" color="primary" disabled>Loading...</Button> :
                    <Button className='mt-3' type="submit" color="primary">UPDATE</Button>
            }
        </Form>
    );
};

export default FormUpdateBarang;
