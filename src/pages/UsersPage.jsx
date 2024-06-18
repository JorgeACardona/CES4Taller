import UserTable from '../components/UserTable';

const UsersPage = () => {
	return (
		<section className='d-flex flex-column justify-content-center align-items-center'>
			<br></br>
			<h1>Empleados registrados</h1>
			<br></br>
			<UserTable />
		</section>
	);
};

export default UsersPage;
