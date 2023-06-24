import { useNavigate } from 'react-router-dom';
import FormUpdateBarang from './FormUpdateBarang';

const DashboardUpdateBarang = () => {
  const navigate = useNavigate();

  return (
    <div className="col-sm-9">
      <div className="card mb-3 dashboard-admin">
        <div className="card-body" style={{ minHeight: 500, borderTop: '2px solid orange' }}>
          <h1 style={{fontWeight:'bold'}}>Update Barang</h1>
          <hr />
          <div className="mt-3 mb-3 d-lg-flex justify-content-end">
            <button onClick={() => navigate(-1)} className="btn btn-primary m-2">{'Kembali >>'}</button>
          </div>
          <FormUpdateBarang/>
        </div>
      </div>
    </div>
  );
};

export default DashboardUpdateBarang;