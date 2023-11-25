import React from 'react';


const Navigation = ({onRouteChange, isSignedIn}) => {
    
        if(isSignedIn) {
            return(
            <nav style={{display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer white'>Abmelden</p>
            </nav>
            )
        } else {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer white'>Anmelden</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer white'>Registrieren</p>
                </nav>
            );
        }
    
}

export default Navigation;