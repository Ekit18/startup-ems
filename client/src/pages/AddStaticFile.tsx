import { observer } from "mobx-react-lite"
import { Button, Form } from "react-bootstrap"
import { MAIN_ROUTE, STATIC_FILE_TYPES } from "../utils/constants"
import React, { FormEvent, useEffect, useState } from 'react'
import { PartData, addStaticFile } from "../http/awsApi/awsApi";
import { getAllParts } from "../http/partsApi/partsApi";
import { useNavigate } from "react-router-dom";


interface FormData {
    partId: number,
    file: File,
    staticType: string,
}

export const AddStaticFile: React.FC = observer(() => {
    const [formData, setFormData] = useState<FormData>({
        partId: -1,
        file: new File([''], ''),
        staticType: STATIC_FILE_TYPES[0],
    })
    const navigate = useNavigate();

    const [parts, setParts] = useState<PartData[]>([]);
    useEffect(() => {
        getAllParts().then((data) => setParts(data));
    }, []);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if (formData.partId === -1) {
            return alert("Select part")
        }
        if (formData.file.name === '') {
            return alert("Select file")
        }
        addStaticFile(formData.partId, formData.staticType, formData.file);
    }

    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value, Number(event.target.value));
        setFormData((prev) => ({ ...prev, partId: Number(event.target.value) }))
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }
        setFormData((prev) => ({ ...prev, file: event.target.files![0] }));
    };

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, staticType: event.target.value }));
    };


    return (
        <>
            <Button type="button" onClick={() => navigate(MAIN_ROUTE)}>
                Return to main menu
            </Button>
            <Form.Group>
                <Form.Label htmlFor="partId">Choose Part</Form.Label>
                <Form.Select id="partId" name="partId" defaultValue={-1} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChangeSelect(event)}>
                    <option value={-1} disabled >Select part</option>
                    {
                        parts.map((part) => {
                            console.log(part.partId)
                            return (
                                <option key={part.partId} value={part.partId}>{part.brand} / {part.type} / {part.name}</option>
                            )
                        }
                        )
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="file">Choose File</Form.Label>
                <Form.Control id="file" name="file" type="file" accept=".jpg, .jpeg, .png" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileChange(event)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Choose content type:</Form.Label>
                <Form.Check id="staticType" name="staticType" defaultChecked={true} type="radio" value={STATIC_FILE_TYPES[0]} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCheckChange(event)} label="Part type" />
                <Form.Check id="staticType2" name="staticType" type="radio" value={STATIC_FILE_TYPES[1]} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCheckChange(event)} label="Guide type" />
            </Form.Group>
            <Button type="button" onClick={(event) => handleSubmit(event)} variant="success">Submit</Button>
        </>
    )
});
