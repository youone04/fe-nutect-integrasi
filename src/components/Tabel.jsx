import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';

const Tabel = ({getData, barang , setOffset , offset , remountComponent, setRemountComponent}) => {
  // initial state pagination
  const [dataPagination, setDataPagination] = useState([])
  const [perPage] = useState(3)
  const [pageCount, setPageCount] = useState(0)
  const [loading, setLoading] = useState(false);
  //pagination function
  const pagination = () => {
    const slices = barang.slice(offset * perPage, offset * perPage + perPage);
    let i = offset * perPage + 1;
    const dataHasilPagination = slices.map((item, index) => (
      <tr key={index}>
        <th className="text-center" scope="row">{i++}</th>
        <td className="text-center" style={{ width: '20%' }}><img style={{ width: '100%' }} src={`${item.foto_barang}`} alt={item.nama_barang} /></td>
        <td className="text-center">{item.nama_barang}</td>
        <td className="text-center">{item.harga_jual}</td>
        <td className="text-center">{item.harga_beli}</td>
        <td className="text-center">{item.stok}</td>
        <td className="text-center">
          {
            loading ?
              <button className='btn btn-sm btn-danger m-1' disabled>Loading...</button> :
              <button onClick={() => actionDelete(item.id)} className='btn btn-sm btn-danger m-1'>delete</button>
          }
          <Link to={`/barang/${item.id}`}>
            <button className='btn btn-sm btn-success m-1'>update</button>
          </Link>
        </td>
      </tr>
    ))
    setDataPagination(dataHasilPagination)
    setPageCount(Math.ceil(barang.length / perPage))
  }
  useEffect(() => {
    pagination()
  }, [offset, barang]);

  const actionDelete = (id) => {
    try {
      swal({
        title: "Apakah kamu yaki?",
        text: "Data akan dihapus permanen!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then(async (willDelete) => {
          if (willDelete) {
            setLoading(true)
            const hasil = await fetch(`${import.meta.env.VITE_ENDPOINT}/api/barang/${id}`, {
              method: 'DELETE'
            })
            const data = await hasil.json();
            if (data.status === 200) {
              swal("Berhasil", "Berhasil dihpuas", "success");
              setLoading(false);
              setRemountComponent(Math.random());
              setOffset(0)
              // pagination(id)
              getData()
            } else {
              swal("Gagal", `${data.message}`, "success");
              setLoading(false)
            }
          }
        })

    } catch (error) {
      swal("Gagal", `Terjadi Kesalahan, Coba Beberapa Saat Lagi`, "error");
      setLoading(false)
    }
  }
  // pagination
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage)
  };

  return (
    <>
      <Table responsive bordered hover striped>
        <thead>
          <tr>
            <th className="text-center">No</th>
            <th className="text-center">Gambar</th>
            <th className="text-center">Nama Barang</th>
            <th className="text-center">Harga Beli</th>
            <th className="text-center">Harga Jual</th>
            <th className="text-center">Stok</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            dataPagination
          }
        </tbody>
      </Table>
      <div key={remountComponent}>
      <ReactPaginate
        previousLabel={"prev"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLabel={"next"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakLabel={"..."}
        breakClassName={"break-me page-item"}
        breakLinkClassName={"page-link"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"} />
       </div>
    </>
  );
};

export default Tabel;
