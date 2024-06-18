import { useContext, useEffect, useState } from 'react';
import { ParkingContext } from '../context/ParkingContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SectionContainer = styled.section`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
`;

const LicensePlate = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const VehicleDetail = () => {
  const navigate = useNavigate();
  const { vehicles, setPlate, plate, cellsDetails } = useContext(ParkingContext);
  const [isParking, setIsParking] = useState(false);
  const [detail, setDetail] = useState({
    plate: '',
    document: null,
    cc: '',
    model: '',
    brand: '',
  });

  useEffect(() => {
    setDetail(vehicles.find((v) => v.plate === plate));
    setIsParking(cellsDetails.some((c) => c.plate === plate));
  }, [plate, vehicles, cellsDetails]);

  if (!detail || Object.keys(detail).length === 0) {
    return (
      <SectionContainer>
        <div className='d-flex flex-column align-items-center'>
          <p>No hay detalles disponibles para este vehículo.</p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <CardContainer>
        <h1>Detalles del vehículo</h1>
        <LicensePlate>
          <span>{detail.plate?.slice(0, 3)}</span>-
          <span>{detail.plate?.slice(3)}</span>
        </LicensePlate>
        <p>
          <strong>Documento:</strong> {detail.document}
        </p>
        <p>
          <strong>Marca:</strong> {detail.brand}
        </p>
        {detail.cc && (
          <p>
            <strong>CC:</strong> {detail.cc}
          </p>
        )}
        {detail.model && (
          <p>
            <strong>Modelo:</strong> {detail.model}
          </p>
        )}
      </CardContainer>

      <button
        className='btn btn-success'
        style={{ marginTop: '1rem' }}
        onClick={() => {
          if (!isParking) {
            setPlate(detail.plate);
            navigate('/');
          } else {
            navigate('/vehicle');
          }
        }}
      >
        {!isParking ? 'Parquear' : 'Volver'}
      </button>
    </SectionContainer>
  );
};

export default VehicleDetail;
