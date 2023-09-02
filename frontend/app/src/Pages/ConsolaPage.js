import React, { useContext, useEffect, useState } from 'react'
import Container from '../components/Container'
import { DataContextConsola } from '../contexts/DataContextConsola';
import CardConsolaTime from '../components/CardConsolaTime'
import TabConsoleShooping from '../components/TabConsoleShooping'
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
export default function ConsolaPage() {
    const [consolas, setconsolas] = useState([]);
    useEffect(() => {
        // let x = [
        //     { name: "sss", description: "sasa" },
        //     { name: "sss", description: "sasa" }
        // ]
        // console.table(x);
    }, [])
    return (
        <div>
            <DataContextConsola>
                <Row>
                    <Col xs={12} md={8}><CardConsolaTime /></Col>
                    <Col xs={6} md={4} >
                        <TabConsoleShooping />


                    </Col>
                </Row>
            </DataContextConsola>
        </div>

    )
}
