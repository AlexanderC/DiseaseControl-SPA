import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
  children: React.ReactNode
}

type User = {
  type: string,
  token: string
}
export default function WithRedirect({ children }: Props) {
  const history = useHistory();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      history.push('/login');
    }
  }, [history])

  return (
    <div>
      {children}
    </div>
  )
}