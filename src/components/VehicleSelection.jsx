import { useContext, useState } from 'react';
import { ParkingContext } from '../context/ParkingContext';
import { useNavigate } from 'react-router-dom';
import VehicleInput from './VehicleInput';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

const Card = styled.div`
  width: 50vw;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  .button-group {
    display: flex;
    margin-top: 1.5rem;
  }

  .input-group {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-label {
    margin-bottom: 0.5rem;
  }

  .form-control {
    height: 50px;
    width: 200px;
    text-align: center;
  }

  .btn {
    margin-top: 1rem;
    width: 150px;
  }
`;

const VehicleSelection = () => {
  const navigate = useNavigate();
  const { registeredUsers } = useContext(UserContext);
  const { setVehicleType, vehicles, setPlate } = useContext(ParkingContext);
  const [search, setSearch] = useState('');
  const [document, setDocument] = useState('');

  const onSearch = (typeSearch) => {
    if (typeSearch === 'document') {
      if (document) {
        const documentExists = registeredUsers.filter(
          (user) => user.document === parseInt(document)
        );
        if (documentExists.length === 1) {
          navigate(`/user/${documentExists[0].document}`);
        } else if (documentExists.length === 0) {
          alert(`El documento ${document} ingresado no existe`);
        }
      }
    } else if (typeSearch === 'plate') {
      const isFound = vehicles?.filter((vehicle) => vehicle.plate === search);
      if (isFound?.length === 1) {
        setPlate(isFound[0].plate);
        navigate(`/vehicle/${isFound[0].plate}`);
      } else if (isFound?.length === 0) {
        if (search !== '') {
          alert(`${search} no está registrado.`);
        } else {
          alert('Debes diligenciar la información');
        }
      }
    }
  };

  return (
    <Card>
      <div className='d-flex flex-column align-items-center'>
        <h3>Seleccione su tipo de vehículo:</h3>
        <div className='button-group'>
          <button
            type='button'
            onClick={() => setVehicleType('car')}
            className='btn btn-success mx-2'
          >
            Carro
          </button>
          <button
            type='button'
            onClick={() => setVehicleType('bike')}
            className='btn btn-danger mx-2'
          >
            Moto
          </button>
        </div>
      </div>
      <div className='d-flex'>
        <div className='d-flex flex-column align-items-center'>
          <label className='form-label'>Ingresa un documento</label>
          <div className='input-group'>
            <input
              className='form-control'
              value={document}
              type='number'
              name='document'
              autoComplete='off'
              onChange={(e) => {
                const { value } = e.target;
                setDocument(value);
              }}
            />
          </div>
          <button
            onClick={() => onSearch('document')}
            className='btn btn-success'
          >
            Buscar
          </button>
        </div>
        <div className='d-flex flex-column align-items-center'>
          <label className='form-label'>Ingresa una placa</label>
          <VehicleInput setSearch={setSearch} />
          <button onClick={() => onSearch('plate')} className='btn btn-success'>
            Buscar
          </button>
        </div>
      </div>
    </Card>
  );
};

export default VehicleSelection;
