import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'react-bootstrap';
import { CreateCarModal } from './CreateCarModal';


export const CreateCar: React.FC = observer(() => {
    const [createCarModalShow, setCreateCarModalShow] = useState<boolean>(false)
    return (
        <>
            <Button onClick={() => setCreateCarModalShow(true)}>Create new Car</Button>
            <CreateCarModal setShow={setCreateCarModalShow} show={createCarModalShow} />
        </>
    );
})
