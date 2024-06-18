import LoginForm from '../components/LoginForm';

const LoginPage = () => {
	return (
		<section
			style={{ height: '80vh' }}
			className='d-flex flex-column justify-content-center align-items-center'
		>
			<div className='d-flex flex-column align-items-center'>
				<h1>Iniciar sesión</h1>
				<LoginForm type='login' />
			</div>
		</section>
	);
};

export default LoginPage;
