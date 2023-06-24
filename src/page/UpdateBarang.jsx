import DashboardUpdateBarang from "../components/DashboardUpdateBarang";
import Footer from "../components/Footer";
import MobileNavbar from "../components/MobileNavbar";
import Sidebar from "../components/SideBar";
import { Link } from "react-router-dom";

const UpdateBarang = () => {
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
            <MobileNavbar />
            <div className="container-fluid mt-3" style={{ marginBottom: 120 }}>
                <div className="row content">
                    <Sidebar />
                    <br />
                    <DashboardUpdateBarang />
                </div>
            </div>
            <Footer />
        </>
    )
}
export default UpdateBarang;