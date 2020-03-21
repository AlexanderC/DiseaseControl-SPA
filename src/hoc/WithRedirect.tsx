import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
  children: React.ReactNode
}
export default function WithRedirect({ children }: Props) {
  const history = useHistory();

  useEffect(() => {
    history.push('/login');
  }, [history])

  return (
    <div>
      {children}
    </div>
  )
}