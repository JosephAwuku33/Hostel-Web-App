import { useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!user){
      navigate('/');
    }
   

  }, [user, navigate]);

  return (
    <section className='bg-slate-200 flex items-center justify-center h-screen'>
      <h1>Welcome {user?.first_name } </h1>
    </section>
  )
}
