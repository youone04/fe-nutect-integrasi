import { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import MobileNavbar from "../components/MobileNavbar";
import Sidebar from "../components/SideBar";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

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
      console.log(result)
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
        data: result,
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
  console.log(barang)

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
              <div className="container-fluid mt-3" style={{ marginBottom: 120 }}>
                <div className="row content">
                  <Sidebar />
                  <br />
                  <Dashboard barang={barang.data.barang} />
                </div>
              </div>
              <Footer />
            </>
      }
    </>
  )
}
export default Home;