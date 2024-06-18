import { useContext, useEffect, useState } from 'react';
import { ParkingContext } from '../context/ParkingContext';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import parking from '../assets/parking.svg';

const SectionContainer = styled.section`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  width: 70%;
  margin-top: 2rem;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  th,
  td {
    padding: 1rem;
    text-align: center;
  }

  th {
    background-color: #007bff;
    color: #fff;
  }

  td {
    border-bottom: 1px solid #dee2e6;
  }

  img {
    width: 1.5rem;
    cursor: pointer;
  }
`;

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicles, setPlate } = useContext(ParkingContext);
  const [owned, setOwned] = useState([]);

  useEffect(() => {
    const userVehicles = vehicles?.filter(
      (vehicle) => vehicle.document == parseInt(id)
    );
    setOwned(userVehicles);
  }, [id, vehicles]);

  if (!owned || owned.length === 0) {
    return (
      <SectionContainer>
        <div className='d-flex flex-column align-items-center'>
          <p>No hay detalles disponibles para este usuario.</p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <div className='d-flex flex-column align-items-center'>
        <Table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Placa</th>
              <th scope='col'>Marca</th>
              <th scope='col'>Documento</th>
              <th scope='col'>Cilindraje</th>
              <th scope='col'>Modelo</th>
              <th scope='col'>Acción</th>
            </tr>
          </thead>
          <tbody>
            {owned.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle.plate}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.document}</td>
                <td>{vehicle.cc ? vehicle.cc : 'N/A'}</td>
                <td>{vehicle.model ? vehicle.model : 'N/A'}</td>
                <td>
                  <img
                    onClick={() => {
                      setPlate(vehicle.plate);
                      navigate('/');
                    }}
                    src={parking}
                    alt='parking'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </SectionContainer>
  );
};

export default UserDetail;
