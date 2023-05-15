import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Alert, AlertProps, Button } from "react-bootstrap";

export const ErrorAlert: React.FC<AlertProps> = observer(({ show }) => {
    if (show) {
        return (
            <Alert variant="danger" dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Change this and that and try again. Duis mollis, est non commodo
                    luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                    Cras mattis consectetur purus sit amet fermentum.
                </p>
            </Alert>
        );
    }
    return null;
});
