import { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import MobileNavbar from "../components/MobileNavbar";
import Sidebar from "../components/SideBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import ModalInputBarang from "../components/ModalInputBarang";

const Home = () => {
  const [modalShowInput, setModalShowInput] = useState(false);
  const [barang, setBarang] = useState({
    data: [],
    loading: true,
    error: false
  })

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const data = await fetch(`${import.meta.env.VITE_ENDPOINT}/api/barang`);
      const result = await data.json();
      if (result.status === 200) {
        setBarang({
          ...barang,
          data: result,
          loading: false,
          error: false
        })
      } else {
        setBarang({
          ...barang,
          data: result,
          loading: false,
          error: true,
        })
      }
    } catch (e) {
      
      setBarang({
        ...barang,
        data: [],
        loading: false,
        error: true,
      })
    }
  }
  const token = localStorage.getItem('token');
  if (!token) {
    return (
      <>
        <p>Anda  Belum Login, Silahkan Login <Link to={'/'}>disini</Link> </p>
      </>
    )
  }

  return (
    <>
      {
        barang.error ?
          <p className="text-danger">Server Error!</p> :
          barang.loading ?
            <center>
              <p>Loading ...</p>
            </center> :
            <>
              <MobileNavbar />
              <ModalInputBarang
               getData={getData}
               show={modalShowInput}
               onHide={() => setModalShowInput(false)}/>
              <div className="container-fluid mt-3" style={{ marginBottom: 120 }}>
                <div className="row content">
                  <Sidebar />
                  <br />
                  <Dashboard 
                  setModalShowInput = {setModalShowInput}
                  barang={barang.data.barang} 
                  setBarang={setBarang} 
                  getdata={getData} />
                </div>
              </div>
              <Footer />
            </>
      }
    </>
  )
}
export default Home;