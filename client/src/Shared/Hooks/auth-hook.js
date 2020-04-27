import { useCallback, useEffect, useState } from 'react';


let logoutTimer;

export const useAuth = () => {

    const [ token , setToken ] = useState(false);
    const [ chefId, setChefId ]= useState(false);
    const [ tokenExpirationDate, setTokenExpirationDate ] = useState();
    
      const login = useCallback((chefid, token, expirationDate )=>{
      setToken(token);
      setChefId(chefid);
      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        'chefData', 
         JSON.stringify({
           chefId: chefid, 
           token:token,
           expiration: tokenExpirationDate.toISOString()
          }))
     
    },[]);
  
    const logout = useCallback(()=>{
      setToken(null);
      setChefId(null);
      setTokenExpirationDate(null);
      localStorage.removeItem('chefData');
    },[ ]);
  
    useEffect(() => {
      if(token,  tokenExpirationDate) {
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
      }else {
        clearTimeout(logoutTimer)
      }
    },[token, logout, tokenExpirationDate])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('chefData'));
        if(storedData && 
          storedData.token &&
          new Date(storedData.expiration) > new Date())
          {
          login( storedData.chefid, storedData.token)
        }
      },[login]);
      
      return { login, logout, token, chefId }
}
