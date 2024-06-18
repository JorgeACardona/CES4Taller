import ParkingCell from './ParkingCell';

const ParkingLot = ({ cells }) => {
	return (
		<div className='parking-lot'>
			{cells.map((hasVehicle, index) => (
				<ParkingCell key={index} index={index} hasVehicle={hasVehicle} />
			))}
		</div>
	);
};

export default ParkingLot;
