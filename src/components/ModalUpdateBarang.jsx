import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormUpdateBarang from './FormUpdateBarang';

const  ModalUpdateBarang = (props)  => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Update Barang
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormUpdateBarang
        id={props.id}
        onHide={props.onHide}
        getdataupdate ={props.getdataupdate}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'danger'} onClick={props.onHide}>Keluar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUpdateBarang;
