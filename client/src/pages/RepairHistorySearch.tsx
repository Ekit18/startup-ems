import React, { useEffect, useState, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container, Form } from 'react-bootstrap';
import { CarServiceInfo } from '../components/Map/ServiceMap/ServiceCrashMap';
import { getAllCarServices } from '../http/carServiceApi/carServiceApi';
import { deleteRepairsHistoryById, searchRepairsByCarOperationAndCarServiceId } from '../http/carServiceApi/repairsHistoryApi';
import { getAllCarOperations } from '../http/carServiceApi/carOperationsApi';
import { CarOperationItem } from './RepairSigning';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/constants';

export interface BlankRepairHistoryData {
    id: number;
    userCarId: number;
    carServiceId: number;
    carOperationId: number;
    isSigned: boolean;
}

export interface ElasticScrollRepairHistoryData {
    scrollId: string;
    result: BlankRepairHistoryData[];
}

export const RepairHistorySearch: React.FC = observer(() => {
    const navigate = useNavigate();
    const [carService, setCarService] = useState<CarServiceInfo[]>([]);
    const [selectedCarService, setSelectedCarService] = useState<number>(0);
    const [isEmptyLoadMore, setIsEmptyLoadMore] = useState(false)
    const [repairsHistory, setRepairsHistory] = useState<ElasticScrollRepairHistoryData>({
        result: [],
        scrollId: '',
    });

    const [carServiceOperations, setCarServiceOperations] = useState<CarOperationItem[]>([]);
    const [selectedCarServiceOperation, setSelectedCarServiceOperation] = useState<number>(0);

    useEffect(() => {
        getAllCarServices().then((data) => {
            setCarService(data);
        });
        getAllCarOperations().then((data) => {
            setCarServiceOperations(data);
        });
    }, []);

    useEffect(() => {
        if (!selectedCarServiceOperation) {
            return;
        }
        searchRepairsByCarOperationAndCarServiceId(
            selectedCarService,
            selectedCarServiceOperation,
            repairsHistory.scrollId
        ).then((data) => {
            setRepairsHistory(data);
        });
    }, [selectedCarServiceOperation, selectedCarService]);


    const handleRepairHistoryLoad = () => {
        if (!selectedCarServiceOperation || !selectedCarService || !repairsHistory.scrollId) {
            return;
        }
        searchRepairsByCarOperationAndCarServiceId(
            selectedCarService,
            selectedCarServiceOperation,
            repairsHistory.scrollId
            ).then((data) => {
            if (!data.result.length) {
                setIsEmptyLoadMore(true);
            }
            setRepairsHistory((prev) => ({ ...prev, result: [...prev.result, ...data.result] }));
        });
    }

    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                console.log(selectedCarServiceOperation, selectedCarService, repairsHistory.scrollId)
                if (entries[0].isIntersecting) {
                    handleRepairHistoryLoad();
                }
            },
            { threshold: 1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [selectedCarServiceOperation, selectedCarService, repairsHistory.scrollId]);
    const handleCarServiceSelect = (id: number) => {
        setSelectedCarService(id);
    };

    const handleCarServiceOperationSelect = (id: number) => {
        setSelectedCarServiceOperation(id);
    };

    const handleDelete = (id: number) => {
        deleteRepairsHistoryById(id).then((data) => {
            if (data) {
                setRepairsHistory((prev) => ({ ...prev, result: prev.result.filter((item) => item.id !== id) }));
            }
        });
    };

    return (
        <Container className="m-5">
            <Button onClick={() => navigate(MAIN_ROUTE)} className="me-5 mb-5">Return to main page</Button>
            <Form>
                <Form.Select onChange={(event) => handleCarServiceSelect(Number(event.target.value))}>
                    <option>Select car service</option>
                    {carService.map((item: CarServiceInfo) => (
                        <option key={item.id} value={item.id}>
                            {item.id} - {item.name} {item.location}
                        </option>
                    ))}
                </Form.Select>
            </Form>

            {selectedCarService !== 0 && (
                <Form>
                    <Form.Select onChange={(event) => handleCarServiceOperationSelect(Number(event.target.value))}>
                        <option>Select car operation</option>
                        {carServiceOperations.map((item: CarOperationItem) => (
                            <option key={item.id} value={item.id}>
                                {item.id} - {item.name} | {item.price}
                            </option>
                        ))}
                    </Form.Select>
                </Form>
            )}

            {repairsHistory.result.length > 0 &&
                repairsHistory.result.map((item) => (
                    <div key={item.id} className="border mb-2 p-3">
                        <h2>{item.id}</h2>
                        <h4>Car operation id: {item.carOperationId}</h4>
                        <h4>User car id: {item.userCarId}</h4>
                        <Button variant="danger" onClick={() => handleDelete(item.id)}>
                            Delete
                        </Button>
                    </div>
                ))}
            <div ref={observerTarget}></div>
            {isEmptyLoadMore && <h2>There is nothing to load...</h2>}
        </Container>
    );
});
