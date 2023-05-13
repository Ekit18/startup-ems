import React from 'react'
import { observer } from 'mobx-react-lite'


export const EmptyStep: React.FC = observer(() => {
    return (
        <h2 className="text-center">There is nothing to load!</h2>
    );
})
