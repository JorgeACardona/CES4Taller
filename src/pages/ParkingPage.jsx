import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ParkingContext } from '../context/ParkingContext';
import ParkingLot from '../components/ParkingLot';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FloatingSection = styled.section`
  padding: 2rem;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const FullWidthDiv = styled.div`
  width: 70vw;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const ParkingPage = () => {
  const { cells } = useContext(ParkingContext);

  return (
    <Card>
      <FloatingSection>
        <h1>Parqueadero</h1>
        <ParkingLot cells={cells} />
        <FullWidthDiv>
          <Link className='btn btn-success' to='/vehicle'>
            Ingreso de vehiculo
          </Link>
        </FullWidthDiv>
      </FloatingSection>
    </Card>
  );
};

export default ParkingPage;
