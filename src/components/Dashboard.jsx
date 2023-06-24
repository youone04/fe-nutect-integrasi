import { Form } from "react-bootstrap";
import Tabel from "./Tabel";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";

const DashboardComp = ({ barang }) => {
  const [textSearch, setTextSearch] = useState('');
  const [dataSearch , setDataSearch] = useState([])

  useEffect(() => {
    const hasil = barang?.filter(data =>
      data.nama_barang.toLowerCase().includes(textSearch.toLowerCase())
    );
    setDataSearch(hasil)

  },[textSearch])

  

  return (
    <div className="col-sm-9">
      <div className="card mb-3 dashboard-admin">
        <div className="card-body" style={{ minHeight: 500, borderTop: '2px solid orange' }}>
          <h1>Data Barang</h1>
          <hr />
          <div className="mt-3 mb-3 d-lg-flex justify-content-between">
            <Link to={'/barang'}><button className="btn btn-primary m-3">Tambah Barang +</button></Link>
            <Form.Group className="mb-3 m-3" controlId="exampleForm.ControlInput1">
              <Form.Control onChange={e => setTextSearch(e.target.value)} type="text" placeholder="Search" />
            </Form.Group>
          </div>
          <Tabel barang={dataSearch} />
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;