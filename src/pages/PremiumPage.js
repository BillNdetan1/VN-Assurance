import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import PremiumContent from './exclusive/PremiumContent';
const PremiumPage = () => {
    
    
    
    
    
    return(
        <Authenticator>
            
           
            
            {({ signOut }) => (
                <div>
                    <Router>
                     <NavLink className='content' activeClassName="active" to="/premium">Premium Content</NavLink>
                     <Routes>
      <Route path="/" element={<PremiumContent />}></Route>
      </Routes>
                     </Router>
                    
                    
                    <h1>Welcome to your CVN Validator</h1>
                 
        
            
                    <h3>Thank you for signing up!</h3>
                    <button onClick={signOut}>Sign Out</button>
                </div>

            )}
        </Authenticator>


    );
};

export default PremiumPage;