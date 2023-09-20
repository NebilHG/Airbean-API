import React, { useEffect, useState } from 'react';
import Profile from 'components/Profile/Profile';
import ViewDecoration from './ViewDecoration';
import Auth from 'components/Auth/Auth';

const ProfileView = () => {
    const [userSignedIn, setUserSignedIn] = useState(true);
    useEffect(() => {
        if(localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            if(user.token) {
                setUserSignedIn(true);
            } else {
                setUserSignedIn(false);
            }
        } else {
            setUserSignedIn(false);
        }
    }, []);
    return (
        <ViewDecoration bottomLess={true}>
            <Auth setUserSignedIn={setUserSignedIn} userSignedIn={userSignedIn} />
            <Profile />
        </ViewDecoration>
    );
};

export default ProfileView;