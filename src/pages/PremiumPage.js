import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

const PremiumPage = () => {
    return(
        <Authenticator>
            {({ signOut }) => (
                <div>
                    <h1>Welcome to your CVN Validator</h1>
                    <h3>Thank you for signing up!</h3>
                    <button onClick={signOut}>Sign Out</button>
                </div>

            )}
        </Authenticator>


    );
};

export default PremiumPage;