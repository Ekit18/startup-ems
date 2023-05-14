import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

interface StepItemProps<T extends number | string> {
    itemId: T;
    itemTitle: string;
    setItemSelect: (itemId: T) => void;
    itemSelected: T;
}

export const StepItem = <T extends number | string>({
    itemId,
    itemTitle,
    setItemSelect,
    itemSelected,
}: StepItemProps<T>): JSX.Element => {
    const handleItemClick = () => {
        console.log(itemId);
        setItemSelect(itemId);
    };
    return (
        <div
            className={`border p-5 text-center mb-4  ${itemSelected === itemId
                ? 'bg-warning'
                : ''}`}
            onClick={handleItemClick}
            style={{ cursor: "pointer" }}
        >
            <p className="fs-3 m-0">{itemTitle}</p>
        </div>
    );
};

export default observer(StepItem);
