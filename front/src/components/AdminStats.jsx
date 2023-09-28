import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { VictoryPie } from 'victory';
import {
    MdOutlineMailLock,
    MdOutlineMarkEmailRead,
    MdSupervisorAccount,
    MdOutlineAdminPanelSettings,
    MdOutlineAccountCircle,
    MdDisabledVisible,
    MdDoneAll,
    MdRestoreFromTrash,
    MdEditNote
} from "react-icons/md";
const AdminStats = ({ onUpdateStatistics }) => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    // Create a function to update statistics
    const updateStatistics = () => {
        axios
            .get('http://localhost:8000/api/listAdminUsers')
            .then((response) => {
                const users = response.data;

                // Calculer les statistiques
                const totalUsers = users.length || 0;
                const totalAdmins = users.filter((user) => user.isAdmin).length || 0;
                const totalNonAdmins = totalUsers - totalAdmins;
                const adminPercentage = (totalAdmins / totalUsers) * 100 || 0;
                const nonAdminPercentage = 100 - adminPercentage;
                const totalConfirmedEmails = users.filter((user) => user.confirmed)
                    .length || 0;
                const confirmedEmailPercentage =
                    (totalConfirmedEmails / totalUsers) * 100 || 0;


                const totalUnconfirmedEmails = totalUsers - totalConfirmedEmails;

                const unconfirmedEmailPercentage = (totalUnconfirmedEmails / totalUsers) * 100 || 0;

                // Set the data in the state
                setUserData({
                    totalUsers,
                    totalAdmins,
                    totalNonAdmins,
                    adminPercentage,
                    nonAdminPercentage,
                    totalConfirmedEmails,
                    confirmedEmailPercentage,
                    totalUnconfirmedEmails,
                    unconfirmedEmailPercentage,

                });
            })
            .catch((error) => {
                console.error(error);
                setError('Erreur lors de la récupération des données.');
            });
    };

    useEffect(() => {
        // Call the function to update statistics on initial load
        updateStatistics();

        // Use onUpdateStatistics as a trigger to update statistics when received from the parent
        onUpdateStatistics(updateStatistics);
    }, [onUpdateStatistics]);

    return (
        <>
            {error && <p className="error">{error}</p>}
            {userData !== null ? (
              
                    <Container className='fw-bolder col-lg-11 ' fluid>
                        <Row className='d-flex align-items-center justify-content-center bg-light bg-opacity-75 p-3 rounded' lg={6} md={2} xs={1}>
                            <Col>
                                <div className="card  p-2 mt-1">

                                    <p className='text-success'> <MdSupervisorAccount className='fs-1' /> Members : {userData.totalUsers}</p>
                                </div>

                                <div className="card p-2 mt-1">
                                    <p> <MdOutlineAdminPanelSettings className='fs-1' /> Admin : {userData.totalAdmins}</p>

                                    <p>  <MdOutlineAccountCircle className='fs-1' /> Non-admin : {userData.totalNonAdmins}</p>
                                </div>






                            </Col>


                            <Col className='text-center'>

                                <p className='fs-5 text-success'> <MdDoneAll className='fs-1'/> Courriels confirmés <br /> {userData.totalConfirmedEmails}  </p>

                            </Col>


                            <Col className='text-center'>
                                <p className='fs-5 text-danger'> <MdDisabledVisible className='fs-1' /> Courriels non confirmés <br /> {userData.totalUnconfirmedEmails}</p>
                            </Col>
                            <Col className='text-center card p-2 m-1'>
                                <div className="card bg-success bg-opacity-25 mt-1">
                                    <h6>confirmés</h6>
                                    <h5> <MdOutlineMarkEmailRead />   {userData.confirmedEmailPercentage.toFixed(2)}%</h5>

                                </div>

                                <div className="card bg-danger bg-opacity-25 mt-1">
                                    <h6>non confirmés</h6>

                                    <h5>    <MdOutlineMailLock />  {userData.unconfirmedEmailPercentage.toFixed(2)}%</h5>

                                </div>

                                <div className="card bg-info bg-opacity-25 mt-1">
                                    <h6>Quota Admin</h6>

                                    <h5>     {userData.adminPercentage.toFixed(2)}%</h5>

                                </div>


                                <div className="card bg-light bg-opacity-75 mt-1">
                                    <h6>Quota non-admin</h6>

                                    <h5>     {userData.nonAdminPercentage.toFixed(2)}%</h5>

                                </div>



                            </Col>

                            <Col className='text-light text-center  bg-opacity-75  mt-1'>

                                <VictoryPie
                                    data={[
                                        { x: 'Administrateurs', y: userData.totalAdmins },
                                        { x: 'Non-administrateurs', y: userData.totalNonAdmins },
                                    ]}
                                    colorScale={["navy", "tomato", "cyan", "navy"]}

                                    animate={{
                                        duration: 2000
                                    }}
                                    cornerRadius={({ datum }) => datum.y * 20}
                                    innerRadius={({ datum }) => datum.y * 20} />
                            </Col>
                        </Row>
                    </Container>


               
            ) : (
                <p>Chargement des données...</p>
            )}
        </>
    );
};

export default AdminStats;