import React, { useState } from 'react';
import { FormGroup, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
const FormInputBarang = () => {
  const [foto_barang, setPhoto] = useState('');
  const [nama_barang, setItemName] = useState('');
  const [harga_jual, setSellingPrice] = useState('');
  const [harga_beli, setPurchasePrice] = useState('');
  const [stok, setStock] = useState('');
  const[loading , setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle image size 100kB
    if (foto_barang.target.files[0].size > 100000) {
      swal("Gagal", "Ukuran file terlalu besar, pastikan ukuran gambar 100KB", "warning");
      return;
    }
    // handle image extension
    const extName = foto_barang.target.files[0].name
      .split(".")
      .pop()
      .toLowerCase();
    if (extName !== "jpg" && extName !== "jpeg" && extName !== "png") {
      swal("Gagal", "Extension file tidak di izinkan, pastikan extension JPG, JPEG atau PNG", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("foto_barang", foto_barang.target.files[0]);
    formData.append("nama_barang", nama_barang);
    formData.append("harga_jual", harga_jual);
    formData.append("harga_beli", harga_beli);
    formData.append("stok", stok);

    try {
      setLoading(true)
      const hasil = await fetch(`${import.meta.env.VITE_ENDPOINT}/api/barang`, {
        method: 'POST',
        body: formData,
      });

      const data = await hasil.json();
      if (data.status === 200) {
        swal("Berhasil", "Data Berhasil ditamahkan", "success");
        setPhoto('');
        setItemName('')
        setPurchasePrice('')
        setSellingPrice('')
        setStock('')
        setLoading(false)
      } else {
        swal("Gagal", "Terjadi Kesalahan, Coba beberpa saat lagi", "warning");
        setLoading(false)
      }

    } catch (error) {
      swal("Gagal", "Terjadi Kesalahan, Coba beberpa saat lagi", "error");
      setLoading(false)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label htmlFor="photo">Gambar Barang</Form.Label>
        <Form.Control
          type="file"
          name="foto_barang"
          id="photo"
          required
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
        <Form.Label htmlFor="stock">Stock</Form.Label>
        <Form.Control
          type="number"
          required
          name="stock"
          id="stock"
          value={stok}
          onChange={(e) => setStock(e.target.value)}
        />
      </FormGroup>
     {
      loading? <Button className='mt-3' type="button" color="primary" disabled>Loaing ..</Button>:
      <Button className='mt-3' type="submit" color="primary">SIMPAN</Button>
     }
    </Form>
  );
};

export default FormInputBarang;
