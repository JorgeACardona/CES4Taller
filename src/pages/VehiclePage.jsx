import { useContext, useEffect } from 'react';
import { ParkingContext } from '../context/ParkingContext';
import ParkingForm from '../components/ParkingForm';
import VehicleSelection from '../components/VehicleSelection';

const VehiclePage = () => {
	const { vehicleType, setVehicleType, plate } = useContext(ParkingContext);

	useEffect(() => {
		setVehicleType('');
	}, []);

	return (
		<section
			style={{ height: '80vh' }}
			className='d-flex flex-column justify-content-center align-items-center'
		>
			{vehicleType !== '' || plate !== '' ? (
				<ParkingForm />
			) : (
				<VehicleSelection />
			)}
		</section>
	);
};

export default VehiclePage;
