import React, { useState } from 'react'
import { Card, Icon } from 'semantic-ui-react'

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user'))
    );

    return(
        <Card>
            <Card.Content>
            <Card.Header>{currentUser.username}</Card.Header>
            <Card.Description>
            {currentUser.email}
            </Card.Description>
            </Card.Content>
        </Card>)
}

export default Profile