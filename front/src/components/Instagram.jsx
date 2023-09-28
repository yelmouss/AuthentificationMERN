import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ClipLoader } from 'react-spinners';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link } from 'react-router-dom';
import IgLogo from '../img/instagram.svg'
import Font from 'react-font'
import { VictoryPie } from 'victory'
import { Col, Row } from 'react-bootstrap';
import CountUp from 'react-countup';
import { BsInstagram } from "react-icons/bs";


const Instagram = () => {
    const [photos, setPhotos] = useState([]);
    const [DataDash, setDataDash] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ProfilInfo, setProfilInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://apitest-ruby.vercel.app/api/instagram-data');
                setPhotos(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://apitest-ruby.vercel.app/api/instagram-getIgCount');
                setDataDash(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://apitest-ruby.vercel.app/api/instagram-getIgFollowers');
                setProfilInfo(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);




    // Extrayez les données photoIMG et photoVideo de DataDash
    const photoIMGCount = DataDash.photoIMG || 0;
    const photoVideoCount = DataDash.photoVideo || 0;
    const photoPostCount = DataDash.count || 0;
    const photowithCaptionCount = DataDash.withCaption || 0;
    const PhotoPercent = ((photoIMGCount / photoPostCount) * 100).toFixed(2);
    const VideoPercent = ((photoVideoCount / photoPostCount) * 100).toFixed(2);


    const ProfileId = ProfilInfo.followersCount ? ProfilInfo.followersCount.id || "" : "";
    const username = ProfilInfo.followersCount ? ProfilInfo.followersCount.username || "" : "";
    const account_type = ProfilInfo.followersCount ? ProfilInfo.followersCount.account_type || "" : "";
    const media_count = ProfilInfo.followersCount ? ProfilInfo.followersCount.media_count || "" : "";

    // Créez un tableau de données pour le graphique
    const data = [
        { x: photoIMGCount + " Photos ", y: photoIMGCount },
        { x: photoVideoCount + " Videos", y: photoVideoCount }
    ];

    return (
        <Font family='Ubuntu'>
            <div className='container-fluid col-11 p-5 min-vh-100'>
                <h1>Instagram Basic Display API</h1>
                <br />
                <Tabs
                    defaultActiveKey="Dashboard"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="Dashboard" title="Dashboard">

                        <Row xs={1} lg={4} md={2}>
                            <Col className='card text-center bg-light bg-opacity-75 p-2 mt-1 '>
                                <div >
                                    <h2>Profile Info</h2>
                                    <table className='table table-bordered  text-start'>
                                        <tbody>
                                            <tr>
                                                <td> User ID</td>
                                                <td>{ProfileId}</td>
                                            </tr>
                                            <tr>
                                                <td> Username</td>
                                                <td>{username}</td>
                                            </tr>
                                            <tr>
                                                <td>  Account type </td>
                                                <td>{account_type}</td>
                                            </tr>
                                            <tr>
                                                <td>media count </td>
                                                <td>{media_count}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <br />
                                <Link to={'https://www.instagram.com/' + username} target="_blank" rel="noopener noreferrer" className='btn' >
                                    <img src={IgLogo} alt="IgLogo" className='col-2 p-2  rounded-circle' />
                                    Go to Instagram Profile </Link>



                            </Col>
                            <Col className=' mt-1 '>
                                <div className='card text-center bg-light bg-opacity-75 p-5'>
                                    <h6> Posts recieved By Api Call</h6>
                                    <h2> <CountUp delay={2} end={photoPostCount} /> </h2>

                                    <hr />
                                    <h6> Posts with caption</h6>
                                    <h2> <CountUp delay={2} end={photowithCaptionCount} /> </h2>

                                </div>


                            </Col>

                            <Col className=' mt-1 '>
                                <Row className=' text-center bg-dark text-light bg-opacity-75 p-2'>
                                    <Col> <h6> Quota Photos</h6>
                                        <hr />
                                        <h2> <CountUp delay={2} end={PhotoPercent} />% </h2></Col>
                                    <Col>
                                        <h6> Quota Vidéos</h6>
                                        <hr />
                                        <h2> <CountUp delay={2} end={VideoPercent} />% </h2></Col>
                                </Row>
                            </Col>
                            <Col className='card text-center bg-light bg-opacity-75  mt-1 '>
                                {loading ? (
                                    <div className='text-center'>
                                        <ClipLoader color='#000' loading={loading} size={50} />
                                    </div>
                                ) : (
                                    <>



                                        <VictoryPie
                                            colorScale={["tomato", "gold", "cyan", "navy"]}
                                            data={data}
                                            animate={{
                                                duration: 2000
                                            }}
                                            cornerRadius={({ datum }) => datum.y * 1}
                                            innerRadius={({ datum }) => datum.y * 4} />
                                        <div className="card-footer">
                                            Photos : {photoIMGCount} | Vidéos : {photoVideoCount}

                                        </div>


                                    </>

                                )


                                }
                            </Col>

                        </Row>

                    </Tab>
                    <Tab eventKey="Posts" title="Posts">
                        {loading ? (
                            <div className='text-center'>
                                <ClipLoader color='#000' loading={loading} size={50} />
                            </div>
                        ) : (
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}
                            >
                                <Masonry columnsCount={4} gutter={"20px"}>
                                    {photos.map((photo, index) => (
                                        <div key={index} className='text-center border p-1 rounded bg-dark bg-opacity-50'>
                                            {photo.media_type === 'VIDEO' ? (
                                                <video controls className="video-container rounded" >
                                                    <source src={photo.media_url} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : (
                                                <img src={photo.media_url} alt={`Instagram Photo ` + index} className='igimg rounded' />
                                            )}

                                            <Link to={photo.permalink} target="_blank" rel="noopener noreferrer" >
                                                <img src={IgLogo} alt="IgLogo" className='col-2 p-2  rounded-circle' />
                                            </Link>
                                            {photo.caption && <div className="card bg-light bg-opacity-50">
                                                <p>{photo.caption}</p>
                                            </div>}
                                        </div>
                                    ))}
                                </Masonry>
                            </ResponsiveMasonry>
                        )}
                    </Tab>
                </Tabs>
            </div>
        </Font>
    );
};

export default Instagram;
