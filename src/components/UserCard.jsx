import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserCard = () => {
	const { user, setUser, isLogin, setIsLogin } = useContext(UserContext);
	const navigate = useNavigate();
	const logout = () => {
		setUser({
			document: 0,
			email: '',
			password: '',
		});
		setIsLogin(false);
		navigate('/');
	};

	return (
		<div style={{ height: '100%' }} className='d-flex justify-content-end'>
			{isLogin && (
				<div className='d-flex justify-content-center align-items-center p-4'>
					
					<div className='d-flex flex-column'>
						
						<p style={{ color: 'white', cursor: 'pointer' }}
							className='m-0'>{user?.email.split('@')[0]}</p>
						<p
							onClick={logout}
							style={{ color: 'white', cursor: 'pointer' }}
							className='text-decoration-underline m-0'
						>
							Cerrar Sesión
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserCard;
